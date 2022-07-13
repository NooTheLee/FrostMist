import React from "react";

const LoadingMessenger = () => {
    const arr = [1, 2, 3, 4, 5, 6];

    const listRandom = (index) => {
        if (index === 2) {
            return (
                <div className="w-full bg-loading flex items-center ">
                    <div className="w-10 h-10  shrink-0  bg-loading rounded-full border border-white ml-2 my-3 z-[2] "></div>
                    <div className="w-10 h-10  shrink-0  bg-loading rounded-full border border-white translate-x-[-15px] my-3 z-[1] "></div>
                    <div className=""></div>
                    <div className="md:flex flex-col hidden">
                        <div className="bg-loading bg-white dark:bg-white w-10 h-5 border border-white translate-x-[-10px] "></div>
                        <div className="bg-loading bg-white dark:bg-white w-40 h-4 border border-white translate-x-[-10px] mt-1 "></div>
                    </div>
                </div>
            );
        }
        return (
            <div className="w-full bg-loading flex items-center ">
                <div className="w-10 h-10  shrink-0  bg-loading rounded-full border border-white ml-2 my-3 z-[2] "></div>
                <div className="ml-1 md:flex flex-col hidden">
                    <div className="bg-loading bg-white dark:bg-white w-10 h-5 border border-white "></div>
                    <div className="bg-loading bg-white dark:bg-white w-32 h-4 border border-white mt-1 "></div>
                </div>
            </div>
        );
    };
    return (
        <div className="w-screen h-screen px-2 md:px-[5%] pt-[40px] md:pt-[70px] overflow-hidden ">
            <div className="w-full h-full grid grid-cols-4 mt-5 gap-x-3 ">
                <div className="col-span-1 ">
                    <div className="flex items-center mt-1 justify-between gap-x-1">
                        <div className="bg-loading w-24 h-8 "></div>
                        <div className="bg-loading w-8 h-8 "></div>
                    </div>
                    <div className="my-3 bg-loading rounded-full w-full h-10 "></div>
                    <div className="flex flex-col gap-y-2 ">
                        {arr.map((v) => (
                            <div key={v + "random_loading_messenger"}>
                                {listRandom(Math.floor(Math.random() * 3))}
                            </div>
                        ))}
                        <div className="w-full bg-loading hidden md:flex items-center ">
                            <div className="w-10 h-10  shrink-0  bg-loading rounded-full border border-white ml-2 my-3 z-[2] "></div>
                            <div className="w-10 h-10  shrink-0  bg-loading rounded-full border border-white translate-x-[-15px] my-3 z-[1] "></div>
                            <div className=""></div>
                            <div className="md:flex flex-col hidden">
                                <div className="bg-loading bg-white dark:bg-white w-10 h-5 border border-white translate-x-[-10px] "></div>
                                <div className="bg-loading bg-white dark:bg-white w-40 h-4 border border-white translate-x-[-10px] mt-1 "></div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="col-span-3 ">
                    <div className="flex items-center gap-x-2 ">
                        <div className="bg-loading w-10 h-10  shrink-0  rounded-full "></div>
                        <div className="bg-loading w-32 h-6 "></div>
                    </div>
                    <div className="dark:bg-[#242526] bg-white w-full h-[68vh] p-2 md:p-4 mt-2 rounded-lg ">
                        <div className="flex items-center gap-x-2">
                            <div className="bg-loading w-10 h-10  shrink-0  rounded-full border border-white "></div>
                            <div className="bg-loading w-60 h-20 "></div>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2">
                            <div className="bg-loading w-10 h-10  shrink-0  rounded-full border border-white "></div>
                            <div className="bg-loading w-80 h-10 "></div>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2 justify-end ">
                            <div className="bg-loading w-40 h-10 "></div>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2 justify-end ">
                            <div className="bg-loading w-16 h-10 "></div>
                        </div>
                        <div className="flex items-center gap-x-2 mt-2 justify-end ">
                            <div className="bg-loading w-80 h-10 "></div>
                        </div>
                    </div>
                    <div className="bg-loading w-full rounded-full h-10 mt-2 "></div>
                </div>
            </div>
        </div>
    );
};

export default LoadingMessenger;
