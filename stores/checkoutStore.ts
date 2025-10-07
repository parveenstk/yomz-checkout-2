import { defineStore } from "pinia";
import { ref, type Reactive, type Ref } from "vue";
// import type { CampaignProducts } from "~/utils/interface";

export const useCheckoutStore = defineStore('checkoutStore', () => {
    const config = useRuntimeConfig().public;
    const allProducts: Ref<StructuredProducts[]> = ref([]);
    const gummyProducts: Ref<StructuredProducts[]> = ref([]);
    const giftsProducts: Ref<StructuredProducts[]> = ref([]);
    let cartData: Ref<StructuredProducts[]> = ref([]);
    let giftCartData: Ref<StructuredProducts[]> = ref([]);
    const selectedGummyType: Ref<string> = ref("ogGummie");
    const selectedQuantity: Ref<number> = ref(2);

    // to add save products in 'allProducts'
    const saveProducts = (
        products: StructuredProducts[],
        filteredGummyProducts: StructuredProducts[],
        filteredGiftsProducts: StructuredProducts[],
    ) => {
        allProducts.value = [...products];
        // console.log("allProducts.value:", allProducts.value);

        gummyProducts.value = [...filteredGummyProducts];
        // console.log('gummyProducts.value:', gummyProducts.value);

        giftsProducts.value = [...filteredGiftsProducts];
        console.log('giftsProducts.value:', giftsProducts.value);
    };

    // Add Product in Cart
    const addGummyProduct = (): void => {
        const selectedProduct = allProducts.value.find(
            (product) => product.productId === selectedQuantity.value
        );
        // console.log('selectedGummyType.value:', selectedGummyType.value)

        if (!selectedProduct) {
            console.warn('Product not found');
            return;
        }

        // logic: replace the first item in cartData with the selected product
        cartData.value[0] = { ...selectedProduct };
    };

    // add extra product
    const addExtraProduct = () => {
        if (cartData.value && cartData.value.length > 1) {
            cartData.value.pop();
        } else {
            const selectedProduct = gummyProducts.value.find(
                (product) => product.productId !== +selectedGummyType.value
            );

            if (!selectedProduct) {
                console.warn('Product not found');
                return;
            }

            cartData.value[1] = { ...selectedProduct };
        }

    }

    // Add GiftProducts in cart
    const addGiftProducts = (giftProducts: number[]) => {
        giftCartData = allProducts.value.filter(
            (product) => giftProducts.includes(product.productId)
        )
        console.log("giftCartData", giftCartData);
    };

    return {
        allProducts,
        saveProducts,
        gummyProducts,
        giftsProducts,
        selectedGummyType,
        selectedQuantity,
        addGummyProduct,
        cartData,
        addExtraProduct,
        addGiftProducts
    }
});