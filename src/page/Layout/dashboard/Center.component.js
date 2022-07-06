import React, {useEffect, useState} from "react";
import {FaVideo} from "react-icons/fa";
import {MdPhoto} from "react-icons/md";
import {toast} from "react-toastify";
import {Modal, Post, LoadingPost, LoadingForm} from "../../../components";
import InfiniteScroll from "react-infinite-scroll-component";

const Center = ({
    posts,
    loading,
    token,
    autoFetch,
    setOneState,
    dark,
    user,
    getAllPosts,
    setPosts,
    getNewPosts,
    error,
}) => {
    const [attachment, setAttachment] = useState("");
    const [text, setText] = useState("");
    const [openModal, setOpenModal] = useState(false);
    const [loadingCreateNewPost, setLoadingCreateNewPost] = useState(false);

    // Modal
    useEffect(() => {
        setOneState("openModal", openModal);
    }, [openModal]);

    // get posts
    useEffect(() => {
        if (token) {
            getAllPosts();
        }
    }, [token]);

    const createNewPost = async (formData) => {
        setLoadingCreateNewPost(true);
        if (!text) {
            toast.error("You must type something...");
            return;
        }
        try {
            let image = null;
            if (formData) {
                const {data} = await autoFetch.post(
                    `/api/post/upload-image`,
                    formData
                );
                image = {url: data.url, public_id: data.public_id};
            }

            const {data} = await autoFetch.post(`api/post/create-post`, {
                content: text,
                image,
            });
            setPosts([data.post, ...posts]);
        } catch (error) {
            console.log(error);
        }
        setLoadingCreateNewPost(false);
    };

    const content = () => {
        if (loading) {
            return (
                <div>
                    <LoadingPost />
                </div>
            );
        }
        if (error) {
            return (
                <div
                    className={`bg-white ${
                        !dark && "shadow-post"
                    } dark:bg-[#242526] rounded-lg w-full text-center text-xl font-bold py-10 `}>
                    <div>No post found... Try again!</div>
                </div>
            );
        }
        if (posts.length === 0) {
            return (
                <div className='w-full text-center text-xl font-semibold pt-[20vh] flex-col '>
                    <div>
                        You don't post anything and don't follow anyone.
                        <br />
                        Let's do something! :3
                    </div>
                </div>
            );
        }
        return (
            <InfiniteScroll
                dataLength={posts.length}
                next={getNewPosts}
                hasMore={true}
                loader={<LoadingPost />}>
                {posts.map((post) => (
                    <Post
                        key={post._id}
                        currentPost={post}
                        user_img={user.image.url}
                        userId={user._id}
                        className={!dark ? "shadow-post" : ""}
                    />
                ))}
            </InfiniteScroll>
        );
    };

    const form = () => {
        if (loading) return <LoadingForm />;
        return (
            <div
                className={`dark:bg-[#242526] bg-white mb-5 pt-3 rounded-lg px-2 md:px-4 ${
                    !dark ? "shadow-post" : ""
                } `}>
                <div className='flex items-center gap-x-2 '>
                    <img
                        src={user.image.url}
                        alt='userImage'
                        className='w-10 h-10 rounded-full object-cover shrink-0 '
                    />
                    <div
                        className=' dark:bg-[#4E4F50]/70 dark:hover:bg-[#4E4F50] rounded-full px-4 py-[9px] w-[90%] flex justify-start dark:text-[#b0b3b8] font-medium transition-20 h-10 cursor-pointer text-[#65676b] bg-[#E4E6E9]/60 hover:bg-[#E4E6E9]  '
                        onClick={() => {
                            setOpenModal(true);
                        }}>
                        <div className=' mr-2 text-overflow-ellipsis  overflow-hidden '>
                            {text || `What's on your mind, ${user.name}?`}
                        </div>
                    </div>
                </div>

                <div
                    className={` mt-3 flex items-center justify-between gap-x-2 border-t dark:border-t-[#3a3a3a] border-t-[#bbb9b9] py-1 text-[15px]  `}>
                    <button
                        className='flex items-center justify-center w-full gap-x-2 dark:text-[#b0b3b8] text-[#65676b] hover:bg-[#F2F2F2] font-semibold py-2 transition-20 dark:hover:bg-[#4E4F50] rounded-lg '
                        onClick={() => {
                            toast("This function is updating...");
                            // setOpenModal(true);
                            // setAttachment("video");
                        }}>
                        <FaVideo className='text-[#f3425f] text-[22px]' /> Video
                    </button>

                    <button
                        className='flex items-center justify-center w-full gap-x-2 dark:text-[#b0b3b8] text-[#65676b] hover:bg-[#F2F2F2] font-semibold py-2 transition-20 dark:hover:bg-[#4E4F50] rounded-lg'
                        onClick={() => {
                            setOpenModal(true);
                            setAttachment("image");
                        }}>
                        <MdPhoto className='text-[#45bd62] text-[22px] ' />{" "}
                        Photo
                    </button>
                </div>
            </div>
        );
    };

    return (
        <div className=''>
            {form()}

            {openModal && (
                <Modal
                    setOpenModal={setOpenModal}
                    text={text}
                    setText={setText}
                    attachment={attachment}
                    setAttachment={setAttachment}
                    createNewPost={createNewPost}
                />
            )}
            {loadingCreateNewPost && <LoadingPost className='mb-4' />}
            {content()}
        </div>
    );
};

export default Center;
