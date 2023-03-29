import {Round} from "../../types/Round";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";

export interface CurrentRoundState {
    currentRound: Round | null
    loading: boolean
    currentRoundPlaying: boolean
}

const initialState: CurrentRoundState = {
    currentRound: null,
    loading: false,
    currentRoundPlaying: false
}

export const currentRoundSlice = createSlice({
    name: 'currentRound',
    initialState,
    reducers: {
        setCurrentRound: (state, action: PayloadAction<Round | null>) => {
            state.currentRound = action.payload;
        },
        setCurrentRoundPlaying: (state, action: PayloadAction<boolean>) => {
            state.currentRoundPlaying = action.payload;
        },
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    }
})

export const {setCurrentRound} = currentRoundSlice.actions
export const {setCurrentRoundPlaying} = currentRoundSlice.actions

export const selectLoading = (state: RootState): boolean => state.currentRound.loading;
export const selectCurrentRound = (state: RootState): Round | null => state.currentRound.currentRound
export const selectCurrentRoundPlaying = (state: RootState): boolean => state.currentRound.currentRoundPlaying
export default currentRoundSlice.reducer