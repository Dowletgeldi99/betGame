import React, {FC} from 'react';
import {ImTrophy} from 'react-icons/all';
import Table from './Table';
import {Ranking} from "../types/Ranking";

interface IRankingInfoProps {
    rankingInfo: Ranking[]
}

const RankingInfo: FC<IRankingInfoProps> = ({rankingInfo}) => {
    return (
        <div className={'py-4 w-1/2'}>
            <div className={'flex items-center mb-2'}>
                <ImTrophy size={24} className={'text-red-400'}/>
                <h2 className={'text-lg ml-2 capitalize font-semibold'}>
                    Ranking
                </h2>
            </div>
            <Table heads={['no.', 'username', 'score']} rows={rankingInfo?.map((item, index) => ({
                'no.': ++index,
                ...item
            }))}/>
        </div>
    );
};

export default RankingInfo;
