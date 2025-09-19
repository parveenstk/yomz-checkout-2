import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useFormStore = defineStore('formStore', () => {
    const form = ref(0);
    const formFields = {
        // basic fields
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',

        // shipping fields
        shipFirstName: '',
        shipLastName: '',
        shipStreetAddress: '',
        shipApptsAddress: '',
        shipCity: '',
        shipCounty: '',
        shipState: '',
        shipPostalCode: '',

        // credit card fields
        creditCardNumber: '',
        cardCVV: '',
        expiryMonth: '',
        expiryYear: '',

        // billing fields
        billingFirstName: '',
        billingLastName: '',
        billingStreetAddress: '',
        billingApptsAddress: '',
        billingCity: '',
        billingCounty: '',
        billingState: '',
        billingPostalCode: '',
    };

    const formSubmit = () => {
        console.log('formFields', JSON.stringify(formFields, null, 2))
    }

    return {
        formFields,
        formSubmit
    }
})
