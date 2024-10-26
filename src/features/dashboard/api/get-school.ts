import { api } from "@/lib/api-client";
import { ListResponse, School } from "@/types/api";
import { useQuery } from 'react-query';

const getSchools = async (): Promise<ListResponse<School>> => {
  const accessToken = localStorage.getItem('accessToken');
  
  if (!accessToken) {
    throw new Error('No access token found');
  }

  const config = {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };

  const response = await api.get('/school', config);
  return response.data;
};

export const useSchools = () => useQuery<ListResponse<School>>({
  queryKey: ['schools'],
  queryFn: getSchools,
  retry: false, // Don't retry on failure
  onError: (error) => {
    console.error('Failed to fetch schools:', error);
    // You can add additional error handling here, such as redirecting to login
  }
});