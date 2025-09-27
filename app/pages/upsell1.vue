<template>
   <div class="w-full border-b border-gray-200 bg-white py-4 lg:px-4 px-1">
      <UpsellBreadCrumbs optNumbar="1" />

      <h2 class="text-center lg:text-5xl text-3xl extrablod lg:mt-10 mt-3">WAIT! Your Order Is Not Complete Yet</h2>
      <p class="text-center lg:my-3 my-1  lg:mb-8 mb-3">Please Watch This Quick Video…</p>

      <!-- video -->
      <UpsellVideo />

      <h3 class="lg:text-4xl text-2xl extrablod mx-auto w-full max-w-5xl mt-4 text-center">
         <span class="inline lg:block text-center"> I have no doubt in my mind</span>
         <span class="inline lg:block text-center"> that Nooro Foot Massager</span>
      </h3>

      <p class="text-center mx-auto w-full max-w-3xl lg:py-20 py-2 lg:text-lg text-xs">
         <a href="#">No, I'm not interested in learning more about my order.
            I'm aware I'm going to miss out on important order details and additional One-Time only offer. Take me to
            the next step.
         </a>
      </p>
   </div>

   <!-- Footer Section -->
   <UpsellFooter />

</template>

<style scoped>
/* make absolutely sure icon doesn't block clicks and stays centered */
#overlayIcon {
   pointer-events: none;
   user-select: none;
}
</style>
