import React from "react";
import {Tooltip, Avatar} from "@mui/material";
import moment from "moment";
// components
import {ItemsList} from "../../";
// icon
import {AiOutlineCloseCircle} from "react-icons/ai";
import {TiTick} from "react-icons/ti";

const MainChat = ({
    state,
    setOneState,
    searchPeopleToNewMessage,
    user,
    messagesEndRef,
    dispatch,
}) => {
    const messBox = () => {
        const currentMessenger = state.allMessages.find(
            (m) => m._id === state.index
        );

        if (currentMessenger && currentMessenger.content && user) {
            // @ts-ignore
            return currentMessenger.content.map((c) => (
                <div
                    className={`chat-message chat-message-${
                        c.sentBy._id === user._id ? "right" : "left"
                    } flex items-center `}
                    key={c._id}>
                    {c.sentBy._id === user._id ? (
                        <></>
                    ) : (
                        <div className='image flex'>
                            <Avatar
                                src={
                                    c && c.sentBy && c.sentBy.image
                                        ? c.sentBy.image.url
                                        : ""
                                }
                                className='mr-1 border-[1px] border-[#8EABB4] rounded-full w-8 h-8  '
                                alt='AVATAR'
                            />
                            {currentMessenger.members.length > 2 && (
                                <span className='sentBy-name'>
                                    {c.sentBy.name}
                                </span>
                            )}
                        </div>
                    )}

                    <span
                        className={`chat-element flex-shrink-0 bg-[#8eabb4] rounded-xl dark:bg-[#3E4042] py-2 px-2 ml-3  `}>
                        {c.text}
                    </span>
                    <div className='text-[#727272] flex-shrink-0 w-auto text-[13px] mx-1 '>
                        {moment(c.created).fromNow()}
                    </div>
                </div>
            ));
        }
        return <></>;
    };

    if (state.isNewMessage) {
        return (
            <>
                <div className='py-2 px-4 border-bottom d-none d-lg-block'>
                    <div className='flex create-new-message py-1 items-center gap-x-1 '>
                        <div className='to'>To:</div>
                        <div className='flex gap-x-0.5'>
                            {state.listResultByPeopleSearch.length > 0 &&
                                state.listResultByPeopleSearch.map((l, k) => (
                                    <span
                                        key={k}
                                        role='button'
                                        className='flex items-center py-0.5 px-3 gap-x-0.5 text-white rounded-full bg-[#8EABB4] '>
                                        {l ? l.name : "nothing"}
                                        {l.role === "Admin" && (
                                            <TiTick className='text-[13px] text-white rounded-full bg-sky-500 ' />
                                        )}
                                        <AiOutlineCloseCircle
                                            className='remove-result-people'
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
                        <div className='ip'>
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
                                className='rounded-full border-[#8EABB4] focus:ring-0 pl-3 '
                                placeholder='Search user...'
                                style={{}}
                            />
                            <div className='list-people-search-new-message mt-2'>
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
                <div className='position-relative'>
                    <div className='chat-messages p-4'></div>
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
            <div className='py-2 px-4 border-bottom d-none d-lg-block'>
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
                                                    className='w-10 h-10 bg-white border-[1px] border-[#8eabb4] '
                                                />
                                            </Tooltip>
                                        )
                                    )}
                            </div>
                        ) : (
                            <div style={{height: "40px"}}>
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
                                            className='rounded-full mr-1 w-10 h-10 '
                                            alt='avatar'
                                        />
                                    )}
                            </div>
                        )}
                    </div>
                    {/* list name */}
                    <div className='grow pl-3'>
                        {state.isGroup &&
                        state.listResultByPeopleSearch.length ? (
                            <div className='flex'>
                                <strong>You, &nbsp;</strong>
                                {state.listResultByPeopleSearch.map((v, k) => {
                                    if (k > 3) {
                                        return (
                                            <strong key={k}>
                                                &nbsp;
                                                {` and ${
                                                    state
                                                        .listResultByPeopleSearch
                                                        .length - 4
                                                } others people`}
                                            </strong>
                                        );
                                    }
                                    if (k > 3) {
                                        return <div key={k}></div>;
                                    }
                                    return (
                                        <strong key={k}>
                                            {k > 0 ? ", " : " "}
                                            {v ? v.name : ""}
                                        </strong>
                                    );
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
                    className='chat-messages p-4 flex dark:bg-[#242526] '
                    style={{margin: "0 7px"}}>
                    {messBox()}
                    <div ref={messagesEndRef} />
                </div>
            </div>
        </>
    );
};

export default MainChat;
