import {Socket} from "socket.io-client";
import {createSlice, PayloadAction} from "@reduxjs/toolkit";

export interface SocketState {
    socket: Socket | null
    uid: string,
    users: string[]
    loading: boolean
}

const initialState: SocketState = {
    socket: null,
    uid: '',
    users: [],
    loading: false,
}

export const socketSlice = createSlice({
    name: 'socket',
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    }
})

export default socketSlice.reducer