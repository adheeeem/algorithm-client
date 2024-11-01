import { api } from "@/lib/api-client";
import { EnrollmentResponse } from "@/types/api";
import { useQuery } from "react-query";

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

export const useEnrollmentStatus = (unitNumber: number) => useQuery<EnrollmentResponse>({
    queryKey: ['enrollment-status', unitNumber],
    queryFn: () => getEnrollmentStatus(unitNumber),
});

