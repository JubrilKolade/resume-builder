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
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cover-letters'] });
        },
    });

    const updateMutation = useMutation({
        mutationFn: ({ id, data }: { id: string; data: any }) =>
            coverLetterService.updateCoverLetter(id, data),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['cover-letters'] });
        },
    });

    const deleteMutation = useMutation({
        mutationFn: coverLetterService.deleteCoverLetter,
        onSuccess: () => {
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
