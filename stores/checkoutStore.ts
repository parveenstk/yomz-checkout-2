export const useCheckoutStore = defineStore('checkoutStore', () => {
    const allProducts: Ref<CampaignProducts[]> = ref([]);

    // to add save products in 'allProducts'
    const saveProducts = (products: CampaignProducts[]) => {
        console.log('products:', products);
        allProducts.value = [...products]
    };

    return {
        allProducts,
        saveProducts
    }
});