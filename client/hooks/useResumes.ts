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
        onMutate: async (newResume) => {
            await queryClient.cancelQueries({ queryKey: ['resumes'] });
            const previousResumes = queryClient.getQueryData(['resumes']);
            queryClient.setQueryData(['resumes'], (old: any) => [...(old || []), { ...newResume, id: 'temp-' + Date.now() }]);
            return { previousResumes };
        },
        onError: (err, newResume, context: any) => {
            queryClient.setQueryData(['resumes'], context.previousResumes);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['resumes'] });
        },
    });

    const updateResumeMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            resumeService.updateResume(id, data),
        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({ queryKey: ['resumes'] });
            const previousResumes = queryClient.getQueryData(['resumes']);
            queryClient.setQueryData(['resumes'], (old: any) =>
                old?.map((resume: any) => resume.id === id ? { ...resume, ...data } : resume)
            );
            return { previousResumes };
        },
        onError: (err, variables, context: any) => {
            queryClient.setQueryData(['resumes'], context.previousResumes);
        },
        onSettled: (data) => {
            queryClient.invalidateQueries({ queryKey: ['resumes'] });
            if (data?.id) {
                queryClient.invalidateQueries({ queryKey: ['resume', data.id] });
            }
        },
    });

    const deleteResumeMutation = useMutation({
        mutationFn: resumeService.deleteResume,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['resumes'] });
            const previousResumes = queryClient.getQueryData(['resumes']);
            queryClient.setQueryData(['resumes'], (old: any) =>
                old?.filter((resume: any) => resume.id !== id)
            );
            return { previousResumes };
        },
        onError: (err, id, context: any) => {
            queryClient.setQueryData(['resumes'], context.previousResumes);
        },
        onSettled: () => {
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
