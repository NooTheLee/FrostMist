import React, {useEffect, useState} from "react";
import {TiTick} from "react-icons/ti";
import {toast} from "react-toastify";
import {LoadingSuggestion} from "../..";

const Right = ({
    navigate,
    user,
    autoFetch,
    setNameAndToken,
    getAllPosts,
    token,
    dark,
    error,
}) => {
    const [pLoading, setPLoading] = useState(false);
    const [listPeople, setListPeople] = useState([]);
    useEffect(() => {
        if (token) {
            getListPeople();
        }
    }, [token]);
    const getListPeople = async () => {
        setPLoading(true);
        try {
            const {data} = await autoFetch.get(`/api/auth/find-people`);
            setListPeople(data.people);
        } catch (error) {
            console.log(error);
        }
        setPLoading(false);
    };

    const handleFollower = async (user) => {
        try {
            const {data} = await autoFetch.put(`/api/auth/user-follow`, {
                userId: user._id,
            });
            setNameAndToken(data.user, token);
            // @ts-ignore
            let filtered = listPeople.filter((p) => p._id !== user._id);
            // @ts-ignore
            setListPeople(filtered);
            getAllPosts();
            toast(`Follow ${user.name} success`);
        } catch (error) {
            console.log(error);
        }
    };

    const content = () => {
        if (error) {
            return (
                <div className='w-full text-center text-xl font-semibold '>
                    <div>No suggestion found!</div>
                </div>
            );
        }
        if (pLoading) {
            return <LoadingSuggestion />;
        }

        if (listPeople.length) {
            return (
                <>
                    <div className='flex items-center justify-between text-[#8e8e8e] dark:text-[] font-semibold mb-2 '>
                        Suggestion to you
                        <button className='text-[#262626] dark:text-[#bbbbbb] text-xs font-semibold '>
                            See all
                        </button>
                    </div>
                    {listPeople.map((p) => {
                        // @ts-ignore
                        if (p._id === user._id) {
                            // @ts-ignore
                            return <div key={p._id}></div>;
                        }
                        return (
                            <div
                                className='flex items-center  py-1.5 '
                                key={
                                    // @ts-ignore
                                    p._id
                                }>
                                <div
                                    className='flex items-center gap-x-1.5 '
                                    role='button'
                                    onClick={() => {
                                        // @ts-ignore
                                        navigate(`profile/${p._id}`);
                                    }}>
                                    <img
                                        // @ts-ignore
                                        src={p.image.url}
                                        alt='avatar'
                                        className='w-9 h-9 object-cover rounded-full  '
                                    />
                                    <div>
                                        <div className='font-semibold text-sm flex items-center gap-x-0.5 '>
                                            <span>
                                                {
                                                    // @ts-ignore
                                                    p.name
                                                }
                                            </span>
                                            {
                                                // @ts-ignore
                                                p.role === "Admin" && (
                                                    <TiTick className='text-[17px] text-white rounded-full bg-sky-500 ' />
                                                )
                                            }
                                        </div>
                                        <div className='text-[12px] text-[#8e8e8e] '>
                                            {
                                                // @ts-ignore
                                                p.username
                                            }
                                        </div>
                                    </div>
                                </div>

                                <button
                                    className='text-sky-600 ml-auto text-[13px] font-semibold '
                                    onClick={() => handleFollower(p)}>
                                    Follow
                                </button>
                            </div>
                        );
                    })}
                </>
            );
        }
        return <></>;
    };
    return (
        <div
            className={`bg-white ${
                !dark && "shadow-post"
            } dark:bg-[#242526] rounded-lg py-4 px-5 md:fixed w-full md:w-[24%] mr-12 mb-4 md:mb-0 `}>
            {content()}
        </div>
    );
};

export default Right;
