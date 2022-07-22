import React from "react";
import {Tooltip, Avatar} from "@mui/material";
import moment from "moment";
// components
import {ItemsList} from "../../";
// icon
import {AiOutlineCloseCircle} from "react-icons/ai";
import {TiTick} from "react-icons/ti";
import {AiOutlineHeart} from "react-icons/ai";
import {BsFillReplyFill} from "react-icons/bs";

const MainChat = ({
    state,
    setOneState,
    searchPeopleToNewMessage,
    user,
    messagesEndRef,
    dispatch,
    navigateToProfile,
}) => {
    const messBox = () => {
        const currentMessenger = state.allMessages.find(
            (m) => m._id === state.index
        );

        if (currentMessenger && currentMessenger.content && user) {
            // @ts-ignore
            return currentMessenger.content.map((c) => {
                return (
                    <div
                        key={c._id}
                        className={`chat-message max-w-[80%] md:max-w-[50%] chat-message-${
                            c.sentBy._id === user._id ? "right" : "left mb-2"
                        } flex items-center `}>
                        {c.sentBy._id === user._id ? (
                            <></>
                        ) : (
                            <div
                                className='flex image '
                                onClick={() => navigateToProfile(c._id)}>
                                <Avatar
                                    src={
                                        c && c.sentBy && c.sentBy.image
                                            ? c.sentBy.image.url
                                            : ""
                                    }
                                    className='mr-1 border-[1px] border-[#8EABB4] rounded-full w-8 h-8 cursor-pointer '
                                    alt='AVATAR'
                                />
                                {currentMessenger.members.length > 2 && (
                                    <span className='text-[#333]/70 dark:text-white/50 text-[13px] absolute top-[-12px] left-12 '>
                                        {c.sentBy.name}
                                    </span>
                                )}
                            </div>
                        )}
                        <div className='flex items-center group '>
                            <Tooltip
                                title={moment(c.created).fromNow()}
                                placement={
                                    c.sentBy._id === user._id ? "top" : "top"
                                }>
                                <div
                                    className={`order-1 chat-element md:max-w-[70%] break-words  rounded-2xl md:rounded-[25px] ${
                                        c.sentBy._id === user._id
                                            ? "dark:bg-[#006064] bg-[#8eabb4] "
                                            : "dark:bg-[#3E4042] bg-white box-shadow text-black "
                                    }  px-3 py-2 ml-1 dark:text-white`}>
                                    {c.text}
                                    {c.image?.url && (
                                        <img
                                            src={c.image?.url}
                                            alt='attachment'
                                            className='max-h-[300px] w-auto object-contain rounded-md '
                                        />
                                    )}
                                </div>
                            </Tooltip>
                            <div
                                className={`flex items-center absolute gap-x-1 text-xl h-full opacity-50 text-black dark:text-white ${
                                    c.sentBy._id === user._id
                                        ? "left-[-45px] flex-row-reverse  "
                                        : "right-[-45px] "
                                }  `}>
                                <AiOutlineHeart className='hidden cursor-pointer shrink-0 group-hover:flex ' />
                                <BsFillReplyFill className='hidden cursor-pointer shrink-0 group-hover:flex ' />
                            </div>
                        </div>
                    </div>
                );
            });
        }
        return <></>;
    };

    const listPeople = (k, v) => {
        if (k > 3) {
            return ` and ${
                state.listResultByPeopleSearch.length - 4
            } others people`;
        }
        if (k > 3) {
            return "";
        }
        return `${k > 0 ? ", " : " "}
                ${v ? v.name : ""}`;
    };

    if (state.isNewMessage) {
        return (
            <>
                <div className='px-4 py-2 border-bottom d-none d-lg-block'>
                    <div className='flex flex-wrap items-center py-1 create-new-message gap-x-1 '>
                        <div className='flex gap-x-0.5 flex-wrap '>
                            <div className='to '>To:</div>
                            {state.listResultByPeopleSearch.length > 0 &&
                                state.listResultByPeopleSearch.map((l, k) => (
                                    <span
                                        key={k}
                                        role='button'
                                        className='flex items-center py-0.5 px-3 gap-x-0.5 text-white rounded-full bg-[#8EABB4] dark:bg-[#3A3B3C] mt-1 md:mt-0 '>
                                        {l ? l.name : "nothing"}
                                        {l.role === "Admin" && (
                                            <TiTick className='text-[13px] text-white rounded-full bg-sky-500 ' />
                                        )}
                                        <AiOutlineCloseCircle
                                            className='remove-result-people '
                                            onClick={() => {
                                                const newListResult =
                                                    state.listResultByPeopleSearch.filter(
                                                        (n) => n._id !== l._id
                                                    );
                                                setOneState(
                                                    "listResultByPeopleSearch",
                                                    newListResult
                                                );
                                            }}
                                        />
                                    </span>
                                ))}
                        </div>
                        <div className='mt-1 ip md:mt-0 '>
                            <input
                                type='text'
                                value={state.textSearchNewMessage}
                                onChange={(e) => {
                                    setOneState(
                                        "textSearchNewMessage",
                                        e.target.value
                                    );
                                    searchPeopleToNewMessage(e.target.value);
                                }}
                                className='rounded-full border-[#8EABB4] dark:border-0 focus:ring-0 dark:focus:border-0 pl-3 dark:bg-[#3A3B3C] dark:text-[#e4e6eb] dark:placeholder:text-[#e4e6eb] py-1 md:py-1.5 w-[150px] md:w-auto text-[14px] md:text-base mt-0 '
                                placeholder='Search user...'
                                style={{}}
                            />
                            <div className='mt-2 list-people-search-new-message'>
                                {state.listPeopleToNewMessage.length > 0 && (
                                    <ItemsList
                                        dataSource={
                                            state.listPeopleToNewMessage
                                        }
                                        dispatch={dispatch}
                                        state={state}
                                        user={user}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='relative'>
                    <div className='p-4 chat-messages'></div>
                </div>
            </>
        );
    }
    if (!state.allMessages.length) {
        return (
            <div className='text-center' style={{marginTop: "50%"}}>
                U don&rsquo;t have any message. Let&rsquo;s send message to
                someone!
            </div>
        );
    }
    return (
        <>
            <div className='px-4 py-2 border-bottom d-none d-lg-block'>
                <div className='flex items-center py-1'>
                    {/* list avatar */}
                    <div className='relative'>
                        {state.isGroup ? (
                            <div className='flex'>
                                {state.listResultByPeopleSearch.length &&
                                    state.listResultByPeopleSearch.map(
                                        (v, k) => (
                                            <Tooltip
                                                title={v.name}
                                                placement={"top"}
                                                key={k}>
                                                <Avatar
                                                    src={
                                                        v && v.image
                                                            ? v.image.url
                                                            : ""
                                                    }
                                                    alt='avatar'
                                                    className='w-10 h-10 bg-white border-[#8eabb4] cursor-pointer border dark:border-white '
                                                    onClick={() =>
                                                        navigateToProfile(v._id)
                                                    }
                                                />
                                            </Tooltip>
                                        )
                                    )}
                            </div>
                        ) : (
                            <div className='h-10'>
                                {state.receiveUser &&
                                    state.receiveUser.image && (
                                        <Avatar
                                            src={
                                                state.receiveUser &&
                                                state.receiveUser.image
                                                    ? state.receiveUser.image
                                                          .url
                                                    : ""
                                            }
                                            className='w-10 h-10 mr-1 border rounded-full cursor-pointer dark:border-white '
                                            alt='avatar'
                                            onClick={() =>
                                                navigateToProfile(
                                                    state.receiveUser._id
                                                )
                                            }
                                        />
                                    )}
                            </div>
                        )}
                    </div>
                    {/* list name */}
                    <div className='w-full pl-3 grow text-ellipsis'>
                        {state.isGroup &&
                        state.listResultByPeopleSearch.length ? (
                            <div className='flex text-[12px] md:text-base text-ellipsis w-full font-bold '>
                                You,
                                {state.listResultByPeopleSearch.map((v, k) => {
                                    <div key={k + ",asdwqsadas"}>
                                        {listPeople(v, k)}
                                    </div>;
                                })}
                            </div>
                        ) : (
                            <strong>
                                {state.receiveUser
                                    ? state.receiveUser.name
                                    : ""}
                            </strong>
                        )}
                    </div>
                </div>
            </div>
            <div className='relative'>
                <div
                    className='chat-messages p-2 md:p-4 flex dark:bg-[#242526]'
                    style={{margin: "0 7px"}}>
                    {messBox()}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </>
    );
};

export default MainChat;
