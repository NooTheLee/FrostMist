import {useAppContext} from "../../context/useContext";
import {AiFillCamera} from "react-icons/ai";
import {useState} from "react";
import {toast} from "react-toastify";
import {TiTick} from "react-icons/ti";
import ReactLoading from "react-loading";
import React from "react";

const UpdateProfile = () => {
    const {user, autoFetch, setNameAndToken} = useAppContext();
    const [image, setImage] = useState(null);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState(null);

    const initValueState = {
        name: "",
        username: "",
        email: "",
        currentPassword: "",
        newPassword: "",
        confirmNewPassword: "",
    };

    const [state, setState] = useState(initValueState);

    const handleImage = async (e) => {
        try {
            setImage(null);
            const file = e.target.files[0];
            // @ts-ignore
            setImage({url: URL.createObjectURL(file)});

            let formData = new FormData();
            formData.append("image", file);

            // @ts-ignore
            setFormData(formData);
        } catch (error) {
            console.log(error);
        }
    };

    const updateImage = async () => {
        try {
            const {data} = await autoFetch.post(
                `/api/post/upload-image`,
                formData
            );
            return {url: data.url, public_id: data.public_id};
        } catch (error) {
            toast.error("Upload image fail!");
            return null;
        }
    };

    const handleSubmit = async () => {
        setLoading(true);
        try {
            const {
                newPassword: password,
                confirmNewPassword: rePassword,
                currentPassword,
            } = state;
            const name = state.name || user.name;
            const about = state.about || user.about;
            const username = state.username || user.username;
            let image;
            if (formData) {
                image = await updateImage();
                if (!image) {
                    setLoading(false);
                    setImage(null);
                    return;
                }
            }
            const {data} = await autoFetch.patch(`/api/auth/update-user`, {
                name,
                about,
                username,
                image,
                password,
                rePassword,
                currentPassword,
            });
            setNameAndToken(data.user, data.token);
            toast(data.msg);
            setState(initValueState);
        } catch (error) {
            if (error?.response?.data?.msg) {
                toast.error(error?.response?.data?.msg);
            } else {
                console.log(error);
            }
        }
        setLoading(false);
    };

    // name, nickname,email, about, current pw, new pw, confirm new pw => btn

    const field = [
        {
            label: "Name",
            type: "text",
            placeholder: "John Wick",
            name: "name",
            value: state.name || user.name,
        },
        {
            label: "Email",
            type: "email",
            placeholder: "JohnWick@gmail.com",
            name: "name",
            value: user.email,
            disabled: true,
        },
        {
            label: "Nick name",
            type: "text",
            placeholder: "Assassin",
            name: "username",
            value: state.username || user.username,
        },
        {
            label: "Current password",
            type: "password",
            placeholder: "Type your current password",
            name: "currentPassword",
            value: state.currentPassword,
        },
        {
            label: "New password",
            type: "password",
            placeholder: "Type new password",
            name: "newPassword",
            value: state.newPassword,
        },
        {
            label: "Confirm new password",
            type: "password",
            placeholder: "Confirm new password",
            name: "confirmNewPassword",
            value: state.confirmNewPassword,
        },
    ];

    const handleChange = (event) => {
        setState({...state, [event.target.name]: event.target.value});
    };

    return (
        <div className=' lg:h-screen h-auto pt-[70px] lg:grid lg:grid-cols-3 lg:px-[10%] px-[5%] overflow-x-hidden '>
            <div className='col-span-1 flex flex-col items-center justify-center pb-10 '>
                <label className='relative group w-40 h-40 cursor-pointer '>
                    <img
                        // @ts-ignore
                        src={image?.url || user.image.url}
                        alt='avatar'
                        className='w-full h-full rounded-full object-cover '
                    />
                    <div className='hidden group-hover:flex flex-col items-center w-full h-full justify-center absolute z-10 dark:bg-black/50 bg-white/30 top-0 left-0 rounded-full transition-50 font-bold '>
                        <AiFillCamera className='text-4xl text-black/70 ' />
                    </div>
                    <input
                        onChange={handleImage}
                        type='file'
                        accept='image/*'
                        name='avatar'
                        hidden
                    />
                </label>
                <div className='mt-5 text-3xl font-bold text-center flex items-center gap-x-2 '>
                    {user.name}{" "}
                    {user.role === "Admin" && (
                        <TiTick className='text-[22px] text-white rounded-full bg-sky-500 ' />
                    )}
                </div>
                <span className='ml text-2xl font-normal mt-1 '>
                    ({user.username})
                </span>
            </div>
            <div className='col-span-2 my-[5%] lg:py-auto py-7 px-6 bg-gray-400/30 lg:rounded-3xl md:rounded-xl rounded-md'>
                <div className='w-full text-center lg:text-4xl md:text-3xl text-2xl font-bold lg:my-8 md:my-5 my-4 '>
                    Update profile
                </div>
                <form
                    className='md:grid grid-cols-2 md:gap-y-12 gap-x-10 flex flex-col gap-y-5 '
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmit();
                    }}>
                    {field.map((v, k) => (
                        <div key={k + "field-update"} className=''>
                            <div
                                className={`text-sm md:text-[17px] font-bold ml-3 mb-2 ${
                                    v.disabled ? "opacity-70" : ""
                                } `}>
                                {v.label}
                            </div>
                            <input
                                type={v.type}
                                className={`input-login ${
                                    v.disabled ? "opacity-70" : ""
                                } w-full `}
                                placeholder={v.placeholder}
                                name={v.name}
                                value={v.value}
                                onChange={(event) => handleChange(event)}
                                disabled={v.disabled || loading}
                            />
                        </div>
                    ))}
                    <div className='col-span-2 flex justify-center items-center  '>
                        <button className='w-32 h-10 flex items-center justify-center transition-50 font-bold text-xl rounded-md bg-gradient-to-r from-cyan-500 to-blue-500 text-white opacity-75 hover:opacity-100 '>
                            {loading ? (
                                <ReactLoading
                                    type='bubbles'
                                    width={40}
                                    height={40}
                                    color='white'
                                />
                            ) : (
                                "Update"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default UpdateProfile;
