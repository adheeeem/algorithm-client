import { api } from "@/lib/api-client";
import { ListResponse, Question } from "@/types/api";
import {useQuery} from 'react-query'

const getQuestionsWithPagination = async (weekNumber?: number, unitNumber?: number, grade?:number): Promise<ListResponse<Question>> => {
    // const PER_PAGE_LIMIT = 10
    const response = await api.get(`/question`, {
      params: {
        weekNumber,
        unitNumber,
        grade
      }
    });
    return response.data;
  };

export const queryQuestionsWithPagination = (weekNumber?: number, unitNumber?: number, grade?:number) => useQuery<ListResponse<Question>>({
  queryKey: ['questionsWithPagination', weekNumber, unitNumber],
  queryFn: () => getQuestionsWithPagination(weekNumber, unitNumber, grade)
});