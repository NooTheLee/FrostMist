import {Menu, Transition} from "@headlessui/react";
import React from "react";
import {Fragment} from "react";
import {NavLink} from "react-router-dom";
//icon
import {
    AiOutlineUser,
    AiOutlineSetting,
    AiOutlineMenu,
    AiFillHome,
} from "react-icons/ai";
import {SiMessenger} from "react-icons/si";
import {MdAdminPanelSettings} from "react-icons/md";
import {LogoutIcon} from "@heroicons/react/outline";
// components
import {useAppContext} from "../../context/useContext";

export default function Dropdown() {
    const {logOut, dark, user} = useAppContext();

    let drop;
    let dropForMdScreen;
    dropForMdScreen = [
        {
            text: "Home",
            bgColor: "#c96c88",
            icon: <AiFillHome className='w-5 h-5 mr-2' aria-hidden='true' />,
            href: `/`,
        },
        {
            text: "Messenger",
            bgColor: "#26A69A",
            icon: <SiMessenger className='w-5 h-5 mr-2' aria-hidden='true' />,
            href: "/messenger",
        },
    ];

    if (user) {
        if (user.role === "Admin") {
            dropForMdScreen.push({
                text: "Admin-page",
                bgColor: "#607D8B",
                icon: (
                    <MdAdminPanelSettings
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                    />
                ),
                href: "/admin",
            });
        }
        drop = [
            {
                text: "Profile",
                bgColor: "#FF5722",
                icon: (
                    <AiOutlineUser
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                    />
                ),
                href: `/profile/${user._id}`,
            },
            {
                text: "Update profile",
                bgColor: "#795548",
                icon: (
                    <AiOutlineSetting
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                    />
                ),
                href: "/update-profile",
            },
            {
                text: "Log out",
                bgColor: "#546E7A",
                icon: (
                    <LogoutIcon className='w-5 h-5 mr-2' aria-hidden='true' />
                ),
                href: "/login",
            },
        ];
    } else {
        drop = [
            {
                text: "Home",
                bgColor: "#FF5722",
                icon: (
                    <AiOutlineUser
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                    />
                ),
                href: "/home",
            },
            {
                text: "Login",
                bgColor: "#795548",
                icon: (
                    <AiOutlineSetting
                        className='w-5 h-5 mr-2'
                        aria-hidden='true'
                    />
                ),
                href: "/login",
            },
            {
                text: "Register",
                bgColor: "#546E7A",
                icon: (
                    <LogoutIcon className='w-5 h-5 mr-2' aria-hidden='true' />
                ),
                href: "/register",
            },
        ];
    }
    return (
        <Menu
            as='div'
            className={`w-10 h-10 relative flex items-center ${
                user ? "" : "md:hidden"
            } `}>
            <Menu.Button className='flex items-center justify-center w-full h-full rounded-full md:hover:bg-[#3E3E3E]'>
                {user ? (
                    <img
                        src={user?.image?.url}
                        alt='avatar'
                        className='rounded-full w-full h-full object-cover bg-[#3F51B5] pl-[3px] pt- p-[2px] dark:bg-slate-300 shrink-0 '
                    />
                ) : (
                    <AiOutlineMenu className='text-20px ' />
                )}
            </Menu.Button>
            <Transition
                as={Fragment}
                enter='transition ease-out duration-100'
                enterFrom='transform opacity-0 scale-95'
                enterTo='transform opacity-100 scale-100'
                leave='transition ease-in duration-75'
                leaveFrom='transform opacity-100 scale-100'
                leaveTo='transform opacity-0 scale-95'>
                <Menu.Items className='absolute right-0 w-40 mt-48 origin-top-right bg-white/0 dark:bg-[#1A1A1A]/0 divide-y divide-gray-100 rounded-md dark:ring-0 dark:ring-black ring-opacity-5 focus:outline-none'>
                    <div
                        className={`${
                            user ? "translate-y-[70px]" : "translate-y-0"
                        } ${
                            user.role === "Admin" && "translate-y-[85px]"
                        } md:translate-y-0 `}>
                        {user &&
                            dropForMdScreen.map((v, k) => (
                                <div
                                    className={`md:hidden px-1 py-1 dark:bg-[#3A3A3A] `}
                                    key={k + "navigation2"}
                                    style={{
                                        backgroundColor: dark ? "" : v.bgColor,
                                    }}>
                                    <Menu.Item>
                                        {({active}) => (
                                            <NavLink
                                                to={v.href}
                                                className={`${
                                                    active && "bg-white/10"
                                                } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide text-white  `}
                                                onClick={() => {
                                                    if (v.text === "Log out") {
                                                        if (
                                                            window.confirm(
                                                                "Confirm logout?"
                                                            )
                                                        ) {
                                                            logOut();
                                                        }
                                                    }
                                                }}>
                                                {v.icon}
                                                {v.text}
                                            </NavLink>
                                        )}
                                    </Menu.Item>
                                </div>
                            ))}
                        {drop.map((v, k) => (
                            <div
                                className={`px-1 py-1 dark:bg-[#3A3A3A] `}
                                key={k + "navigation"}
                                style={{
                                    backgroundColor: dark ? "" : v.bgColor,
                                }}>
                                <Menu.Item>
                                    {({active}) => (
                                        <NavLink
                                            to={v.href}
                                            className={`${
                                                active && "bg-white/10"
                                            } group flex rounded-md items-center w-full px-2 py-2 text-sm font-semibold tracking-wide text-white  `}
                                            onClick={() => {
                                                if (v.text === "Log out") {
                                                    if (
                                                        window.confirm(
                                                            "Confirm logout?"
                                                        )
                                                    ) {
                                                        logOut();
                                                    }
                                                }
                                            }}>
                                            {v.icon}
                                            {v.text}
                                        </NavLink>
                                    )}
                                </Menu.Item>
                            </div>
                        ))}
                    </div>
                </Menu.Items>
            </Transition>
        </Menu>
    );
}
