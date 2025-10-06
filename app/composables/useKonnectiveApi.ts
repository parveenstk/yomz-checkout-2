import axios, { type AxiosRequestConfig, type Method } from "axios";
import { useCheckoutStore } from "../../stores/index";
import { getFromStorage, saveToStorage } from "~/utils/storage";
import { params } from "./common";
import { compareAtPrice } from "~/assets/data/checkout";

const api = axios.create({
    baseURL: 'api/konnective', // change this to your API base URL
    // baseURL: 'http://localhost:3000/api/konnective', // Absolute URL required in Node.js
    headers: {
        'Content-Type': 'application/json',
    },
})

type ApiResponse<T = any> = {
    encrypted?: boolean
    data: T | string
};

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
            ...(method === 'GET' ? { params: payload } : { data: { payload } }),
            headers: {
                ...(encrypt ? { 'X-Encrypt': '1' } : {}),
            },
        }
        // console.log("config:", config)

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
};

// Fetch Import Click 
export const importClick = async () => {
    const response = await request('/importClick', {
        pageType: 'checkoutPage',
        requestUri: window.location.href,
        sessionId: getFromStorage('sessionId', 'session') || ''
    });

    // console.log("response:", response.message.sessionId);
    saveToStorage('sessionId', response.message.sessionId, 'session');
    console.log("sessionId:", getFromStorage('sessionId', 'session'));
};

// Fetch Import Lead
export const importLead = async () => {
    const payload = params()
    const response = await request('/importLead', payload)
};

// Fetch Query Campaign
export const queryCampaign = async () => {
    const checkoutStore = useCheckoutStore();
    const config = useRuntimeConfig();
    const response = await request('/queryCampaign', {});
    const data = response.message.data[config.public.campaignId];
    const products: CampaignProducts[] = data.products;

    const structuredProducts: StructuredProducts[] = [];
    // console.log('structuredProducts:', structuredProducts);

    products.forEach((product: CampaignProducts) => {
        if (product.hasVariants) {
            const variants = product.variants;
            variants.forEach((variant) => {
                structuredProducts.push({
                    productId: variant.variantDetailId,
                    productName: variant.title,
                    productImage: variant.imageUrl,
                    productPrice: variant.price,
                    ProductVariantName: variant.variantOptionName1,
                    BagsQty: variant.variantOptionName2,
                    compareAtPrice: compareAtPrice[variant.variantOptionName2]?.price,
                    percentageOff: compareAtPrice[variant.variantOptionName2]?.discount,
                });
            });
        } else {
            structuredProducts.push({
                productId: product.campaignProductId,
                productName: product.productName,
                productImage: product.imageUrl,
                productPrice: product.price
            });
        }
    });

    // Filter gummy products directly here
    let gummyProducts = structuredProducts.filter(product =>
        config.public.variantIds.includes(product.productId)
    );

    // Filter OG Gummies Bags
    let ogBags = structuredProducts.filter(product =>
        config.public.ogBags.includes(product.productId)
    );

    // Filter Sour Gummies Bags
    let sourBags = structuredProducts.filter(product =>
        config.public.sourBags.includes(product.productId)
    );

    // console.log('ogBags:', ogBags)
    // console.log('sourBags:', sourBags)

    gummyProducts.forEach(pr => {
        pr.productName = pr.productName + " Gummies";
    })

    // Save both to the store (you'll need to update the store method)
    checkoutStore.saveProducts(structuredProducts, gummyProducts, ogBags);
};
