import { useQuery } from '@tanstack/react-query';
import { dashboardService } from '@/lib/services/dashboardService';

export const useDashboardStats = () => {
    return useQuery({
        queryKey: ['dashboard-stats'],
        queryFn: dashboardService.getStats,
    });
};
