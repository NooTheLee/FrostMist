import React, {useState} from "react";
import {Avatar, Tooltip} from "@mui/material";
// components
import {GroupAvatars} from "../../";
//icon
import {
    AiOutlinePlusSquare,
    AiOutlineCloseSquare,
    AiOutlineCloseCircle,
} from "react-icons/ai";

const IS_NEW_MESSAGE = "IS_NEW_MESSAGE";
const CLICK_TO_BOX_MESSAGE = "CLICK_TO_BOX_MESSAGE";

const BoxChat = ({setOneState, state, getData, user, dispatch}) => {
    const boxUser = (m) => {
        // when box chat has more 2 user
        if (m.members.length > 2) {
            return (
                <div className='flex items-center '>
                    <GroupAvatars
                        dataSource={m.members}
                        user={user}
                        setOneState={setOneState}
                    />
                    <div className='hidden md:flex flex-col pl-3'>
                        <strong className='flex-grow '>Group chat</strong>
                        <div className='last-mess'>{`${
                            user &&
                            m &&
                            m.content &&
                            m.content[m.content.length - 1].sentBy._id ===
                                user._id
                                ? "You: "
                                : ""
                        }  ${
                            m && m.content
                                ? m.content[m.content.length - 1].text
                                : ""
                        }`}</div>
                    </div>
                </div>
            );
        }
        // when box chat has only 2 user
        return (
            <>
                {m.members.map((receivePeople, k) => {
                    if (user && receivePeople._id === user._id) {
                        return;
                    }
                    return (
                        <div
                            key={k}
                            onClick={() => {
                                setOneState("receiveUser", receivePeople);
                            }}
                            className='Ko-nghi-ra-ten flex items-center '>
                            <Avatar
                                src={
                                    receivePeople && receivePeople.image
                                        ? receivePeople.image.url
                                        : ""
                                }
                                alt='avatar'
                                className='w-10 h-10 bg-white border-[1px] border-[#8eabb4] '
                            />
                            <div className='pl-3 w-full pr-[20%] hidden md:flex flex-col '>
                                <strong className='hidden md:flex flex-grow  '>
                                    {receivePeople ? receivePeople.name : ""}
                                </strong>
                                <div className='last-mess text-ellipsis w-full hidden md:flex '>{`${
                                    user &&
                                    m &&
                                    m.content &&
                                    m.content[m.content.length - 1].sentBy
                                        ._id === user._id
                                        ? "You: "
                                        : ""
                                }  ${
                                    m && m.content
                                        ? m.content[m.content.length - 1].text
                                        : ""
                                }`}</div>
                            </div>
                        </div>
                    );
                })}
            </>
        );
    };
    const colLeft = () => {
        if (!state.allMessages) return "Nothing....";
        return state.allMessages.map((m, id) => {
            return (
                <div
                    key={id}
                    className={` col-left ${
                        m._id === state.index ? "active" : ""
                    } md:p-2.5  md:h-auto rounded-l-lg `}>
                    <div
                        role='button'
                        className={`flex `}
                        onClick={() => {
                            let result = [];
                            if (m.members.length > 2) {
                                m.members.forEach((v) => {
                                    if (v._id !== user._id) {
                                        result.push(v);
                                    }
                                });
                            }
                            // @ts-ignore
                            dispatch({
                                type: CLICK_TO_BOX_MESSAGE,
                                payload: {
                                    index: m._id,
                                    isGroup: m.members.length > 2,
                                    listResultByPeopleSearch: result,
                                },
                            });
                        }}>
                        {m && (
                            <div className='w-full h-full items-start flex'>
                                {boxUser(m)}
                            </div>
                        )}
                    </div>
                </div>
            );
        });
    };
    return (
        <div className='overflow-x-hidden'>
            <div className='overflow-x-hidden'>
                <div className='flex justify-between items-center pt-4'>
                    <h2 className='text-[#658189] font-extrabold text-xl sm:text-2xl md:text-3xl  '>
                        Chats
                    </h2>
                    {/* btn add new message */}
                    {state.isNewMessage ? (
                        <Tooltip title='Close' placement='top'>
                            <div>
                                <AiOutlineCloseSquare
                                    className='text-xl sm:text-2xl md:text-3xl opacity-40 cursor-pointer hover:opacity-60 '
                                    role='button'
                                    onClick={() => {
                                        if (state.isNewMessage) {
                                            setOneState("isNewMessage", false);
                                            setOneState(
                                                "allMessages",
                                                state.sourceMessage
                                            );
                                        } else {
                                            // @ts-ignore
                                            dispatch({
                                                type: IS_NEW_MESSAGE,
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </Tooltip>
                    ) : (
                        <Tooltip title='New message' placement='top'>
                            <div>
                                <AiOutlinePlusSquare
                                    className='text-xl sm:text-2xl md:text-3xl opacity-40 cursor-pointer hover:opacity-60 '
                                    role='button'
                                    onClick={() => {
                                        if (state.isNewMessage) {
                                            setOneState("isNewMessage", false);
                                            setOneState(
                                                "allMessages",
                                                state.sourceMessage
                                            );
                                        } else {
                                            // @ts-ignore
                                            dispatch({
                                                type: IS_NEW_MESSAGE,
                                            });
                                        }
                                    }}
                                />
                            </div>
                        </Tooltip>
                    )}
                </div>

                <div className='flex items-center transition-50 my-1 pr-2 '>
                    {state.isNewMessage ? (
                        <div className='my-3 bg-[#8EABB4] dark:bg-[#252F3C] w-full py-2 text-white rounded-lg '>
                            <div className='flex items-start px-1 md:px-3  '>
                                <div className='text-[13px] md:text-base flex flex-wrap '>
                                    New message to:{" "}
                                    {state.listResultByPeopleSearch.length >
                                        0 &&
                                        state.listResultByPeopleSearch.map(
                                            (v, k) => {
                                                if (k === v.length - 1) {
                                                    return <div>{v.name}</div>;
                                                }
                                                return <div>{v.name},</div>;
                                            }
                                        )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex rounded-2xl md:rounded-full w-full border-[1px] border-[#8eabb4] px-1 md:px-2 my-2 '>
                            <input
                                type='text'
                                className='w-full bg-inherit border-0 focus:ring-0 px-1 py-1 md:px-3 md:py-2 text-[13px] md:text-base  '
                                placeholder='Search...'
                                value={state.textSearchPeople}
                                onChange={(e) => {
                                    setOneState(
                                        "textSearchPeople",
                                        e.target.value
                                    );
                                    if (!e.target.value) {
                                        getData();
                                        setOneState("textSearchPeople", "");
                                    }
                                    setOneState("index", "");
                                    setOneState("receiveUser", {});
                                    setOneState("listResultByPeopleSearch", []);
                                    setOneState("isGroup", false);

                                    const arrFilter =
                                        state.sourceMessage.filter((v) => {
                                            const length = v.members.length;
                                            for (var i = 0; i < length; i++) {
                                                if (
                                                    v.members[i]._id ===
                                                    user._id
                                                ) {
                                                    continue;
                                                }
                                                if (
                                                    v.members[i].name
                                                        .toLowerCase()
                                                        .includes(
                                                            e.target.value.toLowerCase()
                                                        )
                                                ) {
                                                    return v;
                                                }
                                            }
                                        });
                                    //console.log(arrFilter);
                                    setOneState("allMessages", arrFilter);
                                }}
                            />
                            {state.textSearchPeople && (
                                <button
                                    className='text-2xl opacity-50 hover:opacity-70 cursor-pointer '
                                    onClick={() => {
                                        getData();
                                        setOneState("textSearchPeople", "");
                                    }}
                                    disabled={!state.textSearchPeople}>
                                    <Tooltip title='Clear' placement='top'>
                                        <div>
                                            <AiOutlineCloseCircle />
                                        </div>
                                    </Tooltip>
                                </button>
                            )}
                        </div>
                    )}
                </div>
            </div>

            <div className='cot-trai max-h-[70vh] md:h-[67vh] overflow-x-hidden '>
                {colLeft()}
            </div>
        </div>
    );
};

export default BoxChat;
