import {useAppContext} from "../../context/useContext";
import {useNavigate} from "react-router-dom";
import Left from "./components/Weather.component";
import Center from "./components/Main.component";
import Right from "./components/Sugestion.component";
import {useState} from "react";
import React from "react";

const Dashboard = () => {
    const navigate = useNavigate();
    const {
        autoFetch,
        user,
        token,
        dark,
        setNameAndToken,
        setOneState,
        isQrCode,
    } = useAppContext();
    const [loading, setLoading] = useState(false);
    const [page, setPage] = useState(1);
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState(false);

    const getAllPosts = async () => {
        setLoading(true);
        try {
            const {data} = await autoFetch.get(
                `/api/post/news-feed?page=1&perPage=5`
            );
            setPosts(data.posts);
        } catch (error) {
            console.log(error);
            setError(true);
        }
        setLoading(false);
    };

    const getNewPosts = async () => {
        try {
            const {data} = await autoFetch.get(
                `/api/post/news-feed?page=${page + 1}&perPage=5`
            );
            setPage(page + 1);
            // @ts-ignore
            setPosts([...posts, ...data.posts]);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='overflow-x-hidden min-h-screen pt-16 md:pt-[85px]  '>
            <div className='w-screen grid grid-cols-11 md:gap-x-12 px-3 sm:px-7 md:px-10 relative '>
                <div className='col-span-11 md:col-span-3 relative order-1 '>
                    <Left autoFetch={autoFetch} dark={dark} />
                </div>
                <div className='col-span-11 md:col-span-5 shrink-0 order-3 md:order-2 '>
                    <Center
                        autoFetch={autoFetch}
                        dark={dark}
                        setOneState={setOneState}
                        token={token}
                        user={user}
                        getAllPosts={getAllPosts}
                        loading={loading}
                        posts={posts}
                        setPosts={setPosts}
                        getNewPosts={getNewPosts}
                        error={error}
                        isQrCode={isQrCode}
                    />
                </div>
                <div className='col-span-11 md:col-span-3 relative order-2 md:order-3 '>
                    <Right
                        autoFetch={autoFetch}
                        getAllPosts={getAllPosts}
                        navigate={navigate}
                        setNameAndToken={setNameAndToken}
                        user={user}
                        token={token}
                        dark={dark}
                        error={error}
                    />
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
