import React from "react";
import {useAppContext} from "../../context/useContext";

const LoadingCard = () => {
    const {dark} = useAppContext();
    const arr = [1, 2, 3, 4, 5, 6];

    return (
        <div
            className={`bg-white w-full dark:bg-[#242526] p-4 rounded-lg ${
                !dark ? "shadow-post" : ""
            } `}>
            <div className='mb-10 w-32 h-8 bg-loading rounded-full'></div>
            <div className='grid grid-cols-2 gap-x-6 gap-y-8 '>
                {arr.map((v) => (
                    <div
                        key={v + "loadingPost"}
                        className='flex items-center w-full col-span-1 gap-x-2 '>
                        <div className='w-20 h-20 rounded-md bg-loading '></div>
                        <div>
                            <div className='w-16 h-6  bg-loading '></div>
                            <div className='w-28 h-4 bg-loading mt-2 '></div>
                        </div>
                        <div className='ml-auto bg-loading w-20 h-8 bg-loading '></div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LoadingCard;
