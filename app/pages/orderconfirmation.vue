<template>

    <section class="lg:py-10 py-4 bg-[#e9e9e9]">
        <div class="max-w-3xl mx-auto">
            <h1 class="lg:text-3xl text-2xl extrablod text-center lg:px-0 px-3">Congratulations! Your Order Is Complete!
            </h1>
            <p class="text-center lg:text-lg text-xs lg:px-0 px-3">
                Within a few minutes you will receive an order confirmation email with your order ID.
                below you can find all the products you purchased...
            </p>
            <div class="flex items-center justify-center m-3">
                <h3 class="lg:text-2xl text-sm text-center underline lg:px-0 px-3">
                    Click The Button Below & Ask To Join The YOMZ VIP Club Now!
                </h3>
            </div>
            <div class="bg-white lg:mx-2 mx-2">
                <div class="flex justify-center items-center w-full max-w-5xl mx-auto p-0 ">
                    <!-- <img src="/images/upsell.jpg" class="w-full border-1 border-[#ccc] rounded-xl" alt="Upsell Image"> -->
                    <div ref="wrapper" id="videoWrapper" class="w-full  relative cursor-pointer" tabindex="0"
                        @click="togglePlay" @keydown.space.prevent="togglePlay" @mousemove="onMouseMove">
                        <video ref="video" id="myVideo" class="w-full shadow-lg block" playsinline :poster="poster"
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
                <div class="p-4">
                    <button type="button"
                        class="rounded-xl shadow-lg block w-full  text-center p-3 bg-[#FFEB00] text-black">
                        <span class="block lg:text-bease text-lg  font-bold">JOIN YOMZ VIP CLUB NOW</span></button>
                </div>
            </div>
            <div class="flex justify-center rounded-3 mt-8 lg:mx-2 mx-2">
                <p class="bg-[#fff793] text-black font-bold px-4 py-2 rounded lg:text-lg text-sm text-center">
                    Note: The charge will appear on your card as "yomz.com"
                </p>
            </div>
            <div class="flex justify-center rounded-3 mt-2 lg:mx-2 mx-2">
                <p class="bg-[#fff793] text-black px-4 py-2 rounded font-bold lg:text-lg text-sm text-center">
                    Note: The charge will appear on your card as "yomz by With Reach (USA) LLC"
                </p>
            </div>
        </div>
        <div class="max-w-xl mx-auto bg-white p-3 mt-4 rounded-xl">
            <div class="innerscan bg-gray-100 p-2 rounded-xl">
                <h3 class="text-center lg:text-3xl text-2xl mt-4 extrablod lg:px-3 px-0">Download the YOMZ App on Your
                    Phone
                </h3>
                <p class="text-center mt-4 lg:px-3 px-0 ">Your personalized plan and coach support are only available
                    via the
                    mobile app. Here's how to
                    download it
                </p>
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-10 gap-4 lg:p-3 p-0 mt-4 items-center">
                    <div class="bar-details">
                        <div class="flex gap-2">
                            <div class="num-data">
                                <span
                                    class="flex bg-[#1EB9F0] text-white justify-center items-center w-8 h-8 rounded-full extrablod">2</span>
                            </div>
                            <div class="num-details mb-6">
                                <p class="lg:text-xl text-sm"> <strong class="lg:block inline"> Open the YOMZ
                                        app on your phone</strong>
                                    by scanning the QR
                                    code on the right
                                </p>
                            </div>
                        </div>
                        <img src="/images/googleplay.png" class="w-full mb-3 lg:px-0 px-15">
                        <img src="/images/appstore.png" class="w-full lg:px-0 px-15">
                    </div>
                    <div class="bar-details">
                        <img src="/images/qr.png" class="w-full rounded-xl lg:px-0 px-15">
                    </div>
                </div>
                <div class="grid grid-cols-1 lg:grid-cols-2 lg:gap-3 gap-4 p-1 mt-4 items-center">
                    <div class="bar-details">
                        <div class="flex gap-2">
                            <div class="num-data">
                                <span
                                    class="flex bg-[#1EB9F0] text-white justify-center items-center w-8 h-8 rounded-full extrablod">2</span>
                            </div>
                            <div class="num-details mb-6">
                                <p class="lg:text-xl text-sm"> <strong>Enter the email</strong>
                                    you
                                    used when placing
                                    your order
                                </p>
                            </div>
                        </div>
                    </div>
                    <div class="email-images">
                        <img src="/images/enteremail.png" class="w-full">
                    </div>
                </div>
            </div>
            <div class="sec-section">
                <h3 class="text-center text-2xl font-bold mt-12 extrablod">BOOK YOUR YOMZ PROTOCOL REVIEW CALL</h3>
                <p class="text-center mt-2"> <strong>Schedule a 15-minute protocol review</strong> with our Protocol
                    Review Team. This call aims to enhance your YOMZ product
                    experience, offer lifestyle guidance & ensure optimal results.
                </p>
                <p class="text-center mt-2"><strong>Click the button below and book your all now.</strong> We look
                    forward to speaking with you soon!
                </p>
                <div class="p-4 mb-6">
                    <button type="button"
                        class="rounded-xl shadow-lg block w-full  text-center p-3 bg-[#FFEB00] text-black">
                        <span class="block lg:text-bease text-lg  font-bold">BOOK YOUR CALL NOW</span></button>
                </div>
                <div class="products-receipt">
                    <p class="flex gap-1 items-center w-full bg-[#e9e9e9] p-2 extrablod mb-2"> <img
                            src="/images/round-check.svg"> Your
                        Product Receipt:
                    </p>
                    <p class="flex justify-between items-center mb-2"> <span class="font-bold">Item</span> <span
                            class="font-bold">Price</span> </p>
                    <p class="flex justify-between items-center mb-2"> <span>Sample cell</span> <span>$0.00</span> </p>
                    <hr class="my-5">
                    <p class="flex justify-between items-center"> <span class="font-bold">Tax</span> <span
                            class="font-bold">$0.00</span> </p>
                    <p class="flex justify-between items-center"> <span class="font-bold">Total:</span> <span
                            class="font-bold">$0.00</span> </p>
                    <p class="flex gap-1 items-center w-full bg-[#e9e9e9] p-2 extrablod mb-2 mt-5"> <img
                            src="/images/lock.svg"> Our Guarantee:</p>
                    <div class="lg:flex block gap-3 lg:p-4 p-1 mb-3">
                        <div class="items-center justify-center flex">
                            <img src="/images/guarantee.png" class="lg:w-full w-20 mb-3">
                        </div>
                        <div>
                            <p class="text-gray-700 leading-[1.2] text-center sm:text-left"> Your
                                order today is protected by our ridiculously iron-clad Picky Momz 90-day <span
                                    class="font-bold">200% Happiness Guarantee.</span> If you’re not
                                happy with how <span class="font-bold">great</span> you and your
                                family feel, or how improved your energy, focus, and gut issues are, then let us know
                                anytime in the next <span class="font-bold">90 days.</span> We’ll
                                refund <span class="font-bold">DOUBLE</span> what you paid.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="max-w-xl mx-auto bg-white p-3 mt-8">
            <h3 class="w-full bg-[#e9e9e9] lg:p-2 p-2 extrablod mb-2 lg:text-2xl text-xl text-center">While you are
                waiting for your
                order...
            </h3>
            <h4 class="text-center lg:my-5 my-3 underline lg:text-2xl text-base font-bold">HERE ARE OUR GIFTS FOR YOU :)
            </h4>
            <p class="w-full bg-[#e9e9e9] p-2 extrablod mb-2 text-center">FRE Swelling Relief Course</p>
            <img src="/images/cam1.jpg" class="w-full">
            <div class="p-4 mb-3">
                <button type="button"
                    class="rounded-xl shadow-lg block w-full  text-center p-3 bg-[#FFEB00] text-black">
                    <span class="block lg:text-bease text-lg  font-bold">GET FREE ACCESS NOW</span></button>
            </div>
            <div class="grid lg:grid-cols-2 grid-cols-1  gap-2">
                <div>
                    <p class="w-full bg-[#e9e9e9] p-2 extrablod mb-2 text-center">Swelling Relief Nutrition Plan</p>
                    <img src="/images/4.jpg" class="w-full">
                    <div class="p-0 mb-3">
                        <button type="button"
                            class="rounded-xl shadow-lg block w-full  text-center p-3 bg-[#FFEB00] text-black">
                            <span class="block lg:text-bease text-lg  font-bold">GET FREE ACCESS NOW</span></button>
                    </div>
                </div>
                <div>
                    <p class="w-full bg-[#e9e9e9] p-2 extrablod mb-2 text-center">Swelling Relief Nutrition Plan</p>
                    <img src="/images/4.jpg" class="w-full">
                    <div class="p-0 mb-3">
                        <button type="button"
                            class="rounded-xl shadow-lg block w-full  text-center p-3 bg-[#FFEB00] text-black">
                            <span class="block lg:text-bease text-lg  font-bold">GET FREE ACCESS NOW</span></button>
                    </div>
                </div>
                <div>
                </div>
            </div>
            <h4 class="text-center my-5 underline lg:text-2xl text-xl font-bold">PLEASE ALSO CHECK THESE RESOURCES...
            </h4>
            <div class="grid lg:grid-cols-2 grid-cols-1  gap-2">
                <div>
                    <p class="w-full bg-[#e9e9e9] p-2 extrablod mb-2 text-center">How it works</p>
                    <img src="/images/4.jpg" class="w-full">
                    <div class="p-0 mb-3">
                        <button type="button"
                            class="rounded-xl shadow-lg block w-full  text-center p-3 bg-[#FFEB00] text-black">
                            <span class="block lg:text-bease text-lg  font-bold">CHECK IT NOW</span></button>
                    </div>
                </div>
                <div>
                    <p class="w-full bg-[#e9e9e9] p-2 extrablod mb-2 text-center">User Manual</p>
                    <img src="/images/4.jpg" class="w-full">
                    <div class="p-0 mb-3">
                        <button type="button"
                            class="rounded-xl shadow-lg block w-full  text-center p-3 bg-[#FFEB00] text-black">
                            <span class="block lg:text-bease text-lg font-bold">CHECK IT NOW</span></button>
                    </div>
                </div>
                <div>
                </div>
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
