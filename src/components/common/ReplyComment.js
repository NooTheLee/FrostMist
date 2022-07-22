import React, {useState} from "react";
import moment from "moment";
import ReactLoading from "react-loading";
import {AiOutlineCamera, AiOutlineSend} from "react-icons/ai";
import {TiTick} from "react-icons/ti";
import {MdCancel} from "react-icons/md";
import {toast} from "react-toastify";

import {AiFillHeart} from "react-icons/ai";

const ReplyComment = ({
    currentComment,
    userId,
    navigate,
    autoFetch,
    postId,
    commentId,
    handleDeleteReplyComment,
}) => {
    const [showOption, setShowOption] = useState(false);
    const [editComment, setEditComment] = useState(false);
    const [replyComment, setReplyComment] = useState(currentComment);
    const [text, setText] = useState(currentComment.text);
    const [editLoading, setEditLoading] = useState(false);
    const [likeReplyLoading, setLikeReplyLoading] = useState(false);
    const [imageEdit, setImageEdit] = useState(currentComment.image || null);

    const [isDelete, setIsDelete] = useState(false);

    const unlikeReplyComment = async () => {
        setLikeReplyLoading(true);
        try {
            const {data} = await autoFetch.put(
                `/api/post/unlike-reply-comment`,
                {
                    postId,
                    commentId,
                    replyId: currentComment._id,
                }
            );
            setReplyComment({...replyComment, like: data.reply.like});
        } catch (error) {
            console.log(error);
        }
        setLikeReplyLoading(false);
    };

    const likeReplyComment = async () => {
        setLikeReplyLoading(true);
        try {
            const {data} = await autoFetch.put(`/api/post/like-reply-comment`, {
                postId,
                commentId,
                replyId: currentComment._id,
            });
            setReplyComment({...replyComment, like: data.reply.like});
        } catch (error) {
            console.log(error);
        }
        setLikeReplyLoading(false);
    };

    const handleLikeReplyComment = () => {
        if (replyComment.like.includes(userId)) {
            unlikeReplyComment();
        } else {
            likeReplyComment();
        }
    };

    if (isDelete) {
        return <></>;
    }

    // Edit mode
    if (editComment) {
        return (
            <div className='flex gap-x-1.5 py-1 '>
                <img
                    src={replyComment.postedBy.image?.url}
                    alt='user_avatar'
                    className='w-[35px] h-[35px] object-cover shrink-0 rounded-full mt-1  '
                />
                <div className='w-full'>
                    <form
                        className='flex px-2 rounded-full bg-[#F0F2F5] w-full mt-1 items-center dark:bg-[#3A3B3C]  '
                        onSubmit={(e) => {
                            e.preventDefault();
                            if (text) {
                                // handleComment(text);
                            }
                        }}>
                        <input
                            type='text'
                            className='px-2 py-1.5 border-none focus:ring-0 bg-inherit rounded-full w-full font-medium dark:placeholder:text-[#b0b3b8] '
                            placeholder='Write a comment...'
                            value={text}
                            disabled={editLoading}
                            onChange={(e) => {
                                setText(e.target.value);
                            }}
                        />
                        {!editLoading && (
                            <label>
                                <AiOutlineCamera className='shrink-0 text-[18px] transition-50 mr-2 opacity-60 hover:opacity-100 dark:text-[#b0b3b8] cursor-pointer ' />
                                <input
                                    onChange={() => {}}
                                    type='file'
                                    accept='image/*'
                                    name='avatar'
                                    hidden
                                />
                            </label>
                        )}
                        <button
                            type='submit'
                            disabled={
                                editLoading ||
                                !text ||
                                (text === replyComment.text &&
                                    !replyComment.image)
                            }>
                            {editLoading ? (
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
                    {imageEdit && (
                        <div className='relative w-max '>
                            <img
                                src={imageEdit?.url}
                                alt='image_comment'
                                className='object-contain w-auto my-1 ml-3 max-h-52 '
                            />
                            {!editLoading && (
                                <MdCancel
                                    className='absolute text-2xl cursor-pointer top-1 right-1 transition-50 '
                                    onClick={() => {
                                        setImageEdit(null);
                                    }}
                                />
                            )}
                        </div>
                    )}
                    <p className='text-[12px] dark:text-[#b0b3b8] ml-3 '>
                        Press Esc to{" "}
                        <span
                            className='text-[#ab2b3a] cursor-pointer '
                            // onClick={cancelEdit}
                        >
                            cancel
                        </span>
                        .
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className={`flex gap-x-1.5 mt-1.5 group pl-6 `}>
            <div className='absolute w-10 h-10 border-l-[2px] border-b-[2px] border-l-[#F0F2F5] dark:border-l-[#3A3B3C] border-b-[#F0F2F5] dark:border-b-[#3A3B3C] left-5 rounded-bl-[20px] translate-y-[-20px] '></div>

            <img
                src={replyComment.postedBy?.image?.url}
                alt='own_avt_cmt'
                className='z-10 object-cover w-8 h-8 rounded-full cursor-pointer '
                onClick={() => {
                    navigate(`/profile/${replyComment.postedBy._id}`);
                }}
            />

            <div
                className={`box-comment relative w-full ${
                    editLoading && "opacity-50"
                } `}>
                <div className='absolute h-full w-2 border-l-[2px] z-[5] border-l-[#F0F2F5] dark:border-l-[#3A3B3C] left-[-62px] '></div>
                <div className='flex items-center w-full gap-x-1 '>
                    <div className='rounded-xl bg-[#F0F2F5] dark:bg-[#3A3B3C] px-3 py-2 max-w-full relative  '>
                        <div
                            className='font-bold text-[13px] text-[#050505] dark:text-[#e4e6eb] flex items-center gap-x-1 cursor-pointer '
                            onClick={() => {
                                navigate(
                                    `/profile/${replyComment.postedBy._id}`
                                );
                            }}>
                            {replyComment.postedBy.name}
                            {replyComment.postedBy.role === "Admin" && (
                                <TiTick className='text-[13px] text-white rounded-full bg-sky-500 ' />
                            )}
                        </div>
                        <div
                            className={`content text-[15px] text-[#050505] dark:text-[#cecfd1] `}>
                            {text}
                        </div>
                        {imageEdit && (
                            <img
                                src={imageEdit?.url}
                                alt='image_comment'
                                className='max-h-60 w-auto object-contain my-0.5 '
                            />
                        )}

                        {/* edit or delete comment */}
                        {userId === replyComment.postedBy._id && (
                            <div
                                className={`shrink-1 w-10 h-10 hidden group-hover:flex cursor-pointer text-[23px] font-extrabold hover:bg-[#F0F2F5] items-center justify-center rounded-full transition-50 dark:hover:bg-[#3A3B3C] absolute z-[100]  ${
                                    replyComment.like.length >= 1
                                        ? "right-[-55px]"
                                        : "right-[-45px]"
                                } 
                                
                                ${
                                    replyComment.like.length > 1 &&
                                    "right-[-65px]"
                                }
                                top-[50%] translate-y-[-50%] `}
                                onClick={() => {
                                    setShowOption(!showOption);
                                }}>
                                <div className='translate-y-[-6px] '>...</div>
                                <ul
                                    className={`text-base absolute top-[110%] text-center ${
                                        !showOption ? "hidden" : "flex flex-col"
                                    }`}
                                    onMouseLeave={() => {
                                        setShowOption(false);
                                    }}>
                                    <li
                                        className='px-3 py-1 bg-[#F0F2F5] border-[#3A3B3C]/40 text-[#333]/60 hover:border-[#3A3B3C]/60 hover:text-[#333]/80 dark:bg-[#3A3B3C] rounded-md border dark:text-[#e4e6eb]/60 transition-50 dark:hover:text-[#e4e6eb] dark:border-[#3A3B3C] dark:hover:border-[#e4e6eb]/60 '
                                        onClick={() => {
                                            toast(
                                                "This function is uploading..."
                                            );
                                        }}>
                                        Edit
                                    </li>
                                    <li
                                        className='mt-1 px-3 py-1 bg-[#F0F2F5] border-[#3A3B3C]/40 text-[#333]/60 hover:border-[#3A3B3C]/60 hover:text-[#333]/80 dark:bg-[#3A3B3C] rounded-md border dark:text-[#e4e6eb]/60 transition-50 dark:hover:text-[#e4e6eb] dark:border-[#3A3B3C] dark:hover:border-[#e4e6eb]/60 '
                                        onClick={() =>
                                            handleDeleteReplyComment(
                                                replyComment._id
                                            )
                                        }>
                                        Delete
                                    </li>
                                </ul>
                            </div>
                        )}
                        {replyComment.like && replyComment.like.length > 0 && (
                            <div
                                className={`absolute bottom-2 bg-inherit p-1 ${
                                    replyComment.like &&
                                    replyComment.like.length > 1
                                        ? "px-2 right-[-30px]"
                                        : "right-[-20px]"
                                } rounded-full flex items-center gap-x-0.5 border-[1px] border-black/10 dark:border-white/10 text-[13px] `}>
                                <AiFillHeart className='text-[14px] text-[#c22727] dark:text-[#c22727]' />
                                {replyComment.like.length > 1
                                    ? replyComment.like.length
                                    : ""}
                            </div>
                        )}
                    </div>
                </div>
                <div
                    className={`flex font-extrabold text-[13px] pl-2 gap-x-4 text-[#65676B] dark:text-[#b0b3b8] `}>
                    <button
                        className={`cursor-pointer ${
                            replyComment.like.length > 0 &&
                            replyComment.like.includes(userId) &&
                            "text-[#c22727] dark:text-[#c22727]"
                        } `}
                        disabled={likeReplyLoading}
                        onClick={handleLikeReplyComment}>
                        Like
                    </button>
                    <div className='font-normal '>
                        {moment(replyComment.created).fromNow()}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ReplyComment;
