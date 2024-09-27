

import type {LoginRequest, LogoutRequest, TokenResponse, ValidateToken} from "~/model/auth/auth";

const axios = () => {
    const { $axios } = useNuxtApp();
    return $axios;
}

export const authAPI = () => {
    const login = async (request: LoginRequest): Promise<TokenResponse> => {
        const response = await axios().post('/csa/auth/login', request);
        return response.data;
    }

    const logout = async (request: LogoutRequest): Promise<TokenResponse> => {
        const response = await axios().post('/csa/auth/logout', request);
        return response.data;
    }

    const validateToken = async (request: ValidateToken): Promise<TokenResponse> => {
        const response = await axios().post('/csa/auth/check', request);
        return response.data;
    }

    return {
        login,
        logout,
        validateToken
    }
}