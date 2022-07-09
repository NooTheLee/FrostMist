import React from "react";
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
                <div className='flex'>
                    <GroupAvatars
                        dataSource={m.members}
                        user={user}
                        setOneState={setOneState}
                    />
                    <strong
                        className='flex-grow pl-3'
                        style={{
                            lineHeight: "38px",
                            transform: "translateX(4px)",
                        }}>
                        Group chat
                    </strong>
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
                            className='Ko-nghi-ra-ten flex'>
                            <Avatar
                                src={
                                    receivePeople && receivePeople.image
                                        ? receivePeople.image.url
                                        : ""
                                }
                                alt='avatar'
                                className='w-10 h-10 bg-white border-[1px] border-[#8eabb4] '
                            />
                            <strong className='flex-grow pl-3 leading-10 '>
                                {receivePeople ? receivePeople.name : ""}
                            </strong>
                        </div>
                    );
                })}
            </>
        );
    };

    const colLeft = () => {
        if (!state.allMessages) return "Nothing....";
        return state.allMessages.map((m, id) => (
            <div
                key={id}
                className={` col-left ${
                    m._id === state.index ? "active" : ""
                }`}>
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

                <div className='last-mess'>{`${
                    user &&
                    m &&
                    m.content &&
                    m.content[m.content.length - 1].sentBy._id === user._id
                        ? "You: "
                        : ""
                }  ${
                    m && m.content ? m.content[m.content.length - 1].text : ""
                }`}</div>
            </div>
        ));
    };
    return (
        <div>
            <div className=''>
                <div className='flex justify-between items-center pt-4'>
                    <h2 className='text-[#658189] font-extrabold text-3xl  '>
                        Chats
                    </h2>
                    {/* btn add new message */}
                    {state.isNewMessage ? (
                        <Tooltip title='Close' placement='top'>
                            <div>
                                <AiOutlineCloseSquare
                                    className='text-3xl opacity-40 cursor-pointer hover:opacity-60 '
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
                                    className='text-3xl opacity-40 cursor-pointer hover:opacity-60 '
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

                <div className='flex items-center transition-50 my-1 pr-2'>
                    {state.isNewMessage ? (
                        <div className='my-3 bg-[#8EABB4] w-full py-2 text-white '>
                            <div className='flex items-start px-2 '>
                                <div>
                                    New message to:{" "}
                                    {state.listResultByPeopleSearch.length >
                                        0 &&
                                        state.listResultByPeopleSearch.map(
                                            (v, k) => {
                                                if (k > 0) {
                                                    return " , " + v.name;
                                                }

                                                return v.name;
                                            }
                                        )}
                                </div>
                            </div>
                        </div>
                    ) : (
                        <div className='flex rounded-full w-full border-[1px] border-[#8eabb4] px-2 my-2 '>
                            <input
                                type='text'
                                className='w-full bg-inherit border-0 focus:ring-0'
                                placeholder='Search user...'
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

            <div className='cot-trai'>{colLeft()}</div>
        </div>
    );
};

export default BoxChat;
