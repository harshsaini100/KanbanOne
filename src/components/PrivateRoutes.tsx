import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export default function PrivateRoutes({children}){
    const { isAuthenticated} = useSelector((state: any) => state.auth)

    return isAuthenticated ? children : <Navigate to="/login" replace/>
}