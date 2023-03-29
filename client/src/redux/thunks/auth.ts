import {createAsyncThunk} from '@reduxjs/toolkit';
import authApi from "../../api/auth";
import {ISignUpPayload} from "../../types/Auth";


export const getMe = createAsyncThunk(
    'auth/getMe',
    async (_, thunkAPI) => {
        try {
            return await authApi.getMe();
        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    },
);
export const register = createAsyncThunk(
    'auth/register',
    async (data: ISignUpPayload, thunkAPI) => {
        try {
            const res = await authApi.register(data);

            localStorage.setItem("token", res.token);

            return res.data;
        } catch (error: any) {
            const message = error?.response?.data?.message || error.message || error.toString();

            return thunkAPI.rejectWithValue(message);
        }
    },
);

export const logout = createAsyncThunk(
    'auth/logout',
    () => {
        authApi.logout();
    }
);
