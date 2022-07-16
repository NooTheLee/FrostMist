import React, {useEffect, useMemo, useState} from "react";
import Pagination from "@mui/material/Pagination";
import moment from "moment";
// components
import {Table} from "../..";
import {useAppContext} from "../../../context/useContext";
import ReactLoading from "react-loading";

const Users = () => {
    const {autoFetch} = useAppContext();

    const [loading, setLoading] = useState(false);
    const [perPage, setPerPage] = useState(5);

    const [page, setPage] = useState(1);
    // list all users
    const [listUser, setListUser] = useState([]);
    // numbers of all users
    const [totalUser, setTotalUser] = useState(0);

    useEffect(() => {
        getAllUsers();
    }, [page, perPage]);

    const getAllUsers = async () => {
        setLoading(true);
        try {
            const {data} = await autoFetch.get(
                `/api/auth/all-users?page=${page}&perPage=${perPage}`
            );
            setTotalUser(data.numberUsers);
            setListUser(data.users);
        } catch (error) {
            console.log(error);
        }
        setLoading(false);
    };

    const fields = [
        "no",
        "avatar",
        "name",
        "email",
        "postNumber",
        "follower",
        "following",
        "date",
    ];
    // titles of head table
    const titles = [
        "No",
        "Avatar",
        "Name",
        "Email",
        "Posts",
        "Follower",
        "Following",
        "Date",
    ];

    const data = useMemo(() => {
        return listUser.map((v, index) => {
            return {
                // @ts-ignore
                no: index + (page - 1) * perPage + 1,
                // @ts-ignore
                avatar: v.image.url,
                // @ts-ignore
                name: v.name,
                // @ts-ignore
                email: v.email,
                postNumber: "n/a",
                // @ts-ignore
                follower: v.follower.length,
                // @ts-ignore
                following: v.following.length,
                // @ts-ignore
                date: moment(v.createdAt).fromNow(),
            };
        });
    }, [listUser, fields]);

    const listCenterTd = React.useMemo(
        () => ["postNumber", "no", "follower", "following"],
        []
    );
    const listCenterHead = React.useMemo(
        () => ["No", "Email", "Posts", "Follower", "Following", "Date"],
        []
    );

    return (
        <div className='w-full h-full '>
            <div className='w-full flex justify-between items-center px-10 py-1 '>
                <div className='font-bold text-xl '> User </div>
                <div className='flex items-center '>
                    {loading && (
                        <ReactLoading
                            type='spin'
                            width={20}
                            height={20}
                            color='#7d838c'
                        />
                    )}
                    <Pagination
                        count={totalUser}
                        page={page}
                        color='primary'
                        className='dark:text-white text-black '
                        onChange={(setOneState, page) => {
                            console.log(page);
                            setPage(page);
                        }}
                    />
                </div>
            </div>
            <div className='w-full h-full  '>
                <Table
                    titles={titles}
                    fields={fields}
                    data={data}
                    listCenterHead={listCenterHead}
                    listCenterTd={listCenterTd}
                />
            </div>
        </div>
    );
};

export default Users;
