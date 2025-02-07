export interface ApiError {
    message: string;
    statusCode? :number;
    error? :string;
    code?: string;
    timestamp?: string;
    path?: string;
}

export type AsyncThunkError = {
    error: ApiError | string;
}