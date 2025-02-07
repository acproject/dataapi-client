import axios from "axios";
import { store } from "@/store/store";
import { logout, refreshToken } from "@/store/slice/authSlice";

const axiosInstance = axios.create();

// 请求拦截器
axiosInstance.interceptors.request.use(async (config) => {
    const { auth } = store.getState();

    if (auth.token && auth.expiresAt) {
        const isExpired = Date.now() > auth.expiresAt - 60000; // 提前一分钟刷新
        if (isExpired && auth.refreshToken)  {
            try {
                await store.dispatch(refreshToken(auth.refreshToken));
            }catch(error) {
                store.dispatch(logout());
                throw error;
            }
        }

        const currentToken = store.getState().auth.token;
        if (currentToken) {
            config.headers.Authorization = `Bearer ${currentToken}`;
        }
    }
    return config;
});

// 响应拦截器
axiosInstance.interceptors.response.use(
    (response) => response,
    async (error) => {
        const originalRequest = error.config;
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;
            const { auth} = store.getState();

            if (auth.refreshToken) {
                try {
                    await store.dispatch(refreshToken(auth.refreshToken));
                    const newToken = store.getState().auth.token;
                    originalRequest.headers.Authorization = `Bearer ${newToken}`;
                    return axiosInstance(originalRequest);
                } catch (refreshError) {
                    store.dispatch(logout());
                    return Promise.reject(refreshError);
                }
        }
    }
    return Promise.reject(error);
});

export default axiosInstance;