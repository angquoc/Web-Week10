import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import authApi from "../api/authApi";
import { setToken, getRefreshToken } from "../utils/storage";

export function useAuth() {
    const queryClient = useQueryClient();
    const loginMutation = useMutation({
        mutationFn: (data) => authApi.login(data),
        onSuccess: (res) => {
            setToken(res.accessToken);
            localStorage.setItem("refreshToken", res.refreshToken);
        },
    });

    const userQuery = useQuery({
        queryKey: ["user"],
        queryFn: () => authApi.getProfile(),
        enabled: !!getRefreshToken(),
        retry: false,
        refetchOnWindowFocus: false,
    });

    const logoutMutation = useMutation({
        mutationFn: async () => {
            return authApi.logout ? authApi.logout() : null; 
        },
        onSuccess: () => {
            //Xóa token trong bộ nhớ
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");

            //Xóa dữ liệu user đang lưu trong cache của React Query
            queryClient.setQueryData(["user"], null);
            queryClient.removeQueries(["user"]);            
        },
        onError: (error) => {
            console.log("Lỗi logout API, nhưng vẫn sẽ xóa token ở client", error);
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            queryClient.setQueryData(["user"], null);
        }
    });

    return { loginMutation, userQuery, logoutMutation };
}