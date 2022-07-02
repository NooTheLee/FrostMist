import React from "react";
import {useAppContext} from "../../context/useContext";

const LoadingIntro = () => {
    const {dark} = useAppContext();
    return (
        <div
            className={`bg-white dark:bg-[#242526] p-4 rounded-lg ${
                !dark ? "shadow-post" : ""
            } `}>
            <div className='bg-loading py-4 w-20 rounded-full '></div>
            <div className=' w-full flex flex-col items-center my-5 '>
                <div className='bg-loading h-6 w-60 '></div>
                <div className='bg-loading h-6 w-32 mt-3 '></div>
            </div>
            <div className='mt-5 flex gap-x-2 items-center '></div>
        </div>
    );
};

export default LoadingIntro;
