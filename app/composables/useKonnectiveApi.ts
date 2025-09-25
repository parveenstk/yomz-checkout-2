import axios, { type AxiosRequestConfig, type Method } from "axios"

const api = axios.create({
    baseURL: 'api/konnective', // ✅ change this to your API base URL
    headers: {
        'Content-Type': 'application/json',
    },
})

type ApiResponse<T = any> = {
    encrypted?: boolean
    data: T | string
}
export const request = async <T = any>(
    route: string,
    payload: Record<string, any> = {},
    encrypt = false,
    method: Method = 'POST',
): Promise<T> => {
    try {
        const config: AxiosRequestConfig = {
            url: route,
            method,
            ...(method === 'GET' ? { params: payload } : { data: payload }),
            headers: {
                ...(encrypt ? { 'X-Encrypt': '1' } : {}),
            },
        }
        console.log("config:", config)

        const response = await api.request<ApiResponse<T>>(config)

        if (response.data.encrypted) {
            const decoded = atob(response.data.data as string)
            return JSON.parse(decoded)
        }

        return response.data.data as T
    } catch (error: any) {
        console.error('API Error:', error)
        throw new Error(error?.response?.data?.error || 'API request failed')
    }
}
