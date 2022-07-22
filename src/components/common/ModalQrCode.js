import React from "react";
import {useAppContext} from "../../context/useContext";

const ModalQrCode = () => {
    const {closeQrCode} = useAppContext();
    return (
        <div className='fixed h-screen w-screen z-[1000] flex items-center justify-center '>
            <div
                className='w-full h-full bg-black/50 absolute top-0 left-0 z-[1001] '
                onClick={() => closeQrCode()}></div>
            <div className='z-[1002] '>
                <img
                    src='./images/qrcode.png'
                    alt='QR code'
                    className='w-40 h-40 rounded-xl md:w-60 md:h-60 '
                />
            </div>
        </div>
    );
};

export default ModalQrCode;
