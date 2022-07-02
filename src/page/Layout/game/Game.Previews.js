import React from "react";

import Preview from "./Game.Preview";

const Previews = ({tetrominoes}) => {
    // We want everything except the last one
    const previewTetrominoes = tetrominoes
        .slice(1 - tetrominoes.length)
        .reverse();

    return (
        <div className='flex gap-x-5 '>
            {previewTetrominoes.map((tetromino, index) => (
                <Preview tetromino={tetromino} index={index} key={index} />
            ))}
        </div>
    );
};

export default React.memo(Previews);
