import { api } from "@/lib/api-client";
import { isErrorResponse } from "@/lib/utils";
import { ListResponse, Question } from "@/types/api";
import { useQuery } from 'react-query';

const getQuestionsWithPagination = async (weekNumber?: number, unitNumber?: number): Promise<ListResponse<Question>> => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await api.get(`/question`, {
        params: {
            weekNumber,
            unitNumber,
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    if (isErrorResponse(response.data)) {
        throw new Error(response.data.message);
    }
    return response.data;
};

export const queryQuestionsWithPagination = (weekNumber?: number, unitNumber?: number) => 
    useQuery<ListResponse<Question>, Error>(
        ['questionsWithPagination', weekNumber, unitNumber],
        () => getQuestionsWithPagination(weekNumber, unitNumber),
        {
            onError: (error) => {
                console.error('Error fetching questions:', error);
            }
        }
    );
