import { api } from "@/lib/api-client";
import { ListResponse, Question } from "@/types/api";
import { useQuery } from 'react-query';

const getQuestionsWithPagination = async (weekNumber?: number, unitNumber?: number, grade?: number): Promise<ListResponse<Question>> => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await api.get(`/question`, {
        params: {
            weekNumber,
            unitNumber,
            grade
        },
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
    return response.data;
};

export const queryQuestionsWithPagination = (weekNumber?: number, unitNumber?: number, grade?: number) => 
    useQuery<ListResponse<Question>, Error>(
        ['questionsWithPagination', weekNumber, unitNumber, grade],
        () => getQuestionsWithPagination(weekNumber, unitNumber, grade),
        {
            onError: (error) => {
                console.error('Error fetching questions:', error);
            }
        }
    );
