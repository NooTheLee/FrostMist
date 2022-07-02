import React from "react";
import {useNavigate} from "react-router-dom";
const Error = () => {
    const navigate = useNavigate();
    return (
        <div
            className='w-screen h-screen flex items-center justify-center flex-col font-[Exo] text-white relative '
            style={{backgroundImage: "url(/images/bg.png)"}}>
            <img
                src='/images/Rocket.png'
                alt='rocket'
                className='fixed top-[5%] right-[35%] '
            />
            <img src='/images/error-astro.png' alt='err' />
            <div className='mt-20px font-medium  text-[50px] '>OPPS!</div>
            <div className='font-light text-[30px] '>PAGE NOT FOUND</div>
            <div className='mt-[15px] flex items-center justify-center gap-x-[23px] text-[20px] text-light '>
                <div
                    className='py-[5px] px-[28px] border border-white rounded-[5px] cursor-pointer hover:bg-white/20 transition-50 '
                    onClick={() => {
                        navigate("/");
                    }}>
                    GO HOME
                </div>
                <div
                    className='py-[5px] px-[28px] border border-white rounded-[5px] cursor-pointer hover:bg-white/20 transition-50 '
                    onClick={() => {
                        navigate(-1);
                    }}>
                    GO BACK
                </div>
            </div>
        </div>
    );
};

export default Error;
