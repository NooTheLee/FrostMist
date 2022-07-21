import React from "react";
import {useAppContext} from "../../context/useContext";
import {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";

//components
import Header from "./components/Header.Component";
import Left from "./components/Details.component";
import Right from "./components/Posts.component";
import {LoadingProfile} from "../";
import FollowerPage from "./components/Follower.component";
import FollowingPage from "./components/Following.component";

const Profile = () => {
    const navigate = useNavigate();
    const currentUserId = window.location.pathname.replace("/profile/", "");

    const {
        dark,
        autoFetch,
        setOneState,
        user: own,
        setNameAndToken,
        token,
    } = useAppContext();
    const [postLoading, setPostLoading] = useState(false);
    const [posts, setPosts] = useState([]);
    const [images, setImages] = useState([]);
    const [loading, setLoading] = useState(false);
    const [user, setUser] = useState({
        image: {
            url: "",
        },
        name: "",
        username: "",
        about: "",
        _id: currentUserId,
        follower: [],
        following: [],
    });
    const [menu, setMenu] = useState("Posts");

    useEffect(() => {
        getCurrentUser(currentUserId);
        getPostWithUserId(currentUserId);
        setMenu("Posts");
        setImages([]);
    }, [window.location.pathname]);

    const getCurrentUser = async (userId) => {
        setLoading(true);
        try {
            const {data} = await autoFetch.get(`/api/auth/${userId}`);
            setUser(data.user);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const getPostWithUserId = async (userId) => {
        setPostLoading(true);
        try {
            const {data} = await autoFetch.get(
                `/api/post/getPostWithUser/${userId}`
            );
            setPosts(data.posts);
        } catch (error) {
            console.log(error);
        }
        setPostLoading(false);
    };
    useEffect(() => {
        if (posts.length) {
            setImages(
                posts.filter((p) => {
                    // @ts-ignore
                    if (p && p.image) {
                        // @ts-ignore
                        return p.image;
                    }
                })
            );
        }
    }, [posts]);

    const getDeletePostId = (postId) => {
        // @ts-ignore
        const newPosts = posts.filter((v) => v._id !== postId);
        // @ts-ignore
        setPosts(newPosts);
        console.log("delete post: ", postId);
    };

    const main = () => {
        if (menu === "Following") {
            return (
                <FollowingPage
                    dark={dark}
                    userId={currentUserId}
                    autoFetch={autoFetch}
                    own={own}
                    navigate={navigate}
                    setNameAndToken={setNameAndToken}
                    token={token}
                />
            );
        }
        if (menu === "Follower") {
            return (
                <FollowerPage
                    dark={dark}
                    userId={user._id}
                    autoFetch={autoFetch}
                    navigate={navigate}
                    own={own}
                    setNameAndToken={setNameAndToken}
                    token={token}
                />
            );
        }
        return (
            <div className='w-full sm:grid grid-cols-5 gap-x-4 '>
                <div className='col-span-2'>
                    <Left
                        user={user}
                        own={own}
                        images={images}
                        navigate={navigate}
                        autoFetch={autoFetch}
                        dark={dark}
                        profileLoading={loading}
                        postLoading={postLoading}
                    />
                </div>
                <div className='col-span-3 '>
                    <Right
                        autoFetch={autoFetch}
                        dark={dark}
                        own={own}
                        user={user}
                        setOneState={setOneState}
                        loading={postLoading}
                        posts={posts}
                        setPosts={setPosts}
                        getDeletePostId={getDeletePostId}
                    />
                </div>
            </div>
        );
    };

    return (
        <div className='min-h-screen w-[99.5vw] overflow-x-hidden pb-7 '>
            {!loading ? (
                <Header
                    user={user}
                    own={own}
                    navigate={navigate}
                    setMenu={setMenu}
                    menu={menu}
                    autoFetch={autoFetch}
                    setNameAndToken={setNameAndToken}
                    token={token}
                />
            ) : (
                <LoadingProfile />
            )}

            <div className='mx-4 sm:mx-[5%] md:mx-[15%] px-1 sm:px-10 mt-4 '>
                {main()}
            </div>
        </div>
    );
};

export default Profile;
