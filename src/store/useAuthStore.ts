import { create } from 'zustand';
import axios from 'axios';

import {
    CLIENT_ID,
    CLIENT_SECRET,
    GRANT_TYPE,
    PASSWORD,
    USER_ADMIN,
    USERNAME
} from '@/constant/oauth2constant';
import type { AuthState } from './model';

interface AuthStore extends AuthState {
    login: (credentials: {username: string; password: string}) => Promise<void>;
    register: (userData: {username: string; password: string; email: string}) => Promise<void>;
    logout: () => Promise<void>;
    clearError: () => void;
}

export const useAuthStore = create<AuthStore>((set) => ({
    token: null,
    refreshToken: null,
    expiresAt: null,
    status: 'idle',
    error: null,
    userInfo: null,
    scope: null,
    sessionState: null,
    tokenType: null,
    login: async (credentials) => {
        try {
            set({ status: 'loading', error: null })

            const tokenResponse = await getTokenAsync();

            const userInfoResponse = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/users/login`,
                {
                    username: credentials.username,
                    password: credentials.password,
                },
                {
                    headers: {
                        Authorization: `Bearer ${tokenResponse.access_token}`,
                    },
                }
            
            )
            set({
                status: 'succeeded',
                token: tokenResponse.access_token,
                refreshToken: tokenResponse.refresh_token,
                expiresAt: Date.now() + (tokenResponse.expiresAt ?? 0) * 1000,
                userInfo: userInfoResponse.data,
            })
        }catch (error) {
            set({ 
                status: 'failed',
                 error: error instanceof Error ? error.message : 'Login failed'
                 })
        }
    },

    register: async (userData) => {
        try {
            set({ status: 'loading', error: null })
            const adminToken = await getTokenAsync();
            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/admin/users/create`,
                userData,
                {
                    headers: {
                        Authorization: `Bearer ${adminToken.access_token}`,
                    },
                }
            )
            set({ status: 'succeeded', userInfo: response.data })
        }catch(error) {
            set({
                status: 'failed',
                error: error instanceof Error ? error.message : 'Register failed'
            })
        }
    },
    logout: async () => {
        try {
            set({ status: 'loading', error: null })
            const { token } = useAuthStore.getState();

            if (token) {
                await axios.post(
                    `${process.env.NEXT_PUBLIC_API_URL}/api/users/logout`,
                    {},
                    {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    }
                )
            }
            set({
                token: null,
                refreshToken: null,
                expiresAt: null,
                status: 'idle',
                userInfo: null,
                scope: null,
                sessionState: null,
                tokenType: null
            })

        } catch (error) {
            set({
                status: 'failed',
                error: error instanceof Error ? error.message : 'Logout failed'
            })
        }
    },
    clearError: () => set({ error: null })
}));

async function getTokenAsync() {
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
}