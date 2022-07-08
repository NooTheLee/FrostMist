import React, {useEffect, useState} from "react";

// icon
import {toast} from "react-toastify";

// components
import {LoadingPost, Modal, Post, LoadingForm, FormCreatePost} from "../../";

const Right = ({
    autoFetch,
    posts,
    own,
    dark,
    user,
    setOneState,
    loading,
    setPosts,
    getDeletePostId,
}) => {
    const [text, setText] = useState("");
    const [attachment, setAttachment] = useState("");
    const [openModal, setOpenModal] = useState(false);

    useEffect(() => {
        setOneState("openModal", openModal);
    }, [openModal]);

    const createNewPost = async (formData) => {
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
            //console.log(data.post);
            setPosts([data.post, ...posts]);
        } catch (error) {
            console.log(error);
        }
    };

    const PostInRight = () => {
        if (loading) {
            return <LoadingPost />;
        }
        if (posts.length) {
            return posts.map((p) => (
                <Post
                    key={p._id}
                    currentPost={p}
                    userId={own._id}
                    user_img={own.image.url}
                    getDeletePostId={getDeletePostId}
                    className={!dark ? "shadow-post" : ""}
                />
            ));
        }
        return (
            <div className='text-center w-full text-4xl dark:bg-[#242526] py-5 rounded-lg '>
                No post found
            </div>
        );
    };

    const form = () => {
        if (loading) {
            return <LoadingForm />;
        }
        return (
            <FormCreatePost
                setAttachment={setAttachment}
                setOpenModal={setOpenModal}
                text={text}
                user={user}
            />
        );
    };

    return (
        <div>
            {user._id === own._id && form()}
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
            {PostInRight()}
        </div>
    );
};

export default Right;
