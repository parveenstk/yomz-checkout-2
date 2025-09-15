import { useNuxtApp } from "nuxt/app";

export function useKonnectiveApi() {
    const { $apiClient } = useNuxtApp();

    const request = async (
        routeName: string,
        method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE' = 'POST',
        payload: Record<string, any> = {},
        encrypt = false
    ) => {
        try {
            const response = await $apiClient.post(`/${routeName}`, {
                method,
                payload,
                encrypt,
            });

            if (response.data.encrypted) {
                const raw = atob(response.data.data); // Simple Base64 decryption
                return JSON.parse(raw);
            }

            return response.data.data;
        } catch (err: any) {
            throw new Error(err.response?.data?.error || 'API call failed');
        }
    };

    return { request };
}
