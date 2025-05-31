import { Exception } from "@/lib/exceptions";
import { ErrorResponse } from "@/utils";

export function handleError(error) {
    if (error instanceof Exception) {
        const response = ErrorResponse(error.message);
        return {
            body: response,
            status: error.code
        }
    } else {
        const response = ErrorResponse(error.message);
        return {
            body: response,
            status: 500
        }
    }
}