import {useAuthStore} from "~/stores/auth-store";

export default defineNuxtRouteMiddleware(async (to, from) => {
    const authStore = useAuthStore();

    console.log(`Navigating from ${from.path} to ${to.path}`);
    console.log('auth initialized', authStore.isInitialized);
    console.log('status', authStore.isLoginValid);

    if (!authStore.isInitialized) {
        await authStore.validateUserToken();

    }

    // Skip middleware for the login route
    if (to.path === '/login') {
        if (authStore.isLoginValid) {
            return navigateTo('/notifications');
        }
        console.log('Skipping middleware for the login route');
        return;
    }

    // Check if the user is authenticated
    if (!authStore.isLoginValid) {
        console.log('User is not authenticated, redirecting to login');
        return navigateTo('/login');
    }

    // Redirect to home if not already there
    // if (to.path !== '/') {
    //     console.log('Redirecting to home');
    //     return navigateTo('/');
    // }
});