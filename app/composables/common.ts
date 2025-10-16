import { useCheckoutStore, useFormStore } from "~~/stores";

export const params = (type: string = "lead") => {
    // Config
    const config = useRuntimeConfig().public;
    // FormStore
    const formStore = useFormStore();
    const formFields = formStore.formFields

    // CheckoutStore
    const checkoutStore = useCheckoutStore();

    if (type === 'lead') {
        if (!formFields.firstName || !formFields.lastName || !formFields.email) return;

    }
    const param: { [key: string]: string } = {
        sessionId: getFromStorage('sessionId', "session")!,
        firstName: formFields.firstName,
        lastName: formFields.lastName,
        emailAddress: formFields.email,
        phoneNumber: formFields.phoneNumber,
        address1: formFields.billingStreetAddress,
        postalCode: formFields.billingPostalCode,
        city: formFields.billingCity,
        state: formFields.billingState,
        country: formFields.billingCounty,
        shipFirstName: formFields.shipFirstName,
        shipLastName: formFields.shipLastName,
        shipAddress1: formFields.shipStreetAddress,
        shipAddress2: formFields.shipApptsAddress,
        shipPostalCode: formFields.shipPostalCode,
        shipCity: formFields.shipCity,
        shipState: formFields.shipState,
        shipCountry: formFields.shipCounty,
        emailOptIn: '1',
        salesUrl: window.location.href,
        pageType: 'checkout',
        ipAddress: checkoutStore.ipAddress
    }

    // Product details
    const cart = checkoutStore.cartData;
    cart.forEach((product, index) => {
        if (product.ProductVariantName) {
            param[`product${index + 1}_id`] = config.gummyId.toString();
            param[`product${index + 1}_qty`] = '1';
            param[`variant${index + 1}_id`] = product.productId.toString();
        } else {
            param[`product${index + 1}_id`] = product.productId.toString();
            param[`product${index + 1}_qty`] = '1';
        }
    });
    if (type === 'order') {
        param.shipProfileId = formFields.shipProfile;
        param.paySource = formStore.paymentMethod?.toUpperCase()!;
        param.cardNumber = formFields.creditCardNumber;
        param.cardMonth = formFields.expiryMonth;
        param.cardSecurityCode = formFields.cardCVV;
        param.cardYear = formFields.expiryYear;
        param.orderId = checkoutStore.orderId;
    }

    return param
};

export const giftItemsData = [
    {
        id: 9202,
        img: "/images/gift1.jpg",
        name: "YOMZ Collectible Sticker",
        oldPrice: "$4.99",
    },

    {
        id: 9204,
        img: "/images/gift2.jpg",
        name: "YOMZ Interactive E-book",
        oldPrice: "$9.99",
    },

    {
        id: 9206,
        img: "/images/gift3.jpg",
        name: "YOMZ $20 Gift Card",
        oldPrice: "$20.00",
    },

    {
        id: 9208,
        img: "/images/gift4.jpg",
        name: "Chance for Order Refund",
        oldPrice: "$239.97",
    },
];