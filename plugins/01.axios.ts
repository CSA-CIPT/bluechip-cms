// plugins/axios.ts
import axios from "axios";
import { defineNuxtPlugin } from "#app";

export default defineNuxtPlugin(nuxtApp => {

    const router = useRouter();
    const axiosInstance = axios.create({
        baseURL: process.env.API_BASE_URL || 'http://192.168.150.162:8181/api',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: false,
        proxy: false,
        timeout: 10000,
    });

    axiosInstance.interceptors.request.use(
        config => {


            config.headers['x-session-token'] = localStorage.getItem('token') || '';
            config.headers['username'] = localStorage.getItem('username') || '';
            //config.headers['x-app-origin'] = 'csa-cms';
            return config;
        },
        error => {
            if (axios.isAxiosError(error) && error.response) {
                const message = error.response.data.message || 'An error occurred';
                const statusCode = error.response.status;

            } else {

            }
            return Promise.reject(error);
        }
    );

    axiosInstance.interceptors.response.use(
        response => response,
        error => {


            if (axios.isAxiosError(error) && error.response) {
                const message = error.response.data.message || 'An error occurred';
                const statusCode = error.response.status;

                if (statusCode == 401) {
                }

            } else {

            }
            return Promise.reject(error);
        }
    );

    nuxtApp.provide('axios', axiosInstance);
});
