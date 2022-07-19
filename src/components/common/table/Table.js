import * as React from "react";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Avatar, Tooltip} from "@mui/material";
import {useNavigate} from "react-router-dom";
//icon
import {AiOutlineDelete} from "react-icons/ai";
// app context
import {useAppContext} from "../../../context/useContext";

const StyledTableRow = styled(TableRow)(({theme}) => ({
    "&:nth-of-type(odd)": {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    "&:last-child td, &:last-child th": {
        border: 0,
    },
}));

// delete /admin/delete-post/:id

export default function CustomizedTables({
    bgHeadColor = "",
    fields,
    titles,
    data,
    listCenterTd,
    listCenterHead,
    className = "",
    typeTable = "",
    deletePost = () => {},
}) {
    const {dark} = useAppContext();

    const navigate = useNavigate();

    const StyledTableCell = React.useMemo(
        () =>
            styled(TableCell)(({theme}) => {
                return {
                    [`&.${tableCellClasses.head}`]: {
                        backgroundColor: dark
                            ? theme.palette.common.black
                            : bgHeadColor || "#1565C0",
                        color: theme.palette.common.white,
                        fontWeight: "bold",
                        padding: "10px 8px",
                    },
                    [`&.${tableCellClasses.body}`]: {
                        padding: "5px 3px",
                        fontSize: 14,
                    },
                };
            }),
        [dark, bgHeadColor]
    );

    const contentTd = (row, v) => {
        if (v === "avatar") {
            return (
                <Avatar
                    src={row[v]}
                    alt={row["name"]}
                    className='border dark:border-white/50 border-black/50 cursor-pointer '
                />
            );
        }
        if (v === "image") {
            return (
                <div className='w-28 h-10 flex items-center justify-center '>
                    {row[v] ? (
                        <img
                            src={row[v]}
                            alt={row["name"]}
                            className='border dark:border-white/50 border-black/50 h-full w-auto object-contain cursor-pointer '
                        />
                    ) : (
                        "NULL"
                    )}
                </div>
            );
        }
        return row[v];
    };

    const fieldsArr = React.useMemo(
        () => (typeTable !== "posts" ? titles : [...titles, "Actions"]),
        [typeTable, titles]
    );

    return (
        <div
            className={
                `w-full h-full max-h-[40vh] overflow-y-scroll  scroll-bar ` +
                className
            }>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            {fieldsArr.map((v, index) => (
                                <StyledTableCell
                                    key={index + "titleTable" + v}
                                    align={
                                        listCenterHead.includes(v)
                                            ? "center"
                                            : "left"
                                    }>
                                    {v}
                                </StyledTableCell>
                            ))}
                        </TableRow>
                    </TableHead>
                    <TableBody className=''>
                        {data.map((row, index) => {
                            return (
                                <StyledTableRow
                                    key={row.name + "th" + index}
                                    className='cursor-pointer '
                                    onClick={() => {
                                        if (typeTable === "users") {
                                            navigate(`/profile/${row.id}`);
                                        }
                                    }}>
                                    {fields.map((v, index) => (
                                        <StyledTableCell
                                            key={
                                                `rowElement-No` +
                                                row[v] +
                                                titles[index]
                                            }
                                            component={!index ? "th" : "td"}
                                            scope={!index ? "row" : undefined}
                                            align={
                                                listCenterTd.includes(v)
                                                    ? "center"
                                                    : "left"
                                            }
                                            className='text-ellipsis max-w-md flex items-center justify-center '
                                            onClick={() => {
                                                if (
                                                    (v === "content" ||
                                                        v === "image") &&
                                                    row.image
                                                ) {
                                                    navigate(
                                                        `/post/information/${row.id}`
                                                    );
                                                }
                                                if (
                                                    v === "avatar" ||
                                                    v === "name"
                                                ) {
                                                    navigate(
                                                        `/profile/${row.userId}`
                                                    );
                                                }
                                            }}>
                                            {contentTd(row, v)}
                                        </StyledTableCell>
                                    ))}
                                    {typeTable === "posts" && (
                                        <StyledTableCell
                                            component='td'
                                            align='center'
                                            className='text-ellipsis max-w-md flex items-center justify-center '>
                                            <Tooltip
                                                title={`Delete post`}
                                                placement='top'>
                                                <div className='flex w-full items-center justify-center'>
                                                    <AiOutlineDelete
                                                        className='text-xl text-red-400 dark:text-red-800 '
                                                        onClick={() => {
                                                            if (
                                                                typeTable ===
                                                                "posts"
                                                            ) {
                                                                if (
                                                                    window.confirm(
                                                                        "Do u delete this post?"
                                                                    )
                                                                ) {
                                                                    deletePost(
                                                                        // @ts-ignore
                                                                        row.id
                                                                    );
                                                                }
                                                            }
                                                        }}
                                                    />
                                                </div>
                                            </Tooltip>
                                        </StyledTableCell>
                                    )}
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
