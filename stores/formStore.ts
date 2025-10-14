// import { defineStore } from 'pinia'; 9
import { defineStore } from 'pinia';
import { reactive, ref, type Reactive } from 'vue';
import { z, ZodError } from 'zod';
import { useCheckoutStore } from './checkoutStore';

export const useFormStore = defineStore('formStore', () => {

    // Checkout Store
    const checkoutStore = useCheckoutStore();

    // Payment method state ( 'creditCard' default selected )
    const paymentMethod = ref<'creditCard' | 'payPal' | null>('creditCard');
    // const paymentMethod = ref<'creditCard' | 'payPal' | null>('payPal');

    // same billing
    const sameBilling = ref(true);

    // loader
    const transactionStatus = ref(false);

    // order details 
    const orderDetails = ref({});

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
    const cityRegex = /^[A-Za-zÀ-ÿ\s\-]{2,15}$/
    const stateRegex = /^[A-Z]{2}$/
    const postalCodeRegex = /^\d{5,10}$/
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
        firstName: z.string()
            .nonempty('This field is required')
            .min(2, 'First name must be at least 2 characters')
            .max(15, 'First name must be at most 15 characters')
            .regex(nameRegex, 'First name must contain only letters'),
        lastName: z.string().optional(),
        email: z.email('Invalid email address'),
        phoneNumber: z.string()
            .nonempty('This field is required.')
            .min(10, 'Phone number must be at least 10 digits')
            .max(15, 'Phone number must be at most 15 digits')
            .regex(phoneRegex, 'Phone contains only numbers'),

        // Shipping Address
        shipFirstName: z.string()
            .nonempty('This field is required.')
            .min(2, 'Shipping first name must be at least 2 characters')
            .max(15, 'Shipping first name must be at most 15 characters')
            .regex(nameRegex, 'Shipping first name contains only characters'),

        shipLastName: z.string().optional(),
        shipStreetAddress: z.string()
            .nonempty('This field is required.')
            .min(5, 'Street address must be at least 5 characters')
            .max(100, 'Street address must be at most 100 characters')
            .regex(streetRegex, 'Invalid street address'),

        shipApptsAddress: z.string().optional(),
        shipCity: z.string()
            .nonempty('This field is required.')
            .min(2, 'City must be at least 2 characters.')
            .max(15, 'City must be at most 15 characters.')
            .regex(cityRegex, 'Invalid city name.'),
        shipCounty: z.string().regex(cityRegex, 'Invalid county'),
        shipState: z.string().regex(stateRegex, 'Invalid state (use 2-letter code)'),
        shipPostalCode: z.string()
            .nonempty('This field is required.')
            .min(5, 'Postal code must be at least 5 digits.')
            .max(10, 'Postal code must be at most 10 digits.')
            .regex(/^\d{5,10}$/, 'Postal code must be between 5 and 10 digits'),

        // Credit card
        creditCardNumber: z.string()
            .nonempty('This field is required.')
            .min(15, 'Credit card number must be at least 15 digits')
            .max(16, 'Credit card number must be at most 16 digits')
            .regex(/^\d{15,16}$/, 'Invalid credit card number'),

        cardCVV: z.string().regex(/^\d{3,4}$/, 'Invalid CVV'),
        expiryMonth: z.string().regex(/^(0[1-9]|1[0-2])$/, 'Invalid month'),
        expiryYear: z.string().regex(/^\d{4}$/, 'Invalid year'),

        // Billing Address
        billingFirstName: z.string()
            .nonempty('This field is required')
            .min(2, 'First name must be at least 2 characters')
            .max(15, 'First name must be at most 15 characters')
            .regex(nameRegex, 'First name must contain only letters'),
        billingLastName: z.string().optional(),
        billingStreetAddress: z.string()
            .nonempty('This field is required.')
            .min(5, 'Street address must be at least 5 characters')
            .max(100, 'Street address must be at most 100 characters')
            .regex(streetRegex, 'Invalid street address'),
        billingApptsAddress: z.string().optional(),
        billingCity: z.string()
            .nonempty('This field is required.')
            .min(2, 'City must be at least 2 characters.')
            .max(15, 'City must be at most 15 characters.')
            .regex(cityRegex, 'Invalid city name.'),
        billingCounty: z.string().regex(cityRegex, 'Invalid county'),
        billingState: z.string().regex(stateRegex, 'Invalid state (use 2-letter code)'),
        billingPostalCode: z.string()
            .nonempty('This field is required.')
            .min(5, 'Postal code must be at least 5 digits.')
            .max(10, 'Postal code must be at most 10 digits.')
            .regex(/^\d{5,10}$/, 'Postal code must be between 5 and 10 digits'),
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

    // Required Feilds
    const requiredFields: (keyof FormFields)[] = [
        'firstName', 'email', 'phoneNumber', 'shipFirstName', 'shipStreetAddress', 'shipCity', 'shipCounty', 'shipState', 'shipPostalCode', 'creditCardNumber', 'cardCVV', 'expiryMonth', 'expiryYear',
        // 'billingFirstName', 'billingStreetAddress', 'billingCity', 'billingCounty', 'billingState', 'billingPostalCode',
    ];

    const billingRequiredFields: (keyof FormFields)[] =
        ['billingFirstName', 'billingStreetAddress', 'billingCity', 'billingCounty', 'billingState', 'billingPostalCode',];

    // Submit method
    const formSubmit = async () => {
        transactionStatus.value = true;

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

        billSame();

        // Manually check required fields for empty string
        let hasEmpty = false;
        requiredFields.forEach(field => {
            if (!formFields[field] || formFields[field].toString().trim() === '') {
                errors[field] = 'This field is required.';
                hasEmpty = true;
            }
        });

        if (hasEmpty) {
            transactionStatus.value = false;
            return false;  // stop submission because some required fields are empty
        }

        // Use the active schema based on payment method
        const schema = activeSchema.value;
        if (!schema) {
            console.log('No schema available');
            return false;
        };

        // Use the active schema based on payment method
        const result = schema.safeParse(formFields)
        // console.log('formFields', JSON.stringify(formFields, null, 2))
        // console.log('Using schema for:', paymentMethod.value)

        if (!result.success) {
            const zodError = result.error as ZodError

            zodError.issues.forEach((err) => {
                const field = err.path[0]
                if (typeof field === 'string') {
                    errors[field] = err.message
                }
            })
            console.log('errors:', JSON.stringify(errors, null, 2));
            transactionStatus.value = false;
            return false
        };

        await importLead();
        await importOrder();
        resetForm();
        transactionStatus.value = false;
        // console.log('Form is valid!')
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
    };

    // Filter States
    const handleCountry = (value: string, type: string = 'ship') => {
        const filteredStates = checkoutStore.allCountries.filter(country => country.countryCode === value);
        console.log('checkoutStore.allCountries:', checkoutStore.allCountries);

        if (type !== 'ship') {
            console.log("Working")
            formFields.billingCounty = value;
            checkoutStore.selectedStatesBill = [...filteredStates];
            formFields.billingState = '';
            return;
        }
        console.log("ship me aaya")

        formFields.shipCounty = value;
        checkoutStore.selectedStates = [...filteredStates];
        formFields.shipState = '';
    };

    return {
        paymentMethod,  // Export payment method
        sameBilling,
        formFields,
        errors,
        formSubmit,
        validateField,
        billSame,
        handleBillSame,
        handleCountry,
        transactionStatus,
        orderDetails
    }
});
