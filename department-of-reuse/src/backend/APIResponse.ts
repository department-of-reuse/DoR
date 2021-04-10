import APIError from "@/backend/APIError";

export default interface APIResponse<T> {
    networkError: boolean;
    statusCode: number;
    returnValue: T;
    error: APIError;
}
