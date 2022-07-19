import React, {useEffect, useState} from "react";
import moment from "moment";
import {useNavigate} from "react-router-dom";
import ReactLoading from "react-loading";
import {toast} from "react-toastify";
// icon
import {
    AiOutlineHeart,
    AiFillHeart,
    AiOutlineSend,
    AiOutlineCamera,
} from "react-icons/ai";
import {FiMessageSquare} from "react-icons/fi";
import {TiTick} from "react-icons/ti";
import {MdCancel} from "react-icons/md";
// component
import Comment from "./Comment";
import {useAppContext} from "../../context/useContext";
import Modal from "./Modal";
import PostLoading from "../loading/Loading.Post";

const Post = ({
    currentPost,
    user_img,
    userId,
    className = "",
    userRole,
    getDeletePostId = (postId) => {},
}) => {
    const navigate = useNavigate();
    const {autoFetch, setOneState} = useAppContext();
    const [showOption, setShowOption] = useState(false);
    const [showComment, setShowComment] = useState(false);
    const [likeLoading, setLikeLoading] = useState(false);
    const [commentLoading, setCommentLoading] = useState(false);
    const [post, setPost] = useState(currentPost);
    const [textComment, setTextComment] = useState("");
    const [isDelete, setIsDelete] = useState(false);
    const [imageComment, setImageComment] = useState(null);
    const [formData, setFormData] = useState(null);

    // open model for edit post
    const [openModal, setOpenModal] = useState(false);

    //edit post
    const [textEdit, setTextEdit] = useState(currentPost.content);
    const [attachment, setAttachment] = useState(
        currentPost.image ? "photo" : ""
    );
    const [imageEdit, setImageEdit] = useState(currentPost.image);
    const [loadingEdit, setLoadingEdit] = useState(false);

    // open modal
    useEffect(() => {
        setOneState("openModal", openModal);
    }, [openModal]);

    let likeCount = post.likes.length;
    let commentCount = post.comments.length;

    // set image to show in form
    const handleImage = (e) => {
        setImageComment(null);
        const file = e.target.files[0];
        // @ts-ignore
        setImageComment({url: URL.createObjectURL(file)});

        let formData = new FormData();
        formData.append("image", file);

        // @ts-ignore
        setFormData(formData);
    };

    // delete image in form
    const deleteImageComment = () => {
        setImageComment(null);
    };

    // upload image to cloudinary
    const handleUpImageComment = async () => {
        try {
            const {data} = await autoFetch.post(
                `/api/post/upload-image`,
                formData
            );
            return {url: data.url, public_id: data.public_id};
        } catch (error) {
            toast.error("Upload image fail!");
            return null;
        }
    };

    const addComment = async (postId) => {
        if (!textComment) {
            return;
        }
        setCommentLoading(true);
        try {
            let image;
            if (imageComment) {
                image = await handleUpImageComment();
                if (!image) {
                    setCommentLoading(false);
                    setImageComment(null);
                    return;
                }
            }
            const {data} = await autoFetch.put("/api/post/add-comment", {
                postId,
                comment: textComment,
                image,
            });
            setPost({...post, comments: data.post.comments});
            setShowComment(true);
            setTextComment("");
            setImageComment(null);
        } catch (error) {
            console.log(error);
        }
        setCommentLoading(false);
    };

    const unlike = async (postId) => {
        setLikeLoading(true);
        try {
            const {data} = await autoFetch.put("/api/post/unlike-post", {
                postId,
            });
            setPost({...post, likes: data.post.likes});
        } catch (error) {
            console.log(error);
        }
        setLikeLoading(false);
    };

    const like = async (postId) => {
        setLikeLoading(true);
        try {
            const {data} = await autoFetch.put("/api/post/like-post", {postId});
            setPost({...post, likes: data.post.likes});
        } catch (error) {
            console.log(error);
        }
        setLikeLoading(false);
    };

    const deleteComment = async (commentId) => {
        try {
            const {data} = await autoFetch.put("/api/post/remove-comment", {
                postId: post._id,
                commentId,
            });
            setPost({...post, comments: data.post.comments});
            toast("You have deleted comment! ");
        } catch (error) {
            console.log(error);
        }
    };

    const deletePost = async (postId) => {
        try {
            const {data} = await autoFetch.delete(`api/post/${postId}`);
            setIsDelete(true);
            toast(data.msg);
            getDeletePostId(postId);
        } catch (error) {
            console.log(error);
        }
    };

    //update post
    const updatePost = async () => {
        setLoadingEdit(true);
        try {
            let image = imageEdit;
            if (formData) {
                image = await handleUpImageComment();
                if (!image) {
                    toast.error("Upload image fail. Try again!");
                    setLoadingEdit(false);
                    return;
                }
            }
            const {data} = await autoFetch.patch(
                `api/post/${currentPost._id}`,
                {
                    content: textEdit,
                    image,
                }
            );
            setPost(data.post);
            setTextEdit(data.post.content);
            setImageEdit(data.post.image);
            if (data.post.image) {
                setAttachment("photo");
            }
            toast("Update post success!");
        } catch (error) {
            console.log(error);
        }
        setLoadingEdit(false);
        setFormData(null);
    };

    // when post was delete
    if (isDelete) {
        return null;
    }

    // when error data
    if (!post.postedBy) {
        return null;
    }

    if (loadingEdit) {
        return <PostLoading className='mb-4' />;
    }

    return (
        <div
            className={`dark:bg-[#242526] bg-white mb-5 pt-3 pb-2.5 md:pb-3 rounded-lg ${className} `}>
            {/* Model when in mode edit post */}
            {openModal && (
                <Modal
                    setOpenModal={setOpenModal}
                    text={textEdit}
                    setText={setTextEdit}
                    attachment={attachment}
                    setAttachment={setAttachment}
                    isEditPost={true}
                    imageEdit={imageEdit}
                    setFormDataEdit={setFormData}
                    handleEditPost={updatePost}
                    setImageEdit={setImageEdit}
                />
            )}
            {/* header post */}
            <div className='flex items-center pl-2 pr-3 sm:px-3 md:px-4'>
                {/* avatar */}
                <img
                    src={post.postedBy.image.url}
                    alt='avatar'
                    className='w-10 h-10 rounded-full object-cover cursor-pointer '
                    onClick={() => {
                        navigate(`profile/${post.postedBy._id}`);
                    }}
                />
                {/* name and time post */}
                <div className={`ml-2 font-bold `}>
                    <div
                        className='flex items-center gap-x-1 cursor-pointer '
                        onClick={() => {
                            navigate(`profile/${post.postedBy._id}`);
                        }}>
                        {post.postedBy.name}
                        {post.postedBy.role === "Admin" && (
                            <TiTick className='text-[17px] text-white rounded-full bg-sky-500 ' />
                        )}
                    </div>

                    <div className='font-[400] text-[13px] dark:text-[#B0B3B8] flex items-center gap-x-1 '>
                        {moment(post.createdAt).fromNow()}
                    </div>
                </div>
                {/* Edit or delete posts */}
                {(userId === post.postedBy._id || userRole === "Admin") && (
                    <div
                        className='ml-auto text-[25px] transition-50 cursor-pointer font-bold w-[35px] h-[35px] rounded-full hover:bg-[#F2F2F2] dark:hover:bg-[#3A3B3C] flex flex-row items-center justify-center group relative '
                        onClick={() => {
                            setShowOption(!showOption);
                        }}>
                        <div className='translate-y-[-6px] z-[100] '>...</div>
                        <ul
                            className={`text-base absolute top-[110%] text-center ${
                                !showOption ? "hidden" : "flex flex-col"
                            }   `}
                            onMouseLeave={() => {
                                setShowOption(false);
                            }}>
                            <li
                                className='px-3 py-1 bg-[#F0F2F5] border-[#3A3B3C]/40 text-[#333]/60 hover:border-[#3A3B3C]/60 hover:text-[#333]/80 dark:bg-[#3A3B3C] rounded-md border dark:text-[#e4e6eb]/60 transition-50 dark:hover:text-[#e4e6eb] dark:border-[#3A3B3C] dark:hover:border-[#e4e6eb]/60 '
                                onClick={() => {
                                    setOpenModal(true);
                                }}>
                                Edit
                            </li>
                            <li
                                className='mt-1 px-3 py-1 bg-[#F0F2F5] border-[#3A3B3C]/40 text-[#333]/60 hover:border-[#3A3B3C]/60 hover:text-[#333]/80 dark:bg-[#3A3B3C] rounded-md border dark:text-[#e4e6eb]/60 transition-50 dark:hover:text-[#e4e6eb] dark:border-[#3A3B3C] dark:hover:border-[#e4e6eb]/60'
                                onClick={() => {
                                    if (
                                        window.confirm(
                                            "Do u want delete this post?"
                                        )
                                    ) {
                                        deletePost(post._id);
                                    }
                                }}>
                                Delete
                            </li>
                        </ul>
                    </div>
                )}
            </div>

            {/* post's text */}
            <div
                className={`content mt-[11px] px-4  ${
                    post.image || post.content.length > 60
                        ? "text-[17px] "
                        : "text-[22px] "
                } `}
                dangerouslySetInnerHTML={{__html: post.content}}></div>

            {/* when has image */}
            {post.image && (
                <div className='mt-3 flex items-center justify-center px-2 cursor-pointer '>
                    <img
                        src={post.image.url}
                        alt='img_content'
                        className='w-full h-auto max-h-[300px] sm:max-h-[350px] object-contain bg-[#F0F2F5] dark:bg-[#18191A]'
                        onClick={() => {
                            navigate(`/post/information/${post._id}`);
                        }}
                    />
                </div>
            )}

            {/* post's comment and like quantity */}
            {(commentCount > 0 || likeCount > 0) && (
                <div className='px-4 py-[10px] flex gap-x-[6px] items-center text-[15px] '>
                    {/* like quantity */}
                    {likeCount > 0 && (
                        <>
                            {!post.likes.includes(userId) ? (
                                <>
                                    <AiOutlineHeart className='text-[18px] text-[#65676b] dark:text-[#afb0b1]' />
                                    <span className='like-count'>
                                        {`${likeCount} like${
                                            likeCount > 1 ? "s" : ""
                                        }`}
                                    </span>
                                </>
                            ) : (
                                <>
                                    <AiFillHeart className='text-[18px] text-[#c22727] dark:text-[#c22727]' />
                                    <span className='like-count'>
                                        {likeCount > 1
                                            ? `You and ${likeCount - 1} other${
                                                  likeCount > 2 ? "s" : ""
                                              }`
                                            : `You`}
                                    </span>
                                </>
                            )}
                        </>
                    )}
                    {/* comment quantity */}
                    <span className='text-[14px] ml-auto text-[#65676b] dark:text-[#afb0b1] '>
                        {commentCount > 0 &&
                            `${commentCount} ${
                                commentCount > 1 ? "comments" : "comment"
                            }`}
                    </span>
                </div>
            )}

            {/* button like and comment */}
            <div className='mx-[12px] mt-2 py-1 flex items-center justify-between border-y dark:border-y-[#3E4042] border-y-[#CED0D4] px-[6px]  '>
                {post.likes.includes(userId) ? (
                    <button
                        className=' py-[6px] px-2 flex items-center justify-center gap-x-1 w-full rounded-sm hover:bg-[#e0e0e0] text-[#c22727] dark:hover:bg-[#3A3B3C] font-semibold text-[15px] dark:text-[#c22727] transition-50 cursor-pointer  '
                        onClick={() => unlike(post._id)}
                        disabled={likeLoading}>
                        {likeLoading ? (
                            <ReactLoading
                                type='spin'
                                width={20}
                                height={20}
                                color='#c22727'
                            />
                        ) : (
                            <>
                                <AiFillHeart className='text-xl translate-y-[1px] text-[#c22727] ' />
                                Like
                            </>
                        )}
                    </button>
                ) : (
                    <button
                        className=' py-[6px] px-2 flex items-center justify-center gap-x-1 w-full rounded-sm hover:bg-[#e0e0e0] text-[#6A7583] dark:hover:bg-[#3A3B3C] font-semibold text-[15px] dark:text-[#b0b3b8] transition-50 cursor-pointer '
                        onClick={() => like(post._id)}
                        disabled={likeLoading}>
                        {likeLoading ? (
                            <ReactLoading
                                type='spin'
                                width={20}
                                height={20}
                                color='#6A7583'
                            />
                        ) : (
                            <>
                                <AiOutlineHeart className='text-xl translate-y-[1px] ' />
                                Like
                            </>
                        )}
                    </button>
                )}

                <button
                    className='py-[6px] px-2 flex items-center justify-center gap-x-1 w-full rounded-sm hover:bg-[#e0e0e0] text-[#6A7583] dark:hover:bg-[#3A3B3C] font-semibold text-[15px] dark:text-[#b0b3b8] transition-50 cursor-pointer '
                    onClick={() => {
                        setShowComment(!showComment);
                    }}
                    disabled={!commentCount}>
                    <FiMessageSquare className='text-xl translate-y-[2px] ' />
                    Comment
                </button>
            </div>

            {/* comment box */}
            {showComment && (
                <div className='px-4 pt-1 '>
                    {post.comments.map((comment) => (
                        <Comment
                            key={comment._id}
                            currentComment={comment}
                            userId={userId}
                            deleteComment={deleteComment}
                            autoFetch={autoFetch}
                            postId={post._id}
                            navigate={navigate}
                            user_img={user_img}
                        />
                    ))}
                </div>
            )}

            {/* form add comment */}
            <div className='flex gap-x-1.5 px-2 sm:px-3 md:px-4 py-1 items-center '>
                <img
                    src={user_img}
                    alt='user_avatar'
                    className='w-8 sm:w-9 h-8 sm:h-9 object-cover shrink-0 rounded-full '
                />
                <form
                    className='flex px-2 rounded-full bg-[#F0F2F5] w-full mt-1 items-center dark:bg-[#3A3B3C]  '
                    onSubmit={(e) => {
                        e.preventDefault();
                        addComment(post._id);
                    }}>
                    <input
                        type='text'
                        className='px-2 py-1 sm:py-1.5 border-none focus:ring-0 bg-inherit rounded-full w-full font-medium dark:placeholder:text-[#b0b3b8] '
                        placeholder='Write a comment...'
                        value={textComment}
                        disabled={commentLoading}
                        onChange={(e) => {
                            setTextComment(e.target.value);
                        }}
                    />
                    {!commentLoading && (
                        <label>
                            <AiOutlineCamera className='shrink-0 text-[18px] transition-50 mr-2 opacity-60 hover:opacity-100 dark:text-[#b0b3b8] cursor-pointer ' />
                            <input
                                onChange={handleImage}
                                type='file'
                                accept='image/*'
                                name='avatar'
                                hidden
                            />
                        </label>
                    )}
                    <button
                        type='submit'
                        disabled={commentLoading || !textComment}>
                        {commentLoading ? (
                            <ReactLoading
                                type='spin'
                                width={20}
                                height={20}
                                color='#7d838c'
                            />
                        ) : (
                            <AiOutlineSend className='shrink-0 text-xl transition-50 hover:scale-125 dark:text-[#b0b3b8] ' />
                        )}
                    </button>
                </form>
            </div>

            {/* image when comment have image */}
            <div className='transition-50 flex items-start justify-start w-full px-20 group '>
                {imageComment && (
                    <div className='relative '>
                        <img
                            // @ts-ignore
                            src={imageComment.url}
                            alt='image_comment'
                            className='h-20 w-auto object-contain '
                        />
                        {!commentLoading && (
                            <MdCancel
                                className='absolute hidden group-hover:flex top-1 right-1 text-xl transition-50 cursor-pointer '
                                onClick={deleteImageComment}
                            />
                        )}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Post;
