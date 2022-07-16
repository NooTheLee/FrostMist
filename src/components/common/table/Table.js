import * as React from "react";
import {styled} from "@mui/material/styles";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell, {tableCellClasses} from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import {Avatar} from "@mui/material";

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

export default function CustomizedTables({
    bgHeadColor = "",
    fields,
    titles,
    data,
    listCenterTd,
    listCenterHead,
}) {
    const {dark} = useAppContext();

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
        [dark]
    );

    return (
        <div className='w-full h-full '>
            <TableContainer component={Paper}>
                <Table sx={{minWidth: 700}} aria-label='customized table'>
                    <TableHead>
                        <TableRow>
                            {titles.map((v, index) => (
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
                    <TableBody>
                        {data.map((row, index) => {
                            return (
                                <StyledTableRow key={row.name + "th" + index}>
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
                                            className='text-ellipsis max-w-md flex items-center justify-center '>
                                            {v === "avatar" ? (
                                                <Avatar
                                                    src={row[v]}
                                                    alt={row["name"]}
                                                    className='border dark:border-white/50 border-black/50 '
                                                />
                                            ) : (
                                                row[v]
                                            )}
                                        </StyledTableCell>
                                    ))}
                                </StyledTableRow>
                            );
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    );
}
