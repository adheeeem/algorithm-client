import { api } from "@/lib/api-client";
import { ListResponse, Question } from "@/types/api";
import {useQuery} from 'react-query'

const getQuestionsWithPagination = async (page: number, weekNumber: number, unitNumber: number): Promise<ListResponse<Question>> => {
    const PER_PAGE_LIMIT = 10
    const response = await api.get(`/question`, {
      params: {
        PER_PAGE_LIMIT,
        page,
        weekNumber,
        unitNumber
      }
    });
    return response.data;
  };

export const queryQuestionsWithPagination = (page: number, weekNumber: number, unitNumber: number) => useQuery<ListResponse<Question>>({
  queryKey: ['questionsWithPagination', page, weekNumber, unitNumber],
  queryFn: () => getQuestionsWithPagination(page, weekNumber, unitNumber)
});