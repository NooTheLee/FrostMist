// @ts-ignore
import React, {useEffect, useRef, useState, useReducer} from "react";

import {toast} from "react-toastify";
import moment from "moment";
import {CloseCircleOutlined} from "@ant-design/icons";
import {List} from "antd";
import io from "socket.io-client";
import useSound from "use-sound";
import {Avatar, Tooltip} from "antd";

import {useAppContext} from "../../context/useContext";
import BoxChat from "./components/BoxChat.component";
import "./messenger.css";

// @ts-ignore
const socket = io(process.env.REACT_APP_SOCKET_IO_SERVER, {
    reconnection: true,
});

const initState = {
    receiveUser: {
        /// receive user current
        name: "",
        _id: "",
        image: {url: ""},
    },
    allMessages: [], // all message
    index: "", /// _id of that message is showing
    text: "", /// text in input send new message
    textSearch: "",
    loading: false, // loading
    isGroup: false, // Is chatting in group?
    isNewMessage: false, // Mode new message
    textSearchNewMessage: "", // Text for search input to add people
    listPeopleToNewMessage: [],
    listResultByPeopleSearch: [],
    sourceMessage: [],
    textSearchPeople: "",
};
const CHANGE_ALL_MESSAGES = "CHANGE_ALL_MESSAGES";
const GET_DATA_SUCCESS = "GET_DATA_SUCCESS";
const CLEAR_IN_NEW_MESSAGE = "CLEAR_IN_NEW_MESSAGE";
const SET_LOADING = "SET_LOADING";
const SET_ONE_STATE = "SET_ONE_STATE";
const HANDLE_SEND_MESSAGE = "HANDLE_SEND_MESSAGE";
const CLICK_TO_BOX_MESSAGE = "CLICK_TO_BOX_MESSAGE";
const SEARCH_USER_TO_NEW_MESSAGE = "SEARCH_USER_TO_NEW_MESSAGE";
const ADD_USER_TO_SEND_NEW_MESSAGE = "ADD_USER_TO_SEND_NEW_MESSAGE";
const IS_NEW_MESSAGE = "IS_NEW_MESSAGE";
const CLEAR_WHEN_DUPLICATE = "CLEAR_WHEN_DUPLICATE";

const reducer = (state, action) => {
    switch (action.type) {
        case CHANGE_ALL_MESSAGES: {
            return {
                ...state,
                allMessages: action.payload.data,
                sourceMessage: action.payload.data,
            };
        }
        case GET_DATA_SUCCESS: {
            return {
                ...state,
                allMessages: action.payload.allMessages,
                sourceMessage: action.payload.allMessages,
                receiveUser: action.payload.receiveUser,
                index: action.payload.index,
                isGroup: action.payload.isGroup,
                listResultByPeopleSearch:
                    action.payload.listResultByPeopleSearch,
            };
        }
        case CLEAR_IN_NEW_MESSAGE: {
            return {
                ...state,
                isNewMessage: false,
                textSearchNewMessage: "",
                listPeopleToNewMessage: [],
                listResultByPeopleSearch: [],
            };
        }
        case SET_LOADING: {
            return {
                ...state,
                loading: action.payload.data,
            };
        }
        case SET_ONE_STATE: {
            return {
                ...state,
                [action.payload.name]: action.payload.value,
            };
        }
        case HANDLE_SEND_MESSAGE: {
            return {
                ...state,
                allMessages: action.payload.allMessages,
                sourceMessage: action.payload.sourceMessage,
                index: action.payload.index,
                text: "",

                isNewMessage: false,
                textSearchNewMessage: "",
                textSearchPeople: "",
            };
        }
        case CLICK_TO_BOX_MESSAGE: {
            return {
                ...state,

                index: action.payload.index,
                isGroup: action.payload.isGroup,
                listResultByPeopleSearch:
                    action.payload.listResultByPeopleSearch,

                isNewMessage: false,
                textSearchNewMessage: "",
                listPeopleToNewMessage: [],
            };
        }
        case SEARCH_USER_TO_NEW_MESSAGE: {
            return {
                ...state,
                listPeopleToNewMessage: action.payload.listPeopleToNewMessage,
            };
        }
        case ADD_USER_TO_SEND_NEW_MESSAGE: {
            return {
                ...state,
                textSearchNewMessage: "",
                listPeopleToNewMessage: [],
                listResultByPeopleSearch:
                    action.payload.listResultByPeopleSearch,
            };
        }
        case IS_NEW_MESSAGE: {
            return {
                ...state,
                allMessages: [],
                isNewMessage: true,
                index: "",
                textSearchPeople: "",
                listResultByPeopleSearch: [],
                isGroup: false,
            };
        }
        case CLEAR_WHEN_DUPLICATE: {
            return {
                ...state,
                listPeopleToNewMessage: [],
                textSearchNewMessage: "",
            };
        }
        default: {
            throw new Error("Invalid action");
        }
    }
};

const Message = () => {
    const path = "sound/message_sound.mp3";
    const [playSound] = useSound(path, {volume: 0.2});

    const {autoFetch, user} = useAppContext(); /// own user

    const [state, dispatch] = useReducer(reducer, initState);

    const setLoading = (value) => {
        // @ts-ignore
        dispatch({
            type: SET_LOADING,
            payload: {
                data: value,
            },
        });
    };
    const setOneState = (name, value) => {
        // @ts-ignore
        dispatch({
            type: SET_ONE_STATE,
            payload: {
                name,
                value,
            },
        });
    };

    const messagesEndRef = useRef(null);
    const emailInputRef = useRef(null);

    useEffect(() => {
        let change = false;
        if (state.allMessages) {
            // socket
            if (user) {
                socket.on("new-message", (newMessage) => {
                    const index = newMessage.members.find(
                        (value) => value._id === user._id
                    );
                    if (!index) {
                        return;
                    }

                    //console.log(newMessage);
                    //console.log(allMessages);
                    let newData = state.allMessages.filter((d) => {
                        if (d._id === newMessage._id) {
                            d.content = newMessage.content;
                            d.updatedAt = newMessage.updatedAt;
                            change = true;
                        }
                        return d;
                    });

                    // @ts-ignore
                    dispatch({
                        type: CHANGE_ALL_MESSAGES,
                        payload: {
                            data: change
                                ? newData
                                : [newMessage, ...state.allMessages],
                        },
                    });
                    playSound();
                    change = false;
                });
            }
            if (!state.text && !state.textSearchPeople) {
                // @ts-ignore
                emailInputRef.current?.focus();
                // @ts-ignore
                messagesEndRef.current?.scrollIntoView({behavior: "smooth"});
            }
        }
        return () => {
            socket.off("new-message");
        };
    }, [state]);

    const getData = async () => {
        try {
            const {data} = await autoFetch.get("api/message/get-all-messages");
            if (user) {
                var us = data.messages[0].members.filter(
                    (m) => m._id !== user._id
                );
            }
            var newListMembers = [];
            if (data.messages[0].members.length > 2) {
                newListMembers = data.messages[0].members.filter(
                    (v) => v._id !== user._id
                );
            }
            // @ts-ignore
            dispatch({
                type: GET_DATA_SUCCESS,
                payload: {
                    allMessages: data.messages,
                    receiveUser: us[0],
                    index: data.messages[0]._id,
                    isGroup: data.messages[0].members.length > 2,
                    listResultByPeopleSearch: newListMembers,
                },
            });
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.msg) {
                toast.error(error.response.data.msg);
            }
        }
    };

    useEffect(() => {
        if (user) {
            getData();
        }
    }, [user]);

    const handleSendMess = async (receivedId) => {
        setLoading(true);
        try {
            let dt;
            const {text} = state;
            if ((!receivedId && state.isNewMessage) || state.isGroup) {
                let listId = [];
                state.listResultByPeopleSearch.forEach((v) => {
                    listId.push(v._id);
                });
                dt = await autoFetch.put("/api/message/send-message", {
                    text,
                    receivedId: listId,
                });
            } else {
                dt = await autoFetch.put("/api/message/send-message", {
                    text,
                    receivedId: [receivedId],
                });
            }
            let id = "";
            let newSourceData = state.sourceMessage.filter((d) => {
                if (d._id === dt.data.message._id) {
                    id = d._id;
                    d.content = dt.data.message.content;
                }
                return d;
            });
            let mainData;
            mainData = id
                ? newSourceData
                : [dt.data.message, ...state.sourceMessage];

            if (!state.isGroup && !state.isNewMessage) {
                setOneState("listPeopleToNewMessage", []);
                setOneState("listResultByPeopleSearch", []);
            }
            if (!id) {
                id = dt.data.message._id;
            }

            // @ts-ignore
            dispatch({
                type: HANDLE_SEND_MESSAGE,
                payload: {
                    allMessages: mainData,
                    sourceMessage: mainData,
                    index: id,
                },
            });

            setLoading(false);
            socket.emit("new-message", dt.data.message);
        } catch (error) {
            setLoading(false);
            console.log(error);
            if (error.response && error.response.data.msg) {
                toast.error(error.response.data.msg);
            }
        }
    };

    const searchPeopleToNewMessage = async (textSearchNewMessage) => {
        if (!textSearchNewMessage) {
            return;
        }
        try {
            const {data} = await autoFetch.get(
                `/api/auth/search-user/${textSearchNewMessage}`
            );
            // @ts-ignore
            dispatch({
                type: SEARCH_USER_TO_NEW_MESSAGE,
                payload: {
                    listPeopleToNewMessage: data.search,
                },
            });
        } catch (error) {
            console.log(error);
        }
    };

    const messBox = () => {
        const currentMessenger = state.allMessages.find(
            (m) => m._id === state.index
        );

        if (currentMessenger && currentMessenger.content && user) {
            // @ts-ignore
            return currentMessenger.content.map((c, k) => (
                <div
                    className={`chat-message chat-message-${
                        c.sentBy._id === user._id ? "right" : "left"
                    } `}
                    key={c._id}>
                    {c.sentBy._id === user._id ? (
                        <></>
                    ) : (
                        <div className='image d-flex'>
                            <img
                                src={
                                    c && c.sentBy && c.sentBy.image
                                        ? c.sentBy.image.url
                                        : ""
                                }
                                className='mr-1'
                                alt='AVATAR'
                                width={"30px"}
                                height={"30px"}
                                style={{
                                    border: "1px solid #8EABB4",
                                    marginRight: "3px",
                                    borderRadius: "9999px",
                                    marginTop: "5px",
                                }}
                            />
                            {currentMessenger.members.length > 2 && (
                                <span className='sentBy-name'>
                                    {c.sentBy.name}
                                </span>
                            )}
                        </div>
                    )}

                    <span
                        className={`flex-shrink-1 chat-element ${
                            c.sentBy._id === user._id
                                ? "py-2 px-3 ml-3"
                                : "py-2 px-3 ml-3"
                        }`}>
                        {c.text}
                    </span>
                    <div className='message-time'>
                        {moment(c.created).fromNow()}
                    </div>
                </div>
            ));
        }
        return <></>;
    };

    const colRight = () => {
        if (state.isNewMessage) {
            return (
                <>
                    <div className='py-2 px-4 border-bottom d-none d-lg-block'>
                        <div className='d-flex create-new-message py-1'>
                            <div className='to'>to:</div>
                            <div className='result'>
                                {state.listResultByPeopleSearch.length > 0 &&
                                    state.listResultByPeopleSearch.map(
                                        (l, k) => (
                                            <span
                                                key={k}
                                                style={{
                                                    padding: "5px",
                                                    backgroundColor: "#8eabb4",
                                                    borderRadius: "3px",
                                                    margin: "0 2px",
                                                    color: "white",
                                                }}
                                                role='button'
                                                className='result-people'>
                                                {l ? l.name : "nothing"}
                                                <CloseCircleOutlined
                                                    className='remove-result-people'
                                                    onClick={() => {
                                                        const newListResult =
                                                            state.listResultByPeopleSearch.filter(
                                                                (n) =>
                                                                    n._id !==
                                                                    l._id
                                                            );
                                                        setOneState(
                                                            "listResultByPeopleSearch",
                                                            newListResult
                                                        );
                                                    }}
                                                />
                                            </span>
                                        )
                                    )}
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
                                        searchPeopleToNewMessage(
                                            e.target.value
                                        );
                                    }}
                                    className='form-control'
                                    placeholder='Search user...'
                                    style={{}}
                                />
                                <div className='list-people-search-new-message'>
                                    {state.listPeopleToNewMessage.length >
                                        0 && (
                                        <List
                                            itemLayout='horizontal'
                                            dataSource={
                                                state.listPeopleToNewMessage
                                            }
                                            renderItem={(people) => (
                                                <List.Item>
                                                    <List.Item.Meta
                                                        title={
                                                            <div
                                                                className='d-flex'
                                                                role='button'
                                                                onClick={() => {
                                                                    if (
                                                                        user &&
                                                                        people._id ===
                                                                            user._id
                                                                    ) {
                                                                        // @ts-ignore
                                                                        dispatch(
                                                                            // @ts-ignore
                                                                            {
                                                                                type: CLEAR_WHEN_DUPLICATE,
                                                                            }
                                                                        );
                                                                        return;
                                                                    }
                                                                    if (
                                                                        state
                                                                            .listResultByPeopleSearch
                                                                            .length >
                                                                        0
                                                                    ) {
                                                                        let id =
                                                                            state.listResultByPeopleSearch.find(
                                                                                (
                                                                                    i
                                                                                ) =>
                                                                                    i._id ===
                                                                                    people._id
                                                                            );
                                                                        // @ts-ignore
                                                                        dispatch(
                                                                            // @ts-ignore
                                                                            {
                                                                                type: CLEAR_WHEN_DUPLICATE,
                                                                            }
                                                                        );
                                                                        if (id)
                                                                            return;
                                                                    }

                                                                    // @ts-ignore
                                                                    dispatch({
                                                                        type: ADD_USER_TO_SEND_NEW_MESSAGE,
                                                                        payload:
                                                                            {
                                                                                listResultByPeopleSearch:
                                                                                    [
                                                                                        ...state.listResultByPeopleSearch,
                                                                                        people,
                                                                                    ],
                                                                            },
                                                                    });
                                                                }}>
                                                                <Avatar
                                                                    src={
                                                                        people
                                                                            .image
                                                                            .url
                                                                    }
                                                                />
                                                                {people.name}
                                                            </div>
                                                        }
                                                    />
                                                </List.Item>
                                            )}
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
                    <div className='d-flex align-items-center py-1'>
                        {/* list avatar */}
                        <div className='position-relative'>
                            {state.isGroup ? (
                                <div
                                    className='d-flex'
                                    style={{height: "40px"}}>
                                    {state.listResultByPeopleSearch.length &&
                                        state.listResultByPeopleSearch.map(
                                            (v, k) => (
                                                <Tooltip
                                                    title={v.name}
                                                    placement={"top"}
                                                    key={k}>
                                                    <img
                                                        src={
                                                            v && v.image
                                                                ? v.image.url
                                                                : ""
                                                        }
                                                        className='rounded-circle mr-1'
                                                        alt='avatar'
                                                        width={"40px"}
                                                        height={"40px"}
                                                    />
                                                </Tooltip>
                                            )
                                        )}
                                </div>
                            ) : (
                                <div style={{height: "40px"}}>
                                    {state.receiveUser &&
                                        state.receiveUser.image && (
                                            <img
                                                src={
                                                    state.receiveUser &&
                                                    state.receiveUser.image
                                                        ? state.receiveUser
                                                              .image.url
                                                        : ""
                                                }
                                                className='rounded-circle mr-1'
                                                alt='avatar'
                                                width={40}
                                                height={40}
                                            />
                                        )}
                                </div>
                            )}
                        </div>
                        {/* list name */}
                        <div className='flex-grow-1 pl-3'>
                            {state.isGroup &&
                            state.listResultByPeopleSearch.length ? (
                                <div className='d-flex'>
                                    <strong>You, &nbsp;</strong>
                                    {state.listResultByPeopleSearch.map(
                                        (v, k) => {
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
                                        }
                                    )}
                                </div>
                            ) : (
                                <strong>
                                    {state.receiveUser
                                        ? state.receiveUser.name
                                        : ""}
                                </strong>
                            )}
                            <div className='text-muted small'>
                                {/* <em>Typing...</em> */}
                            </div>
                        </div>
                    </div>
                </div>
                <div className='position-relative'>
                    <div
                        className='chat-messages p-4'
                        style={{margin: "0 7px"}}>
                        {messBox()}
                        <div ref={messagesEndRef} />
                    </div>
                </div>
            </>
        );
    };

    return (
        <main className='content-message'>
            <div className='container'>
                <div className='card'>
                    <div className='grid-cols-4 w-full '>
                        {/* List box chat */}
                        <BoxChat
                            dispatch={dispatch}
                            getData={getData}
                            setOneState={setOneState}
                            state={state}
                            user={user}
                        />
                        {/* main chat */}
                    </div>
                </div>
            </div>
        </main>
    );
};

export default Message;

{
    /* <div className='col-span-3'>
{colRight()}
{!state.allMessages.length &&
!state.isNewMessage ? (
    <></>
) : (
    <form
        className='flex-grow-0 py-3 px-4 border-top'
        onSubmit={(e) => {
            e.preventDefault();
            if (state.isNewMessage) {
                if (
                    state.listResultByPeopleSearch
                        .length === 1
                ) {
                    setOneState(
                        "receiveUser",
                        state
                            .listResultByPeopleSearch[0]
                    );
                } else {
                    // console.log(state.listResultByPeopleSearch);
                    setOneState("isGroup", true);
                }
                handleSendMess("");
            } else {
                if (
                    !state.text ||
                    !state.receiveUser
                ) {
                    return;
                }
                handleSendMess(
                    state.receiveUser._id
                );
            }
        }}>
        <div className='input-group'>
            <input
                type='text'
                className='form-control'
                placeholder='Type your message'
                value={state.text}
                onChange={(e) =>
                    setOneState(
                        "text",
                        e.target.value
                    )
                }
                disabled={
                    !state.receiveUser ||
                    state.loading ||
                    (state.isNewMessage &&
                        !state
                            .listResultByPeopleSearch
                            .length)
                }
                ref={emailInputRef}
            />
            <button
                className='btn'
                type='submit'
                disabled={
                    !state.receiveUser ||
                    state.loading ||
                    !state.text ||
                    (state.isNewMessage &&
                        state
                            .listResultByPeopleSearch
                            .length === 0)
                }
                style={{
                    backgroundColor: "#8eabb4",
                    color: "white",
                }}>
                {state.loading
                    ? "loading..."
                    : "send"}
            </button>
        </div>
    </form>
)}
</div> */
}
