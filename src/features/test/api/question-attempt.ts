import { MinimalQuestionAttemptResponse } from "@/types/api";
import { ListResponse } from "@/types/api";
import { api } from "@/lib/api-client";
import { isErrorResponse } from "@/lib/utils";
import { useQuery } from "react-query";

const getQuestionAttempts = async (weekNumber: number, unitNumber: number): Promise<ListResponse<MinimalQuestionAttemptResponse>> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await api.get(`/AttemptResult`, {
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
}

export const queryQuestionAttempts = (weekNumber: number, unitNumber: number) => 
    useQuery<ListResponse<MinimalQuestionAttemptResponse>, Error>(
        ['questionAttempts', weekNumber, unitNumber],
        () => getQuestionAttempts(weekNumber, unitNumber),
        {
            onError: (error) => {
                console.error('Error fetching question attempts:', error);
            }
        }
    );

