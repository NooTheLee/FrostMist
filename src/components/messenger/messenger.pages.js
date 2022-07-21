import React, {useEffect, useRef, useReducer, useState} from "react";
import {AiOutlineCamera, AiOutlineSend} from "react-icons/ai";
import ReactLoading from "react-loading";
import {toast} from "react-toastify";
import io from "socket.io-client";
import useSound from "use-sound";
import {useNavigate} from "react-router-dom";
//components
import {useAppContext} from "../../context/useContext";
import BoxChat from "./components/BoxChat.component";
import MainChat from "./components/MainChat.component";
import {LoadingMessenger} from "../";
import "./messenger.css";
import {MdCancel} from "react-icons/md";

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

const initImage = {url: "", public_id: ""};

const Message = () => {
    const navigate = useNavigate();

    const path = "sounds/message_sound.mp3";
    const [playSound] = useSound(path, {volume: 0.2});

    const {autoFetch, user} = useAppContext(); /// own user
    const [state, dispatch] = useReducer(reducer, initState);
    const [scrLoading, setScrLoading] = useState(false);

    const [image, setImage] = useState(initImage);
    const [formData, setFormData] = useState(null);

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
                    // when user open more 2 tabs
                    if (
                        newMessage.content[newMessage.content.length - 1].sentBy
                            ._id !== user._id
                    ) {
                        playSound();
                    }
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

    const navigateToProfile = (id) => {
        navigate(`/profile/${id}`);
    };

    // upload image to cloudinary
    const handleUpImageToCloud = async () => {
        try {
            const {data} = await autoFetch.post(
                `/api/post/upload-image`,
                formData
            );
            return {url: data.url, public_id: data.public_id};
        } catch (error) {
            toast.error("Upload image fail!");
            return initImage;
        }
    };

    const handleSendMess = async (receivedId) => {
        setLoading(true);
        try {
            let dt;
            const {text} = state;
            let imageUrl = image;
            if (imageUrl.url) {
                imageUrl = await handleUpImageToCloud();
                if (!imageUrl.url) {
                    setLoading(true);
                    setImage(initImage);
                    return;
                }
            }
            if ((!receivedId && state.isNewMessage) || state.isGroup) {
                let listId = [];
                state.listResultByPeopleSearch.forEach((v) => {
                    listId.push(v._id);
                });
                dt = await autoFetch.put("/api/message/send-message", {
                    text,
                    receivedId: listId,
                    image: imageUrl,
                });
            } else {
                dt = await autoFetch.put("/api/message/send-message", {
                    text,
                    receivedId: [receivedId],
                    image: imageUrl,
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
            setImage(initImage);
            socket.emit("new-message", dt.data.message);
        } catch (error) {
            console.log(error);
            if (error.response && error.response.data.msg) {
                toast.error(error.response.data.msg);
            }
        }
        setLoading(false);
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

    // set image to show in form
    const handleImage = (e) => {
        setImage(initImage);
        const file = e.target.files[0];
        // @ts-ignore
        setImage({url: URL.createObjectURL(file)});

        let formData = new FormData();
        formData.append("image", file);

        // @ts-ignore
        setFormData(formData);
    };

    if (scrLoading) {
        return <LoadingMessenger />;
    }

    return (
        <div className='w-screen h-screen px-2 md:px-[5%] pt-[40px] md:pt-[70px] overflow-hidden '>
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
                        navigateToProfile={navigateToProfile}
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
                            <div className='w-full rounded-full flex gap-x-2 items-center relative '>
                                {image?.url && (
                                    <div className='absolute w-[200px] h-[100px] md:w-[400px] md:h-[200px] rounded-md dark:bg-[#18191A] border dark:border-white/50 top-[-120px] md:top-[-220px] right-[60px] z-[20] flex items-center justify-center bg-[#8EABB4] border-[#333]/70 '>
                                        {state.loading && (
                                            <div className='absolute z-[21] bg-black/50 w-full h-full flex items-center justify-center '>
                                                <ReactLoading
                                                    type='spin'
                                                    width={40}
                                                    height={40}
                                                    color='#7d838c'
                                                />
                                            </div>
                                        )}
                                        <img
                                            src={image?.url}
                                            alt='attachment'
                                            className='h-full w-auto object-contain '
                                        />
                                        {!state.loading && (
                                            <MdCancel
                                                className='absolute text-2xl cursor-pointer top-1 right-1 transition-50 group-hover:flex opacity-50 hover:opacity-100 text-white  '
                                                onClick={() => {
                                                    setImage(initImage);
                                                }}
                                            />
                                        )}
                                    </div>
                                )}
                                <input
                                    type='text'
                                    className='w-full bg-inherit first-line:focus:ring-0 focus:ring-white rounded-full border-[1px] border-[#8EABB4] flex px-4 items-center '
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
                                <label>
                                    <AiOutlineCamera className='shrink-0 text-xl transition-50 opacity-60 hover:opacity-100 dark:text-[#b0b3b8] cursor-pointer ' />
                                    <input
                                        onChange={handleImage}
                                        type='file'
                                        accept='image/*'
                                        name='avatar'
                                        hidden
                                    />
                                </label>
                                <button
                                    className='shrink-0 text-xl opacity-50 hover:opacity-80 cursor-pointer  '
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
