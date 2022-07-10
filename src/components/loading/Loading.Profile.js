import React from "react";

const LoadingProfile = () => {
    return (
        <div className=' md:px-[15%] w-full dark:bg-[#242426] bg-white overflow-x-hidden '>
            <div className='w-full h-[30vh] sm:h-[40vh] md:h-[54vh] object-cover rounded-b-lg bg-loading ' />
            <div className='flex flex-col md:flex-row mx-10 gap-x-4 border-b-[1px] dark:border-b-white/10 border-b-black/10 items-center '>
                <div className='w-[170px] h-[170px] rounded-full translate-y-[-32px] bg-loading shrink-0 border-4 border-[#242426] ' />
                <div className='flex w-full justify-between items-end translate-y-[-20px] '>
                    <div className='flex flex-col items-center w-full '>
                        <div className='bg-loading w-36 md:w-72 h-10 rounded-full  '></div>
                        <div className='bg-loading w-56 h-5 mt-2 '></div>
                    </div>
                </div>
                <div className=' md:ml-auto bg-loading px-14 py-3 md:py-5 rounded-2xl mb-2 md:mb-0 '></div>
            </div>

            <div className=' flex gap-x-3 md:gap-x-8 w-full justify-between py-2 md:py-3 px-9 md:px-24 '>
                <div className='bg-loading w-full py-3 md:py-6 '></div>
                <div className='bg-loading w-full py-3 md:py-6 '></div>
                <div className='bg-loading w-full py-3 md:py-6 '></div>
            </div>
        </div>
    );
};

export default LoadingProfile;
