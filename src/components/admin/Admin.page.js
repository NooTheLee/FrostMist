import React, { useState } from "react";
import Users from "./components/table/Users.components";
import Posts from "./components/table/Posts.components";
import Chart from "./components/chart/Chart.components";

import { ThemeProvider, createTheme } from "@mui/material/styles";
import { useAppContext } from "../../context/useContext";

const Admin = () => {
    const { dark } = useAppContext();

    const darkTheme = createTheme({
        palette: {
            mode: dark ? "dark" : "light",
        },
        typography: {
            fontFamily: [
                "Quicksand",
                "-apple-system",
                "BlinkMacSystemFont",
                '"Segoe UI"',
                "Roboto",
                '"Helvetica Neue"',
                "Arial",
                "sans-serif",
                '"Apple Color Emoji"',
                '"Segoe UI Emoji"',
                '"Segoe UI Symbol"',
            ].join(","),
        },
    });

    const [totalPost, setTotalPost] = useState(0);
    const [totalUser, setTotalUser] = useState(0);

    /**
     * @input string || date. Ex : Sat Jul 16 2022 19:07:55 GMT+0700
     * @return string. Ex: 16-07-2022
     */
    const convertDate = (time) => {
        const date = new Date(time);
        const yyyy = date.getFullYear();
        const mm = date.getMonth() + 1;
        const dd = date.getDate();
        return `${yyyy}-${mm >= 10 ? mm : "0" + mm}-${
            dd >= 10 ? dd : "0" + dd
        }`;
    };

    return (
        <ThemeProvider theme={darkTheme}>
            <div className="w-screen h-auto md:h-screen pt-[65px] md:overflow-hidden ">
                <div className="w-full h-full md:grid grid-rows-4 grid-cols-4 ">
                    {/* quantity */}
                    <div className="col-span-1 row-span-2 grid grid-rows-2 gap-y-5 p-5 ">
                        <div className="w-full row-span-1 h-full rounded-lg bg-sky-600 dark:bg-[#242526] flex flex-col items-center justify-center py-4 sm:py-0 ">
                            <div className="text-white text-[24px] font-bold ">
                                Total users
                            </div>
                            <div className="text-white text-[60px] leading-[60px] font-extrabold ">
                                {totalUser}
                            </div>
                        </div>
                        <div className="w-full row-span-1 h-full rounded-lg bg-[#009688] dark:bg-[#242526] flex flex-col items-center justify-center py-4 sm:py-0 ">
                            <div className="text-white text-[24px] font-bold ">
                                Total posts
                            </div>
                            <div className="text-white text-[60px] leading-[60px] font-extrabold ">
                                {totalPost}
                            </div>
                        </div>
                    </div>
                    {/* chart */}
                    <div className="col-span-3 row-span-2 ">
                        <Chart convertDate={convertDate} />
                    </div>
                    {/* table of users */}
                    <div className="col-span-2 row-span-2 ">
                        <Users
                            convertDate={convertDate}
                            countUsers={setTotalUser}
                        />
                    </div>
                    {/* table of posts */}
                    <div className="col-span-2 row-span-2 ">
                        <Posts
                            convertDate={convertDate}
                            countPosts={setTotalPost}
                        />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Admin;
