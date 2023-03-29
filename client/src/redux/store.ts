import {Action, configureStore, ThunkAction} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import currentRoundReducer from "./slices/currentRoundSlice";
import socketReducer from "./slices/socketSlice";

export const store = configureStore({
    reducer: {
        auth: authReducer,
        currentRound: currentRoundReducer,
        socket: socketReducer,
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
    ReturnType,
    RootState,
    unknown,
    Action<string>
>;
