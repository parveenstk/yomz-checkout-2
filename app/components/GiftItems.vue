<script setup>
defineProps({
    customClass: {
        type: String,
        required: true,
        default: '',
    },
});
</script>

<template>
    <!-- <div :class="['mt-2 mb-2', customClass]">
        <p v-for="(item, index) in giftItemsData" :key="index"
            class="flex items-center justify-between py-2 px-0 lg:text-lg text-sm">
            <span class="flex items-center lg:gap-3 gap-2">
                <NuxtImg :src="item.img" :class="[
                    'lg:h-16 h-12 rounded-lg',
                    (index === 0 || index === 3) ? 'border-1 p-1 border-[#e0e0e0]' : '']" />
                {{ item.name }}
            </span>
            <span class="flex items-center gap-1">
                <del class="text-[#9ca3af]">{{ item.oldPrice }}</del>
                <span>$0.00</span>
            </span>
        </p>
    </div> -->

    <div :class="['mt-2 mb-2', customClass]">
        <p class="flex items-center justify-between py-2 px-0 lg:text-lg text-sm">
            <span class="flex items-center lg:gap-3 gap-2">
                <NuxtImg src="/images/git-logo.png" class="lg:h-16 h-12 rounded-lg border-1 p-1 border-[#e0e0e0]" />
                YOMZ Collectible Sticker
            </span>
            <span class="flex items-center gap-1">
                <del class="text-[#9ca3af]">$4.99</del>
                <span>$0.00</span>
            </span>
        </p>
    </div>

    <div :class="['mt-2 mb-2', customClass]">
        <p class="flex items-center justify-between py-2 px-0 lg:text-lg text-sm">
            <span class="flex items-center lg:gap-3 gap-2">
                <NuxtImg src="/images/feature-book2.jpg" class="lg:h-16 h-12 rounded-lg" />
                YOMZ Interactive E-book
            </span>
            <span class="flex items-center gap-1">
                <del class="text-[#9ca3af]">$9.99</del>
                <span>$0.00</span>
            </span>
        </p>
    </div>

    <!-- 3rd Gift -->
    <div :class="['mt-2 mb-2', customClass]">
        <p class="flex items-center justify-between py-2 px-0 lg:text-lg text-sm">
            <span class="flex items-center lg:gap-3 gap-2">
                <NuxtImg src="/images/feature-giftcard.jpg" class="lg:h-16 h-12 rounded-lg" />
                YOMZ $20 Gift Card
            </span>
            <span class="flex items-center gap-1">
                <del class="text-[#9ca3af]">$20.00</del>
                <span>$0.00</span>
            </span>
        </p>
    </div>

    <!-- 4th Gift -->
    <div :class="['mt-2 mb-2', customClass]">
        <p class="flex items-center justify-between py-2 px-0 lg:text-lg text-sm">
            <span class="flex items-center lg:gap-3 gap-2">
                <NuxtImg src="/images/feature-refund2.jpg" class="lg:h-16 h-12 rounded-lg" />
                Chance for Order Refund
            </span>
            <span class="flex items-center gap-1">
                <del class="text-[#9ca3af]">$239.97</del>
                <span>$0.00</span>
            </span>
        </p>
    </div>
</template>