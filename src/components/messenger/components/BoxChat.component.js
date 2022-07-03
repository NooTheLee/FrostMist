import React from "react";
import {PlusSquareOutlined} from "@ant-design/icons";
import {Avatar, Tooltip} from "antd";

const IS_NEW_MESSAGE = "IS_NEW_MESSAGE";
const CLICK_TO_BOX_MESSAGE = "CLICK_TO_BOX_MESSAGE";

const BoxChat = ({setOneState, state, getData, user, dispatch}) => {
    const boxUser = (m) => {
        // when box chat has more 2 user
        if (m.members.length > 2) {
            return (
                <>
                    <Avatar.Group
                        maxCount={3}
                        maxStyle={{
                            color: "white",
                            backgroundColor: "#8EABB4",
                        }}>
                        {m.members.map((receivePeople, k) => {
                            return (
                                <Tooltip
                                    title={
                                        user && receivePeople._id === user._id
                                            ? "You"
                                            : receivePeople.name
                                    }
                                    placement='top'
                                    key={k}>
                                    <img
                                        src={
                                            receivePeople && receivePeople.image
                                                ? receivePeople.image.url
                                                : ""
                                        }
                                        alt='avatar'
                                        className='rounded-full object-contain bg-white border-[1px] border-[#8EABB4] w-10 h-10  '
                                        // @ts-ignore
                                        onClick={() => {
                                            setOneState(
                                                "receiveUser",
                                                receivePeople
                                            );
                                        }}
                                    />
                                </Tooltip>
                            );
                        })}
                    </Avatar.Group>
                    <strong
                        className='flex-grow pl-3'
                        style={{
                            lineHeight: "38px",
                            transform: "translateX(4px)",
                        }}>
                        Group chat
                    </strong>
                </>
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
                            <img
                                src={
                                    receivePeople && receivePeople.image
                                        ? receivePeople.image.url
                                        : ""
                                }
                                alt='avatar'
                                className='w-10 h-10 bg-white border-[1px] border-[#8eabb4] rounded-full '
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
        <div className='col-span-1'>
            <div className='px-4 d-none d-md-block'>
                <div className='flex justify-between'>
                    <h2
                        style={{
                            color: "#658189",
                        }}>
                        Chats
                    </h2>
                    <Tooltip title='New message' placement='top'>
                        <PlusSquareOutlined
                            className='btn-add-new-message'
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
                            style={{
                                fontSize: "25px",
                                lineHeight: "37px",
                            }}
                        />
                    </Tooltip>
                </div>

                <div className='flex items-center transition-50'>
                    {state.isNewMessage ? (
                        <div
                            role=''
                            className='row my-3'
                            style={{
                                backgroundColor: "#8EABB4",
                                width: "100%",
                                padding: "5px 0",
                                color: "white",
                            }}>
                            <div className='flex items-start d-flex'>
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
                        <div className='row my-3'>
                            <div className='input-group'>
                                <input
                                    type='text'
                                    className='form-control'
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
                                        setOneState(
                                            "listResultByPeopleSearch",
                                            []
                                        );
                                        setOneState("isGroup", false);

                                        const arrFilter =
                                            state.sourceMessage.filter((v) => {
                                                const length = v.members.length;
                                                for (
                                                    var i = 0;
                                                    i < length;
                                                    i++
                                                ) {
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
                                <button
                                    className='btn'
                                    onClick={() => {
                                        getData();
                                        setOneState("textSearchPeople", "");
                                    }}
                                    disabled={!state.textSearchPeople}
                                    style={{
                                        backgroundColor: "#8eabb4",
                                        color: "white",
                                    }}>
                                    clear
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            </div>

            <div className='cot-trai'>{colLeft()}</div>

            <hr className='d-block d-lg-none mt-1 mb-0' />
        </div>
    );
};

export default BoxChat;
