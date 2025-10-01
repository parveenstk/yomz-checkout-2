import { useFormStore } from "~~/stores";

export const params = () => {
    const formStore = useFormStore();
    const formFields = formStore.formFields

    const param = {
        firstName: formFields.firstName,
        lastName: formFields.lastName,
        emailAddress: formFields.email,
        phoneNumber: formFields.phoneNumber,
        address1: formFields.shipStreetAddress,
        postalCode: formFields.shipPostalCode,
        city: formFields.shipCity,
        state: formFields.shipState,
        country: formFields.shipCounty,
        shipFirstName: formFields.shipFirstName,
        shipLastName: formFields.shipLastName,
        shipAddress1: formFields.shipStreetAddress,
        shipAddress2: formFields.shipApptsAddress,
        shipPostalCode: formFields.shipPostalCode,
        shipCity: formFields.shipCity,
        shipState: formFields.shipState,
        shipCountry: formFields.shipCounty,
    }

    return param
};

export const giftItemsData = [
    {
        img: "/images/git-logo.png",
        name: "YOMZ Collectible Sticker",
        oldPrice: "$4.99",
    },

    {
        img: "/images/feature-book2.jpg",
        name: "YOMZ Interactive E-book",
        oldPrice: "$9.99",
    },

    {
        img: "/images/feature-refund2.jpg",
        name: "Chance for Order Refund",
        oldPrice: "$239.97",
    },

    {
        img: "/images/feature-giftcard.jpg",
        name: "YOMZ $20 Gift Card",
        oldPrice: "$20.00",
    }
];