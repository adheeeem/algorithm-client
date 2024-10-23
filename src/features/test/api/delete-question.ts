import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from 'react-query';

const deleteQuestion = async (id?: number) => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    await api.delete(`/question/${id}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });
};

export const useDeleteQuestion = () => {
    const queryClient = useQueryClient();

    return useMutation(deleteQuestion, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('questionsWithPagination');
        },
        onError: (error) => {
            console.error('Error deleting question:', error);
            // Handle error (e.g., show an error message)
        }
    });
};
