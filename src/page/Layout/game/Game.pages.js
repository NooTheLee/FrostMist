import Tetris from "./Game.Tetris";

const Game = ({rows, columns}) => {
    return (
        <div className=' h-screen w-screen '>
            <Tetris rows={rows} columns={columns} />
        </div>
    );
};

export default Game;
