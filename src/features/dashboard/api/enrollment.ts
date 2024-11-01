import { api } from "@/lib/api-client";
import { EnrollmentResponse } from "@/types/api";
import { useQuery, useMutation, useQueryClient } from "react-query";


const getEnrollmentStatus = async (unitNumber: number): Promise<EnrollmentResponse> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    const response = await api.get(`/UserEnrollment/enroll/${unitNumber}`, config);
    return response.data;
}

const enrollInUnit = async (unitNumber: number): Promise<EnrollmentResponse> => {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) {
        throw new Error('No access token found');
    }
    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };
    const response = await api.post(`/UserEnrollment/enroll/${unitNumber}`, {}, config);
    console.log("response", response);
    return response.data;
}

export const useEnrollmentStatus = (unitNumber: number) => useQuery<EnrollmentResponse>({
    queryKey: ['enrollment-status', unitNumber],
    queryFn: () => getEnrollmentStatus(unitNumber),
});

export const useEnrollInUnit = () => {
    const queryClient = useQueryClient();
    return useMutation(enrollInUnit, {
        onSuccess: () => {
            queryClient.invalidateQueries('enrollment-status');
        },
    });
};

