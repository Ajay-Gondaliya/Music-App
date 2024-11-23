import { Navigate } from "react-router-dom";

const PrivateRoute = ({ Component }: any) => {

    const isAuthenticated = localStorage.getItem('token') ? true : false;

    return isAuthenticated ? <Component /> : <Navigate to="/login" />;
};
export default PrivateRoute;