// import "./Preview.css";
import React from "react";

import {buildBoard} from "./business/Board";
import {transferToBoard} from "./business/Tetrominoes";

import BoardCell from "./Game.BoardCell";

const Preview = ({tetromino, index}) => {
    const {shape, className} = tetromino;

    const board = buildBoard({rows: 4, columns: 4});

    //const style = {top: `${index * 15}vw`};

    board.rows = transferToBoard({
        className,
        isOccupied: false,
        position: {row: 0, column: 0},
        rows: board.rows,
        shape,
    });
    console.log("shape", shape);

    return (
        <div className='mt-4 bg-[#200040] w-max p-2 dark:border-white border-2 rounded-lg '>
            <div className='grid gap-0.5 grid-cols-4 grid-rows-4 w-24 h-24  '>
                {board.rows.map((row, y) =>
                    row.map((cell, x) => (
                        <BoardCell
                            key={x * board.size.columns + x}
                            cell={cell}
                        />
                    ))
                )}
            </div>
        </div>
    );
};

export default React.memo(Preview);
