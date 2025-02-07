import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios, { type AxiosError } from "axios";

import { CLIENT_ID, CLIENT_SECRET, GRANT_TYPE, PASSWORD, USER_ADMIN, USERNAME } from "@/constant/oauth2constant";
import type { AsyncThunkError, ApiError } from "@/types/api";


export interface UserInfo {
    id: string;
    username: string;
    firstName?: string;
    lastName?: string;
    email: string;
    emailVerified?: boolean;
    createdTimestamp?: number;
    enabled?: boolean;
    access?: {
        manageGroupMembership: boolean;
        view: boolean;
        mapRoles: boolean;
        impersonate: boolean;
        manage: boolean;
    };
    roles?: string[];
}


export interface AuthState {
    token: string | null;
    refreshToken: string | null;
    expiresAt: number | null;
    status?: 'idle' | 'loading' | 'succeeded' | 'failed';
    error?: string | null;
    userInfo?: UserInfo | null;
    scope?:string|null;
    sessionState?: string | null
    tokenType?:string | null
}

const initialState: AuthState = {
    token: null,
    refreshToken: null,
    expiresAt: null,
    status: 'idle',
    error: null,
    userInfo: null,
};

export const login = createAsyncThunk<
    AuthState,
    { username: string; password: string },
    { rejectValue: AsyncThunkError }
>(
    "auth/login",
    async (credentials: { username: string; password: string }, { rejectWithValue }) => {
            try {
                // 第一步获取Token
                /*
                access_token,
                expires_in,
                not-before-policy:0,
                refresh_expires_in: 1800,
                refresh_token,
                scope,
                session_state:"c8ac0670-d6c2-41a2-b359-41d9edce678d",
                token_type: "Bearer"
                */

                const tokenResponse = await getTokenAysnc();
                const userInfoResponse = await axios.post(
                    "http://localhost:8080/public/login",

                    {
                        username: credentials.username,
                        password: credentials.password,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${tokenResponse.access_token}`,
                        },
                    }
                );
                return {
                    token: tokenResponse.access_token,
                    refreshToken: tokenResponse.resh_token,
                    expiresAt: Date.now() + (tokenResponse.expires_in??0) * 1000,
                    userInfo: userInfoResponse.data,
                };
            } catch (error) {
                const axiosError = error as AxiosError<ApiError>;
                if (axiosError.response) {
                    return rejectWithValue({
                        error: axiosError.response.data || {
                            message: 'Authentication failed'
                        }
                    });
                }
                return rejectWithValue({
                    error: {
                        message: 'Network error or service unavailable'
                    }
                });
            }
        });

export const getTokenAysnc = 
    async () => {
        const params = new URLSearchParams();
        params.append(GRANT_TYPE, PASSWORD);
        params.append(USERNAME, USER_ADMIN);
        params.append(PASSWORD, process.env.NEXT_PUBLIC_USER_INFO ?? '');

        params.append(CLIENT_ID, process.env.NEXT_PUBLIC_CLIENT_ID ?? '');
        params.append(CLIENT_SECRET, process.env.NEXT_PUBLIC_CLIENT_SECRET ?? '')
        const response = await axios.post(
            process.env.NEXT_PUBLIC_TOKEN_URL?? '',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data;
    };
export const getToken = createAsyncThunk('auth/getToken', 
    async () => {
  
        const params = new URLSearchParams();
        params.append(GRANT_TYPE, PASSWORD);
        params.append(USERNAME, USER_ADMIN);
        params.append(PASSWORD, process.env.NEXT_PUBLIC_USER_INFO ?? '');

        params.append(CLIENT_ID, process.env.NEXT_PUBLIC_CLIENT_ID ?? '');
        params.append(CLIENT_SECRET, process.env.NEXT_PUBLIC_CLIENT_SECRET ?? '')
        const response = await axios.post(
            process.env.NEXT_PUBLIC_TOKEN_URL?? '',
            params,
            {
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded',
                },
            }
        );
        return response.data;
})


export const refreshToken = createAsyncThunk<
    { access_token: string, refresh_token: string; expires_in: number },
    string,
    { rejectValue: AsyncThunkError }
>(
    'auth/refreshToken',
    async (refreshToken, { rejectWithValue }) => {
        try {
            const params = new URLSearchParams();
            params.append(GRANT_TYPE, 'refresh_token');
            params.append(CLIENT_ID, process.env.CLIENT_ID ?? '')
            params.append(CLIENT_SECRET, process.env.CLIENT_SECRET ?? '')
            params.append('refresh_token', refreshToken);

            const response = await axios.post(
                process.env.OAUTH2_URL ?? '',
                params,
                {
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                }
            );
            return response.data;
        } catch (error) {
            const axiosError = error as AxiosError<ApiError>;
            if (axiosError.response) {
                return rejectWithValue({
                    error: axiosError.response.data || {
                        message: 'Token refresh failed'
                    }
                });
            }
            return rejectWithValue({
                error: {
                    message: 'Network error during token refresh'
                }
            });
        }
    }
);

export const logoutApiCall = createAsyncThunk("auth/logout", async (_, { getState, rejectWithValue }) => {
    try {
        const { auth } = getState() as { auth: AuthState };
        if (!auth.token) throw new Error("No token found");

        await axios.post(
            "http://localhost:8080/public/logout",
            {},
            {
                headers: {
                    Authorization: `Bearer ${auth.token}`,
                },
            }
        );

        return null;
    } catch (error) {
        const axiosError = error as AxiosError<ApiError>;
        if (axiosError.response) {
            return rejectWithValue({
                error: axiosError.response.data || {
                    message: 'Logout failed'
                }
            });
        }
        return rejectWithValue({
            error: {
                message: 'Network error during logout'
            }
        });

    }
}

);


const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        logout: (state) => {
            state.token = null;
            state.refreshToken = null;
            state.expiresAt = null;
            state.userInfo = null;
        },
        clearError: (state) => {
            state.error = null;
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.expiresAt = Date.now() + (action.payload.expiresAt??0) * 1000;
                state.userInfo = action.payload.userInfo;
            })
            .addCase(login.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as unknown as string;
            })
            .addCase(getToken.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(getToken.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.token = action.payload.token;
                state.refreshToken = action.payload.refreshToken;
                state.expiresAt = Date.now() + (action.payload.expiresAt??0) * 1000;
            })
            .addCase(getToken.rejected, (state) => {
                state.status = 'failed';
            })
            .addCase(refreshToken.fulfilled, (state, action) => {
                state.token = action.payload.access_token;
                state.refreshToken = action.payload.refresh_token;
                state.expiresAt = Date.now() + action.payload.expires_in * 1000;
            })
            .addCase(refreshToken.rejected, (state, action) => {
                state.error = action.payload as unknown as string;
            })
            .addCase(logoutApiCall.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(logoutApiCall.fulfilled, (state) => {
                state.status = 'idle';
                state.token = null;
                state.refreshToken = null;
                state.expiresAt = null;
                state.userInfo = null;
            })
            .addCase(logoutApiCall.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload as unknown as string;
            });
    },

});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
