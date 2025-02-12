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