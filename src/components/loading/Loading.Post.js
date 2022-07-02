import React from "react";
import {useAppContext} from "../../context/useContext";

const LoadingPost = ({className = ""}) => {
    const {dark} = useAppContext();
    return (
        <div
            className={
                `w-full dark:bg-[#242526] bg-white rounded-lg p-4 ${
                    !dark ? "shadow-post" : ""
                } mt-4 ` + className
            }>
            <div className='w-full flex items-center '>
                <div className='w-10 h-10 rounded-full  bg-loading '></div>
                <div className='flex flex-col gap-y-1 ml-2 '>
                    <div className='w-16 py-2 bg-loading '></div>
                    <div className='w-40 py-2 bg-loading '></div>
                </div>
            </div>
            <div className='w-full h-[40vh] bg-loading rounded-lg my-5 '></div>
            <div className=' w-full py-5 rounded-lg bg-loading '></div>
        </div>
    );
};

export default LoadingPost;
