import api from '../apiClient';
import { AuthResponse, User } from '@/types/auth';

export const authService = {
    login: async (credentials: any): Promise<AuthResponse> => {
        const response = await api.post('/auth/login', credentials);
        return response.data;
    },

    register: async (userData: any): Promise<AuthResponse> => {
        const response = await api.post('/auth/register', userData);
        return response.data;
    },

    forgotPassword: async (email: string): Promise<{ message: string }> => {
        const response = await api.post('/auth/forgot-password', { email });
        return response.data;
    },

    resetPassword: async (data: any): Promise<{ message: string }> => {
        const response = await api.post('/auth/reset-password', data);
        return response.data;
    },

    changePassword: async (data: any): Promise<{ message: string }> => {
        const response = await api.post('/auth/change-password', data);
        return response.data;
    },
};
