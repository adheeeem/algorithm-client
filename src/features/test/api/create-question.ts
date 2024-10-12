import { api } from "@/lib/api-client";
import { Question } from "@/types/api";

export const createQuestion = async (question: Question): Promise<number> => {
    const response = await api.post(`/question`, question);
    return response.data.items;
};