import Board from "./Game.Board";
import GameController from "./Game.Controller";
import GameStats from "./Game.Stats";
import Previews from "./Game.Previews";

import {useBoard} from "../../../hooks/game/useBoard";
import {useGameStats} from "../../../hooks/game/useGameStats";
import {usePlayer} from "../../../hooks/game/usePlayer";
import {useEffect, useState} from "react";

import {useGameOver} from "../../../hooks/game/useGameOver";

const Tetris = ({rows, columns}) => {
    const [isPlay, setIsPlay] = useState(false);
    const [gameStats, addLinesCleared] = useGameStats();
    const [player, setPlayer, resetPlayer] = usePlayer();

    const [isStart, setIsStart] = useState(false);

    const [board, setBoard] = useBoard({
        rows,
        columns,
        player,
        resetPlayer,
        addLinesCleared,
    });
    const [gameOver, setGameOver, resetGameOver] = useGameOver();

    //const start = () => resetGameOver();

    // if(isStart)
    useEffect(() => {
        setIsStart(false);
        // @ts-ignore
        resetGameOver();
        setIsPlay(false);
    }, [gameOver]);

    const play = () => {
        if (isPlay) {
            return (
                <GameController
                    board={board}
                    gameStats={gameStats}
                    player={player}
                    setGameOver={setGameOver}
                    setPlayer={setPlayer}
                />
            );
        }
        return null;
    };

    const text = () => {
        if (!isStart) return "Start";
        if (isPlay) return "Pause";
        else {
            return "Continue";
        }
    };

    return (
        <div className='relative grid grid-cols-3 w-full pt-[5%] '>
            <div className='col-span-1'></div>
            <div className='col-span-1 '>
                <Board board={board} />
            </div>
            <div className='col-span-1 '>
                <Previews
                    tetrominoes={
                        // @ts-ignore
                        player.tetrominoes
                    }
                />
                <GameStats gameStats={gameStats} />
                <button
                    className={`w-40 h-16 text-center ${
                        !isPlay ? "bg-green-600" : "bg-red-600"
                    } text-white game border-4 dark:border-white rounded-lg text-[14px] `}
                    onClick={() => {
                        setIsStart(true);
                        setIsPlay(!isPlay);
                    }}>
                    {text()}
                </button>
                <button
                    onClick={() => {
                        resetGameOver();
                    }}>
                    Reset
                </button>
            </div>
            {play()}
        </div>
    );
};

export default Tetris;
