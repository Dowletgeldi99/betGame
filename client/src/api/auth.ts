import axios from './axios';
import {IAuth, ISignUpPayload} from "../types/Auth";
import {IUser} from "../types/User";


const authApi = {
    // login(data: ISignInPayload) {
    //   return axios.post<IAuth>('auth/login', data);
    // },
    register(data: ISignUpPayload) {
        return axios.post<IAuth>('auth/register', data);
    },
    getMe() {
        return axios.get<IUser>('auth/me');
    },
    logout() {
        localStorage.removeItem("token");
    },
};

export default authApi;
