import { useCookie } from '#app'; // Nuxt's built-in cookie composable
import {authAPI} from "~/services/auth-api";

import {LoginRequest, type TokenResponse, type ValidateToken} from "~/model/auth/auth";
import {ref} from "vue";

const {
    login,
    logout,
    validateToken
} = authAPI();

// Cookie keys
const tokenKey = 'token';
const usernameKey = 'username';

export const useAuthStore = defineStore('authStore', () => {
    const defaultLoginRequest: LoginRequest = {
        username: '',
        password: ''
    };

    const isLoginValid = ref<boolean>(false);
    const isInitialized = ref(false);
    const showLogoutConfirmation = ref(false);

    const loginUser = async (username: string, password: string) => {
        const tokenResponse: TokenResponse = await login(new LoginRequest(username, password));

        // Use useCookie to handle token storage in cookies
        const tokenCookie = useCookie(tokenKey, { maxAge: 60 * 60 * 24 * 7 }); // Cookie lasts for 7 days
        const usernameCookie = useCookie(usernameKey, { maxAge: 60 * 60 * 24 * 7 });

        tokenCookie.value = ''; // Clear previous token
        usernameCookie.value = ''; // Clear previous username

        console.log('Token Response', tokenResponse.status)

        if (tokenResponse.status === 'VALID') {
            isLoginValid.value = true;
            tokenCookie.value = tokenResponse.token; // Set the new token in cookies
            usernameCookie.value = username; // Set username in cookies
        }
    };

    const validateUserToken = async () => {
        const username = useCookie(usernameKey).value || '';
        const token = useCookie(tokenKey).value || '';


        if(username && token){
            const validateTokenRequest: ValidateToken = {
                username,
                token,
            };

            console.log('init auth store - before validateToken');

            try {
                const response = await validateToken(validateTokenRequest);

                console.log('init auth store - after validateToken');
                isLoginValid.value = response.status === 'VALID';
            } catch (e) {
                console.error('Error in validateToken:', e);
                isLoginValid.value = false;
            }

        }else {
            isLoginValid.value = false;
        }

        isInitialized.value = true;
    };

    const logoutUser = async () => {
        const tokenCookie = useCookie(tokenKey);
        const usernameCookie = useCookie(usernameKey);

        const username = usernameCookie.value || '';
        const token = tokenCookie.value || '';

        if (username && token) {
            await logout({ username, token });
        }

        // Clear cookies on logout
        tokenCookie.value = null;
        usernameCookie.value = null;

        isLoginValid.value = false;
    };


    return {
        loginUser,
        isLoginValid,
        validateUserToken,
        isInitialized,
        logoutUser,
        showLogoutConfirmation
    };
});
