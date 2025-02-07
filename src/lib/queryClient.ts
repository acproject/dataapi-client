import { QueryClient } from "@tanstack/react-query";
import axios from "axios";
// import axios from "axios";

export const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: false,
            staleTime: 5 * 60 * 1000,
        },
        onError: (error) => {
            if (axios.isAxiosError(error)) {
                console.error('请求错误:', error.response?.data);

            }
        }
    }
});

// queryClient.qetQueryCache().config.onError = (error) => {
//     if (error?.response?.status === 401) {
//         // 触发 Token 刷新逻辑
//     }
// }