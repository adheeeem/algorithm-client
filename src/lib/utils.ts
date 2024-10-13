import { ErrorResponse } from "@/types/api";

export const isErrorResponse = (data: any): data is ErrorResponse => {
    return data && typeof data.statusCode === 'number' && 
           typeof data.message === 'string' && 
           typeof data.details === 'string';
};