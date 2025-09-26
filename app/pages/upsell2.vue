<template>
    <div class="w-full bg-white py-4 lg:px-4 px-1">
        <UpsellBreadCrumbs />

        <h2 class="text-center lg:text-5xl text-3xl extrablod lg:mt-10 mt-3">WAIT! Your Order Is Not Complete Yet</h2>
        <p class="text-center lg:my-3 my-1  lg:mb-8 mb-3">Please Watch This Quick Video…</p>
        <div class="flex justify-center items-center w-full max-w-5xl mx-auto p-4 ">
            <!-- <img src="/images/upsell.jpg" class="w-full border-1 border-[#ccc] rounded-xl" alt="Upsell Image"> -->

            <div ref="wrapper" id="videoWrapper" class="w-full relative cursor-pointer" tabindex="0" @click="togglePlay"
                @keydown.space.prevent="togglePlay" @mousemove="onMouseMove">
                <video ref="video" id="myVideo" class="w-full rounded-lg shadow-lg block" playsinline :poster="poster"
                    preload="metadata" style="aspect-ratio:16/9;">
                    <source :src="src" type="video/mp4" />
                    Your browser does not support the video tag.
                </video>

                <!-- overlay icon (pointer-events: none so it doesn't block clicks) -->
                <img :src="overlaySrc" id="overlayIcon"
                    class="absolute inset-0 m-auto w-16 h-16 select-none pointer-events-none z-10 transition-opacity duration-300"
                    :class="{ 'opacity-0': hideOverlay }" alt="Play / Pause" />
            </div>

        </div>
        <h3 class="lg:text-4xl text-2xl extrablod mx-auto w-full max-w-5xl mt-4 text-center">
            <span class="inline lg:block text-center"> to decrease our prices</span>
            <span class="inline lg:block text-center"> and to make</span>
        </h3>

    </div>

    <section class="lg:py-10 py-4 bg-white">

        <h2 class="lg:text-5xl text-4xl extrablod lg:mb-16 lg:mt-20 mb-4 mt-4 text-center">CHOOSE YOUR PACKAGE</h2>
        <div class="max-w-5xl mx-auto px-3">
            <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">

                <!-- Column 1 -->
                <div class="bg-gray-100 p-0 rounded-xl shadow text-center overflow-hidden 
            transform transition duration-300 
            hover:scale-105 hover:shadow-xl cursor-pointer">
                    <p class="text-xl p-3 bg-[#65a2b7] text-white font-bold">BASIC</p>
                    <div class="p-3">
                        <p class="text-5xl extrablod text-[#65a2b7]">1 PERSON</p>
                        <p class="text-2xl font-black mb-2">28 Day Supply</p>
                        <img src="/images/desktop-bag-1.png" class="mb-3">

                        <del class="block text-3xl  text-gray-500">$79.99</del>
                        <p class="flex gap-3 items-center justify-center">
                            <span class="block text-5xl extrablod">$48.00</span>
                            <span class="block text-sm font-black rounded-sm bg-[#E6193C] p-1 text-white">SAVE
                                40%</span>

                        </p>

                        <p class="block text-lg font-black my-2">$1.71 per day</p>

                        <button type="button"
                            class="rounded-xl block w-full text-center lg:mt-20 mt-3 p-3 bg-[#FFEB00] text-black">
                            <span class="block text-3xl extrablod">ADD TO ORDER</span>
                            <span class="block font-extrabold text-xs">90 DAY MONEY BACK GUARANTEE!</span>
                        </button>

                        <!-- <p class="text-center font-sm mt-1">* Plus applicable sales tax</p> -->
                    </div>

                </div>

                <!-- Column 2 -->
                <div class="bg-gray-100 p-0 rounded-xl shadow text-center overflow-hidden 
            transform transition duration-300 
            hover:scale-105 hover:shadow-xl cursor-pointer">
                    <p class="text-xl p-3 bg-[#196580] text-white font-bold">MOST POPULAR</p>
                    <div class="p-3">
                        <p class="text-5xl extrablod text-[#196580]">3 PERSON</p>
                        <p class="text-2xl font-black mb-2">28 Day Supply Each</p>
                        <img src="/images/desktop-bag-3.png" class="mb-3">

                        <del class="block text-3xl  text-gray-500">$239.97</del>
                        <p class="flex gap-3 items-center justify-center">
                            <span class="block text-5xl extrablod">$96.00</span>
                            <span class="block text-sm font-black rounded-sm bg-[#E6193C] p-1 text-white">
                                SAVE
                                60%</span>
                        </p>
                        <p class="block text-lg font-black my-1">$1.14 per day</p>
                        <p
                            class="flex w-full items-center justify-start gap-1 bg-[#E6193C] py-1 pl-2 mb-2 rounded-lg text-white font-bold">
                            <img src="/images/white-check.svg" class="h-6">4 FREE BONUSES!
                        </p>
                        <p
                            class="flex w-full items-center justify-start gap-1 bg-[#196580] py-1 pl-2 mb-2 rounded-lg text-white font-bold">
                            <img src="/images/white-check.svg" class="h-6">FREE US SHIPPING!
                        </p>
                        <button type="button" class="rounded-xl block w-full text-center p-3 bg-[#FFEB00] text-black">
                            <span class="block text-3xl extrablod">ADD TO ORDER</span>
                            <span class="block font-extrabold text-xs">90 DAY MONEY BACK GUARANTEE!</span>
                        </button>
                        <!-- <p class="text-center font-sm mt-1">* Plus applicable sales tax</p> -->
                    </div>
                </div>

                <!-- Column 3 -->
                <div class="bg-gray-100 p-0 rounded-xl shadow text-center overflow-hidden 
            transform transition duration-300 
            hover:scale-105 hover:shadow-xl cursor-pointer">
                    <p class="text-xl p-3 bg-[#1f94bd] text-white font-bold">BUNDLE</p>
                    <div class="p-3 py-4">
                        <p class="text-5xl extrablod text-[#1f94bd]">2 PERSON</p>
                        <p class="text-2xl font-black mb-2">28 Day Supply Each</p>
                        <img src="/images/desktop-bag-2.png" class="mb-3">

                        <del class="block text-3xl  text-gray-500">$159.98</del>
                        <p class="flex gap-3 items-center justify-center">
                            <span class="block text-5xl extrablod">$78.00</span>
                            <span class="block text-sm font-black rounded-sm bg-[#E6193C] p-1 text-white">SAVE
                                51%</span>
                        </p>
                        <p class="block text-lg font-black my-1">$1.39 per day</p>
                        <p
                            class="flex w-full items-center justify-start gap-1 bg-[#E6193C] py-1 pl-2 mb-2 rounded-lg text-white font-bold">
                            <img src="/images/white-check.svg" class="h-6">4 FREE BONUSES!
                        </p>
                        <p
                            class="flex w-full items-center justify-start gap-1 bg-[#196580] py-1 pl-2 mb-2 rounded-lg text-white font-bold">
                            <img src="/images/white-check.svg" class="h-6">FREE US SHIPPING!
                        </p>
                        <button type="button" class="rounded-xl block w-full text-center p-3 bg-[#FFEB00] text-black">
                            <span class="block text-3xl extrablod">ADD TO ORDER</span>
                            <span class="block font-extrabold text-xs">90 DAY MONEY BACK GUARANTEE!</span>
                        </button>
                        <!-- <p class="text-center font-sm mt-1">* Plus applicable sales tax</p> -->
                    </div>
                </div>

            </div>
        </div>

        <p class="text-center mx-auto w-full max-w-3xl lg:py-20 py-6 lg:text-lg text-xs lg:px-0 px-4">
            <a href="#">No, I'm not interested in learning more about my order. I'm aware I'm going
                to miss out on important order details and additional One-Time only offer. Take me to the next step.</a>
        </p>
    </section>

    <!-- Footer Section -->
    <UpsellFooter />

</template>

<script>
export default {
    props: {
        src: { type: String, default: '/images/upsellvideo.mp4' },
        poster: { type: String, default: '/images/upsellthumb.png' }
    },
    data() {
        return {
            overlaySrc: '/images/play-button.png',
            hideOverlay: false,
            hideTimeout: null
        };
    },
    mounted() {
        const video = this.$refs.video;
        // make sure video element exists
        if (!video) {
            console.error('myVideo element not found');
            return;
        }
        video.addEventListener('play', this.onPlay);
        video.addEventListener('pause', this.onPause);
        video.addEventListener('ended', this.onEnded);

        // small debug log so you can see clicks in console
        console.log('Video mounted. src=', this.src);
    },
    beforeUnmount() {
        const v = this.$refs.video;
        if (v) {
            v.removeEventListener('play', this.onPlay);
            v.removeEventListener('pause', this.onPause);
            v.removeEventListener('ended', this.onEnded);
        }
        this.clearHideTimeout();
    },
    methods: {
        togglePlay() {
            const video = this.$refs.video;
            if (!video) return;
            console.log('togglePlay called (video.paused =', video.paused, ')');

            if (video.paused) {
                // attempt to play (returns a promise on modern browsers)
                video.play().then(() => {
                    // show native controls while playing
                    video.setAttribute('controls', '');
                }).catch(err => {
                    console.warn('video.play() failed:', err);
                });
            } else {
                video.pause();
                // optional: remove native controls when paused to avoid overlap
                video.removeAttribute('controls');
            }
        },
        onPlay() {
            this.overlaySrc = '/images/pause.png';
            this.startHideTimeout(); // auto-hide icon after short delay
        },
        onPause() {
            this.overlaySrc = '/images/play-button.png';
            this.showOverlay();
            // remove native controls when paused
            this.$refs.video.removeAttribute('controls');
        },
        onEnded() {
            this.overlaySrc = '/images/play-button.png';
            this.$refs.video.removeAttribute('controls');
            this.$refs.video.currentTime = 0;
            this.showOverlay();
        },
        startHideTimeout() {
            this.clearHideTimeout();
            this.hideOverlay = false;
            this.hideTimeout = setTimeout(() => {
                this.hideOverlay = true;
            }, 1500); // hide after 1.5s
        },
        clearHideTimeout() {
            if (this.hideTimeout) {
                clearTimeout(this.hideTimeout);
                this.hideTimeout = null;
            }
        },
        showOverlay() {
            this.clearHideTimeout();
            this.hideOverlay = false;
        },
        onMouseMove() {
            // when user moves mouse while playing, show icon briefly
            const v = this.$refs.video;
            if (v && !v.paused) {
                this.showOverlay();
                this.startHideTimeout();
            }
        }
    }
};
</script>

<style scoped>
/* make absolutely sure icon doesn't block clicks and stays centered */
#overlayIcon {
    pointer-events: none;
    user-select: none;
}
</style>
