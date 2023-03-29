import axios from "axios";
import {IAxiosInstance} from "../types/AxiosInstance";
import {IServerError} from "../types/Auth";

// export const BASE_URL = 'http://localhost:3000/api/v1/';
export const BASE_URL = 'http://localhost:3000/';

const axiosOptions = {
    baseURL: BASE_URL,
}

const axiosInstance = axios.create(axiosOptions);

const DEFAULT_ERROR: IServerError = {
    code: 'SERVER__ERROR',
    message: 'SERVER__ERROR',
    data: {},
};

axiosInstance.interceptors.request.use(
    async (reqConfig) => {
        const jwt = localStorage.getItem("token")

        if (jwt && (reqConfig.headers !== null)) {
            reqConfig.headers.Authorization = jwt;
        }

        return reqConfig;
    },
    async (err) => Promise.reject(err),
);

axiosInstance.interceptors.response.use(
    (successResponse) => {
        if (!successResponse.data) {
            throw DEFAULT_ERROR;
        }

        if (successResponse.headers.authorization) {
            return {
                token: successResponse.headers.authorization,
                ...successResponse.data, // in order to escape code like: res.data.data
            }
        }

        return successResponse.data.data; // in order to escape code like: res.data.data
    },
    async (failedResponse) => {
        if (!failedResponse.response.data.statusCode) {
            throw DEFAULT_ERROR;
        }

        throw failedResponse.response.data;
    },
);

export default axiosInstance as unknown as IAxiosInstance;
