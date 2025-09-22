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
    const schema = z.object({
        firstName: z.string().min(1, 'First name is required'),
        lastName: z.string().min(1, 'Last name is required'),
        email: z.email('Invalid email address'),
        phoneNumber: z.string().regex(/^\+?[0-9\s\-]{7,15}$/, 'Invalid phone number'),

        shipFirstName: z.string().min(1, 'Shipping first name is required'),
        shipLastName: z.string().min(1, 'Shipping last name is required'),
        shipStreetAddress: z.string().min(1, 'Street address is required'),
        shipApptsAddress: z.string().optional(),
        shipCity: z.string().min(1, 'City is required'),
        shipCounty: z.string().min(1, 'County is required'),
        shipState: z.string().min(1, 'State is required'),
        shipPostalCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid postal code'),

        creditCardNumber: z.string().regex(/^\d{13,19}$/, 'Invalid credit card number'),
        cardCVV: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
        expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Invalid month (01-12)'),
        expiryYear: z.string().regex(/^\d{4}$/, 'Invalid year'),

        billingFirstName: z.string().min(1, 'Billing first name is required'),
        billingLastName: z.string().min(1, 'Billing last name is required'),
        billingStreetAddress: z.string().min(1, 'Billing address is required'),
        billingApptsAddress: z.string().optional(),
        billingCity: z.string().min(1, 'City is required'),
        billingCounty: z.string().min(1, 'County is required'),
        billingState: z.string().min(1, 'State is required'),
        billingPostalCode: z.string().regex(/^\d{5}(-\d{4})?$/, 'Invalid postal code'),
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

    // check validation
    const validateField = (fieldName: keyof FormFields) => {
        console.log('Validating field:', fieldName, formFields[fieldName])

        try {
            const fieldSchema = schema.shape[fieldName]
            fieldSchema.parse(formFields[fieldName])
            errors[fieldName] = ''
        } catch (err) {
            if (err instanceof ZodError) {
                errors[fieldName] = err.issues[0]?.message || 'Invalid input'
            }
        }
    };

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
            // resetForm();
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

    return {
        form,
        formFields,
        errors,
        formSubmit,
        validateField
    }
})
