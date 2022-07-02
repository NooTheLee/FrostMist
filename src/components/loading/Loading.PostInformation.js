import React from "react";
import {useAppContext} from "../../context/useContext";

const LoadingPostInformation = ({}) => {
    const {dark} = useAppContext();

    return (
        <div
            className={`w-full h-[90%] mt-[3%] grid grid-cols-5 relative dark:bg-[#242526] rounded-lg bg-white ${
                !dark ? "shadow-post" : ""
            } `}>
            <div className='col-span-3 dark:bg-[#000000] bg-[#F0F2F5] m-4 flex items-center justify-center '>
                <div className='w-full h-[70%] bg-loading rounded-none  '></div>
            </div>
            <div className='col-span-2 m-4 relative h-full '>
                <div className='flex w-full items-center gap-x-2 '>
                    <div className='w-10 h-10 rounded-full bg-loading '></div>
                    <div className=' '>
                        <div className='w-14 bg-loading py-2'></div>
                        <div className='w-10 bg-loading py-2 mt-1'></div>
                    </div>
                    <div className='w-16 h-5 bg-loading ml-auto '></div>
                </div>
                <div className='my-10 w-full '>
                    <div className='w-[70%] bg-loading h-5 '></div>
                    <div className='w-[40%] bg-loading h-5 mt-2 '></div>
                    <div className='w-[60%] bg-loading h-5 mt-2 '></div>
                </div>
                <div className='my-5 w-full flex gap-x-3 px-4 items-center py-1 border-y-[0.5px] '>
                    <div className='w-full bg-loading py-4 '></div>
                    <div className='w-full bg-loading py-4'></div>
                </div>
                <div className='px-4 '>
                    <div className='flex items-center gap-x-1 w-full '>
                        <div className='w-9 h-9 shrink-0 rounded-full bg-loading '></div>
                        <div className=' '>
                            <div className='w-10 h-3 rounded-full bg-loading '></div>
                            <div className='w-20 h-4 mt-1 rounded-full bg-loading '></div>
                        </div>
                    </div>

                    <div className='flex items-center gap-x-1 w-full my-4 '>
                        <div className='w-9 h-9 shrink-0 rounded-full bg-loading '></div>
                        <div className='w-full'>
                            <div className='w-10 h-3 rounded-full bg-loading '></div>
                            <div className='w-full h-4 mt-1 rounded-full bg-loading '></div>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-1 w-full my-4 '>
                        <div className='w-9 h-9 shrink-0 rounded-full bg-loading '></div>
                        <div className=' '>
                            <div className='w-10 h-3 rounded-full bg-loading '></div>
                            <div className='w-32 h-4 mt-1 rounded-full bg-loading '></div>
                        </div>
                    </div>
                    <div className='flex items-center gap-x-1 w-full my-4 '>
                        <div className='w-9 h-9 shrink-0 rounded-full bg-loading '></div>
                        <div className='w-full'>
                            <div className='w-10 h-3 rounded-full bg-loading '></div>
                            <div className='w-[70%] h-4 mt-1 rounded-full bg-loading '></div>
                        </div>
                    </div>
                </div>
                <div className='flex items-center gap-x-1 absolute bottom-10 w-full '>
                    <div className='w-10 h-10 shrink-0 rounded-full bg-loading '></div>
                    <div className='w-full h-8 rounded-full bg-loading '></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingPostInformation;
