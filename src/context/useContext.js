import {createContext, useContext, useState} from "react";
import axios from "axios";
import {toast} from "react-toastify";

const user = JSON.parse(localStorage.getItem("user"));
const token = JSON.parse(localStorage.getItem("token"));
const dark = JSON.parse(localStorage.getItem("dark"));
const initState = {
    user: user || "",
    token: token || "",
    dark: dark || false,
    openModal: false,
    isQrCode: false,
};
// @ts-ignore
const AppContext = createContext();

const AppProvider = ({children}) => {
    const [state, setStateContext] = useState(initState);

    if (state.dark) {
        document.documentElement.classList.add("dark");
    } else {
        document.documentElement.classList.remove("dark");
    }
    if (state.openModal) {
        document.body.classList.add("modal-open");
    } else {
        document.body.classList.toggle("modal-open", false);
        document.body.classList.add("style-3");
    }
    axios.defaults.headers.common["Authorization"] = `Bearer ${state.token}`;

    const autoFetch = axios.create({
        // @ts-ignore
        baseURL: process.env.REACT_APP_SERVER_URL,
    });

    // Add a request interceptor
    autoFetch.interceptors.request.use(
        function (config) {
            // Do something before request is sent
            return config;
        },
        function (error) {
            // Do something with request error
            return Promise.reject(error);
        }
    );
    // Add a response interceptor
    autoFetch.interceptors.response.use(
        function (response) {
            // Any status code that lie within the range of 2xx cause this function to trigger
            // Do something with response data
            return response;
        },
        function (error) {
            // Any status codes that falls outside the range of 2xx cause this function to trigger
            // Do something with response error
            if (error.response.status === 401) {
                toast.error("Your session has expired. Please log in again.");
                logOut();
            }
            if (error.response.status === 403) {
                toast.error(
                    "This page is for admin use only. Please log in again."
                );
                logOut();
            }
            if (error.response.status === 11000) {
                toast.error("Something went wrong. Try again!");
            }
            return Promise.reject(error);
        }
    );
    const removeFromLocalStorage = () => {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
    };

    const addToLocalStorage = (user, token) => {
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", JSON.stringify(token));
    };

    const setOneState = (name, value) => {
        setStateContext({...state, [name]: value});
    };

    const setNameAndToken = (userValue, tokenValue) => {
        setStateContext({...state, user: userValue, token: tokenValue});
        addToLocalStorage(userValue, tokenValue);
    };

    const logOut = () => {
        removeFromLocalStorage();
        setStateContext({...state, user: "", token: ""});
    };

    const openQrCode = () => {
        setStateContext({...state, openModal: true, isQrCode: true});
    };
    const closeQrCode = () => {
        setStateContext({...state, openModal: false, isQrCode: false});
    };

    return (
        <AppContext.Provider
            value={{
                ...state,
                autoFetch,
                setStateContext,
                setOneState,
                logOut,
                setNameAndToken,
                addToLocalStorage,
                openQrCode,
                closeQrCode,
            }}>
            {children}
        </AppContext.Provider>
    );
};

const useAppContext = () => {
    return useContext(AppContext);
};

export {useAppContext, AppProvider};
