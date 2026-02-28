import api from '../apiClient';
import { SavedResume } from '@/types/dashboard';

export const resumeService = {
    getResumes: async (): Promise<SavedResume[]> => {
        const response = await api.get('/resumes');
        return response.data;
    },

    getResumeById: async (id: string): Promise<SavedResume> => {
        const response = await api.get(`/resumes/${id}`);
        return response.data;
    },

    createResume: async (resumeData: any): Promise<SavedResume> => {
        const response = await api.post('/resumes', resumeData);
        return response.data;
    },

    updateResume: async (id: string, resumeData: any): Promise<SavedResume> => {
        const response = await api.put(`/resumes/${id}`, resumeData);
        return response.data;
    },

    deleteResume: async (id: string): Promise<void> => {
        await api.delete(`/resumes/${id}`);
    },
};
