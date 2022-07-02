import React from "react";
import {useAppContext} from "../../context/useContext";

const LoadingImage = () => {
    const {dark} = useAppContext();
    const arr = [1, 3, 43, 5, 6, 7, 8, 9, 0];
    return (
        <div
            className={`bg-white dark:bg-[#242526] p-4 rounded-lg ${
                !dark ? "shadow-post" : ""
            } `}>
            <div className='bg-loading py-4 w-20 rounded-full '></div>
            <div className='grid grid-cols-3 grid-rows-3 w-full gap-1 my-4 '>
                {arr.map((v) => (
                    <div
                        key={v + `DFWEQ`}
                        className='col-span-1 row-span-1 bg-loading w-full pt-[100%] rounded-none '></div>
                ))}
            </div>
        </div>
    );
};

export default LoadingImage;
