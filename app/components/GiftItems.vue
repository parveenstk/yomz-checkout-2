<script setup>

const props = defineProps({
    customClass: {
        type: String,
        required: false,
        default: '',
    },
    selectedBag: {
        type: Number,
        required: true,
    },
    version: {
        type: String,
        default: 'first', // default is first if not passed
    },
});

// Utility: check if an item is dimmed
const isDimmed = (index) => {
    if (props.selectedBag === 1) return true;
    if (props.selectedBag === 2) return index > 2;
    return false;
};

// Now: filter based on version
const visibleItems = computed(() => {
    if (props.version === 'second') {
        return giftItemsData.filter((_, index) => !isDimmed(index));
    }
    return giftItemsData;
});

// watch(visibleItems, (newValue) => {
//     console.log("newValue:", newValue);
// })

</script>

<template>

    <div v-for="(item, index) in visibleItems" :key="index" :class="[
        'mt-2 mb-2 px-1 border border-dashed border-blue-500 rounded-lg overflow-hidden relative',
        customClass
    ]">
        <!-- Gradient overlay -->
        <div class="absolute inset-0 w-full h-full z-10 
      bg-[linear-gradient(144deg,rgba(255,235,0,0.27)_0%,rgba(30,185,240,0.2)_100%)]"
            :style="{ opacity: props.version === 'first' && isDimmed(index) ? '0.1' : '1' }"></div>

        <p :style="{ opacity: props.version === 'first' && isDimmed(index) ? '0.1' : '1' }"
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

</template>