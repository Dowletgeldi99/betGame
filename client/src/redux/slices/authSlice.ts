import {createSlice, PayloadAction} from "@reduxjs/toolkit";
import {RootState} from "../store";
import {getMe, logout, register} from "../thunks/auth";
import {IUser} from "../../types/User";

export interface AuthState {
    user: IUser | null;
    loading: boolean;
    errorMessage: string;
}

const initialState: AuthState = {
    user: null,
    loading: false,
    errorMessage: '',
};

export const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setLoading: (state, action: PayloadAction<boolean>) => {
            state.loading = action.payload;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
            })
            .addCase(register.rejected, (state, action) => {
                state.errorMessage = action.payload as string;
            })
            .addCase(getMe.pending, (state) => {
                state.loading = true;
            })
            .addCase(getMe.fulfilled, (state, action: PayloadAction<IUser>) => {
                state.user = action.payload;
                state.loading = false;
            })
            .addCase(getMe.rejected, (state, action) => {
                state.loading = false;
                state.errorMessage = action.payload as string;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
            })
    },
});

export const {setLoading} = authSlice.actions;

export const selectLoading = (state: RootState): boolean => state.auth.loading;
export const selectUser = (state: RootState): IUser | null => state.auth.user;

export default authSlice.reducer;
