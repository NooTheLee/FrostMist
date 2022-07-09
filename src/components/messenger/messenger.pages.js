import React, {useEffect, useRef, useReducer, useState} from "react";
import {AiOutlineSend} from "react-icons/ai";
import ReactLoading from "react-loading";
import {toast} from "react-toastify";
import io from "socket.io-client";
import useSound from "use-sound";

import {useAppContext} from "../../context/useContext";
import BoxChat from "./components/BoxChat.component";
import MainChat from "./components/MainChat.component";
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
    const path = "sounds/message_sound.mp3";
    const [playSound] = useSound(path, {volume: 0.2});

    const {autoFetch, user} = useAppContext(); /// own user
    const [state, dispatch] = useReducer(reducer, initState);
    const [scrLoading, setScrLoading] = useState(false);

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
        setScrLoading(true);
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
        setScrLoading(false);
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

    if (scrLoading) {
        return <h1 className='text-red-500 mt-[80px] '>Loading...</h1>;
    }

    return (
        <div className='w-screen h-screen px-[5%] pt-[70px] '>
            <div className='w-full h-full grid grid-cols-4 '>
                <div className='col-span-1 '>
                    <BoxChat
                        dispatch={dispatch}
                        getData={getData}
                        setOneState={setOneState}
                        state={state}
                        user={user}
                    />
                </div>
                <div className='col-span-3 '>
                    <MainChat
                        dispatch={dispatch}
                        messagesEndRef={messagesEndRef}
                        searchPeopleToNewMessage={searchPeopleToNewMessage}
                        setOneState={setOneState}
                        state={state}
                        user={user}
                    />

                    {/* form add new message */}
                    {!state.allMessages.length && !state.isNewMessage ? (
                        <></>
                    ) : (
                        <form
                            className='flex-grow-0 py-3 px-4'
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (state.isNewMessage) {
                                    if (
                                        state.listResultByPeopleSearch
                                            .length === 1
                                    ) {
                                        setOneState(
                                            "receiveUser",
                                            state.listResultByPeopleSearch[0]
                                        );
                                    } else {
                                        setOneState("isGroup", true);
                                    }
                                    handleSendMess("");
                                } else {
                                    if (!state.text || !state.receiveUser) {
                                        return;
                                    }
                                    handleSendMess(state.receiveUser._id);
                                }
                            }}>
                            <div className='w-full rounded-full border-[1px] border-[#8EABB4] flex px-2 items-center '>
                                <input
                                    type='text'
                                    className='w-full bg-inherit border-0 focus:ring-0 rounded-full '
                                    placeholder='Type your message'
                                    value={state.text}
                                    onChange={(e) =>
                                        setOneState("text", e.target.value)
                                    }
                                    disabled={
                                        !state.receiveUser ||
                                        state.loading ||
                                        (state.isNewMessage &&
                                            !state.listResultByPeopleSearch
                                                .length)
                                    }
                                    ref={emailInputRef}
                                />
                                <button
                                    className='shrink-0 text-xl opacity-50 hover:opacity-80 cursor-pointer '
                                    type='submit'
                                    disabled={
                                        !state.receiveUser ||
                                        state.loading ||
                                        !state.text ||
                                        (state.isNewMessage &&
                                            state.listResultByPeopleSearch
                                                .length === 0)
                                    }>
                                    {state.loading ? (
                                        <ReactLoading
                                            type='spin'
                                            width={20}
                                            height={20}
                                            color='#7d838c'
                                        />
                                    ) : (
                                        <AiOutlineSend />
                                    )}
                                </button>
                            </div>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Message;
