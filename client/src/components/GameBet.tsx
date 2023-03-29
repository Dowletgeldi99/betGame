import React, {useState} from 'react';
import {AiFillCaretDown, AiFillCaretUp} from 'react-icons/all';
import {Round} from "../types/Round";
import Input from "./Input";
import {Socket} from "socket.io-client";

interface IGameBetProps {
    socket: Socket
    currentRound: Round | null
}

const GameBet: React.FC<IGameBetProps> = ({socket, currentRound}) => {
    const [points, setPoints] = useState(50)
    const [multiplier, setMultiplier] = useState(1)
    const handleBetSubmit = () => {
        if (currentRound?.isBettingTimeEnd) return
        socket.emit('bet', {points, multiplier});
    }

    return (
        <div>
            <div className={'flex gap-x-4'}>
                <div
                    className={
                        'text-center font-semibold rounded-md p-2 bg-gradient-to-r from-gray-900 via-gray-800 w-full to-gray-700 border border-gray-600'
                    }
                >
                    <p className={'text-xs font-normal text-gray-400'}>Points</p>
                    <div className={'flex items-center justify-center gap-x-1'}>
                        <AiFillCaretDown
                            className={'border border-gray-600 rounded p-0.5'}
                            size={22}
                            onClick={() => points > 25 && setPoints(prevValue => prevValue -= 25)}
                        />
                        <Input value={points} setValue={setPoints}/>
                        <AiFillCaretUp
                            className={'border border-gray-600 rounded p-0.5'}
                            size={22}
                            onClick={() => setPoints(prevValue => prevValue += 25)}
                        />
                    </div>
                </div>
                <div
                    className={
                        'text-center font-semibold rounded-md p-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 w-full border border-gray-600'
                    }
                >
                    <p className={'text-xs font-normal'}>Multiplier</p>
                    <div className={'flex items-center justify-center gap-x-1'}>
                        <AiFillCaretDown
                            className={'border border-gray-600 rounded p-0.5'}
                            size={22}
                            onClick={() => multiplier > 1 && setMultiplier(prevValue => prevValue -= .25)}
                        />
                        <Input value={multiplier} setValue={setMultiplier}/>
                        <AiFillCaretUp
                            className={'border border-gray-600 rounded p-0.5'}
                            size={22}
                            onClick={() => setMultiplier(prevValue => prevValue += .25)}
                        />
                    </div>
                </div>
            </div>
            <button
                className={
                    `${(!currentRound || currentRound?.isBettingTimeEnd) ? 'bg-gray-300 cursor-not-allowed' : 'bg-gradient-to-r'} from-pink-600 via-pink-500 to-orange-600 w-full py-3 rounded-md mt-4 font-semibold`
                }
                disabled={currentRound?.isBettingTimeEnd}
                onClick={handleBetSubmit}
            >
                Bet
            </button>
        </div>
    );
};

export default GameBet;
