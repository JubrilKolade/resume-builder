import { useMutation } from '@tanstack/react-query';
import { authService } from '@/lib/services/authService';

export const useAuthMutations = () => {
    const loginMutation = useMutation({
        mutationFn: authService.login,
    });

    const registerMutation = useMutation({
        mutationFn: authService.register,
    });

    const forgotPasswordMutation = useMutation({
        mutationFn: authService.forgotPassword,
    });

    const resetPasswordMutation = useMutation({
        mutationFn: authService.resetPassword,
    });

    return {
        login: loginMutation.mutateAsync,
        isLoggingIn: loginMutation.isPending,
        register: registerMutation.mutateAsync,
        isRegistering: registerMutation.isPending,
        forgotPassword: forgotPasswordMutation.mutateAsync,
        resetPassword: resetPasswordMutation.mutateAsync,
    };
};
