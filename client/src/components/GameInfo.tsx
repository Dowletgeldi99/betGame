import React, {FC} from 'react';
import MedalIcon from '../../assets/icons/Medal.png';
import AvatarIcon from '../../assets/icons/avatar.png';
import WatchIcon from '../../assets/icons/watch.png';

interface IGameInfoProps {
    totalPoints: number
    username: string
}

const GameInfo: FC<IGameInfoProps> = ({totalPoints, username}) => {
    return (
        <div className={'flex gap-x-4 justify-between'}>
            <div
                className={
                    'flex items-center font-semibold rounded-md p-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 w-full border border-gray-600'
                }
            >
                <img src={MedalIcon} className={'w-10'} alt={''}/>
                <p className={'mx-auto'}>{totalPoints}</p>
            </div>
            <div
                className={
                    'flex items-center font-semibold rounded-md p-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 w-full border border-gray-600'
                }
            >
                <img src={AvatarIcon} className={'w-10'} alt={''}/>
                <p className={'mx-auto'}>{username}</p>
            </div>
            <div
                className={
                    'flex items-center font-semibold rounded-md p-2 bg-gradient-to-r from-gray-900 via-gray-800 to-gray-700 w-full border border-gray-600'
                }
            >
                <img src={WatchIcon} className={'w-10'} alt={''}/>
                <p className={'mx-auto'}>{new Date().getHours()}:{new Date().getMinutes()}</p>
            </div>
        </div>
    );
};

export default GameInfo;
