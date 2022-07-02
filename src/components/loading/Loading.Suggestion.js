import React from "react";
import {useAppContext} from "../../context/useContext";

const LoadingSuggestion = () => {
    const {dark} = useAppContext();
    const arr = [1, 2, 3, 4, 5, 6, 7, 8];
    return (
        <div
            className={`w-full dark:bg-[#242526] bg-white rounded-lg p-4 ${
                !dark ? "shadow-post" : ""
            } `}>
            <div className='flex items-center justify-between '>
                <div className='bg-loading py-3 px-16 '></div>
                <div className='bg-loading py-2 px-5 '></div>
            </div>
            <div className=' mt-4 '>
                {arr.map((v, k) => (
                    <div
                        key={`${k}+suggestion`}
                        className='flex items-center justify-between mt-3.5'>
                        <div className='flex items-center gap-x-1 '>
                            <div className='w-10 h-10 rounded-full bg-loading '></div>
                            <div className='flex flex-col gap-y-1.5 '>
                                <div className='w-10 py-2 bg-loading '></div>
                                <div className='w-40 py-2 bg-loading '></div>
                            </div>
                        </div>
                        <div className='bg-loading py-2 px-7 '></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingSuggestion;
