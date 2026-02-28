import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { resumeService } from '@/lib/services/resumeService';
import { SavedResume } from '@/types/dashboard';

export const useResumes = () => {
    const queryClient = useQueryClient();

    const resumesQuery = useQuery({
        queryKey: ['resumes'],
        queryFn: resumeService.getResumes,
    });

    const createResumeMutation = useMutation({
        mutationFn: resumeService.createResume,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resumes'] });
        },
    });

    const updateResumeMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            resumeService.updateResume(id, data),
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ['resumes'] });
            queryClient.invalidateQueries({ queryKey: ['resume', data.id] });
        },
    });

    const deleteResumeMutation = useMutation({
        mutationFn: resumeService.deleteResume,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['resumes'] });
        },
    });

    return {
        resumes: resumesQuery.data ?? [],
        isLoading: resumesQuery.isLoading,
        isError: resumesQuery.isError,
        error: resumesQuery.error,
        createResume: createResumeMutation.mutateAsync,
        updateResume: updateResumeMutation.mutateAsync,
        deleteResume: deleteResumeMutation.mutateAsync,
    };
};

export const useResume = (id: string) => {
    return useQuery({
        queryKey: ['resume', id],
        queryFn: () => resumeService.getResumeById(id),
        enabled: !!id,
    });
};
