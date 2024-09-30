
import axios from "axios";
import { defineNuxtPlugin } from "#app";
import {useErrorStore} from "~/stores/error-store";
import {useAuthStore} from "~/stores/auth-store";

export default defineNuxtPlugin((nuxtApp) => {
    const router = useRouter();
    const authStore = useAuthStore();

    const axiosInstance = axios.create({
        baseURL: process.env.API_BASE_URL || 'http://192.168.150.127:7700/api',
        headers: {
            'Content-Type': 'application/json',
        },
        withCredentials: true, // false as we'll be manually adding cookies in headers || true Allow sending cookies with requests
        timeout: 10000,
    });

    const errorStore = useErrorStore();

    // Request interceptor to add cookies to headers
    axiosInstance.interceptors.request.use(
        (config) => {
            errorStore.clearError();

            // Retrieve token and username from cookies
            const token = useCookie('token').value || '';
            const username = useCookie('username').value || '';

            if (token) {
                config.headers['x-session-token'] = token; // Set token from cookies
            }
            if (username) {
                config.headers['username'] = username; // Set username from cookies
            }

            config.headers['x-app-origin'] = 'csa-cms';
            return config;
        },
        (error) => {
            if (axios.isAxiosError(error) && error.response) {
                const message = error.response.data.message || 'An error occurred';
                const statusCode = error.response.status;
                errorStore.setError(message, statusCode);
            } else {
                errorStore.setError('An unexpected error occurred', 500);
            }
            return Promise.reject(error);
        }
    );

    // Response interceptor
    axiosInstance.interceptors.response.use(
        (response) => response,
        (error) => {
            const errorStore = useErrorStore();

            if (axios.isAxiosError(error) && error.response) {
                const message = error.response.data.message || 'An error occurred';
                const statusCode = error.response.status;

                if (statusCode === 401) {
                    authStore.isLoginValid = false; // Mark the user as logged out
                }
                errorStore.setError(message, statusCode);
            } else {
                errorStore.setError('An unexpected error occurred', 500);
            }
            return Promise.reject(error);
        }
    );

    nuxtApp.provide('axios', axiosInstance);
});
