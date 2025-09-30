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