import React, {FC} from 'react';
import RoundInfo from './RoundInfo';
import GameBet from './GameBet';
import {Round} from "../types/Round";
import {Socket} from "socket.io-client";

interface IGameNavProps {
    socket: Socket
    currentRound: Round | null
}

const GameNav: FC<IGameNavProps> = ({socket, currentRound}) => {

    return (
        <div className={'h-full'}>
            <GameBet socket={socket} currentRound={currentRound}/>
            <RoundInfo currentRound={currentRound}/>
        </div>
    );
};

export default GameNav;
