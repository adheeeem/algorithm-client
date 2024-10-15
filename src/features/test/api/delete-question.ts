import { api } from "@/lib/api-client";

export const deleteQuestion = async (id?: number) => {
    await api.delete(`/question/${id}`);
};