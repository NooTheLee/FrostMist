import React from "react";

const LoadingProfile = () => {
    return (
        <div className='px-[15%] w-full dark:bg-[#242426] bg-white overflow-x-hidden '>
            <div className='w-full h-[54vh] object-cover rounded-b-lg bg-loading ' />
            <div className='flex mx-10 gap-x-4 border-b-[1px] dark:border-b-white/10 border-b-black/10 items-center '>
                <div className='w-[170px] h-[170px] rounded-full translate-y-[-32px] bg-loading shrink-0 border-4 border-[#242426] ' />
                <div className='flex w-full justify-between items-end translate-y-[-20px] '>
                    <div className=''>
                        <div className='bg-loading w-72 h-10 rounded-full  '></div>
                        <div className='bg-loading w-56 h-5 mt-2 '></div>
                    </div>
                </div>
                <div className='ml-auto bg-loading px-14 py-5 rounded-2xl '></div>
            </div>

            <div className=' flex gap-x-8 w-full justify-between py-3 px-24 '>
                <div className='bg-loading w-full py-6 '></div>
                <div className='bg-loading w-full py-6 '></div>
                <div className='bg-loading w-full py-6 '></div>
            </div>
        </div>
    );
};

export default LoadingProfile;
