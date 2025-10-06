<script setup>

defineProps({
    customClass: {
        type: String,
        required: true,
        default: '',
    }
});
</script>

<template>
    <!-- <div
        :class="['mt-2 mb-2 px-1 border border-dashed border-blue-500 rounded-lg overflow-hidden relative', customClass]">

        Gradient overlay
        <div
            class="absolute inset-0 w-full h-full z-10 bg-[linear-gradient(144deg,rgba(255,235,0,0.27)_0%,rgba(30,185,240,0.2)_100%)]">
        </div>
        <p class="flex items-center justify-between py-1 px-0 lg:text-lg text-sm relative z-20 font-bold">
            <span class="flex items-center lg:gap-3 gap-2">
                <NuxtImg src="/images/gift1.jpg"
                    class="lg:h-16 h-16 rounded-lg border border-dashed border-blue-500 p-1" />
                YOMZ Collectible Sticker
            </span>
            <span class="flex items-center gap-1 font-bold">
                <del class="text-[#474747]">$4.99</del>
                <span>$0.00</span>
            </span>
        </p>
    </div>

    <div
        :class="['mt-2 mb-2 px-1 border border-dashed border-blue-500 rounded-lg overflow-hidden relative', customClass]">

        Gradient overlay
        <div
            class="absolute inset-0 w-full h-full z-10 bg-[linear-gradient(144deg,rgba(255,235,0,0.27)_0%,rgba(30,185,240,0.2)_100%)]">
        </div>
        <p class="flex items-center justify-between py-1 px-0 lg:text-lg text-sm relative z-20 font-bold">
            <span class="flex items-center lg:gap-3 gap-2">
                <NuxtImg src="/images/gift2.jpg"
                    class="lg:h-16 h-16 rounded-lg border border-dashed border-blue-500 p-1" />
                YOMZ Interactive E-book
            </span>
            <span class="flex items-center gap-1 font-bold">
                <del class="text-[#474747]">$9.99</del>
                <span>$0.00</span>
            </span>
        </p>
    </div>

    <div
        :class="['mt-2 mb-2 px-1 border border-dashed border-blue-500 rounded-lg overflow-hidden relative', customClass]">

        <div class="">
            Gradient overlay
            <div
                class="absolute inset-0 w-full h-full  z-10 bg-[linear-gradient(144deg,rgba(255,235,0,0.27)_0%,rgba(30,185,240,0.2)_100%)]">
            </div>
            <p class="flex items-center justify-between py-1 px-0 lg:text-lg text-sm relative z-20 font-bold">
                <span class="flex items-center lg:gap-3 gap-2">
                    <NuxtImg src="/images/gift3.jpg"
                        class="lg:h-16 h-16 rounded-lg border border-dashed border-blue-500 p-1" />
                    YOMZ $20 Gift Card
                </span>
                <span class="flex items-center gap-1 font-bold">
                    <del class="text-[#474747]">$20.00</del>
                    <span>$0.00</span>
                </span>
            </p>
        </div>
    </div>

    <div
        :class="['mt-2 mb-2 px-1 border border-dashed border-blue-500 rounded-lg overflow-hidden relative', customClass]">

        <div class="opacity-10">
            Gradient overlay
            <div
                class="absolute inset-0 w-full h-full z-10 bg-[linear-gradient(144deg,rgba(255,235,0,0.27)_0%,rgba(30,185,240,0.2)_100%)]">
            </div>
            <p class="flex items-center justify-between py-1 px-0 lg:text-lg text-sm relative z-20 font-bold">
                <span class="flex items-center lg:gap-3 gap-2">
                    <NuxtImg src="/images/gift4.jpg"
                        class="lg:h-16 h-16 rounded-lg border border-dashed border-blue-500 p-1" />
                    Chance for Order Refund
                </span>
                <span class="flex items-center gap-1 font-bold">
                    <del class="text-[#474747]">$239.97</del>
                    <span>$0.00</span>
                </span>
            </p>
        </div>
    </div> -->

    <!-- <p class="lg:text-lg text-sm text-center">Order now... only <span
            class="extrablod text-[#C91F3F] lg:text-xl text-lg mx-1">23</span> left in stock for this offer</p> -->

    <div>
        <div v-for="(item, index) in giftItemsData" :key="index" :class="[
            'mt-2 mb-2 px-1 border border-dashed border-blue-500 rounded-lg overflow-hidden relative',
            customClass]">

            <!-- Gradient overlay -->
            <div class="absolute inset-0 w-full h-full z-10 
            bg-[linear-gradient(144deg,rgba(255,235,0,0.27)_0%,rgba(30,185,240,0.2)_100%)]"
                :style="{ opacity: index === 3 ? '0.1' : '1' }">
            </div>

            <p :style="{ opacity: index === 3 ? '0.1' : '1' }"
                class="flex items-center justify-between py-1 px-0 lg:text-lg text-sm relative z-20 font-bold">
                <span class="flex items-center lg:gap-3 gap-2">
                    <NuxtImg :src="item.img" class="lg:h-16 h-16 rounded-lg border border-dashed border-blue-500 p-1" />
                    {{ item.name }}
                </span>
                <span class="flex items-center gap-1 font-bold">
                    <del class="text-[#474747]">{{ item.oldPrice }}</del>
                    <span>$0.00</span>
                </span>
            </p>
        </div>

        <!-- <p class="lg:text-lg text-sm text-center mb-2">
            Order now... only
            <span class="extrablod text-[#C91F3F] lg:text-xl text-lg mx-1">23</span>
            left in stock for this offer
        </p> -->
    </div>

</template>