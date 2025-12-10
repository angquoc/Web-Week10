import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { getRefreshToken } from "../utils/storage";

export default function ProtectedRoute({ children }) {
    const { userQuery } = useAuth();
    const token = getRefreshToken();

    if (!token) {
        return <Navigate to="/login" />;
    }

    if (userQuery.isLoading) {
        return <p>Loading...</p>;
    }
    
    if (userQuery.isError) {
        return <Navigate to="/login" />;
    }

    if (!userQuery.data) {
        return <p>Authenticating...</p>;
    }

    return children;
}