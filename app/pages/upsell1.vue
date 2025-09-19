<template>
   <div class="w-full border-b border-gray-200 bg-white py-4 lg:px-4 px-1">
      <div class="mx-auto flex items-center justify-center lg:px-2 px-0 py-2 lg:py-2">
         <div class="flex items-center justify-center bg-[#F1F1F1] border-2 border-[#DFDFDF] rounded-xl w-fit">
            <!-- Step 1 -->
            <div class="flex items-center ">
               <div class="flex items-center space-x-2 extrablod lg:px-4 px-1 pr-0">
                  <div
                     class="lg:w-10 lg:h-10 w-6 h-6 shrink-0  flex items-center justify-center rounded-full bg-[#1EB9F0] border-0 text-gray-500 font-bold">
                     <img src="/images/upselcheck.svg" class="lg:w-6 lg:h-6 w-3 h-3 p-0">
                  </div>
                  <p class="font-semibold lg:text-lg text-[11.5px] leading-3 odr-text">Order Approved</p>
               </div>
            </div>
            <!-- Step 2 -->
            <div
               class=" relative bg-[#1EB9F0] lg:h-15 lg:w-60 h-10 w-35 flex items-center extrablod text-white font-black px-6 pr-0">
               <!-- Step Circle -->
               <div
                  class="lg:w-10 lg:h-10 w-6 h-6 flex lg:text-2xl text-lg shrink-0 items-center justify-center rounded-full bg-white text-[#1EB9F0] font-bold border lg:mr-3 mr-1">
                  2
               </div>
               <!-- Step Text -->
               <p class="lg:text-lg text-xs text-[11.5px] leading-3 odr-text">Customize Order</p>
               <!-- Left Arrow -->
               <div class="absolute left-[0px] top-0 w-0 h-0 
                  lg:border-t-[30px] border-t-[20px] border-t-transparent 
                  lg:border-l-[20px] border-l-[15px] border-l-[#F1F1F1] 
                  lg:border-b-[30px] border-b-[20px] border-b-transparent">
               </div>
               <!-- Right Arrow -->
               <div class="absolute lg:right-[-20px] right-[-15px]  top-0 w-0 h-0 
                  lg:border-t-[30px] border-t-[20px] border-t-transparent 
                  lg:border-l-[20px] border-l-[15px] border-l-[#1EB9F0] 
                  lg:border-b-[30px] border-b-[20px] border-b-transparent">
               </div>
            </div>
            <!-- Step 3 -->
            <div class="flex items-center">
               <div class="flex items-center space-x-2 px-4 lg:pr-4 lg:pl-8 pr-0  pl-4.5 extrablod">
                  <div
                     class="lg:w-10 lg:h-10 w-6 h-6 flex lg:text-2xl text-lg shrink-0  aspect-squares items-center justify-center rounded-full bg-white text-[#1EB9F0] font-bold border">
                     3
                  </div>
                  <p class="extrablod lg:text-lg text-[11.5px] leading-3 odr-text">Final Confirmation</p>
               </div>
            </div>
         </div>
      </div>
      <p class="text-center lg:text-lg text-sm">**Please do <span class="underline extrablod">not</span> hit your back
         button. You might accidentally
         place a double order.**
      </p>
      <div class="flex items-center justify-center m-3">
         <h3
            class="bg-[#F1F1F1] lg:w-160 w-full text-center lg:text-2xl text-sm py-2 font-semibold border-2 border-[#DFDFDF] rounded-xl">
            Option 1 of 3 to Customize Your Order
         </h3>
      </div>
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
         <span class="inline lg:block text-center"> I have no doubt in my mind</span>
         <span class="inline lg:block text-center"> that Nooro Foot Massager</span>
      </h3>
      <p class="text-center mx-auto w-full max-w-3xl lg:py-20 py-2 lg:text-lg text-xs">
         <a href="#">No, I'm not interested in learning more about my order. I'm aware I'm going
            to miss out on important order details and additional One-Time only offer. Take me to the next step.</a>
      </p>
   </div>
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
