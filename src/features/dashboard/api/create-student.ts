import { api } from "@/lib/api-client";
import { useMutation, useQueryClient } from 'react-query';
import { Student, Response } from "@/types/api";

// API call to create a student
const createStudent = async (studentData: Partial<Student>): Promise<Response<Student>> => {
    const accessToken = localStorage.getItem('accessToken');
    
    if (!accessToken) {
        throw new Error('No access token found');
    }

    const response = await api.post('/user/register', studentData, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    });

    return response.data;
};

// Hook to create a student
export const useCreateStudent = () => {
    const queryClient = useQueryClient();

    return useMutation(createStudent, {
        onSuccess: () => {
            // Invalidate and refetch
            queryClient.invalidateQueries('students');
        },
        onError: (error) => {
            console.error('Error creating student:', error);
            // Handle error (e.g., show an error message)
        }
    });
};

