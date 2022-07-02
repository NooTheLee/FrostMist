import {useAppContext} from "../../context/useContext";
import {Navigate} from "react-router-dom";
const Admin = () => {
    const {user} = useAppContext();

    if (user.role !== "Admin") {
        return <Navigate to='/' />;
    }

    return (
        <div className='mt-60 text-bold text-center text-[30px] '>
            Admin page
        </div>
    );
};

export default Admin;
