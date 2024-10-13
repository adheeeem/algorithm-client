import { api } from "@/lib/api-client";
import { isErrorResponse } from "@/lib/utils";
import { Question, Response } from "@/types/api";

export const createQuestion = async (question: Question): Promise<Response<Question>> => {
    const result: Response<Question> = {
        statusCode: 0, 
        message: "", 
        data: {} as Question
    };
    const response = await api.post(`/question`, question);
    if (isErrorResponse(response.data)) {
        result.statusCode = response.data.statusCode
        result.message = response.data.message;
        result.data = null
    } else {
        result.data = response.data,
        result.statusCode = 200,
        result.message = ""
    }
    return result;
};

