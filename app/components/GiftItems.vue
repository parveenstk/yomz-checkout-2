<template>
    <div class="mt-2 mb-2 mx-3">
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
    </div>
</template>