import React, { useRef, useEffect, useState, useMemo } from "react";
import { NavLink } from "react-router-dom";

// icon
import { AiFillHome, AiOutlineQrcode } from "react-icons/ai";
import { BiSearchAlt } from "react-icons/bi";
import { SiMessenger } from "react-icons/si";
import { RiSpaceShipFill } from "react-icons/ri";
import { MdAdminPanelSettings } from "react-icons/md";
import { BsFillSunFill, BsMoon } from "react-icons/bs";

// components
import { useAppContext } from "../../context/useContext.js";
import { Dropdown, ItemsList } from "../";

// hocks
import useDebounce from "../../hooks/useDebounce";
import useOnClickOutside from "../../hooks/useOnClickOutside";
import ReactLoading from "react-loading";

const Nav = () => {
    const { dark, setOneState, user, openQrCode, autoFetch } = useAppContext();

    // text state
    const [text, setText] = useState("");
    // when people stop typing(delay 500ms), then will call api
    const textDebounce = useDebounce(text, 500);
    // receive data from useEffect
    const [listSearchResult, setListSearchResult] = useState([]);
    // list empty
    const [isEmpty, setIsEmpty] = useState(false);
    // loading
    const [loading, setLoading] = useState(false);

    const clearListResult = () => {
        setListSearchResult([]);
        setText("");
        setIsEmpty(false);
    };

    const searchRef = useRef();
    useOnClickOutside(searchRef, () => clearListResult());

    useEffect(() => {
        if (textDebounce) {
            searchPeople();
        }
    }, [textDebounce]);

    const searchPeople = async () => {
        setLoading(true);
        if (!text) {
            return;
        }
        try {
            const { data } = await autoFetch.get(`/api/auth/search-user/${text}`);
            if (data.search.length === 0) {
                setIsEmpty(true);
                setListSearchResult([]);
            } else {
                setIsEmpty(false);
                setListSearchResult(data.search);
            }
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const menuListLogged = useMemo(() => {
        const list = [
            {
                text: "#c96c88",
                hover: "#c24269",
                bgAfter: "#c24269",
                link: "/",
                icon: <AiFillHome />,
                className: "dashboard",
            },
            {
                text: "#26A69A",
                hover: "#00897B",
                bgAfter: "#26A69A",
                link: "/messenger",
                icon: <SiMessenger className='text-[22px] ' />,
                className: "messenger",
            },
        ];

        if (user.role === "Admin") {
            list.push({
                text: "#607D8B",
                hover: "#455A64",
                bgAfter: "#607D8B",
                link: "/admin",
                icon: <MdAdminPanelSettings className='text-[28px] ' />,
                className: "admin",
            });
        }
        return list;
    }, [user.role]);

    const navMenuLogged = () => {
        return menuListLogged.map((v) => (
            <div
                className={`w-full ${user.role !== "Admin" ? "px-[10%]" : ""
                    } + ${v.className} `}
                key={"navlink" + v.link}>
                <NavLink
                    to={v.link}
                    className={`relative bg-inherit text-[${v.text}] py-2 md:py-2.5 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-[${v.hover}] hover:bg-[#EBEDF0] rounded-[10px] text-[25px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-[${v.bgAfter}] after:opacity-0 after:bottom-0 -['Admin-page']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] `}
                    role='button'>
                    {v.icon}
                </NavLink>
            </div>
        ));
    };

    return (
        <div className='flex fixed top-0 w-screen bg-white px-1 sm:px-2 md:px-4 z-[100] items-center dark:bg-[#242526] transition-50 dark:text-[#DDDFE3] border-b-[#8a8a8a] py-1 '>
            <div
                className='flex items-center min-w-[33%] '
                style={{ flex: "1 1 auto" }}>
                <NavLink to='/' role='button'>
                    <img
                        src={`/images/${dark ? "logo-dark.png" : "logo.png"}`}
                        alt='logo'
                        className='w-[30px] md:w-[40px] h-auto '
                    />
                </NavLink>

                {/* search */}
                {user && (
                    <div className='flex items-center border border-black/20 dark:bg-[#4E4F50] dark:text-[#b9bbbe] w-[180px] md:w-[220px] h-auto md:h-[40px] rounded-full px-2 ml-2 '>
                        <BiSearchAlt className='text-16px md:text-[20px] mx-1 ' />
                        <div
                            // @ts-ignore
                            ref={searchRef}>
                            <input
                                type='text'
                                className='text-[15px] border-none bg-inherit w-[80%] focus:ring-0 focus:border-0 pl-0 font-medium dark:placeholder:text-[#b1b2b5] dark:text-[#cecfd2] '
                                placeholder='Search user...'
                                value={text}
                                onChange={(e) => setText(e.target.value)}
                            />

                            <div className='scroll-bar absolute max-h-[300px] rounded-[7px] w-[250px] overflow-y-auto overflow-x-hidden top-[60px] translate-x-[-10px] '>
                                {(isEmpty || listSearchResult.length > 0) && (
                                    <div className=' box-shadow'>
                                        {isEmpty && (
                                            <div className='w-full text-center border dark:border-white/20 box-shadow dark:bg-[#2E2F30] rounded-[7px] py-6 '>
                                                No user found!
                                            </div>
                                        )}
                                        {listSearchResult.length > 0 && (
                                            <ItemsList
                                                dataSource={listSearchResult}
                                                searchInNav={true}
                                                user={user}
                                                clearList={clearListResult}
                                            />
                                        )}
                                    </div>
                                )}
                            </div>
                        </div>
                        {loading && (
                            <ReactLoading
                                type='spinningBubbles'
                                width={20}
                                height={20}
                                color='#7d838c'
                            />
                        )}
                    </div>
                )}
            </div>
            <ul
                className='hidden md:flex  items-center justify-between text-white dark:text-[#B8BBBF] text-[25px] min-w-[33%] '
                style={{ flex: "1 1 auto" }}>
                {user ? (
                    navMenuLogged()
                ) : (
                    <>
                        <NavLink
                            to='/home'
                            className={`relative bg-inherit text-[#c96c88] py-2 md:py-2.5 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-[#c24269] hover:bg-[#EBEDF0] rounded-[10px] text-[23px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-[#c24269] after:opacity-0 after:bottom-0 -['Home']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] `}
                            role='button'>
                            <AiFillHome />
                        </NavLink>
                        <NavLink
                            to='/login'
                            className={`relative bg-inherit text-[#26A69A] py-2 md:py-2.5 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-[#00897B] hover:bg-[#EBEDF0] rounded-[10px] text-[23px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-[#26A69A] after:opacity-0 after:bottom-0 -['Home']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] `}
                            role='button'>
                            <RiSpaceShipFill />
                        </NavLink>
                        <NavLink
                            to='/register'
                            className={`relative bg-inherit text-[#607D8B] py-2 md:py-2.5 my-1 mx-1 shrink-1 w-full flex justify-center hover:text-[#455A64] hover:bg-[#EBEDF0] rounded-[10px] text-[23px] transition-20 after:content-[''] after:absolute after:h-[3px] after:w-[70%] after:left-[15%] after:bg-[#607D8B] after:opacity-0 after:bottom-0 -['Home']  before:rounded-lg dark:bg-inherit before:opacity-0 dark:text-[#B8BBBF] dark:hover:bg-[#3A3B3C] dark:hover:text-[#d2d5d7] `}
                            role='button'>
                            <RiSpaceShipFill className='rotate-180' />
                        </NavLink>
                    </>
                )}
            </ul>
            <div
                className='flex items-center justify-end min-w-[33%] gap-x-1 sm:gap-x-2 md:gap-x-3 '
                style={{ flex: "1 1 auto" }}>
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
                    style={{ transition: "1s" }}>
                    <BsMoon className='absolute right-1 top-[5px] transition-50  text-white dark:translate-x-0 translate-x-[-15px] opacity-0 dark:opacity-[1]  ' />
                    <BsFillSunFill
                        className={`text-[20px] font-extrabold transition-50 dark:opacity-0 dark:translate-x-5`}
                    />
                </div>
                <div>
                    <AiOutlineQrcode
                        className='text-2xl cursor-pointer '
                        onClick={() => openQrCode()}
                    />
                </div>
            </div>
        </div>
    );
};

export default Nav;
