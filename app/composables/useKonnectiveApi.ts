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

// Fetch Query Campaign
export const queryCampaign = async () => {
    const checkoutStore = useCheckoutStore();
    const config = useRuntimeConfig();
    const response = await request('/queryCampaign', {});
    const data = response.message.data[config.public.campaignId];
    const products: CampaignProducts[] = data.products;
    const shipProfiles: ShipProfile[] = data.shipProfiles;
    const countries: Country[] = data.countries;
    checkoutStore.availableCountires = [...countries];

    const structuredProducts: StructuredProducts[] = []; // For Products
    const simplifiedRules: SimplifiedRule[] = []; // For ShipProfiles

    // ship profiles
    shipProfiles.forEach((profile) => {
        if (profile.rules && profile.rules.length > 0) {
            profile.rules.forEach((rule) => {
                simplifiedRules.push({
                    profileName: profile.profileName,
                    productTypeSelect: rule.productTypeSelect,
                    shipPrice: rule.shipPrice,
                    shipProfileId: profile.shipProfileId
                });
            });
        }
    });
    checkoutStore.shipProfiles = [...simplifiedRules]
    // console.log("Simplified rules:", checkoutStore.shipProfiles);

    // All products
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
                productPrice: product.price,
                productType: product.productType,
                compareAtPrice: compareAtPrice[product.productName]?.price,
            });
        }
    });

    // console.log("structuredProducts:", structuredProducts);

    // Filter gummy products directly here
    let gummyProducts = structuredProducts.filter(product =>
        config.public.variantIds.includes(product.productId)
    );

    gummyProducts.forEach(pr => {
        pr.productName = pr.productName + " Gummies";
    })

    // Gift Products
    const giftProducts = structuredProducts.filter(product => config.public.giftItems.includes(product.productId));

    // Save both to the store (you'll need to update the store method)
    checkoutStore.saveProducts(structuredProducts, gummyProducts, giftProducts);
};

// Fetch Import Click 
export const importClick = async () => {
    const response = await request('/importClick', {
        pageType: 'checkoutPage',
        requestUri: window.location.href,
        sessionId: getFromStorage('sessionId', 'session') || ''
    });

    saveToStorage('sessionId', response.message.sessionId, 'session');
    console.log("sessionId:", getFromStorage('sessionId', 'session'));
};

// Fetch Import Lead
export const importLead = async () => {
    // checkoutStore
    const checkoutStore = useCheckoutStore();
    const payload = params();
    if (!payload) return;
    const response = await request('/importLead', payload);
    if (response.result !== "SUCCESS") return;
    saveToStorage("orderId", response.message.orderId, "session");
    checkoutStore.orderId = response.message.orderId;
};

// Import Order
export const importOrder = async () => {
    const router = useRouter()
    const payload = params('order');
    if (!payload) return;
    const response = await request('/importOrder', payload);
    console.log(response);
    if (response.result !== "SUCCESS") return;
    router.push('orderconfirmation')
};

// Countries
export const countries = async () => {
    const checkoutStore = useCheckoutStore();
    const response = await request('/countires', {}, false, "GET");
    checkoutStore.allCountries = response;
    // console.log('countries:', checkoutStore.allCountries); // debug
};

// Ip Address 
export const fetchIpInfo = async () => {
    try {
        const requestOptions: RequestInit = {
            method: "GET",
            redirect: "follow",
        };
        // await fetch("https://ipinfo.io/json", requestOptions)
        const checkoutStore = useCheckoutStore();
        const response = await fetch("https://ipinfo.io/json", requestOptions);
        const data = await response.json();
        const ip = data.ip; // getting ip address

        checkoutStore.ipAddress = ip;
        console.log('checkoutStore.ipAddress:', checkoutStore.ipAddress);

        return { data, ip };
    } catch (error) {
        // throw new Error;
        console.error("Error fetching IP address:", error);
        return error;
    }
};