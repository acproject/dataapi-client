import type { UserInfo } from "./userInfo";

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
