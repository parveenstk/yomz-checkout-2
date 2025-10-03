export interface ProductData {
    id: number;
    img: { [key: string]: string };
    title: { [key: string]: string };
    bagQty: number;
    compareAtPrice: number;
    price: number;
    percentageOff: number;
}

export interface FormFields {

    // Basic fields
    firstName: string;
    lastName: string;
    email: string;
    phoneNumber: string;

    // Shipping fields
    shipFirstName: string;
    shipLastName: string;
    shipStreetAddress: string;
    shipApptsAddress: string;
    shipCity: string;
    shipCounty: string;
    shipState: string;
    shipPostalCode: string;

    // Credit card fields
    creditCardNumber: string;
    cardCVV: string;
    expiryMonth: string;
    expiryYear: string;

    // Billing fields
    billingFirstName: string;
    billingLastName: string;
    billingStreetAddress: string;
    billingApptsAddress: string;
    billingCity: string;
    billingCounty: string;
    billingState: string;
    billingPostalCode: string;
};

export interface CampaignProducts {
    campaignProductId: number;
    productName: string;
    price: string;
    productQty: number;
    imageUrl: string;
    hasVariants: boolean;
    variants: CampaignVariant[];
}

export interface CampaignVariant {
    imageUrl: string;
    isOutOfStock: number; // or `boolean` if converted
    price: string;
    productSku: string;
    title: string;
    variantDetailId: number;
    variantName1: string;
    productQty: number;
    variantOptionName1: string;
    variantOptionName2: string;
}

export interface StructuredProducts {
    productId: number,
    productName: string,
    productImage: string,
    productPrice: string,
    ProductVariantName?: string;
    BagsQty?: string;
}