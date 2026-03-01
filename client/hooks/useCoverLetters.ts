import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { coverLetterService } from '@/lib/services/coverLetterService';

export const useCoverLetters = () => {
    const queryClient = useQueryClient();

    const coverLettersQuery = useQuery({
        queryKey: ['cover-letters'],
        queryFn: coverLetterService.getCoverLetters,
    });

    const createMutation = useMutation({
        mutationFn: coverLetterService.createCoverLetter,
        onMutate: async (newLetter) => {
            await queryClient.cancelQueries({ queryKey: ['cover-letters'] });
            const previousLetters = queryClient.getQueryData(['cover-letters']);
            queryClient.setQueryData(['cover-letters'], (old: any) => [...(old || []), { ...newLetter, id: 'temp-' + Date.now() }]);
            return { previousLetters };
        },
        onError: (err, newLetter, context: any) => {
            queryClient.setQueryData(['cover-letters'], context.previousLetters);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cover-letters'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            coverLetterService.updateCoverLetter(id, data),
        onMutate: async ({ id, data }) => {
            await queryClient.cancelQueries({ queryKey: ['cover-letters'] });
            const previousLetters = queryClient.getQueryData(['cover-letters']);
            queryClient.setQueryData(['cover-letters'], (old: any) =>
                old?.map((letter: any) => letter.id === id ? { ...letter, ...data } : letter)
            );
            return { previousLetters };
        },
        onError: (err, variables, context: any) => {
            queryClient.setQueryData(['cover-letters'], context.previousLetters);
        },
        onSettled: (data) => {
            queryClient.invalidateQueries({ queryKey: ['cover-letters'] });
            if (data?.id) {
                queryClient.invalidateQueries({ queryKey: ['cover-letter', data.id] });
            }
        },
    });

    const deleteMutation = useMutation({
        mutationFn: coverLetterService.deleteCoverLetter,
        onMutate: async (id) => {
            await queryClient.cancelQueries({ queryKey: ['cover-letters'] });
            const previousLetters = queryClient.getQueryData(['cover-letters']);
            queryClient.setQueryData(['cover-letters'], (old: any) =>
                old?.filter((letter: any) => letter.id !== id)
            );
            return { previousLetters };
        },
        onError: (err, id, context: any) => {
            queryClient.setQueryData(['cover-letters'], context.previousLetters);
        },
        onSettled: () => {
            queryClient.invalidateQueries({ queryKey: ['cover-letters'] });
        },
    });

    return {
        coverLetters: coverLettersQuery.data ?? [],
        isLoading: coverLettersQuery.isLoading,
        createCoverLetter: createMutation.mutateAsync,
        updateCoverLetter: updateMutation.mutateAsync,
        deleteCoverLetter: deleteMutation.mutateAsync,
    };
};
