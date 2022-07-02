import React from "react";
import {useAppContext} from "../../context/useContext";

const LoadingForm = () => {
    const {dark} = useAppContext();
    return (
        <div
            className={`w-full dark:bg-[#242526] bg-white rounded-lg p-4 ${
                !dark ? "shadow-post" : ""
            } `}>
            <div className='flex items-center gap-x-2 border-b-[1px] dark:border-b-[#8f9192] border-b-[#d1d4d5] pb-3 mb-3 '>
                <div className='w-10 h-10 rounded-full bg-loading shrink-0 ' />
                <div className='w-full h-8 rounded-full bg-loading  '></div>
            </div>
            <div className='flex justify-between px-14 gap-x-4 '>
                <div className='w-full h-9 bg-loading '></div>
                <div className='w-full h-9 bg-loading '></div>
            </div>
        </div>
    );
};

export default LoadingForm;
