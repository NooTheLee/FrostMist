import React, {useState} from "react";
import {toast} from "react-toastify";
import ReactLoading from "react-loading";

// icon
import {FiEdit2} from "react-icons/fi";
import {GoPrimitiveDot} from "react-icons/go";
import {TiTick} from "react-icons/ti";

const Header = ({
    user,
    own,
    navigate,
    setMenu,
    menu,
    autoFetch,
    setNameAndToken,
    token,
}) => {
    const [loading, setLoading] = useState(false);

    const list = ["Posts", "Following", "Follower"];

    const handleFollower = async (user) => {
        setLoading(true);
        try {
            const {data} = await autoFetch.put(`/api/auth/user-follow`, {
                userId: user._id,
            });
            setNameAndToken(data.user, token);
            toast(`Follow ${user.name} success`);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };
    const handleUnFollow = async (user) => {
        setLoading(true);
        try {
            const {data} = await autoFetch.put(`/api/auth/user-unfollow`, {
                userId: user._id,
            });
            localStorage.setItem("user", JSON.stringify(data.user));
            setNameAndToken(data.user, token);
            toast.error(`U have unfollowed ${user.name}!`);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const btn = () => {
        if (loading) {
            return (
                <div className='flex gap-x-1 items-center justify-center font-semibold w-20 h-10 bg-[#D8DADF]/50 dark:bg-[#4E4F50]/50 rounded-md pb-2 '>
                    <ReactLoading
                        type='spin'
                        width='20%'
                        height='20%'
                        color='white'
                    />
                </div>
            );
        }
        if (user._id === own._id)
            return (
                <button
                    className='flex gap-x-1 items-center font-semibold px-3 py-2 bg-[#D8DADF]/50 hover:bg-[#D8DADF] dark:bg-[#4E4F50]/50 dark:hover:bg-[#4E4F50] transition-20 rounded-md '
                    onClick={() => {
                        navigate(`/update-profile`);
                    }}>
                    <FiEdit2 className=' ' />
                    Edit profile
                </button>
            );
        if (own.following.includes(user._id)) {
            return (
                <button
                    className='flex gap-x-1 items-center font-semibold px-3 py-2 bg-[#D8DADF]/50 hover:bg-[#D8DADF] dark:bg-[#4E4F50]/50 dark:hover:bg-[#4E4F50] transition-20 rounded-md '
                    onClick={() => {
                        if (window.confirm("Do u want unfollow this user?")) {
                            handleUnFollow(user);
                        }
                    }}>
                    Unfollow
                </button>
            );
        }
        return (
            <button
                className='flex gap-x-1 items-center font-semibold px-3 py-2 bg-[#D8DADF]/50 hover:bg-[#D8DADF] dark:bg-[#4E4F50]/50 dark:hover:bg-[#4E4F50] transition-20 rounded-md '
                onClick={() => handleFollower(user)}>
                Follow
            </button>
        );
    };

    return (
        <div className='pt-[50px] md:pt-[75px] md:px-[15%] w-full dark:bg-[#242426] bg-white overflow-x-hidden '>
            {/* background image */}
            <img
                src='https://res.cloudinary.com/dcwekkkez/image/upload/v1656421547/bavmjvxcucadotx45jtk.jpg'
                alt='bg'
                className='w-full h-[30vh] sm:h-[40vh] md:h-[54vh] object-cover rounded-b-lg '
            />
            <div className='flex flex-col sm:flex-row mx-10 sm:items-start gap-x-4 border-b-[1px] dark:border-b-white/10 border-b-black/10 items-center '>
                {/* avatar */}
                <img
                    src={user.image.url}
                    alt='avatar'
                    className='w-[170px] h-[170px] rounded-full object-cover translate-y-[-32px] shrink-0  dark:border-white border-4 border-black/50 '
                />
                <div className='flex flex-col sm:flex-row w-full justify-between items-center sm:items-end pt-4 translate-y-[-32px] sm:translate-y-[0] '>
                    <div>
                        <div className='flex justify-center'>
                            <div className='text-[32px] font-bold md:flex items-center gap-x-1 '>
                                <div className='text-center flex items-center justify-center '>
                                    {user.name}
                                    {user.role === "Admin" && (
                                        <TiTick className='text-[20px] text-white rounded-full bg-sky-500 ' />
                                    )}
                                </div>

                                <div className='ml-1.5 font-normal text-xl md:text-[28px] flex-shrink-0 '>
                                    ({user.username})
                                </div>
                            </div>
                        </div>
                        <div className='dark:text-[#b0b3b8] font-semibold text-[17px] flex gap-x-1.5 items-center text-[#65676b] justify-center sm:justify-start'>
                            <span className='cursor-pointer flex-shrink-0 '>
                                {user.following.length} following
                            </span>
                            <GoPrimitiveDot />
                            <span className='cursor-pointer flex-shrink-0 '>
                                {user.follower.length} follower
                            </span>
                        </div>
                    </div>
                    <div className='flex mt-4 sm:mt-0 flex-shrink-0 '>
                        {btn()}
                    </div>
                </div>
            </div>
            <div className='flex mx-0 sm:mx-10 '>
                <ul className='flex items-center justify-between w-full px-16 py-1 gap-x-10 '>
                    {list.map((v) => (
                        <li
                            key={v + "button"}
                            className={`li-profile ${menu === v && "active"} `}
                            onClick={() => {
                                setMenu(v);
                            }}>
                            {v}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default Header;
