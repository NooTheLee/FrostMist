import {useAppContext} from "../../../context/useContext";
import {Navigate} from "react-router-dom";
const Admin = () => {
    const {user} = useAppContext();

    if (user.role !== "Admin") {
        return <Navigate to='/' />;
    }

    return (
        <div className='w-screen h-screen pt-[65px] '>
            <div className='mt-5 grid grid-cols-2 gap-x-5 mx-[10%] '>
                <div className='col-span-1 h-[210px] w-full bg-[#90CAF9] rounded-[15px] text-center justify-center flex flex-col text-black '>
                    <h1 className=' font-black text-[70px] '>100</h1>
                    <h4 className='font-bold text-3xl '>people registered</h4>
                </div>
                <div className='col-span-1 h-[210px] w-full bg-[#80DEEA] rounded-[15px] text-center justify-center flex flex-col text-black '>
                    <h1 className=' font-black text-[70px] '>200</h1>
                    <h4 className='font-bold text-3xl '>post</h4>
                </div>
            </div>
        </div>
    );
};

export default Admin;
