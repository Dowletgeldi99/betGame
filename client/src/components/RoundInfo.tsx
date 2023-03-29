import React, {FC, useEffect, useState} from 'react';
import {ImTrophy} from 'react-icons/all';
import Table from './Table';
import {Round} from "../types/Round";
import {Bet} from "../types/Bet";

interface IRoundInfoProps {
    currentRound: Round | null
}

const RoundInfo: FC<IRoundInfoProps> = ({currentRound}) => {
    const [bets, setBets] = useState<Bet[]>([])
    useEffect(() => {
        if (currentRound) {
            setBets(currentRound.bets)
        }
    }, [currentRound])
    return (
        <div className={'py-4'}>
            <div className={'flex items-center'}>
                <ImTrophy size={24} className={'text-red-400'}/>
                <h2 className={'text-lg ml-2 capitalize font-semibold'}>
                    Current round
                </h2>
            </div>
            <Table heads={['username', 'points', 'multiplier']} rows={bets}/>
        </div>
    );
};

export default RoundInfo;
