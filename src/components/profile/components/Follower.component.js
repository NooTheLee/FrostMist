import React, {useEffect, useState} from "react";
import ReactLoading from "react-loading";
import {toast} from "react-toastify";
import {LoadingCard} from "../../../components";
const FollowingPage = ({
    dark,
    userId,
    autoFetch,
    own,
    navigate,
    setNameAndToken,
    token,
}) => {
    const initList = {
        about: "",
        image: {url: "", public_id: ""},
        name: "",
        role: "",
        username: "",
        __v: 0,
        _id: "",
    };

    const [loading, setLoading] = useState(false);
    const [listFollowing, setListFollowing] = useState([initList]);
    useEffect(() => {
        getUserFollowing();
    }, []);

    const getUserFollowing = async () => {
        setLoading(true);
        try {
            const {data} = await autoFetch.get(
                `/api/auth/user-follower/${userId}`
            );
            setListFollowing(data.follower);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };
    if (loading) {
        return <LoadingCard />;
    }

    return (
        <div
            className={`bg-white w-full dark:bg-[#242526] p-4 rounded-lg ${
                !dark ? "shadow-post" : ""
            } `}>
            <div className='text-2xl font-extrabold dark:text-[#e4e6eb] '>
                Follower
            </div>

            {listFollowing.length > 0 ? (
                <div className='md:grid grid-cols-2 my-4 gap-1 '>
                    {listFollowing.map((p) => (
                        <People
                            autoFetch={autoFetch}
                            navigate={navigate}
                            own={own}
                            p={p}
                            setNameAndToken={setNameAndToken}
                            token={token}
                            userId={userId}
                            key={p._id + "asdqweqw"}
                        />
                    ))}
                </div>
            ) : (
                <div className=' w-full text-center my-5  '>
                    User is not following anyone!
                </div>
            )}
        </div>
    );
};

export default FollowingPage;

export function People({
    p,
    navigate,
    userId,
    own,
    setNameAndToken,
    token,
    autoFetch,
}) {
    const [loading, setLoading] = useState(false);

    const navigateToUserPage = (peopleId) => {
        navigate(`/profile/${peopleId}`);
    };

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

    const btn = (p) => {
        if (loading) {
            return (
                <div className='w-16 sm:w-20 h-8 sm:h-10 flex items-center justify-center pb-2 ml-auto bg-[#3C4D63]/50 transition-20 text-white rounded-md'>
                    <ReactLoading
                        type='spin'
                        width='20%'
                        height='20%'
                        color='white'
                    />
                </div>
            );
        }
        if (userId === own._id) {
            if (own.following.includes(p._id)) {
                return (
                    <button
                        className='px-3 sm:px-4 py-1 md:py-2 ml-auto hover:bg-[#3C4D63] bg-[#3C4D63]/50 transition-20 text-white rounded-md text-[14px] sm:text-base '
                        onClick={() => {
                            if (
                                window.confirm("Do u want unfollow this user?")
                            ) {
                                handleUnFollow(p);
                            }
                        }}>
                        Unfollow
                    </button>
                );
            }
            return (
                <button
                    className=' px-3 sm:px-4 py-1 md:py-2 ml-auto hover:bg-[#3C4D63] bg-[#3C4D63]/50 transition-20 text-white rounded-md text-[14px] sm:text-base  '
                    onClick={() => handleFollower(p)}>
                    Follow
                </button>
            );
        }
        return null;
    };

    return (
        <div
            key={`${p._id}daskfhqw`}
            className='col-span-1 flex items-center gap-x-3 px-1 sm:px-2 md:px-4 py-2 md:py-5 '>
            <img
                src={p.image.url}
                alt=''
                className='w-10 sm:w-16 md:w-20 h-10 sm:h-16 md:h-20 rounded-md object-cover cursor-pointer '
                onClick={() => navigateToUserPage(p._id)}
            />
            <div className=''>
                <div
                    className='text-[14px] sm:text-[17px] font-semibold cursor-pointer '
                    onClick={() => navigateToUserPage(p._id)}>
                    {p.name}
                </div>
                <div className='text-[12px] sm:text-[14px] dark:text-[#b0b3b8]  '>
                    {p.about}
                </div>
            </div>
            {btn(p)}
        </div>
    );
}
