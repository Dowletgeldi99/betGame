import {Bet} from './Bet';

export interface Round {
    number: number;
    startTime: number;
    isBettingTimeEnd: boolean;
    endTime: number;
    roundMultiplier: number
    bets: Bet[];
    betResults: Bet[];
}
