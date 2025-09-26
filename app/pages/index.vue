<script setup lang="ts">
import { computed } from 'vue';
import { cardExpiryMonths, cardExpiryYears, gummyBagsSelector, gymmyTypeData, productData, slides, usStates } from '~/assets/data/checkout';
import Faq from '~/components/Faq.vue';
import Footer from '~/components/Footer.vue';
import Header from '~/components/Header.vue';
import Reviews from '~/components/Reviews.vue';
import { useFormStore } from '../../stores/formStore';

// form store data 
const formStore = useFormStore();
const { formFields, formSubmit, errors, validateField, handleBillSame } = formStore;

// Use computed to sync with store's paymentMethod
const paymentMethod = computed({
    get: () => formStore.paymentMethod,
    set: (value: 'creditCard' | 'payPal') => {
        formStore.paymentMethod = value
    }
})

// Gummy type
const gummyType = ref('ogGummies');
let cartData: Ref<ProductData[]> = ref([]);
if (Array.isArray(productData) && productData[0]) {
    cartData.value[0] = productData[0];
};

// Gummy bags
const selectedBag = ref(1);

// add extra product
const extraProduct = ref(false);

// track screen size
const isMobile = ref(false)

// carousel slider
const activeSlide = ref(0)
const currentSlide = computed(() => slides[activeSlide.value])

const next = () => {
    activeSlide.value = (activeSlide.value + 1) % slides.length
}

const prev = () => {
    activeSlide.value = (activeSlide.value - 1 + slides.length) % slides.length
}

const goTo = (index: number) => {
    activeSlide.value = index
}

// timer funtionality
const minutes = ref(10)
const seconds = ref(0)

let countdownInterval: ReturnType<typeof setInterval> | null = null

function startCountdown() {
    countdownInterval = setInterval(() => {
        if (seconds.value === 0) {
            if (minutes.value === 0) {
                if (countdownInterval) clearInterval(countdownInterval)
                return
            }
            minutes.value--
            seconds.value = 59
        } else {
            seconds.value--
        }
    }, 1000)
}

// Add data in Cart
const addProductData = (id: number) => {
    selectedBag.value = id;
    const selectedProduct = productData.find(product => product.id === id);
    if (selectedProduct) {
        // Replace the first item (main product)
        cartData.value[0] = selectedProduct;

        // If extra product was already added, keep it
        if (extraProduct.value && cartData.value.length === 1) {
            const extraProd = productData.find(p => p.id === 4);
            if (extraProd) {
                cartData.value.push(extraProd);
            }
        }
    }
};

// Add/Remove extra product
const addExtraProduct = () => {
    console.log("addExtraProduct chala.");
    extraProduct.value = !extraProduct.value;

    if (extraProduct.value) {
        // Add extra product
        const extraProd = productData.find(p => p.id === 4);
        if (extraProd && !cartData.value.find(item => item.id === 4)) {
            // Using push to trigger reactivity
            cartData.value.push(extraProd);
        }
    } else {
        // Remove extra product
        cartData.value = cartData.value.filter(item => item.id !== 4);
    }
};

// Calculate total price for all products in cart
const calculateTotalPrice = () => {
    const subtotal = cartData.value.reduce((sum, item) => sum + item.price, 0);
    const shipping = cartData.value[0]?.id === 3 ? 7.99 : 0;
    return (subtotal + shipping).toFixed(2);
};

// Calculate total compare price
const calculateComparePrice = () => {
    const total = cartData.value.reduce((sum, item) => sum + item.compareAtPrice, 0);
    return (total + 7.99).toFixed(2);
};

// Calculate average discount percentage
const calculateTotalDiscount = () => {
    if (cartData.value.length === 0) return 0;

    const totalOriginal = cartData.value.reduce((sum, item) => sum + item.compareAtPrice, 0) + 7.99;
    const totalDiscounted = parseFloat(calculateTotalPrice());
    const discount = ((totalOriginal - totalDiscounted) / totalOriginal) * 100;

    return Math.round(discount);
};

onMounted(() => {
    const update = () => {
        isMobile.value = window.innerWidth < 768
    }

    update()
    window.addEventListener('resize', update)

    startCountdown() // timer runs

    // Query Campaign
    queryCampaign()
})

watch(paymentMethod, (newValue) => {
    console.log('newValue:', newValue);
});

</script>
<template>

    <!-- Header Section -->
    <Header />

    <section class="w-full pt-3 p-2">
        <div class="max-w-[1200px] bg-white mx-auto grid grid-cols-1 md:grid-cols-[45%_55%] gap-8 items-center 
  lg:p-6 p-3 px-3 md:px-3 lg:px-8 border-[3px] border-dashed border-[#000]">

            <!-- Left: Image & Reasons -->
            <div class="flex flex-col items-center md:items-start text-center md:text-left">
                <div x-data="carousel()" class="w-full max-w-4xl space-y-4">

                    <!-- Main Image -->
                    <div class="relative overflow-hidden rounded-xl shadow-lg">
                        <img :src="currentSlide" alt="Carousel Image"
                            class="w-full  object-cover transition duration-500" />

                        <!-- Prev Button -->
                        <button @click="prev"
                            class="absolute text-4xl w-15 h-15 top-1/2 left-3 -translate-y-1/2 p-2 rounded-full shadow ">
                            &#10094;
                        </button>

                        <!-- Next Button -->
                        <button @click="next"
                            class="absolute w-15 text-4xl h-15 top-1/2 right-3 -translate-y-1/2 p-2 rounded-full shadow ">
                            &#10095;
                        </button>
                    </div>

                    <!-- Thumbnails -->
                    <div class="flex justify-center space-x-2">
                        <template v-for="(slide, index) in slides" :key="index">
                            <img :src="slide" @click="goTo(index)" :class="activeSlide === index
                                ? 'ring-2 ring-blue-500 opacity-100'
                                : 'opacity-60 hover:opacity-100'"
                                class="w-12 h-12 lg:w-20 lg:h-20 object-cover rounded cursor-pointer transition p-1">
                        </template>
                    </div>
                </div>

            </div>

            <!-- Right: Text Content -->
            <div class="space-y-4">
                <h2 class="text-xl md:text-2xl extrablod text-gray-900 leading-snug text-center md:text-left">
                    Families Like Yours Are Using YOMZ to Boost Their Nutrition and Supercharge Their Lives
                </h2>

                <!-- Points -->
                <div class="space-y-4 text-left">
                    <div v-for="point in keyPoints" class="flex items-start">
                        <img src="/images/rightarrow.svg" alt="" class="w-5 h-5 mr-3 flex-shrink-0 mt-1">
                        <p class="text-gray-700">{{ point }}</p>
                    </div>
                </div>
            </div>
        </div>
    </section>

    <section class="w-full lg:py-5 lg:p-2 py-2 p-0">
        <div
            class="max-w-[1200px] mx-auto flex  bg-yellow-200 border border-yellow-300 rounded-md lg:px-4 px-2  py-2 lg:py-6 items-center justify-center text-sm sm:text-base text-gray-800 font-medium ">

            <!-- Fire Icon -->
            <img src="/images/fire.svg" alt="Fire" class="w-8 h-8 sm:w-8 sm:h-8 mr-2 flex-shrink-0">

            <!-- Text -->
            <p class="text-center text-lg extrablod">
                YOMZ is selling like hotcakes & inventory is very limited.
                But we've reserved your order for:
                <!-- <span class="text-red-600 font-bold">10 MIN 00 SEC</span> -->
                <span class="text-red-600 font-bold lg:inline inline-block">
                    {{ String(minutes).padStart(2, '0') }} MIN {{ String(seconds).padStart(2, '0') }} SEC
                </span>
            </p>
        </div>
    </section>

    <div class="max-w-[1200px] mx-auto px-0 py-2 grid grid-cols-1 md:grid-cols-2 gap-1 lg:gap-8">

        <!-- Left Column -->
        <div class="lg:p-0 p-2 ">
            <div class="bg-white p-3 rounded-lg shadow">

                <div class="flex items-center sm:items-center space-y-3 sm:space-y-0 sm:space-x-3">
                    <!-- Left Icon -->
                    <div
                        class="offer-circle w-[100px] h-[100px] bg-[#c91f3f] rounded-full flex items-center justify-center relative text-white shrink-0">
                        <div
                            class="offer-text w-[84px] h-[84px] border-2 border-dashed border-white absolute rounded-full">
                        </div>
                        <div class="text-center">
                            <p class="text-xs font-extralight">Up to</p>
                            <p class="text-sm font-bold">60% OFF</p>
                        </div>
                    </div>

                    <!-- Right Text -->
                    <div class="text-center sm:text-center space-y-1">
                        <p class="text-700 text-[#C91F3F] extrablod text-xl">Your up to 60% Discount Has Been
                            Applied
                        </p>
                        <p class="text-gray-700">Your Order Today Qualifies for a <span class="extrablod">Bulk
                                Discount</span></p>
                    </div>
                </div>

                <!-- STEP 1: Select Gummy Style -->
                <h2 class="text-lg font-bold mt-3 border-b border-[#e7e7e7] pb-4 py-4 mb-4 uppercase">
                    STEP 1: Select Gummy Style
                </h2>

                <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-2 lg:space-x-6 mb-8">
                    <!-- Gummy Selectors -->
                    <div v-for="value in gymmyTypeData" :key="value.id"
                        class="flex items-center space-x-1 cursor-pointer relative select-none"
                        @click="gummyType = value.id">
                        <div class="w-6 h-6 border-2 shrink-0 rounded-full flex items-center justify-center ml-3 border-[#172969]"
                            :class="{ 'bg-[#172969]': gummyType === value.id }">
                            <NuxtImg v-if="gummyType === value.id" src="/images/whiteTick.svg" alt="white-tick" />
                        </div>

                        <NuxtImg :src="value.img" width="64" height="64" :alt="value.alt" />
                        <span class="text-gray text-lg leading-5 font-extrabold">
                            {{ value.name }}
                        </span>
                    </div>
                </div>

                <!-- STEP 2: Select Order Quantity -->
                <h2 class="text-lg font-bold mt-3 border-b border-[#e7e7e7] pb-4 py-4 mb-4 uppercase">
                    STEP 2: Select Order Quantity
                </h2>

                <div v-for="value in gummyBagsSelector" :key="value.id" @click="addProductData(value.id)" :class="[
                    'flex items-center justify-between pl-0 pt-4 pb-4 pr-4 cursor-pointer transition relative select-none',
                    value.id === 1 ? 'bg-yellow-400/90' : 'bg-white']">
                    <div class="flex items-center space-x-3">
                        <div class="w-6 h-6 rounded-full flex items-center justify-center ml-3 border-2 border-[#172969]"
                            :class="{ 'bg-[#172969]': selectedBag === value.id, 'border-[#172969]': selectedBag !== value.id }">
                            <NuxtImg v-if="selectedBag === value.id" src="/images/whiteTick.svg" />
                        </div>

                        <p :class="{ 'w-2/3': value.id === 1 }">
                            <span v-if="value.id === 1" class="font-bold">BEST SELLER </span>
                            <span class="text-gray-800 w-[10%]">{{ value.title }}</span>
                        </p>
                    </div>

                    <div :class="[
                        'text-right text-sm text-gray-900',
                        value.id === 1 ? 'font-bold' : ''
                    ]">
                        <p>${{ value.price.toFixed(2) }} each</p>
                        <p class="uppercase">{{ value.shipping }}</p>
                    </div>

                    <img v-if="value.id === 1" src="/images/redarrow.svg"
                        class="w-8 lg:w-12 absolute lg:-left-10 -left-5" alt="Best Seller Arrow" />
                </div>
            </div>

            <!-- Mobile Screen -->
            <Reviews v-if="isMobile" class="bg-white p-3 rounded-lg shadow mt-3" />

        </div>

        <!-- Right Column -->
        <div class="">
            <div class="bg-white p-4 rounded-lg shadow lg:m-0 m-2">
                <h2 class="text-lg font-bold border-b border-[#e7e7e7] pb-4 uppercase">
                    STEP 3: PAYMENT METHOD
                </h2>

                <!-- PayPal Method -->
                <label @click="paymentMethod = 'payPal'"
                    class="flex items-center justify-between pl-0 pt-4 pr-4 pb-4  lg:pt-6 lg:pr-6 lg:pb-6 border-b border-[#e7e7e7] cursor-pointer">
                    <div class="flex items-center space-x-3">
                        <input type="radio" name="YOMZ" class="peer hidden">
                        <div
                            :class="['w-6 h-6 border-2  rounded-full flex items-center justify-center border-[#172969] ml-3', paymentMethod === null ? 'bg-white' : 'peer-checked:bg-[#172969]']">
                            <svg v-if="paymentMethod === 'payPal'" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#fff" stroke-width="3"
                                        stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </g>
                            </svg>
                        </div>
                        <img src="/images/paypal.png" alt="PayPal" class="lg:h-10 h-6">

                    </div>
                </label>

                <!-- Credit Card Method -->
                <label @click="paymentMethod = 'creditCard'"
                    class="flex items-center justify-between pl-0 pt-4 pr-4 pb-4  lg:pt-6 lg:pr-6 lg:pb-6 cursor-pointer select-none">
                    <div class="flex items-center space-x-3">
                        <input type="radio" name="YOMZ" class="peer hidden">
                        <div
                            :class="['w-6 h-6 border-2  rounded-full flex items-center justify-center border-[#172969] ml-3', paymentMethod === null ? 'bg-white' : 'peer-checked:bg-[#172969]']">
                            <svg v-if="paymentMethod === 'creditCard'" viewBox="0 0 24 24" fill="none"
                                xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                <g id="SVGRepo_bgCarrier" stroke-width="0"></g>
                                <g id="SVGRepo_tracerCarrier" stroke-linecap="round" stroke-linejoin="round"></g>
                                <g id="SVGRepo_iconCarrier">
                                    <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#fff" stroke-width="3"
                                        stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </g>
                            </svg>
                        </div>
                        <span class="text-gray-800 text-lg font-semibold">Credit Card</span>
                    </div>

                    <!-- Card Logos -->
                    <div class="flex lg:space-x-2 space-x-0">
                        <img src="/images/payicons.svg" alt="" class="lg:h-10 h-6">

                    </div>
                </label>

            </div>

            <section v-if="paymentMethod === 'creditCard' || paymentMethod === 'payPal'" class="lg:m-0 m-2">

                <form @submit.prevent="() => formSubmit()">

                    <!-- STEP 4: CONTACT INFORMATION -->
                    <div class="bg-white p-4 rounded-lg shadow mt-3">
                        <h2 class="text-lg font-bold border-b border-[#e7e7e7] pb-4 mb-1 uppercase">
                            STEP 4: CONTACT INFORMATION
                        </h2>

                        <div class="bg-white pt-4">
                            <div class="space-y-4">
                                <!-- First Name -->
                                <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input v-model="formFields.firstName" name="firstName" type="text"
                                            @input="validateField('firstName', ($event.target as HTMLInputElement).value)"
                                            placeholder="First Name" :class="[
                                                'w-full p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                                errors.firstName ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500'
                                            ]" maxlength="12" />
                                        <!-- <span class="hidden ml-2 text-sm text-[#e6193c]"></span> -->
                                        <span v-if="errors.firstName" class="ml-2 text-sm text-[#e6193c]">
                                            {{ errors.firstName }}
                                        </span>
                                    </div>

                                    <!-- Last Name -->
                                    <div>
                                        <input v-model="formFields.lastName" name="lastName" type="text"
                                            placeholder="Last Name"
                                            :class="[
                                                'w-full p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                                errors.lastName ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']"
                                            maxlength="12" />
                                        <!-- <span class="hidden ml-2 text-sm text-[#e6193c]"></span> -->
                                        <span v-if="errors.lastName" class="ml-2 text-sm text-[#e6193c]">
                                            {{ errors.lastName }}
                                        </span>
                                    </div>

                                </div>

                                <!-- Email -->
                                <input v-model="formFields.email" name="email-address" type="email" placeholder="E-mail"
                                    @input="validateField('email', ($event.target as HTMLInputElement).value)" :class="[
                                        'w-full mb-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        errors.email ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']"
                                    maxlength="30" />
                                <span v-if="errors.email" class="ml-2 text-sm text-[#e6193c]">
                                    {{ errors.email }}
                                </span>

                                <!-- Phone -->
                                <div class="flex items-center justify-center gap-3 w-full mt-4 m-0">
                                    <div class="flex items-center bg-white shadow-md px-4 rounded-md h-[58px]">
                                        <img src="/images/flag.png" alt="US Flag" class="lg:h-5 h-4  mr-1">
                                        <span class="text-gray font-bold">+1</span>
                                    </div>
                                    <input v-model="formFields.phoneNumber" name="phoneNumber" type="tel"
                                        @input="validateField('phoneNumber', ($event.target as HTMLInputElement).value)"
                                        placeholder="Phone"
                                        :class="[
                                            'w-full mb-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                            errors.phoneNumber ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']"
                                        maxlength="15" />
                                </div>
                                <span v-if="errors.phoneNumber" class="ml-22 md:ml-25 text-sm text-[#e6193c]">
                                    {{ errors.phoneNumber }}
                                </span>

                            </div>
                        </div>

                        <!-- Desktop Screen -->
                        <Reviews v-if="!isMobile" />
                    </div>

                    <!-- STEP 5: SHIPPING ADDRESS -->
                    <div v-if="paymentMethod === 'creditCard'" class="bg-white p-4 rounded-lg shadow mt-3">

                        <h2 class="text-lg font-bold mt-3 border-b border-[#e7e7e7] pb-4 mb-4 uppercase">
                            STEP 5: SHIPPING ADDRESS
                        </h2>

                        <div class="space-y-4">
                            <!-- Shipping - First Name -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                <div>
                                    <input v-model="formFields.shipFirstName" name="shipFirstName" type="text"
                                        @input="validateField('shipFirstName', ($event.target as HTMLInputElement).value)"
                                        placeholder="First Name"
                                        :class="[
                                            'w-full mb-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',

                                            errors.shipFirstName ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']"
                                        maxlength="12" />
                                    <span v-if="errors.shipFirstName" class="ml-2 text-sm text-[#e6193c]">
                                        {{ errors.shipFirstName }}
                                    </span>
                                </div>

                                <!-- Shipping - Last Name -->
                                <div>
                                    <input v-model="formFields.shipLastName" name="shipLastName" type="text"
                                        @input="validateField('shipLastName', ($event.target as HTMLInputElement).value)"
                                        placeholder="Last Name"
                                        :class="[
                                            'w-full mb-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',

                                            errors.shipLastName ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']"
                                        maxlength="12" />
                                    <span v-if="errors.shipLastName" class="ml-2 text-sm text-[#e6193c]">
                                        {{ errors.shipLastName }}
                                    </span>
                                </div>
                            </div>

                            <!-- Shipping - Street Address -->
                            <input v-model="formFields.shipStreetAddress" name="shipStreetAddress" type="text"
                                @input="validateField('shipStreetAddress', ($event.target as HTMLInputElement).value)"
                                placeholder="Street Address"
                                :class="[
                                    'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                    errors.shipStreetAddress ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" maxlength="50" />
                            <span v-if="errors.shipStreetAddress" class="ml-2 text-sm text-[#e6193c]">
                                {{ errors.shipStreetAddress }}
                            </span>

                            <!-- Shipping -  Apartment or Suite (Optional) -->
                            <input v-model="formFields.shipApptsAddress" name="shipApptsAddress" type="text"
                                placeholder="Apartment or Suite (Optional)"
                                :class="[
                                    'w-full mb-4 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                    errors.shipApptsAddress ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" maxlength="50" />
                            <span v-if="errors.shipApptsAddress" class="ml-2 text-sm text-[#e6193c]">
                                {{ errors.shipApptsAddress }}
                            </span>

                            <!-- Shipping - City -->
                            <input v-model="formFields.shipCity" name="shipCity" type="text" placeholder="City"
                                @input="validateField('shipCity', ($event.target as HTMLInputElement).value)" :class="[
                                    'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                    errors.shipCity ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']"
                                maxlength="20" />
                            <span v-if="errors.shipCity" class="ml-2 text-sm text-[#e6193c]">
                                {{ errors.shipCity }}
                            </span>

                            <!-- Shipping - Country -->
                            <select v-model="formFields.shipCounty" name="shipCounty"
                                @input="validateField('shipCounty', ($event.target as HTMLInputElement).value)"
                                :class="[
                                    'w-full mb-0 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                    errors.shipCounty ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                <option value="">-- Choose Country --</option>
                                <option value="us">United States</option>
                                <option value="ca">Canada</option>
                            </select>
                            <span v-if="errors.shipCounty" class="ml-2 text-sm text-[#e6193c]">
                                {{ errors.shipCounty }}
                            </span>

                            <!-- Shipping - States -->
                            <div class="mb-0 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <select v-model="formFields.shipState" name="shipState"
                                        @input="validateField('shipState', ($event.target as HTMLInputElement).value)"
                                        :class="[
                                            'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                            errors.shipState ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                        <option value="">-- Choose State --</option>
                                        <option v-for="state in usStates" :key="state.code" :value="state.code">
                                            {{ state.name }}
                                        </option>
                                    </select>
                                    <span v-if="errors.shipState" class="ml-2 text-sm text-[#e6193c]">
                                        {{ errors.shipState }}
                                    </span>
                                </div>

                                <!--  Shipping - Postal Code -->
                                <div>
                                    <input v-model="formFields.shipPostalCode" name="shipPostalCode" type="text"
                                        @input="validateField('shipPostalCode', ($event.target as HTMLInputElement).value)"
                                        placeholder="Postal Code"
                                        :class="[
                                            'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                            errors.shipPostalCode ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']"
                                        maxlength="9" />
                                    <span v-if="errors.shipPostalCode" class="ml-2 text-sm text-[#e6193c]">
                                        {{ errors.shipPostalCode }}
                                    </span>
                                </div>
                            </div>

                            <!-- Credit Card Number -->
                            <input v-model="formFields.creditCardNumber" name="creditCardNumber" type="text"
                                @input="validateField('creditCardNumber', ($event.target as HTMLInputElement).value)"
                                placeholder="Credit Card Number"
                                :class="[
                                    'w-full m-0 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                    errors.creditCardNumber ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" maxlength="16">
                            <span v-if="errors.creditCardNumber" class="ml-2 text-sm text-[#e6193c]">
                                {{ errors.creditCardNumber }}
                            </span>

                            <!-- Security Code (3-4 Digits) -->
                            <input v-model="formFields.cardCVV" name="cardCVV" type="text"
                                @input="validateField('cardCVV', ($event.target as HTMLInputElement).value)"
                                placeholder="Security Code (3-4 Digits)" :class="[
                                    'w-full m-0 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',

                                    errors.cardCVV ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']"
                                maxlength="4" />
                            <span v-if="errors.cardCVV" class="ml-2 text-sm text-[#e6193c]">
                                {{ errors.cardCVV }}
                            </span>

                            <!-- Card Expiry Month -->
                            <div class="mb-0 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <select v-model="formFields.expiryMonth" name="expiryMonth"
                                        @input="validateField('expiryMonth', ($event.target as HTMLInputElement).value)"
                                        :class="[
                                            'w-full p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                            errors.expiryMonth ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                        <option value="">Card Month</option>
                                        <option v-for="month in cardExpiryMonths" :key=month.code :value=month.code>{{
                                            month.name }}
                                        </option>
                                    </select>
                                    <span v-if="errors.expiryMonth" class="ml-2 text-sm text-[#e6193c]">
                                        {{ errors.expiryMonth }}
                                    </span>
                                </div>

                                <!-- Card Expiry Year -->
                                <div>
                                    <select v-model="formFields.expiryYear" name="expiryYear"
                                        @input="validateField('expiryYear', ($event.target as HTMLInputElement).value)"
                                        :class="[
                                            'w-full p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                            errors.expiryYear ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                        <option value="">Expiry Year</option>
                                        <option v-for="year in cardExpiryYears" :key="year.value" :value=year.value>
                                            {{ year.name }}
                                        </option>
                                    </select>
                                    <span v-if="errors.expiryYear" class="ml-2 text-sm text-[#e6193c]">
                                        {{ errors.expiryYear }}
                                    </span>
                                </div>
                            </div>

                        </div>
                    </div>

                    <!-- STEP 6: BILLING ADDRESS -->
                    <div v-if="paymentMethod === 'creditCard'" class="bg-white p-4 rounded-lg shadow mt-3">
                        <h2 class="d-block text-[18px] font-bold border-b border-[#e7e7e7] pb-4 pt-2 mb-3 uppercase">
                            STEP 6: BILLING ADDRESS
                        </h2>

                        <!-- Option: Same as shipping address -->
                        <div class="flex items-center justify-between pb-4 ">
                            <div class="flex items-center space-x-3">
                                <div @click="() => handleBillSame(true)"
                                    class="w-6 h-6 border-2 rounded-full flex items-center justify-center border-[#172969] cursor-pointer"
                                    :class="{ 'bg-[#172969]': formStore.sameBilling }">
                                    <svg v-if="formStore.sameBilling" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                        <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#fff"
                                            stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <span class="cursor-pointer select-none" @click="() => handleBillSame(true)">
                                    Same as shipping address</span>
                            </div>
                        </div>

                        <!-- Option: Use a different billing address -->
                        <div class="flex items-center justify-between">
                            <div class="flex items-center space-x-3">
                                <div @click="() => handleBillSame(false)"
                                    class="w-6 h-6 border-2 rounded-full flex items-center justify-center border-[#172969] cursor-pointer"
                                    :class="{ 'bg-[#172969]': !formStore.sameBilling }">
                                    <svg v-if="!formStore.sameBilling" viewBox="0 0 24 24" fill="none"
                                        xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                        <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#fff"
                                            stroke-width="3" stroke-linecap="round" stroke-linejoin="round" />
                                    </svg>
                                </div>
                                <span @click="() => handleBillSame(false)" class="cursor-pointer select-none">
                                    Use a different billing address</span>
                            </div>
                        </div>

                        <Transition name="sameName">
                            <div v-if="!formStore.sameBilling" class="space-y-4 mt-5">
                                <!-- Billing - First Name -->
                                <div class="mb-0 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <input v-model="formFields.billingFirstName" name="billingFirstName" type="text"
                                            @input="validateField('billingFirstName', ($event.target as HTMLInputElement).value)"
                                            placeholder="First Name" maxlength="12"
                                            :class="[
                                                'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                                errors.billingFirstName ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                        <span v-if="errors.billingFirstName" class="ml-2 text-sm text-[#e6193c]">
                                            {{ errors.billingFirstName }}
                                        </span>
                                    </div>

                                    <!-- Billing - Last Name -->
                                    <div>
                                        <input v-model="formFields.billingLastName" name="billingLastName" type="text"
                                            @input="validateField('billingLastName', ($event.target as HTMLInputElement).value)"
                                            placeholder="Last Name" maxlength="12"
                                            :class="[
                                                'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                                errors.billingLastName ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                        <span v-if="errors.billingLastName" class="ml-2 text-sm text-[#e6193c]">
                                            {{ errors.billingLastName }}
                                        </span>
                                    </div>
                                </div>

                                <!-- Billing - Street Address -->
                                <input v-model="formFields.billingStreetAddress" name="billingStreetAddress" type="text"
                                    @input="validateField('billingStreetAddress', ($event.target as HTMLInputElement).value)"
                                    placeholder="Street Address" maxlength="50"
                                    :class="[
                                        'w-full mb-0 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        errors.billingStreetAddress ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                <span v-if="errors.billingStreetAddress" class="ml-2 text-sm text-[#e6193c]">
                                    {{ errors.billingStreetAddress }}
                                </span>

                                <!-- Billing - Apartment or Suite (Optional) -->
                                <input v-model="formFields.billingApptsAddress" name="billingApptsAddress" type="text"
                                    placeholder="Apartment or Suite (Optional)" maxlength="50"
                                    :class="[
                                        'w-full mb-0 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        errors.billingApptsAddress ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                <span v-if="errors.billingApptsAddress" class="ml-2 text-sm text-[#e6193c]">
                                    {{ errors.billingApptsAddress }}
                                </span>

                                <!-- Billing - City -->
                                <input v-model="formFields.billingCity" name="billingCity" type="text"
                                    @input="validateField('billingCity', ($event.target as HTMLInputElement).value)"
                                    placeholder="City" maxlength="20"
                                    :class="[
                                        'w-full mb-0 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        errors.billingCity ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                <span v-if="errors.billingCity" class="ml-2 text-sm text-[#e6193c]">
                                    {{ errors.billingCity }}
                                </span>

                                <!-- Billing - Country -->
                                <select v-model="formFields.billingCounty" name="billingCounty"
                                    @input="validateField('billingCounty', ($event.target as HTMLInputElement).value)"
                                    :class="[
                                        'w-full mb-0 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        errors.billingCounty ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                    <option value="">-- Choose Country --</option>
                                    <option value="us">United States</option>
                                    <option value="ca">Canada</option>
                                </select>
                                <span v-if="errors.billingCounty" class="ml-2 text-sm text-[#e6193c]">
                                    {{ errors.billingCounty }}
                                </span>

                                <!-- Billing - States -->
                                <div class="mb-0 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <div>
                                        <select v-model="formFields.billingState" name="billingState"
                                            @input="validateField('billingState', ($event.target as HTMLInputElement).value)"
                                            :class="[
                                                'w-full p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                                errors.billingState ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                            <option value="">-- Choose State --</option>
                                            <option v-for="state in usStates" :key="state.code" :value="state.code">
                                                {{ state.name }}
                                            </option>
                                        </select>
                                        <span v-if="errors.billingState" class="ml-2 text-sm text-[#e6193c]">
                                            {{ errors.billingState }}
                                        </span>
                                    </div>

                                    <!-- Billing - Postal Code -->
                                    <div>
                                        <input v-model="formFields.billingPostalCode" name="billingPostalCode"
                                            @input="validateField('billingPostalCode', ($event.target as HTMLInputElement).value)"
                                            type="text" placeholder="Postal Code" maxlength="9"
                                            :class="[
                                                'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                                errors.billingPostalCode ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
                                        <span v-if="errors.billingPostalCode" class="ml-2 text-sm text-[#e6193c]">
                                            {{ errors.billingPostalCode }}
                                        </span>
                                    </div>

                                </div>
                            </div>
                        </Transition>
                    </div>

                    <!-- ORDER SUMMARY -->
                    <div class="bg-white p-4 rounded-lg shadow mt-3">
                        <h2 class="text-lg font-bold mt-3 border-b border-[#e7e7e7] pb-4 mb-4 uppercase">
                            {{ paymentMethod === 'payPal' ? 'STEP 5' : 'STEP 7' }}: ORDER SUMMARY
                        </h2>

                        <!-- <div @click="extraProduct = !extraProduct" -->
                        <div @click=addExtraProduct
                            class="bg-[#f5f5f5] border border-[#e0e0e0] rounded-lg shadow-sm lg:p-6 p-2 space-y-4  text-center hover:border-[#323232]  transition-all duration-[400ms] cursor-pointer select-none">

                            <!-- Icon at top -->
                            <div class="flex justify-center">
                                <!-- <NuxtImg v-if="gummyType === 'soursGummies'" src="/images/og-bag.png" alt="og-gummies"
                                    class="h-16" />
                                <NuxtImg v-else-if="gummyType === 'ogGummies'" src="/images/sour-bag.png"
                                    alt="sour-gummies" class="h-16" /> -->
                                <NuxtImg src="/images/funds.png" class="h-16" />
                            </div>

                            <!-- Yes, I want 2 Years of Protection. -->
                            <div class="flex justify-center items-center relative">
                                <div class="flex items-center cursor-pointer justify-center w-fit absolute">
                                    <img src="/images/redarrow.svg" class="lg:w-6 w-6 arrowimg relative" />
                                    <div :class="['w-6 h-6 border-2 border-[#172969] shrink-0 rounded-full flex items-center justify-center',
                                        extraProduct ? 'bg-[#172969]' : 'bg-transparent']">
                                        <NuxtImg v-if="extraProduct" src="/images/whiteTick.svg" alt="white-tick" />
                                    </div>
                                    <span class="font-semibold text-gray-900 lg:text-lg text-sm lg:ms-5 ms-1">
                                        <!-- Yes, I want 2 Years of Protection. -->
                                        Yes, I want another style of Gummies
                                    </span>
                                </div>
                            </div>

                            <!-- Description -->
                            <p class="text-gray-700 text-sm">
                                <!-- <span class="font-semibold">One Time Offer:</span> By placing your order today you can
                                have
                                2 years of protection and replacement warranty for only an additional
                                <span class="font-semibold">$19.97</span>. This extended warranty means your product is
                                covered for 2 years. -->

                                <span class="font-semibold">One Time Offer:</span> By placing your order today, you will
                                receive another style of gummy with <b>free shipping</b>, worth $79.99, for just $48.00.
                            </p>
                        </div>

                        <!-- Product Section -->
                        <div class="w-full pt-6 space-y-6">
                            <!-- Main Product Section -->
                            <div name="product-details">
                                <div class="flex justify-between items-center mb-2">
                                    <div class="flex items-center space-x-2">
                                        <p class="text-800 text-lg font-bold">Product</p>
                                    </div>
                                    <p class="text-gray-800 text-lg font-bold">Price</p>
                                </div>

                                <!-- Main Product (First item in cart) -->
                                <div v-if="cartData[0]" class="flex justify-between items-start mb-2">
                                    <div class="flex items-start space-x-4">
                                        <img :src="cartData[0].img[gummyType]" alt="Product"
                                            class="w-20 h-20 object-contain border rounded">
                                        <div>
                                            <h3 class="font-semibold text-gray-900">{{ cartData[0].title[gummyType] }}
                                            </h3>
                                            <span
                                                class="inline-block mt-1 text-sm bg-gray-700 text-white px-2 py-0.5 rounded-full font-semibold">
                                                {{ cartData[0].bagQty }} Bags
                                            </span>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm text-red-500 line-through font-semibold">
                                            Regular ${{ cartData[0].compareAtPrice }}</p>
                                        <p class="text-gray-900 font-semibold">${{ cartData[0].price.toFixed(2) }}</p>
                                    </div>
                                </div>

                                <!-- Extra Product (Second item in cart if exists) -->
                                <div v-if="cartData[1]" class="flex justify-between items-start mb-2 pt-2">
                                    <div class="flex items-start space-x-4">
                                        <img :src="cartData[1].img[gummyType]" alt="Extra Product"
                                            class="w-20 h-20 object-contain border rounded">
                                        <div>
                                            <h3 class="font-semibold text-gray-900">{{ cartData[1].title[gummyType] }}
                                            </h3>
                                            <span
                                                class="inline-block mt-1 text-sm bg-green-600 text-white px-2 py-0.5 rounded-full font-semibold">
                                                Extra: {{ cartData[1].bagQty }} Bag
                                            </span>
                                        </div>
                                    </div>
                                    <div class="text-right">
                                        <p class="text-sm text-red-500 line-through font-semibold">
                                            Regular ${{ cartData[1].compareAtPrice }}</p>
                                        <p class="text-gray-900 font-semibold">${{ cartData[1].price.toFixed(2) }}</p>
                                    </div>
                                </div>

                                <!-- Free Shipping Section -->
                                <div class="flex justify-between items-center mb-2">
                                    <div v-if="cartData[0]?.id === 3" class="flex items-center space-x-2">
                                        <p class="text-lg font-semibold text-gray-800">Shipping Price</p>
                                    </div>
                                    <div v-else class="flex items-center space-x-2">
                                        <img class="w-5" src="/images/check-icons.png">
                                        <p class="text-lg font-semibold text-gray-800">Free Shipping</p>
                                    </div>
                                    <div v-if="cartData[0]?.id === 3">
                                        <span class="text-md font-bold">$7.99</span>
                                    </div>
                                    <div v-else class="flex gap-1">
                                        <span class="text-md font-semibold line-through text-red-500">$7.99</span>
                                        <span class="text-md font-semibold text-green-600">Free</span>
                                    </div>
                                </div>

                                <!-- Total Section -->
                                <div class="bg-gray-100 px-4 py-3 rounded-lg flex justify-between items-center mb-2">
                                    <div>
                                        <p class="text-gray font-bold">Total:
                                            <span class="text-sm">Before Taxes</span>
                                        </p>
                                    </div>

                                    <div class="flex gap-3 items-baseline font-bold">
                                        <!-- discount % -->
                                        <span class="font-bold text-sm text-red">
                                            -{{ calculateTotalDiscount() }}%
                                        </span>

                                        <!-- final price -->
                                        <span class="font-bold text-gray-900 text-lg">
                                            ${{ calculateTotalPrice() }}
                                        </span>

                                        <!-- total price -->
                                        <span
                                            class="text-md font-bold text-white line-through bg-[#c91f3f] px-2 py-1 rounded-2xl">
                                            ${{ calculateComparePrice() }}
                                        </span>
                                    </div>
                                </div>

                                <p class="text-center text-[0.9rem] font-medium">
                                    🔒 By placing this order you accept YOMZ's Privacy Policy and Terms of Use.
                                </p>
                            </div>

                            <!-- Checkout Button -->
                            <button type="submit"
                                :class="['w-full flex justify-center items-center font-semibold py-3 rounded-lg text-lg cursor-pointer', paymentMethod === 'payPal' ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-[#1ab22c] hover:bg-[#169924] text-white']">
                                {{ paymentMethod === 'payPal' ? 'CHECKOUT WITH' : 'COMPLETE PURCHASE' }}
                                <img v-if="paymentMethod === 'payPal'"
                                    src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png"
                                    alt="PayPal" class="h-6 ml-2">
                            </button>

                            <!-- Guarantee Section -->
                            <div
                                class="flex flex-col sm:flex-row items-center sm:items-start lg:pt-0 lg:pr-6 lg:pb-6 lg:pl-6 pt-0 pr-2 pb-2 pl-2">
                                <img src="/images/guarantee.png" alt=""
                                    class="h-25 mb-3 sm:mb-0 sm:mr-3 flex-shrink-0 mt-1">
                                <p class="text-gray-700 leading-[1.2] text-center sm:text-left">
                                    Your order today is protected by our ridiculously iron-clad Picky Momz 90-day
                                    <span class="font-bold">200% Happiness Guarantee.</span>
                                    If you're not happy with how
                                    <span class="font-bold">great</span>
                                    you and your family feel, or how improved your energy, focus, and gut issues are,
                                    then let us know anytime in the next
                                    <span class="font-bold">90 days.</span> We'll refund <span
                                        class="font-bold">DOUBLE</span>
                                    what you paid.
                                </p>
                            </div>
                        </div>
                    </div>
                </form>
            </section>

        </div>
    </div>

    <!-- FAQs section -->
    <Faq />

    <!-- Footer section -->
    <Footer />
</template>

<style scoped>
.offer-circle .offer-text {
    -webkit-animation: rotateclc 12s linear infinite;
    animation: rotateclc 12s linear infinite;
}

@keyframes rotateclc {
    10% {
        transform: rotate(-360deg);
    }
}

.arrowimg {
    /* -webkit-animation: leftdemote 0s infinite; */
    animation: leftdemote 3.5s infinite;
    top: 0px;
    left: -10px;
}

@keyframes leftdemote {
    0% {
        left: -35px;
    }

    25% {
        left: -8px;
    }

    50% {
        left: -35px;
    }

    75% {
        left: -8px;
    }

    100% {
        left: -35px;
    }
}
</style>
