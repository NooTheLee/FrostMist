import {useAppContext} from "../context/useContext";
import {Navigate} from "react-router-dom";

const ProtectedLayout = ({children}) => {
    const {user} = useAppContext();
    if (!user) {
        return <Navigate to='/home' />;
    }
    return children;
};

export default ProtectedLayout;
