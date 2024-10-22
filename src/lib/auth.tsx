import { Login, LoginResponse, Response, User } from "@/types/api";
import { api } from "@/lib/api-client";
import { isErrorResponse } from "@/lib/utils";
import { useMutation, useQuery } from 'react-query';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';
import { SquareLoader } from '@/components/ui/loader/square-loader';

const loginUser = async (loginRequest: Login): Promise<Response<LoginResponse>> => {
    const result: Response<LoginResponse> = {
        statusCode: 0,
        message: "",
        data: {} as LoginResponse
    };
    const response = await api.post(`/user/login`, loginRequest);
    if (isErrorResponse(response.data)) {
        result.statusCode = response.data.statusCode
        result.message = response.data.message;
        result.data = null
    } else {
        result.data = response.data;
        result.statusCode = 200;
        result.message = "";

        // Store access token in local storage
        if (response.data.accessToken) {
            console.log('token set');
            localStorage.setItem('accessToken', response.data.accessToken);
        }

    }
    return result;
};

const getUser = async (): Promise<Response<User>> => {
    const accessToken = localStorage.getItem('accessToken');

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    const response = await api.get(`/user`, config);

    if (isErrorResponse(response.data)) {
        return {
            statusCode: response.data.statusCode,
            message: response.data.message,
            data: null
        };
    } else {
        return {
            statusCode: 200,
            message: "",
            data: response.data as User
        };
    }
};

export const useUser = () => useQuery<Response<User>>({
    queryKey: ['user'],
    queryFn: async () => {
        try {
            return await getUser()
        } catch (error) {
            throw error
        }
    },
    retry: false, // Don't retry on failure
});

export const useLogin = (credentials: Login) => {
    const navigate = useNavigate();
    return useMutation(() => loginUser(credentials), {
        onSuccess: (data) => {
            if (data.statusCode === 200 && data.data?.accessToken) {
                localStorage.setItem('accessToken', data.data.accessToken);
                navigate('/dashboard');
            }
        },
        onError: (error) => {
            console.error('Login failed:', error);
            // Handle login error (e.g., show an error message)
        }
    });
};

const logoutUser = (): void => {
    localStorage.removeItem('accessToken');
};

export const useLogout = () => logoutUser;

export const ProtectedRoute = ({ children, roles = [] }: { children: React.ReactNode, roles?: number[] }) => {
    const { data: userData, isLoading, isError } = useUser();
    const location = useLocation();

    if (isLoading) {
        return <SquareLoader />; // Or your custom loading component
    }
    if (isError || (!!userData?.data && (userData?.statusCode !== 200 || !roles.includes(userData?.data?.role!)))) {
        return (
            console.log("navigating: ", userData?.data),
            <Navigate
                to={`/login?redirectTo=${encodeURIComponent(location.pathname)}`}
                replace
            />
        );
    }

    return children;
};
