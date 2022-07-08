import React from "react";
import {useAppContext} from "../../context/useContext";

const LoadingWeather = () => {
    const {dark} = useAppContext();
    return (
        <div
            className={`w-full dark:bg-[#242526] bg-white rounded-lg p-4 ${
                !dark ? "shadow-post" : ""
            } `}>
            <div className=' w-[80%] ml-[10%] py-5  bg-loading '></div>
            <div className=' w-[40%] ml-[30%] py-3 my-2 bg-loading '></div>
            <div className='w-full h-[20vh] bg-loading rounded-lg my-5 '></div>
            <div className=' grid grid-cols-2 grid-rows-2 w-full gap-3 '>
                <div className='row-span-1 col-span-1 w-full bg-loading py-4 '></div>
                <div className='row-span-1 col-span-1 w-full bg-loading py-4 '></div>
                <div className='row-span-1 col-span-1 w-full bg-loading py-4 '></div>
                <div className='row-span-1 col-span-1 w-full bg-loading py-4 '></div>
            </div>
        </div>
    );
};

export default LoadingWeather;
