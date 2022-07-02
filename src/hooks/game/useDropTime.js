import {useState, useCallback, useEffect} from "react";

const defaultDropTime = 1000;
const minimumDropTime = 100;
const speedIncrement = 50;

export const useDropTime = ({gameStats}) => {
    const [dropTime, setDropTime] = useState(defaultDropTime);
    const [previousDropTime, setPreviousDropTime] = useState();

    const resumeDropTime = useCallback(() => {
        if (!previousDropTime) {
            return;
        }
        setDropTime(previousDropTime);
        setPreviousDropTime(null);
    }, [previousDropTime]);

    const pauseDropTime = useCallback(() => {
        if (dropTime) {
            setPreviousDropTime(dropTime);
        }
        setDropTime(null);
    }, [dropTime, setPreviousDropTime]);

    useEffect(() => {
        const speed = speedIncrement * (gameStats.level - 1);
        const newDropTime = Math.max(defaultDropTime - speed, minimumDropTime);

        setDropTime(newDropTime);
    }, [gameStats.level, setDropTime]);

    return [dropTime, pauseDropTime, resumeDropTime];
};
