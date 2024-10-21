import { Login, LoginResponse, Response, User } from "@/types/api";
import { api } from "@/lib/api-client";
import { isErrorResponse } from "@/lib/utils";
import { useMutation, useQuery } from 'react-query';
import { useLocation, Navigate, useNavigate } from 'react-router-dom';

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

const logoutUser = async (page: string): Promise<void> => {
    const navigate = useNavigate();
    localStorage.removeItem('accessToken');
    navigate(page);
};

const getUser = async (): Promise<Response<User>> => {
    const result: Response<User> = {
        statusCode: 0,
        message: "",
        data: null
    };
    console.log("getting token");
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) {
        result.statusCode = 401;
        result.message = "No access token found";
        return result;
    }

    const config = {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    };

    try {
        const response = await api.get(`/user`, config);
        if (isErrorResponse(response.data)) {
            result.statusCode = response.data.statusCode;
            result.message = response.data.message;
        } else {
            result.statusCode = 200;
            const userData = response.data as User;
            result.data = userData;
        }
    } catch (error) {
        result.statusCode = 500;
        result.message = "An error occurred while fetching user data";
    }

    return result;
};

export const useUser = () => useQuery<Response<User>>({
    queryKey: ['user'],
    queryFn: () => getUser(),
    retry: true, // Don't retry on failure
});

export const useLogin = (login: Login) => {
    const navigate = useNavigate();
    return useMutation<Response<LoginResponse>, Login>({
        mutationFn: () => loginUser(login),
        onSuccess: async () => {
            navigate("/dashboard")
        }
    });
};

export function useLogout(defaultPage: string) {
    const navigate = useNavigate();
    localStorage.removeItem('accessToken');
    const logout = () => {
        navigate(defaultPage);
    };

    return logout;
}

export const ProtectedRoute = ({ children, roles = [] }: { children: React.ReactNode, roles?: number[] }) => {
    const { data: userData, isLoading } = useUser();
    const location = useLocation();


    if (isLoading) {
        return <div>Loading...</div>; // Or your custom loading component
    }

    if (userData?.data != null && (userData?.statusCode !== 200 || !roles.includes(userData?.data?.role!))) {
        console.log("not authorized: ", userData?.data);
        return (
            <Navigate
                to={`/not-found?redirectTo=${encodeURIComponent(location.pathname)}`}
                replace
            />
        );
    }

    return children;
};
