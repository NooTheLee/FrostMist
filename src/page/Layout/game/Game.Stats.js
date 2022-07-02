import React from "react";

const GameStats = ({gameStats}) => {
    const {level, points, linesCompleted, linesPerLevel} = gameStats;
    const linesToLevel = linesPerLevel - linesCompleted;

    return (
        <div className='flex flex-col items-start game gap-8 my-20 '>
            <div className='flex items-center '>
                <div className='font-bold text-[20px]'>Level: </div>
                <div className='value text-4xl text-red-700 '>{level}</div>
            </div>
            <div className='flex items-center '>
                <div className='font-bold text-[20px]'>Lines to level up: </div>
                <div className='value text-4xl text-sky-700 '>
                    {linesToLevel}
                </div>
            </div>
            <div className='flex items-center '>
                <div className='font-bold text-[20px]'>Points: </div>
                <div className='value text-4xl text-green-700 '>{points}</div>
            </div>
        </div>
    );
};

export default React.memo(GameStats);
