import { defineStore } from "pinia";
import { ref, type Reactive, type Ref } from "vue";
// import type { CampaignProducts } from "~/utils/interface";

export const useCheckoutStore = defineStore('checkoutStore', () => {
    const config = useRuntimeConfig().public;
    const allProducts: Ref<StructuredProducts[]> = ref([]);
    const gummyProducts: Ref<StructuredProducts[]> = ref([]);
    const ogBags: Ref<StructuredProducts[]> = ref([]);
    const sourBags: Ref<StructuredProducts[]> = ref([]);
    let cartData: Ref<StructuredProducts[]> = ref([]);
    const selectedGummyType: Ref<number> = ref(config.variantIds[0]!);
    const selectedQuantity: Ref<number> = ref(2);

    // to add save products in 'allProducts'
    const saveProducts = (
        products: StructuredProducts[],
        filteredGummyProducts: StructuredProducts[],
        bags: StructuredProducts[]
    ) => {
        allProducts.value = [...products];
        console.log("allProducts.value:", allProducts.value);

        gummyProducts.value = [...filteredGummyProducts];
        // console.log('gummyProducts.value:', gummyProducts.value);
    };

    // Add Product in Cart
    const addGummyProduct = (): void => {
        const selectedProduct = allProducts.value.find(
            (product) => product.productId === selectedGummyType.value
        );
        // console.log('selectedGummyType.value:', selectedGummyType.value)

        if (!selectedProduct) {
            console.warn('Product not found');
            return;
        }

        // Example logic: replace the first item in cartData with the selected product
        cartData.value[0] = { ...selectedProduct }; // You might want to clone it or customize it

        // console.log("cartData!:", cartData.value);
        // console.log("Selected Product:", selectedGummyType.value, selectedQuantity.value);
    };

    const addExtraProduct = () => {
        if (cartData.value && cartData.value.length > 1) {
            cartData.value.pop();
        } else {
            const selectedProduct = gummyProducts.value.find(
                (product) => product.productId !== selectedGummyType.value
            );

            if (!selectedProduct) {
                console.warn('Product not found');
                return;
            }

            cartData.value[1] = { ...selectedProduct };
        }

    }

    return {
        allProducts,
        saveProducts,
        gummyProducts,
        selectedGummyType,
        selectedQuantity,
        addGummyProduct,
        cartData,
        addExtraProduct
    }
});