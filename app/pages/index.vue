<script setup lang="ts">
import { cardExpiryMonths, cardExpiryYears, gummyBagsSelector, gymmyTypeData, productData, slides, usStates } from '~/assets/data/checkout';
import { useFormStore } from '../../stores/formStore';
import Reviews from '~/components/Reviews.vue';

// Gummy type
const gummyType = ref('ogGummies');
let cartData: Ref<ProductData[]> = ref([]);
if (Array.isArray(productData) && productData[0]) {
    cartData.value[0] = productData[0];
};

// Gummy bags
const selectedBag = ref(1);

// Payment method
const paymentMethod = ref('creditCard');

// same billing
const sameBilling = ref(true);
// const sameBilling = ref(false);

// add extra product
const extraProduct = ref(false);

// form store data 
const { formFields, formSubmit, errors, validateField } = useFormStore()

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
    const selectedProduct: ProductData = productData.find(product => product.id === id)!;
    console.log("selectedProduct", selectedProduct)
    cartData.value[0] = selectedProduct
};

onMounted(() => {
    const update = () => {
        isMobile.value = window.innerWidth < 768
    }

    update()
    window.addEventListener('resize', update)

    startCountdown() // timer runs
})

watch(paymentMethod, (newValue) => {
    console.log('newValue:', newValue);
});

</script>
<template>
    <!-- Header -->
    <header class="w-full border-b border-gray-200 bg-white">
        <div class="max-w-[1200px] mx-auto flex items-center justify-between px-2 py-2 md:py-2">

            <!-- Left: Logo -->
            <div class="flex-shrink-0">
                <img src="/images/logo.png" alt="YOMZ" class="h-10 lg:h-14">
            </div>

            <!-- Center: SSL Secure -->
            <div class="hidden lg:flex items-center gap-2">
                <img src="/images/ssl.png" alt="SSL" class="w-26">
            </div>

            <!-- Right: Flag + Contact -->
            <div class="flex items-center gap-2">
                <img src="/images/flag.png" alt="US Flag" class="w-16">
                <div class="text-sm lg:text-sm text-gray-800 text-center">
                    <div class="hidden sm:block">
                        <span class="font-bold block text-lg">Contact Us:</span>
                        <a href="mailto:support@yomz.co" class="text-black-600 hover:underline">support@yomz.co</a>
                    </div>
                </div>
            </div>

        </div>
    </header>

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
                    <!-- Point 1 -->
                    <div class="flex items-start">
                        <img src="/images/rightarrow.svg" alt="" class="w-5 h-5 mr-3 flex-shrink-0 mt-1">
                        <p class="text-gray-700">Fill in Your Family’s Nutrition Gaps and Help Transform Their
                            Lives!
                        </p>
                    </div>

                    <!-- Point 2 -->
                    <div class="flex items-start">
                        <img src="/images/rightarrow.svg" alt="" class="w-5 h-5 mr-3 flex-shrink-0 mt-1">
                        <p class="text-gray-700">Packed with Vitamins, Antioxidants, and Nutrients from 18
                            Superfoods
                        </p>
                    </div>

                    <!-- Point 3 -->
                    <div class="flex items-start">
                        <img src="/images/rightarrow.svg" alt="" class="w-5 h-5 mr-3 flex-shrink-0 mt-1">
                        <p class="text-gray-700">One Serving Is the Phytonutrient Equal of 2 Servings of Fruits &
                            Vegetables</p>
                    </div>

                    <!-- Point 4 -->
                    <div class="flex items-start">
                        <img src="/images/rightarrow.svg" alt="" class="w-5 h-5 mr-3 flex-shrink-0 mt-1">
                        <p class="text-gray-700">Crafted to Support: Gut Health, Energy, Focus, Mood, Brain
                            Activity,
                            Immunity, Heart Function, Vision, Family Nutrition</p>
                    </div>

                    <!-- Point 5 -->
                    <div class="flex items-start">
                        <img src="/images/rightarrow.svg" alt="" class="w-5 h-5 mr-3 flex-shrink-0 mt-1">
                        <p class="text-gray-700">Join 6,312 American families Boosting Their Nutrition.</p>
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
                        <div class="w-6 h-6 border-2 shrink-0 rounded-full flex items-center justify-center ml-3"
                            :class="{ 'bg-[#172969] ': gummyType === value.id }">
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
                        <div class="w-6 h-6 rounded-full flex items-center justify-center ml-3 border-2"
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
                <h2 class="text-lg font-bold mt-3 border-b border-[#e7e7e7] pb-4 uppercase">
                    STEP 3: PAYMENT METHOD
                </h2>

                <!-- PayPal Method -->
                <label @click="paymentMethod = 'payPal'"
                    class="flex items-center justify-between  pl-0 pt-4 pr-4 pb-4  lg:pt-6 lg:pr-6 lg:pb-6 border-b border-[#e7e7e7] cursor-pointer">
                    <div class="flex items-center space-x-3">
                        <input type="radio" name="YOMZ" class="peer hidden">
                        <div
                            class="w-6 h-6 border-2  rounded-full flex items-center justify-center border-[#172969] peer-checked:bg-[#172969] ml-3">
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
                            class="w-6 h-6 border-2 rounded-full flex items-center justify-center border-[#172969] peer-checked:bg-[#172969] ml-3">
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

                <!-- STEP 4: CONTACT INFORMATION -->
                <div class="bg-white p-4 rounded-lg shadow mt-3">
                    <h2 class="text-lg font-bold mt-3 border-b border-[#e7e7e7] pb-4 mb-1 uppercase">
                        STEP 4: CONTACT INFORMATION
                    </h2>

                    <div class="bg-white pt-4">
                        <form class="space-y-4">
                            <!-- First Name -->
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input v-model="formFields.firstName" name="firstName" type="text"
                                        @blur="validateField('firstName')" placeholder="First Name" :class="[
                                            'w-full p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                            // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                            errors.firstName ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500'
                                        ]" />
                                    <!-- <span class="hidden ml-2 text-sm text-[#e6193c]"></span> -->
                                    <span v-if="errors.firstName" class="ml-2 text-sm text-[#e6193c]">
                                        {{ errors.firstName }}
                                    </span>
                                </div>

                                <!-- Last Name -->
                                <div>
                                    <input v-model="formFields.lastName" name="lastName" type="text"
                                        @blur="validateField('lastName')" placeholder="Last Name"
                                        :class="[
                                            'w-full p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                            // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                            errors.lastName ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
                                    <!-- <span class="hidden ml-2 text-sm text-[#e6193c]"></span> -->
                                    <span v-if="errors.lastName" class="ml-2 text-sm text-[#e6193c]">
                                        {{ errors.lastName }}
                                    </span>
                                </div>

                            </div>

                            <!-- Email -->
                            <input v-model="formFields.email" name="email-address" type="email" placeholder="E-mail"
                                :class="[
                                    'w-full mb-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                    // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                    errors.email ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
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
                                    placeholder="Phone"
                                    :class="[
                                        'w-full mb-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                        errors.phoneNumber ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
                            </div>
                            <span v-if="errors.phoneNumber" class="ml-22 md:ml-25 text-sm text-[#e6193c]">
                                {{ errors.phoneNumber }}
                            </span>

                        </form>
                    </div>

                    <!-- Desktop Screen -->
                    <Reviews v-if="!isMobile" />
                </div>

                <!-- STEP 5: SHIPPING ADDRESS -->
                <div v-if="paymentMethod === 'creditCard'" class="bg-white p-4 rounded-lg shadow mt-3">

                    <h2 class="text-lg font-bold mt-3 border-b border-[#e7e7e7] pb-4 mb-4 uppercase">
                        STEP 5: SHIPPING ADDRESS
                    </h2>

                    <form class="space-y-4">
                        <!-- Shipping - First Name -->
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                            <div>
                                <input v-model="formFields.shipFirstName" name="shipFirstName" type="text"
                                    placeholder="First Name"
                                    :class="[
                                        'w-full mb-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                        errors.shipFirstName ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
                                <span v-if="errors.shipFirstName" class="ml-2 text-sm text-[#e6193c]">
                                    {{ errors.shipFirstName }}
                                </span>
                            </div>

                            <!-- Shipping - Last Name -->
                            <div>
                                <input v-model="formFields.shipLastName" name="shipLastName" type="text"
                                    placeholder="Last Name"
                                    :class="[
                                        'w-full mb-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                        errors.shipLastName ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
                                <span v-if="errors.shipLastName" class="ml-2 text-sm text-[#e6193c]">
                                    {{ errors.shipLastName }}
                                </span>
                            </div>
                        </div>

                        <!-- Shipping - Street Address -->
                        <input v-model="formFields.shipStreetAddress" name="shipStreetAddress" type="text"
                            placeholder="Street Address"
                            :class="[
                                'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                errors.shipStreetAddress ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
                        <span v-if="errors.shipStreetAddress" class="ml-2 text-sm text-[#e6193c]">
                            {{ errors.shipStreetAddress }}
                        </span>

                        <!-- Shipping -  Apartment or Suite (Optional) -->
                        <input v-model="formFields.shipApptsAddress" name="shipApptsAddress" type="text"
                            placeholder="Apartment or Suite (Optional)"
                            :class="[
                                'w-full mb-4 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                errors.shipApptsAddress ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
                        <span v-if="errors.shipApptsAddress" class="ml-2 text-sm text-[#e6193c]">
                            {{ errors.shipApptsAddress }}
                        </span>

                        <!-- Shipping - City -->
                        <input v-model="formFields.shipCity" name="shipCity" type="text" placeholder="City" :class="[
                            'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                            // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                            errors.shipCity ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
                        <span v-if="errors.shipCity" class="ml-2 text-sm text-[#e6193c]">
                            {{ errors.shipCity }}
                        </span>

                        <!-- Shipping - Country -->
                        <select v-model="formFields.shipCounty" name="shipCounty" :class="[
                            'w-full mb-0 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                            // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                            errors.shipCity ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
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
                                <select v-model="formFields.shipState" name="shipState" :class="[
                                    'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                    // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                    errors.shipCity ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']">
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
                                    placeholder="Postal Code"
                                    :class="[
                                        'w-full m-0 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                        errors.shipPostalCode ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
                                <span v-if="errors.shipPostalCode" class="ml-2 text-sm text-[#e6193c]">
                                    {{ errors.shipPostalCode }}
                                </span>
                            </div>
                        </div>

                        <!-- Credit Card Number -->
                        <input v-model="formFields.creditCardNumber" name="creditCardNumber" type="text"
                            placeholder="Credit Card Number"
                            :class="[
                                'w-full m-0 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                errors.creditCardNumber ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
                        <span v-if="errors.creditCardNumber" class="ml-2 text-sm text-[#e6193c]">
                            {{ errors.creditCardNumber }}
                        </span>

                        <!-- Security Code (3-4 Digits) -->
                        <input v-model="formFields.cardCVV" name="cardCVV" type="text"
                            placeholder="Security Code (3-4 Digits)" :class="[
                                'w-full m-0 mt-4 p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
                                errors.cardCVV ? 'border border-red-500 ring-[#e6193c]' : 'focus:ring-blue-500']" />
                        <span v-if="errors.cardCVV" class="ml-2 text-sm text-[#e6193c]">
                            {{ errors.cardCVV }}
                        </span>

                        <!-- Card Expiry Month -->
                        <div class="mb-0 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <select v-model="formFields.expiryMonth" name="expiryMonth"
                                    :class="[
                                        'w-full p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
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
                                    :class="[
                                        'w-full p-3 rounded-md h-[60px] bg-gray-100 focus:outline-none focus:ring-2',
                                        // errors.firstName ? 'border border-red-500 ring-1 ring-[#e6193c]' : 'border border-[#278f5a] focus:ring-[#278f5a]'
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

                    </form>
                </div>

                <!-- STEP 6: BILLING ADDRESS -->
                <div v-if="paymentMethod === 'creditCard'" class="bg-white p-4 rounded-lg shadow mt-3">
                    <h2 class="d-block text-[18px] font-bold border-b border-[#e7e7e7] pb-4 pt-2 mb-3 uppercase">
                        STEP 6: BILLING ADDRESS
                    </h2>

                    <!-- Option: Same as shipping address -->
                    <div class="flex items-center justify-between pb-4 ">
                        <div class="flex items-center space-x-3">
                            <div @click="sameBilling = true"
                                class="w-6 h-6 border-2 rounded-full flex items-center justify-center border-[#172969] cursor-pointer"
                                :class="{ 'bg-[#172969]': sameBilling }">
                                <svg v-if="sameBilling" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                    <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#fff" stroke-width="3"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <span class="cursor-pointer select-none" @click="sameBilling = true">
                                Same as shipping address</span>
                        </div>
                    </div>

                    <!-- Option: Use a different billing address -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center space-x-3">
                            <div @click="sameBilling = false"
                                class="w-6 h-6 border-2 rounded-full flex items-center justify-center border-[#172969] cursor-pointer"
                                :class="{ 'bg-[#172969]': !sameBilling }">
                                <svg v-if="!sameBilling" viewBox="0 0 24 24" fill="none"
                                    xmlns="http://www.w3.org/2000/svg" stroke="#ffffff">
                                    <path d="M4.89163 13.2687L9.16582 17.5427L18.7085 8" stroke="#fff" stroke-width="3"
                                        stroke-linecap="round" stroke-linejoin="round" />
                                </svg>
                            </div>
                            <span @click="sameBilling = false" class="cursor-pointer select-none">
                                Use a different billing address</span>
                        </div>
                    </div>

                    <Transition name="sameName">
                        <form v-if="!sameBilling" class="space-y-4 mt-5">
                            <!-- Billing - First Name -->
                            <div class="mb-0 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <input v-model="formFields.billingFirstName" name="billingFirstName" type="text"
                                        placeholder="First Name"
                                        class="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[60px]">
                                    <span class="hidden ml-2 text-sm text-[#e6193c]"></span>
                                </div>

                                <!-- Billing - Last Name -->
                                <div>
                                    <input v-model="formFields.billingLastName" name="billingLastName" type="text"
                                        placeholder="Last Name"
                                        class="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[60px]">
                                    <span class="hidden ml-2 text-sm text-[#e6193c]"></span>
                                </div>
                            </div>

                            <!-- Billing - Street Address -->
                            <input v-model="formFields.billingStreetAddress" name="billingStreetAddress" type="text"
                                placeholder="Street Address"
                                class="mb-0 mt-4 w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[60px]">
                            <span class="hidden ml-2 text-sm text-[#e6193c]"></span>

                            <!-- Billing - Apartment or Suite (Optional) -->
                            <input v-model="formFields.billingApptsAddress" name="billingApptsAddress" type="text"
                                placeholder="Apartment or Suite (Optional)"
                                class="mb-0 mt-4 w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[60px]">
                            <span class="hidden ml-2 text-sm text-[#e6193c]"></span>

                            <!-- Billing - City -->
                            <input v-model="formFields.billingCity" name="billingCity" type="text"
                                placeholder="Apartment or Suite (Optional)"
                                class="mb-0 mt-4 w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[60px]">
                            <span class="hidden ml-2 text-sm text-[#e6193c]"></span>

                            <!-- Billing - Country -->
                            <select v-model="formFields.billingCounty" name="billingCounty"
                                class="mb-0 mt-4 w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[60px]">
                                <option value="">-- Choose Country --</option>
                                <option value="us">United States</option>
                                <option value="ca">Canada</option>
                            </select>
                            <span class="hidden ml-2 text-sm text-[#e6193c]"></span>

                            <!-- Billing - States -->
                            <div class="mb-0 mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div>
                                    <select v-model="formFields.billingState" name="billingState"
                                        class="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[60px]">
                                        <option value="">-- Choose State --</option>
                                        <option v-for="state in usStates" :key="state.code" :value="state.code">
                                            {{ state.name }}
                                        </option>
                                    </select>
                                    <span class="hidden ml-2 text-sm text-[#e6193c]"></span>
                                </div>

                                <!-- Billing - Postal Code -->
                                <div>
                                    <input v-model="formFields.billingPostalCode" name="billingPostalCode" type="text"
                                        placeholder="Postal Code"
                                        class="w-full p-3 rounded-md bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500 h-[60px]">
                                    <span class="hidden ml-2 text-sm text-[#e6193c]"></span>
                                </div>

                            </div>
                        </form>
                    </Transition>
                </div>
                <!-- ORDER SUMMARY -->
                <div class="bg-white p-4 rounded-lg shadow mt-3">
                    <h2 class="text-lg font-bold mt-3 border-b border-[#e7e7e7] pb-4 mb-4 uppercase">
                        {{ paymentMethod === 'payPal' ? 'STEP 5' : 'STEP 7' }}: ORDER SUMMARY
                    </h2>

                    <div @click="extraProduct = !extraProduct"
                        class="bg-[#f5f5f5] border border-[#e0e0e0] rounded-lg shadow-sm lg:p-6 p-2 space-y-4  text-center hover:border-[#323232]  transition-all duration-[400ms] cursor-pointer select-none">

                        <!-- Icon at top -->
                        <div class="flex justify-center">
                            <span class="text-4xl">
                                <img src="/images/funds.png" class="h-16">
                            </span>
                        </div>

                        <!-- Yes, I want 2 Years of Protection. -->
                        <div class="flex justify-center items-center">
                            <div class="flex items-center cursor-pointer justify-center w-fit">
                                <img src="/images/redarrow.svg" class="lg:w-6 w-6 arrowimg relative" />
                                <div :class="['w-6 h-6 border-2 border-[#172969] shrink-0 rounded-full flex items-center justify-center ml-3',
                                    extraProduct ? 'bg-[#172969]' : 'bg-transparent']">
                                    <NuxtImg v-if="extraProduct" src="/images/whiteTick.svg" alt="white-tick" />
                                </div>
                                <span class="font-semibold text-gray-900 lg:text-lg text-sm lg:ms-5 ms-1">
                                    Yes, I want 2 Years of Protection.
                                </span>
                            </div>
                        </div>

                        <!-- Description -->
                        <p class="text-gray-700 text-sm">
                            <span class="font-semibold">One Time Offer:</span> By placing your order today you can
                            have
                            2 years of protection and replacement warranty for only an additional
                            <span class="font-semibold">$19.97</span>. This extended warranty means your product is
                            covered for 2 years.
                        </p>
                    </div>

                    <!-- Product Section -->
                    <div v-for="product in cartData" :key="product.id" class=" w-full pt-6 space-y-6">

                        <div name="product-details">
                            <div class="flex justify-between items-center mb-2">
                                <div class="flex items-center space-x-2">
                                    <p class="text-800 text-lg font-bold">Product</p>
                                </div>
                                <p class="text-gray-800 text-lg font-bold">Price</p>
                            </div>

                            <div class="flex justify-between items-start mb-2">
                                <div class="flex items-start space-x-4">
                                    <img :src="product.img[gummyType]" alt="Product"
                                        class="w-20 h-20 object-contain border rounded">
                                    <div>
                                        <h3 class="font-semibold text-gray-900">{{ product.title[gummyType] }}</h3>
                                        <span
                                            class="inline-block mt-1 text-sm bg-gray-700 text-white px-2 py-0.5 rounded-full font-semibold">
                                            {{ product.bagQty }} Bags
                                        </span>
                                    </div>
                                </div>
                                <div class="text-right">
                                    <p class="text-sm text-red-500 line-through font-semibold">
                                        Regular ${{ product.compareAtPrice }}</p>
                                    <p class="text-gray-900 font-semibold">${{ product.price.toFixed(2) }}</p>
                                </div>
                            </div>

                            <!-- Free Shipping -->
                            <div class="flex justify-between items-center mb-2">
                                <div v-if="product.id === 3" class="flex items-center space-x-2">
                                    <p class="text-lg font-semibold text-gray-800">Shipping Price</p>
                                </div>
                                <div v-else class="flex items-center space-x-2">
                                    <img class="w-5" src="/images/check-icons.png">
                                    <p class="text-lg font-semibold text-gray-800">Free Shipping</p>
                                </div>
                                <div v-if="product.id === 3">
                                    <span class="text-md font-bold">$7.99</span>
                                </div>
                                <div v-else class="flex gap-1">
                                    <span class="text-md font-semibold line-through text-red-500">$7.99</span>
                                    <span class="text-md font-semibold text-green-600 ">Free</span>
                                </div>

                            </div>

                            <!-- Total -->
                            <div class="bg-gray-100 px-4 py-3 rounded-lg flex justify-between items-center mb-2">
                                <div>
                                    <p class="text-gray font-bold">Total:
                                        <span class="text-sm">Before Taxes</span>
                                    </p>
                                </div>

                                <div class="flex gap-3 items-baseline font-bold">
                                    <!-- discount % -->
                                    <span class="font-bold text-sm text-red">
                                        -{{ product.percentageOff }}%</span>

                                    <!-- final price -->
                                    <span class="font-bold text-gray-900 text-lg">
                                        ${{ product.id === 3
                                            ? (product.price + 7.99).toFixed(2) : product.price.toFixed(2) }}
                                    </span>

                                    <!-- total price -->
                                    <span
                                        class="text-md font-bold text-white line-through bg-[#c91f3f] px-2 py-1 rounded-2xl">
                                        ${{ (Number(product.compareAtPrice) + 7.99).toFixed(2) }}
                                    </span>

                                </div>
                            </div>

                            <p class="text-center text-[0.9rem] font-medium">
                                🔒 By placing this order you accept YOMZ's Privacy Policy and Terms of Use.
                            </p>
                        </div>

                        <!-- Checkout Button -->
                        <button @click="formSubmit"
                            :class="['w-full flex justify-center items-center  font-semibold py-3 rounded-lg text-lg cursor-pointer', paymentMethod === 'payPal' ? 'bg-yellow-400 hover:bg-yellow-500 text-black' : 'bg-[#1ab22c] hover:bg-[#169924] text-white']">
                            {{ paymentMethod === 'payPal' ? 'CHECKOUT WITH' : 'COMPLETE PURCHASE' }}
                            <img v-if="paymentMethod === 'payPal'"
                                src="https://www.paypalobjects.com/webstatic/mktg/Logo/pp-logo-200px.png" alt="PayPal"
                                class="h-6 ml-2">
                        </button>

                        <div
                            class="flex flex-col sm:flex-row items-center sm:items-start lg:pt-0 lg:pr-6 lg:pb-6 lg:pl-6 pt-0 pr-2 pb-2 pl-2">
                            <img src="/images/guarantee.png" alt=""
                                class="h-25 mb-3 sm:mb-0 sm:mr-3 flex-shrink-0 mt-1">
                            <p class="text-gray-700 leading-[1.2] text-center sm:text-left">
                                Your order today is protected by our ridiculously iron-clad Picky Momz 90-day
                                <span class="font-bold">200% Happiness Guarantee.</span>
                                If you’re not happy with how
                                <span class="font-bold">great</span>
                                you and your family feel, or how improved your energy, focus, and gut issues are,
                                then
                                let us know anytime in the next
                                <span class="font-bold">90 days.</span> We’ll refund <span
                                    class="font-bold">DOUBLE</span>
                                what you paid.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

        </div>
    </div>

    <div class="max-w-[1200px] mx-auto py-5">
        <div class="w-full bg-white shadow rounded-lg lg:p-6 p-3 lg:pt-6 pt-6">

            <!-- Section Title -->
            <h2 class="text-center text-2xl extrablod text-gray-800 mb-6">
                FREQUENTLY ASKED QUESTIONS
            </h2>
            <!-- FAQ Item 1 -->
            <div class="mb-4">
                <button class="w-full text-left bg-gray-900 text-white px-4 py-3 font-semibold">
                    Do I really need to continue taking YOMZ after a couple of months or so?
                </button>
                <p class="px-4 py-4 text-gray-700 text-sm">
                    No, you don’t. Our mission is to end Hidden Hunger for 100 million people by 2030. If it happens
                    because families take their YOMZ daily for the next 3 years, then great. But if it happens
                    because
                    by taking YOMZ, you and your family were inspired to transform your lives by overhauling your
                    diet,
                    exercise routine, nutritional awareness, etc., then that’s great, too. We just want to help you
                    however we can. 
                </p>
            </div>

            <!-- FAQ Item 1 -->
            <div class="mb-4">
                <button class="w-full text-left bg-gray-900 text-white px-4 py-3 font-semibold">
                    Will it target gut health, low energy, and decreased focus?
                </button>
                <p class="px-4 py-4 text-gray-700 text-sm">
                    Absolutely. We carefully curated the ingredients in YOMZ with an eye toward gut health. We knew,
                    and
                    research backs this up, that if we help improve the gut health of your family, it would directly
                    lead to better energy and focus.
                </p>
            </div>

            <!-- FAQ Item 1 -->
            <div class="mb-4">
                <button class="w-full text-left bg-gray-900 text-white px-4 py-3 font-semibold">
                    How about helping with brain function, immunity, even heart health?
                </button>
                <p class="px-4 py-4 text-gray-700 text-sm">
                    Yes. Again, everything starts with improved gut health. In fact, there’s a direct link between
                    gut
                    health and brain function. Similarly, better gut health is critical for a more robust immune
                    system
                    and a stronger heart.
                </p>
            </div>

            <!-- FAQ Item 1 -->
            <div class="mb-4">
                <button class="w-full text-left bg-gray-900 text-white px-4 py-3 font-semibold">
                    Is it safe for kids?
                </button>
                <p class="px-4 py-4 text-gray-700 text-sm">
                    Yes. Family is one of our 3 core values, so it has to be safe for ages 2 to 102. That’s why YOMZ
                    has
                    only 1g of added sugar and no artificial dyes. It’s free of GMOs, gluten, and dairy plus
                    keto-friendly and vegan.
                </p>
            </div>

            <!-- FAQ Item 1 -->
            <div class="mb-4">
                <button class="w-full text-left bg-gray-900 text-white px-4 py-3 font-semibold">
                    Will YOMZ help me lose weight?
                </button>
                <p class="px-4 py-4 text-gray-700 text-sm">
                    Let’s be clear, YOMZ is not a weight loss gummy. Even if you take 2-3 servings per day. However,
                    if
                    YOMZ helps you and your family be more active… If it causes you to reduce how much processed
                    foods
                    you eat… Or if by helping improve your immune system or kids’ growth and development, YOMZ helps
                    you
                    become stronger… then who knows what other results are possible? 😉
                </p>
            </div>

            <!-- FAQ Item 1 -->
            <div class="mb-4">
                <button class="w-full text-left bg-gray-900 text-white px-4 py-3 font-semibold">
                    What if I don’t notice a difference — is there a guarantee?
                </button>
                <p class="px-4 py-4 text-gray-700 text-sm">
                    It would be a shame. That’s why we have the most ridiculously iron-clad guarantee you’ll find
                    anywhere. If you don’t absolutely love YOMZ, simply reach out to us within 90 days and we’ll
                    cheerfully refund double what you paid. It’s the YOMZ 90-Day Picky Momz 200% Happiness
                    Guarantee. We
                    take on all the risk so you can try it with total peace of mind. The worst that’ll happen is you
                    double your investment in 90 days. Not even Wall St. can guarantee that.
                </p>
            </div>

            <!-- FAQ Item 1 -->
            <div class="mb-4">
                <button class="w-full text-left bg-gray-900 text-white px-4 py-3 font-semibold">
                    Will I have to change my family’s diet or meals or snack routine?
                </button>
                <p class="px-4 py-4 text-gray-700 text-sm">
                    Not at all. It’s really up to you and your family. If you don’t change anything, you can still
                    rest
                    easier knowing you’re leveling up your nutrition. That’s a win right there. But there’s a very
                    good
                    chance that the mere daily routine of filling those nutrition gaps with YOMZ will lead to eating
                    better. Once you start filling your nutrition needs, cravings for junk vanish. So play it by ear
                    and
                    your heart will know if change is good.
                </p>
            </div>

            <!-- FAQ Item 1 -->
            <div class="mb-4">
                <button class="w-full text-left bg-gray-900 text-white px-4 py-3 font-semibold">
                    How many bags do I need for my family?
                </button>
                <p class="px-4 py-4 text-gray-700 text-sm">
                    One bag of YOMZ is filled with 28 packs. Each pack equals a daily serving for 1 person. So 1
                    family
                    member = 1 bag of nutrition for 28 days. So how bags you need depends on how many family members
                    you
                    want to help.
                </p>
            </div>

            <!-- FAQ Item 1 -->
            <div class="mb-4">
                <button class="w-full text-left bg-gray-900 text-white px-4 py-3 font-semibold">
                    Why is it priced lower than your competitors?
                </button>
                <p class="px-4 py-4 text-gray-700 text-sm">
                    YOMZ has no competition, first and foremost. It’s a unicorn. No other gummy delivers amazing
                    taste
                    that’s also packed with antioxidants, vitamins, micronutrients, and 9g of fiber. As for price,
                    there
                    is no middleman. We’re making this offer directly to you. Because we don’t have to pay a
                    middleman
                    to offer it or sell it to you, we’re passing the savings on to you. On top of that, our mission
                    is
                    to end Hidden Hunger for 100 million people by 2030. There’s no way we could do that if we
                    jacked up
                    the price. This philosophy will never change. It’s the foundation of YOMZ.
                </p>
            </div>

        </div>
    </div>

    <footer class="w-full text-gray-500 text-center text-sm py-6 px-4">

        <!-- Links -->
        <div class="space-x-2 mb-2">
            <a href="#" class="hover:text-gray-700">Terms & Conditions</a> |
            <a href="#" class="hover:text-gray-700">Privacy Policy / CCPA</a> |
            <a href="#" class="hover:text-gray-700">Returns</a> |
        </div>

        <!-- Disclaimer -->
        <p class="max-w-2xl mx-auto text-xs leading-relaxed">
            By filling out the field, you consent for YOMZ™ to use automated technology,
            including texts and prerecorded messages, to contact you at the number and email provided about YOMZ™
            offers.
        </p>

        <!-- DMCA Badge -->
        <div class="flex justify-center mt-3">
            <img src="/images/dmca.png" alt="DMCA Protection" class="h-6">
        </div>

    </footer>
</template>

<style scoped>
.offer-circle .offer-text {
    -webkit-animation: rotateclc 12s linear infinite;
    animation: rotateclc 12s linear infinite;
}

.arrowimg {
    -webkit-animation: leftdemote 3s infinite;
    animation: leftdemote 3s infinite;
}

@keyframes rotateclc {
    100% {
        transform: rotate(-360deg);
    }
}

.arrowimg {
    -webkit-animation: leftdemote 3s infinite;
    animation: leftdemote 3s infinite;
    top: 0px;
    left: -30px;
}

@keyframes leftdemote {
    0% {
        left: -30px;
    }

    10% {
        left: -40px;
    }

    18% {
        left: -24px;
    }

    25% {
        left: -30px;
    }
}
</style>
