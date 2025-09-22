<template>

    <section class="lg:py-20 py-4 bg-[#EAE4DA]">
        <div class="max-w-3xl mx-auto">



            <h1 class="text-2xl extrablod text-center">Congratulations! Your Order Is Complete!</h1>

            <p class="text-center lg:text-lg text-xs">
                Within a few minutes you will receive an order confirmation email with your order ID.
                below you can find all the products you purchased...
            </p>
            <div class="flex items-center justify-center m-3">
                <h3 class="text-2xl underline">
                    Click The Button Below & Ask To Join The nooro VIP Club Now!
                </h3>
            </div>



            <div class="bg-white">
                <div class="flex justify-center items-center w-full max-w-5xl mx-auto p-0">
                    <!-- <img src="/images/upsell.jpg" class="w-full border-1 border-[#ccc] rounded-xl" alt="Upsell Image"> -->



                    <div ref="wrapper" id="videoWrapper" class="w-full relative cursor-pointer" tabindex="0"
                        @click="togglePlay" @keydown.space.prevent="togglePlay" @mousemove="onMouseMove">
                        <video ref="video" id="myVideo" class="w-full rounded-lg shadow-lg block" playsinline
                            :poster="poster" preload="metadata" style="aspect-ratio:16/9;">
                            <source :src="src" type="video/mp4" />
                            Your browser does not support the video tag.
                        </video>

                        <!-- overlay icon (pointer-events: none so it doesn't block clicks) -->
                        <img :src="overlaySrc" id="overlayIcon"
                            class="absolute inset-0 m-auto w-16 h-16 select-none pointer-events-none z-10 transition-opacity duration-300"
                            :class="{ 'opacity-0': hideOverlay }" alt="Play / Pause" />
                    </div>


                </div>

                <div class="p-4">
                    <button type="button" class="rounded-xl block w-full  text-center p-3 bg-[#FFEB00] text-black">
                        <span class="block text-2xl font-bold">JOIN YOMZ VIP CLUB NOW</span></button>
                </div>


            </div>

            <div class="flex justify-center rounded-3 mt-4">
                <p class="bg-[#fff793] text-black px-4 py-2 rounded">
                    Note: The charge will appear on your card as "yomz.com"
                </p>
               
            </div>

            <div class="flex justify-center rounded-3 mt-2">
              
                <p class="bg-[#fff793] text-black px-4 py-2 rounded">
                    Note: The charge will appear on your card as "yomz by With Reach (USA) LLC"
                </p>
            </div>




        </div>
    </section>














    <footer class="bg-[#1EB9F0] lg:py-7 py-3">
        <div class="mx-auto max-w-5xl text-center">
            <img src="/images/logo.png" class="max-w-30 mx-auto mb-4">
            <p class="text-white lg:text-lg text-sm">By filling out the field, you consent for YOMZ™ to use automated
                technology,
                including texts and
                prerecorded messages, to contact you at the number and email provided about YOMZ™ offers.
            </p>
        </div>
    </footer>
</template>


<style>
#overlayIcon {
    display: none;
}
</style>

<script>
export default {
    props: {
        src: { type: String, default: '/images/upsellvideo.mp4' },
        poster: { type: String, default: '/images/video-thumb.jpg' }
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
