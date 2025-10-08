import { defineStore } from 'pinia';
import { reactive, ref, type Reactive } from 'vue';
import { z, ZodError } from 'zod';

export const useFormStore = defineStore('formStore', () => {
    // Payment method state ( 'creditCard' default selected )
    const paymentMethod = ref<'creditCard' | 'payPal' | null>('creditCard');
    // const paymentMethod = ref<'creditCard' | 'payPal' | null>('payPal');

    // same billing
    const sameBilling = ref(true);

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

        // Shif Profile
        shipProfile: '36'
    })

    // Zod schema
    const nameRegex = /^[A-Za-zÀ-ÿ\-'\s]{2,15}$/
    const cityRegex = /^[A-Za-zÀ-ÿ\s\-]{2,50}$/
    const stateRegex = /^[A-Z]{2}$/
    const postalCodeRegex = /^\d{5}(-\d{4})?$/
    const phoneRegex = /^\+?[0-9\s\-]{10,15}$/
    const streetRegex = /^[A-Za-z0-9À-ÿ\s,'\-\.]{5,100}$/

    // Basic schema (always required for both payment methods)
    const basicSchema = z.object({
        firstName: z.string().regex(nameRegex, 'Invalid first name'),
        lastName: z.string().optional(),
        email: z.email('Invalid email address'),
        phoneNumber: z.string().regex(phoneRegex, 'Invalid phone number'),
    });

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
        creditCardNumber: z.string().regex(/^\d{15,16}$/, 'Invalid credit card number'),
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
    });

    // Computed schema based on payment method
    const activeSchema = computed(() => {
        if (paymentMethod.value === 'payPal') return basicSchema;
        if (paymentMethod.value === 'creditCard') return schema;
        return null; // No schema if no payment method selected
    });

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
    const formSubmit = async () => {
        // Clear previous errors
        Object.keys(errors).forEach((key) => {
            errors[key] = ''
        })

        // Check if payment method is selected
        if (!paymentMethod.value) {
            errors.paymentMethod = 'Please select a payment method';
            console.log('No payment method selected');
            return false;
        }

        billSame()

        // Use the active schema based on payment method
        const schema = activeSchema.value;
        if (!schema) {
            console.log('No schema available');
            return false;
        }

        // Use the active schema based on payment method
        const result = schema.safeParse(formFields)
        console.log('formFields', JSON.stringify(formFields, null, 2))
        console.log('Using schema for:', paymentMethod.value)

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

        await importLead();
        await importOrder();
        resetForm();
        console.log('Form is valid!')
        return true
    }

    // Reset method
    const resetForm = () => {
        Object.keys(formFields).forEach((key) => {
            formFields[key as keyof FormFields] = ''
        });
        paymentMethod.value = null; // Reset payment method too
        console.log("🗑️ : All fields are clean now.");
    };

    // check validation on input
    const validateField = async <K extends keyof typeof formFields>(key: K, value: string) => {
        if (!activeSchema.value) {
            formFields[key] = value;
            return;
        }

        const currentSchema = activeSchema.value.shape as any;
        const fieldSchema = currentSchema[key];

        if (!fieldSchema) {
            formFields[key] = value;
            return;
        }

        try {
            fieldSchema.parse(value)
            errors[key as string] = '' // Clear previous error
        } catch (err: any) {
            if (err instanceof z.ZodError) {
                errors[key as string] = err.issues[0]?.message || 'Invalid input'
            }
        } finally {
            formFields[key] = value; // update form values
            // Call Import Lead
            // await importLead();
        }
    };

    // bill details same
    const billSame = () => {
        // console.log("chala")
        formFields.billingFirstName = formFields.shipFirstName
        formFields.billingLastName = formFields.shipLastName
        formFields.billingStreetAddress = formFields.shipStreetAddress
        formFields.billingApptsAddress = formFields.shipApptsAddress
        formFields.billingCity = formFields.shipCity
        formFields.billingCounty = formFields.shipCounty
        formFields.billingState = formFields.shipState
        formFields.billingPostalCode = formFields.shipPostalCode

        // Clear billing errors
        const billingKeys: (keyof FormFields)[] = [
            'billingFirstName',
            'billingLastName',
            'billingStreetAddress',
            'billingApptsAddress',
            'billingCity',
            'billingCounty',
            'billingState',
            'billingPostalCode'
        ]

        billingKeys.forEach(key => {
            if (formFields[key] !== "") errors[key] = ''
        })
    };

    // Handle bill same status
    const handleBillSame = (status: boolean) => {
        // console.log("haa bilsame");
        sameBilling.value = status;
        console.log('sameBilling:', sameBilling.value);
        if (status) billSame();
    }

    return {
        paymentMethod,  // Export payment method
        sameBilling,
        formFields,
        errors,
        formSubmit,
        validateField,
        billSame,
        handleBillSame
    }
});
