import { defineStore } from 'pinia'
import { ref, reactive, type Reactive } from 'vue'
import { z, ZodError } from 'zod'

export const useFormStore = defineStore('formStore', () => {
    const form = ref(0)
    const formFields: Reactive<FormFields> = reactive({

        // Basic fields
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',

        // Shipping fields
        shipFirstName: '',
        shipLastName: '',
        shipStreetAddress: '',
        shipApptsAddress: '',
        shipCity: '',
        shipCounty: '',
        shipState: '',
        shipPostalCode: '',

        // Credit card fields
        creditCardNumber: '',
        cardCVV: '',
        expiryMonth: '',
        expiryYear: '',

        // Billing fields
        billingFirstName: '',
        billingLastName: '',
        billingStreetAddress: '',
        billingApptsAddress: '',
        billingCity: '',
        billingCounty: '',
        billingState: '',
        billingPostalCode: '',
    })

    // Zod schema
    const nameRegex = /^[A-Za-zÀ-ÿ\-'\s]{2,15}$/
    const cityRegex = /^[A-Za-zÀ-ÿ\s\-]{2,50}$/
    const stateRegex = /^[A-Z]{2}$/
    const postalCodeRegex = /^\d{5}(-\d{4})?$/
    const phoneRegex = /^\+?[0-9\s\-]{10,15}$/
    const streetRegex = /^[A-Za-z0-9À-ÿ\s,'\-\.]{5,100}$/

    const schema = z.object({
        // Basic
        firstName: z.string().regex(nameRegex, 'Invalid first name'),
        lastName: z.string().optional(),
        email: z.email('Invalid email address'),
        phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number'),

        // Shipping
        shipFirstName: z.string().regex(nameRegex, 'Invalid shipping first name'),
        shipLastName: z.string().optional(),
        shipStreetAddress: z.string().regex(streetRegex, 'Invalid street address'),
        shipApptsAddress: z.string().optional(),
        shipCity: z.string().regex(cityRegex, 'Invalid city'),
        shipCounty: z.string().regex(cityRegex, 'Invalid county'),
        shipState: z.string().regex(stateRegex, 'Invalid state (use 2-letter code)'),
        shipPostalCode: z.string().regex(postalCodeRegex, 'Invalid postal code'),

        // Credit card
        creditCardNumber: z.string().regex(/^\d{13,19}$/, 'Invalid credit card number'),
        cardCVV: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
        expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Invalid month'),
        expiryYear: z.string().regex(/^\d{4}$/, 'Invalid year'),

        // Billing
        billingFirstName: z.string().regex(nameRegex, 'Invalid billing first name'),
        billingLastName: z.string().optional(),
        billingStreetAddress: z.string().regex(streetRegex, 'Invalid billing street'),
        billingApptsAddress: z.string().optional(),
        billingCity: z.string().regex(cityRegex, 'Invalid city'),
        billingCounty: z.string().regex(cityRegex, 'Invalid county'),
        billingState: z.string().regex(stateRegex, 'Invalid state (use 2-letter code)'),
        billingPostalCode: z.string().regex(postalCodeRegex, 'Invalid postal code')
    })

    // error Define
    const errors = reactive<Record<string, string>>({
        firstName: '',
        lastName: '',
        email: '',
        phoneNumber: '',
        shipFirstName: '',
        shipLastName: '',
        shipStreetAddress: '',
        shipApptsAddress: '',
        shipCity: '',
        shipCounty: '',
        shipState: '',
        shipPostalCode: '',
        creditCardNumber: '',
        cardCVV: '',
        expiryMonth: '',
        expiryYear: '',
        billingFirstName: '',
        billingLastName: '',
        billingStreetAddress: '',
        billingApptsAddress: '',
        billingCity: '',
        billingCounty: '',
        billingState: '',
        billingPostalCode: '',
    })

    // Submit method
    const formSubmit = () => {
        const result = schema.safeParse(formFields)

        console.log('formFields', JSON.stringify(formFields, null, 2))

        // Clear previous errors
        Object.keys(errors).forEach((key) => {
            errors[key] = ''
        })

        if (!result.success) {
            const zodError = result.error as ZodError

            zodError.issues.forEach((err) => {
                const field = err.path[0]
                if (typeof field === 'string') {
                    errors[field] = err.message
                }
            })
            console.log('errors:', JSON.stringify(errors, null, 2));
            return false
        }

        resetForm();
        console.log('Form is valid!')
        return true
    }

    // Reset method
    const resetForm = () => {
        Object.keys(formFields).forEach((key) => {
            formFields[key as keyof FormFields] = ''
        });
        console.log("🗑️ : All fields are clean now.");
    };

    // check validation on input
    const validateField = <K extends keyof typeof schema.shape>(key: K, value: string | number) => {
        const fieldSchema = schema.shape[key]

        try {
            fieldSchema.parse(value)
            errors[key] = '' // Clear previous error
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                errors[key] = err.issues[0]?.message || 'Invalid input'
            }
        }
    };

    // bill details same
    const billSame = () => {
        formFields.shipFirstName = formFields.billingFirstName
        formFields.shipLastName = formFields.billingLastName
        formFields.shipStreetAddress = formFields.billingStreetAddress
        formFields.shipApptsAddress = formFields.billingApptsAddress
        formFields.shipCity = formFields.billingCity
        formFields.shipCounty = formFields.billingCounty
        formFields.shipState = formFields.billingState
        formFields.shipPostalCode = formFields.billingPostalCode
    };

    return {
        form,
        formFields,
        errors,
        formSubmit,
        validateField,
        billSame
    }
});
