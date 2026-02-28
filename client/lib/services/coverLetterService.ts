import api from '../apiClient';
import { CoverLetterData } from '@/types/coverLetter';

export const coverLetterService = {
    getCoverLetters: async () => {
        const response = await api.get('/cover-letters');
        return response.data;
    },

    getCoverLetterById: async (id: string) => {
        const response = await api.get(`/cover-letters/${id}`);
        return response.data;
    },

    createCoverLetter: async (data: any) => {
        const response = await api.post('/cover-letters', data);
        return response.data;
    },

    updateCoverLetter: async (id: string, data: any) => {
        const response = await api.put(`/cover-letters/${id}`, data);
        return response.data;
    },

    deleteCoverLetter: async (id: string) => {
        await api.delete(`/cover-letters/${id}`);
    },
};
