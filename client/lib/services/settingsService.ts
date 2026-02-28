import api from '../apiClient';
import { UserSettings } from '@/types/settings';

export const settingsService = {
    getSettings: async (): Promise<UserSettings> => {
        const response = await api.get('/settings');
        return response.data;
    },

    updateSettings: async (settings: Partial<UserSettings>): Promise<UserSettings> => {
        const response = await api.put('/settings', settings);
        return response.data;
    },
};
