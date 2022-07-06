import React, {useState} from "react";

import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai";
import {Nav} from "../components";
import {useAppContext} from "../context/useContext";
import {Navigate, NavLink} from "react-router-dom";
import {toast} from "react-toastify";
import ReactLoading from "react-loading";

const Login = () => {
    const {dark, user, setNameAndToken, autoFetch} = useAppContext();
    const [eye, setEye] = useState(false);
    const [loading, setLoading] = useState(false);
    const initState = {
        email: "",
        password: "",
        rememberPassword: false,
    };

    const [state, setState] = useState(initState);

    const login = async () => {
        setLoading(true);
        try {
            const {password, rememberPassword} = state;
            const email = state.email.toLowerCase();
            const {data} = await autoFetch.post("/api/auth/login", {
                email,
                password,
                rememberPassword,
            });
            setNameAndToken(data.user, data.token);
            toast.success("Login success.");
            setLoading(false);
        } catch (error) {
            console.log(error);
            toast.error(error?.response?.data?.msg || "Something went wrong!");
            setLoading(false);
        }
    };

    const handleChangeInput = (e) => {
        setState({...state, [e.target.name]: e.target.value});
    };

    if (user) {
        return <Navigate to='/' />;
    }

    return (
        <div>
            <Nav />
            <div className='pt-12 bg-[#FEDCC5] dark:bg-[#4E4F50] h-screen w-screen flex items-center relative transition-50 '>
                {/* image chicken */}
                <div className='fixed z-0 bottom-0'>
                    <img
                        src='/images/chicken-bg.png'
                        alt='bg'
                        className='h-[100vh] w-auto object-cover '
                    />
                </div>
                {/* form */}
                <div className='w-full md:w-[80%] mx-auto flex items-center justify-center  md:justify-between z-[1] md:mt-4 '>
                    <div className='bg-[#FEE7D6] dark:bg-[#3a3a3a] dark:text-white/70 w-[90%] md:w-auto px-[20px] md:px-[80px] py-[30px] md:py-[40px] rounded-3xl '>
                        <div className=' mb-[18px] '>
                            <img
                                src={`/images/${
                                    dark ? "login-dark.png" : "login.png"
                                }`}
                                alt='login'
                                className='h-[40px] w-auto md:h-[50px] '
                            />
                        </div>
                        <form
                            className='md:mt-[20px] '
                            onSubmit={(e) => {
                                e.preventDefault();
                                login();
                            }}>
                            <div className=''>
                                <div className='text-sm md:text-[16px] mb-2'>
                                    Email
                                </div>
                                <input
                                    type='email'
                                    className='input-login '
                                    placeholder='User@gmail.com'
                                    name='email'
                                    onChange={(e) => handleChangeInput(e)}
                                    disabled={loading}
                                />
                            </div>
                            <div className='mt-[25px]'>
                                <div className='text-sm md:text-[16px] mb-2'>
                                    Password
                                </div>
                                <div className='flex items-center relative'>
                                    <input
                                        type={eye ? "text" : "password"}
                                        className=' input-login'
                                        placeholder='Password'
                                        name='password'
                                        onChange={(e) => handleChangeInput(e)}
                                        disabled={loading}
                                    />
                                    {eye ? (
                                        <AiOutlineEye
                                            className='text-black/20 text-[20px] absolute right-2 cursor-pointer h-full dark:text-white/40'
                                            onClick={() => setEye(!eye)}
                                        />
                                    ) : (
                                        <AiOutlineEyeInvisible
                                            className='text-black/20 text-[20px] absolute right-2 cursor-pointer h-full dark:text-white/40'
                                            onClick={() => setEye(!eye)}
                                        />
                                    )}
                                </div>
                            </div>
                            <div className='mt-[12px] md:mt-[17px] text-[13px] cursor-pointer font-normal flex justify-between items-center '>
                                <NavLink to='/forget-password'>
                                    Forget password
                                </NavLink>
                                <span>
                                    Remember{" "}
                                    <input
                                        type='checkbox'
                                        className='rounded-[4px] ring-[#F25019] checked:bg-[#F25019]'
                                        value={String(state.rememberPassword)}
                                        onChange={(e) => {
                                            setState({
                                                ...state,
                                                rememberPassword:
                                                    e.target.value === "false",
                                            });
                                        }}
                                        disabled={loading}
                                    />
                                </span>
                            </div>
                            <button
                                className={`mt-[35px] md:mt-[35px] w-full font-extrabold text-[20px] md:text-2xl bg-[#F25019] text-white py-[8px] md:py-[13px] rounded-[5px] ${
                                    loading ? "loading" : ""
                                } flex items-center justify-center `}
                                type='submit'
                                disabled={loading}>
                                {loading ? (
                                    <ReactLoading
                                        type='bubbles'
                                        width={32}
                                        height={32}
                                        color='white'
                                    />
                                ) : (
                                    "Sign in"
                                )}
                            </button>
                        </form>
                        <div className='mt-[15px] md:mt-[30px] font-normal text-[13px] text-center '>
                            or continue with
                        </div>
                        <div className='mt-[8px] md:mt-[16px] flex items-center justify-between  gap-x-[11px] shrink-1 '>
                            <div className='icon-login ' role='button'>
                                <img
                                    src='/images/icon-gg.png'
                                    alt='icon-gg'
                                    className=' w-[19px] md:w-[24px] h-auto rounded-full'
                                />
                            </div>
                            <div className='icon-login ' role='button'>
                                <img
                                    src='/images/icon-github.png'
                                    alt='icon-gg'
                                    className=' w-[19px] md:w-[24px] h-auto bg-white rounded-full'
                                />
                            </div>
                            <div className='icon-login ' role='button'>
                                <img
                                    src='/images/icon-fb.png'
                                    alt='icon-gg'
                                    className=' w-[19px] md:w-[24px] h-auto bg-white rounded-full'
                                />
                            </div>
                        </div>
                        <div className='mt-[8px] md:mt-[16px] text-[13px] md:text-[15px] text-center '>
                            <span className='block md:inline '>
                                Don't have an account yet?{" "}
                            </span>
                            <NavLink
                                to={"/register"}
                                role='button'
                                className='hover:scale-110 text-[18px] font-bold '>
                                Register for free
                            </NavLink>
                        </div>
                    </div>
                    <img
                        src={`/images/${
                            dark ? "chicken.png" : "chicken-dark.png"
                        }`}
                        alt='chicken'
                        className='w-[50%] h-auto object-cover hidden md:inline '
                    />
                </div>
            </div>
        </div>
    );
};

export default Login;
