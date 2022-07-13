import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import moment from "moment";
import Pagination from "@mui/material/Pagination";
import FormControl from "@mui/material/FormControl";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import { AiOutlineDelete } from "react-icons/ai";

import { useAppContext } from "../../context/useContext";

const Admin = () => {
    const navigation = useNavigate();
    const { autoFetch } = useAppContext();

    const deletePostWithAdmin = async (postId) => {
        setLoading(true);
        try {
            const { data } = await autoFetch.delete(
                `api/post/admin/delete-post/${postId}`
            );
            toast(data.msg);
            getAllPosts();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const deleteUserWithAdmin = async (userId) => {
        setLoading(true);
        try {
            const { data } = await autoFetch.delete(
                `api/auth/admin/delete-user/${userId}`
            );
            toast(data.msg);
            getAllUsers();
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const [menu, setMenu] = useState("Posts");
    const [perPage, setPerPage] = useState(10);
    const [page, setPage] = useState(1);
    const [isLoading, setLoading] = useState(false);
    const [allUsers, setAllUsers] = useState([]);
    const [posts, setPosts] = useState([]);
    const [numberUsers, setNumberUsers] = useState(0);
    const [postsCount, setPostsCount] = useState(0);

    useEffect(() => {
        if (menu === "Users") {
            getAllUsers();
        } else {
            getAllPosts();
        }
    }, [menu, page, perPage]);
    const getAllUsers = async () => {
        setLoading(true);
        try {
            const { data } = await autoFetch.get(
                `/api/auth/all-users?page=${page}&perPage=${perPage}`
            );
            setAllUsers(data.users);
            setNumberUsers(data.numberUsers);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const getAllPosts = async () => {
        setLoading(true);
        try {
            const { data } = await autoFetch.get(
                `/api/post/all-posts?page=${page}&perPage=${perPage}`
            );
            setPosts(data.posts);
            setPostsCount(data.postsCount);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
        }
    };

    const handleChange = (setValue, value) => {
        setPage(value);
    };
    const handleChangePerPage = (Nothing, perPage) => {
        setPerPage(perPage.props.value);
    };

    const count = () => {
        if (menu === "Users") {
            return (numberUsers - (numberUsers % perPage)) / perPage + 1;
        }
        return (postsCount - (postsCount % perPage)) / perPage + 1;
    };

    const mainContent = () => {
        if (isLoading) {
            return <>Loading...</>;
        }
        if (menu === "Posts") {
            return (
                <Grid container spacing={2}>
                    <Grid item xs={12} md={12}>
                        <List dense={false}>
                            {posts.map((p, key) => (
                                <>
                                    <ListItem
                                        key={key}
                                        secondaryAction={
                                            <>
                                                {moment(p.createdAt).fromNow()}
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    <AiOutlineDelete
                                                        onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                    "Delete this post?"
                                                                )
                                                            ) {
                                                                deletePostWithAdmin(
                                                                    p._id
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </IconButton>
                                            </>
                                        }
                                    >
                                        {key + 1 + (page - 1) * perPage}.
                                        <div
                                            className="d-flex"
                                            onClick={() => {
                                                navigation(
                                                    `user/profile/${
                                                        p && p.postedBy
                                                            ? p.postedBy._id
                                                            : ""
                                                    }`
                                                );
                                            }}
                                            role="button"
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <img
                                                        src={
                                                            p &&
                                                            p.postedBy &&
                                                            p.postedBy.image
                                                                ? p.postedBy
                                                                      .image.url
                                                                : ""
                                                        }
                                                    />
                                                </Avatar>
                                            </ListItemAvatar>
                                            {p && p.postedBy && p.postedBy.name
                                                ? p.postedBy.name
                                                : ""}
                                        </div>
                                    </ListItem>
                                    <p className="m-l-80">
                                        {p && p.content ? p.content : ""}
                                    </p>
                                </>
                            ))}
                        </List>
                    </Grid>
                </Grid>
            );
        }
        return (
            <Grid container spacing={2}>
                <Grid item xs={12} md={12}>
                    <List dense={false}>
                        {allUsers &&
                            allUsers.map((u, key) => (
                                <>
                                    <ListItem
                                        key={key}
                                        secondaryAction={
                                            <>
                                                Created:{" "}
                                                {moment(u.createdAt).fromNow()}
                                                <IconButton
                                                    edge="end"
                                                    aria-label="delete"
                                                >
                                                    <AiOutlineDelete
                                                        onClick={() => {
                                                            if (
                                                                window.confirm(
                                                                    "Delete this users?"
                                                                )
                                                            ) {
                                                                deleteUserWithAdmin(
                                                                    u._id
                                                                );
                                                            }
                                                        }}
                                                    />
                                                </IconButton>
                                            </>
                                        }
                                    >
                                        {key + 1 + (page - 1) * perPage}.
                                        <div
                                            className="d-flex"
                                            onClick={() => {
                                                navigation(
                                                    `user/profile/${
                                                        u && u._id ? u._id : ""
                                                    }`
                                                );
                                            }}
                                            role="button"
                                        >
                                            <ListItemAvatar>
                                                <Avatar>
                                                    <img
                                                        src={
                                                            u && u.image
                                                                ? u.image.url
                                                                : ""
                                                        }
                                                    />
                                                </Avatar>
                                            </ListItemAvatar>
                                            {u && u.name ? u.name : ""}
                                        </div>
                                    </ListItem>
                                </>
                            ))}
                    </List>
                </Grid>
            </Grid>
        );
    };
    return (
        <>
            <div className="container sss">
                <div className="h1 display-1 text-success text-center py-5">
                    All {menu}
                    <hr />
                </div>
                <div className="text-center pb-3">
                    <select
                        onChange={(e) => {
                            setMenu(e.target.value);
                        }}
                        role="button"
                    >
                        <option value="Posts">Posts</option>
                        <option value="Users">Users</option>
                    </select>
                </div>
                <div className="row">
                    <div className="col-sm-2"></div>
                    <div className="col-sm-8">{mainContent()}</div>
                </div>
                <div className="d-flex justify-content-center">
                    <Pagination
                        count={count()}
                        page={page}
                        onChange={(setOneState, page) =>
                            handleChange(setOneState, page)
                        }
                    />
                    <div className="per-page">
                        <FormControl sx={{ m: 1, minWidth: 50 }} size="small">
                            <Select
                                labelId="demo-select-small"
                                id="demo-select-small"
                                value={perPage}
                                label="Number post in page"
                                onChange={(setOneState, perPage) =>
                                    handleChangePerPage(setOneState, perPage)
                                }
                            >
                                <MenuItem value={3}>3</MenuItem>
                                <MenuItem value={5}>5</MenuItem>
                                <MenuItem value={10}>10</MenuItem>
                            </Select>
                        </FormControl>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Admin;
