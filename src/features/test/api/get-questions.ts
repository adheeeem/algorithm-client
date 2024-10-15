import { api } from "@/lib/api-client";
import { ListResponse, Question } from "@/types/api";
import {useQuery} from 'react-query'

const getQuestionsWithPagination = async (weekNumber?: number, unitNumber?: number): Promise<ListResponse<Question>> => {
    // const PER_PAGE_LIMIT = 10
    const response = await api.get(`/question`, {
      params: {
        weekNumber,
        unitNumber
      }
    });
    return response.data;
  };

export const queryQuestionsWithPagination = (weekNumber?: number, unitNumber?: number) => useQuery<ListResponse<Question>>({
  queryKey: ['questionsWithPagination', weekNumber, unitNumber],
  queryFn: () => getQuestionsWithPagination(weekNumber, unitNumber)
});