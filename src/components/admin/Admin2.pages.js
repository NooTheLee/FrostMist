import React from "react";
import Users from "./components/Users.components";
import Posts from "./components/Posts.components";

import {ThemeProvider, createTheme} from "@mui/material/styles";
import {useAppContext} from "../../context/useContext";

const Admin = () => {
    const {dark} = useAppContext();

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

    return (
        <ThemeProvider theme={darkTheme}>
            <div className='w-screen h-screen pt-[65px] overflow-hidden '>
                <div className='w-full h-full grid grid-rows-2 grid-cols-4 '>
                    <div className='col-span-1 col-row-1 '>Statistical</div>
                    <div className='col-span-3 col-row-1 '>chart</div>
                    <div className='col-span-2 col-row-1 '>
                        <Users />
                    </div>
                    <div className='col-span-2 col-row-1 '>
                        <Posts />
                    </div>
                </div>
            </div>
        </ThemeProvider>
    );
};

export default Admin;
