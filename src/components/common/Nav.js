import React from "react";
import {NavLink} from "react-router-dom";

// icon
import {AiFillHome} from "react-icons/ai";
import {BiSearchAlt} from "react-icons/bi";
import {SiMessenger} from "react-icons/si";
import {RiSpaceShipFill} from "react-icons/ri";
import {MdAdminPanelSettings} from "react-icons/md";
import {IoLogoGameControllerB} from "react-icons/io";
import {BsFillSunFill, BsMoon} from "react-icons/bs";

// components
import {useAppContext} from "../../context/useContext.js";
import {Dropdown} from "../";

const Nav = () => {
    const {dark, setOneState, user} = useAppContext();

    return (
        <div className='flex fixed top-0 w-screen bg-white/70 px-4 z-[100] items-center dark:bg-[#242526]/70 transition-50 dark:text-[#DDDFE3] border-b-[#8a8a8a] py-1 '>
            <div
                className='flex items-center min-w-[33%] '
                style={{flex: "1 1 auto"}}>
                <img
                    src={`/images/${dark ? "logo-dark.png" : "logo.png"}`}
                    alt='logo'
                    className='w-[30px] md:w-[40px] h-auto '
                />
                {user && (
                    <div className='flex items-center border border-black/20 dark:bg-[#4E4F50] dark:text-[#b9bbbe] w-[180px] md:w-[220px] h-auto md:h-[40px] rounded-full px-2 ml-2 '>
                        <BiSearchAlt className='text-16px md:text-[20px] mx-1 ' />
                        <input
                            type='text'
                            className='text-[15px] border-none bg-inherit w-[80%] focus:ring-0 focus:border-0 pl-0 font-medium dark:placeholder:text-[#b1b2b5] dark:text-[#cecfd2] '
                            placeholder='Search user...'
                        />
                    </div>
                )}
            </div>
            <ul
                className='hidden md:flex  items-center justify-between text-white dark:text-[#B8BBBF] text-[25px] min-w-[33%] '
                style={{flex: "1 1 auto"}}>
                {user ? (
                    <>
                        <NavLink
                            to='/'
                            className="relative bg-inherit text-[#c96c88] py-3 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-[#c24269] hover:bg-[#EBEDF0] rounded-[10px] text-[23px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-[#c24269] after:opacity-0 after:bottom-0 -['Home']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] "
                            role='button'>
                            <AiFillHome />
                        </NavLink>
                        <NavLink
                            to='/messenger'
                            className="relative bg-inherit text-[#26A69A] py-3 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-[#00897B] hover:bg-[#EBEDF0] rounded-[10px] text-[21px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-[#26A69A] after:opacity-0 after:bottom-0 -['Messenger']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] "
                            role='button'>
                            <SiMessenger />
                        </NavLink>
                        <NavLink
                            to='/game'
                            className="relative bg-inherit text-sky-600 py-3 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-sky-700 hover:bg-[#EBEDF0] rounded-[10px] text-[25px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-sky-600 after:opacity-0 after:bottom-0 -['Game']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] "
                            role='button'>
                            <IoLogoGameControllerB />
                        </NavLink>
                        {user.role === "Admin" && (
                            <NavLink
                                to='/admin'
                                className="relative bg-inherit text-[#607D8B] py-3 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-[#455A64] hover:bg-[#EBEDF0] rounded-[10px] text-[25px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-[#607D8B] after:opacity-0 after:bottom-0 -['Admin-page']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] "
                                role='button'>
                                <MdAdminPanelSettings />
                            </NavLink>
                        )}
                    </>
                ) : (
                    <>
                        <NavLink
                            to='/home'
                            className="relative bg-inherit text-[#c96c88] py-3 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-[#c24269] hover:bg-[#EBEDF0] rounded-[10px] text-[23px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-[#c24269] after:opacity-0 after:bottom-0 -['Home']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] "
                            role='button'>
                            <AiFillHome />
                        </NavLink>
                        <NavLink
                            to='/login'
                            className="relative bg-inherit text-[#26A69A] py-3 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-[#00897B] hover:bg-[#EBEDF0] rounded-[10px] text-[25px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-[#26A69A] after:opacity-0 after:bottom-0 -['Login']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] "
                            role='button'>
                            <RiSpaceShipFill />
                        </NavLink>
                        <NavLink
                            to='/register'
                            className="relative bg-inherit text-sky-600 py-3 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-sky-700 hover:bg-[#EBEDF0] rounded-[10px] text-[25px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-sky-600 after:opacity-0 after:bottom-0 -['Register']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] "
                            role='button'>
                            <RiSpaceShipFill className='rotate-180' />
                        </NavLink>
                    </>
                )}
            </ul>
            <div
                className='flex items-center justify-end min-w-[33%] gap-x-3 '
                style={{flex: "1 1 auto"}}>
                <div className='flex items-center'>
                    {user && (
                        <div className='text-sm md:text-md font-semibold border pl-3 md:pr-5 py-[5px] rounded-l-full translate-x-[16px] bg-[#3F51B5] text-white dark:bg-[#3A3A3A] dark:border-white/30 hidden md:flex '>
                            {user.name}
                        </div>
                    )}
                    <Dropdown />
                </div>
                <div
                    className='p-1 w-[50px] h-[30px] rounded-full border-2 border-black/30 dark:bg-[#3A3B3C] bg-[#333]/10 dark:border-[#929292] relative '
                    onClick={() => {
                        setOneState("dark", !dark);
                        localStorage.setItem("dark", String(!dark));
                    }}
                    role='button'
                    style={{transition: "1s"}}>
                    <BsMoon className='absolute right-1 top-[5px] transition-50  text-white dark:translate-x-0 translate-x-[-15px] opacity-0 dark:opacity-[1]  ' />
                    <BsFillSunFill
                        className={`text-[20px] font-extrabold transition-50 dark:opacity-0 dark:translate-x-5`}
                    />
                </div>
            </div>
        </div>
    );
};

export default Nav;
