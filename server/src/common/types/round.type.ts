import {Bet} from './bet.types';

export interface Round {
    number: number;
    startTime: number;
    isBettingTimeEnd: boolean;
    endTime: number;
    roundMultiplier: number
    bets: Bet[];
    betResults: Bet[];
}

// export let currentRound: Round = null;
