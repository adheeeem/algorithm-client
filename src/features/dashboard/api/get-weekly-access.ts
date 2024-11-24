import { WeeklyAccessResponse } from "@/types/api";
import { api } from "@/lib/api-client";
import { useQuery } from "react-query";

const getWeeklyAccess = async (unitNumber: number): Promise<WeeklyAccessResponse> => {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        throw new Error('No access token found');
    }

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    const response = await api.get(`/UserWeeklyActivity/${unitNumber}`, config);
    return response.data;
}

export const useWeeklyAccess = (unitNumber: number) => useQuery<WeeklyAccessResponse>({
    queryKey: ['weekly-access', unitNumber],
    queryFn: () => getWeeklyAccess(unitNumber),
});

