<template>
   <div class="w-full border-b border-gray-200 bg-white py-4 lg:px-4 px-1">
      <UpsellBreadCrumbs />

      <h2 class="text-center lg:text-5xl text-3xl extrablod lg:mt-10 mt-3">WAIT! Your Order Is Not Complete Yet</h2>
      <p class="text-center lg:my-3 my-1  lg:mb-8 mb-3">Please Watch This Quick Video…</p>
      <div class="flex justify-center items-center w-full max-w-5xl mx-auto p-4 ">

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

   <!-- Footer Section -->
   <UpsellFooter />

</template>

<script>
import BreadCrumbs from '~/components/upsell/BreadCrumbs.vue';

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
