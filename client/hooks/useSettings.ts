import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { settingsService } from '@/lib/services/settingsService';

export const useSettings = () => {
    const queryClient = useQueryClient();

    const settingsQuery = useQuery({
        queryKey: ['settings'],
        queryFn: settingsService.getSettings,
    });

    const updateMutation = useMutation({
        mutationFn: settingsService.updateSettings,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['settings'] });
        },
    });

    return {
        settings: settingsQuery.data,
        isLoading: settingsQuery.isLoading,
        updateSettings: updateMutation.mutateAsync,
    };
};
