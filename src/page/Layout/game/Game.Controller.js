import "./GameController.css";

import {Action, actionForKey, actionIsDrop} from "./business/Input";
import {playerController} from "./business/PlayerController";

import {useDropTime} from "../../../hooks/game/useDropTime";
import {useInterval} from "../../../hooks/game/useInterval";

const GameController = ({board, gameStats, player, setGameOver, setPlayer}) => {
    const [dropTime, pauseDropTime, resumeDropTime] = useDropTime({
        gameStats,
    });

    useInterval(() => {
        handleInput({action: Action.SlowDrop});
    }, dropTime);

    const onKeyUp = ({code}) => {
        const action = actionForKey(code);
        if (actionIsDrop(action)) resumeDropTime();
    };

    const onKeyDown = ({code}) => {
        const action = actionForKey(code);

        if (action === Action.Pause) {
            if (dropTime) {
                pauseDropTime();
            } else {
                resumeDropTime();
            }
        } else if (action === Action.Quit) {
            setGameOver(true);
        } else {
            if (actionIsDrop(action)) pauseDropTime();
            if (!dropTime) {
                return;
            }
            handleInput({action});
        }
    };

    const handleInput = ({action}) => {
        playerController({
            action,
            board,
            player,
            setPlayer,
            setGameOver,
        });
    };

    return (
        <input
            className='GameController'
            type='text'
            onKeyDown={onKeyDown}
            onKeyUp={onKeyUp}
            autoFocus
        />
    );
};

export default GameController;
