<template>
   <div class="w-full border-b border-gray-200 bg-white py-4">
      <div class="mx-auto flex items-center justify-center px-2 py-2 lg:py-2">
         <div class="flex items-center justify-center bg-[#F1F1F1] border-2 border-[#DFDFDF] rounded-xl">
            <!-- Step 1 -->
            <div class="flex items-center ">
               <div class="flex items-center space-x-2  text-gray-600 px-4">
                  <div
                     class="w-10 h-10 flex items-center justify-center rounded-full bg-[#1EB9F0] border-0 text-gray-500 font-bold">
                     <img src="/images/upselcheck.svg" class="w-6 h-6 p-0">
                  </div>
                  <span class="font-semibold text-lg">Order Approved</span>
               </div>
            </div>
            <!-- Step 2 -->
            <div class="relative bg-[#1EB9F0] h-15 w-60 flex items-center text-white font-bold px-6 pr-0">
               <!-- Step Circle -->
               <div
                  class="w-10 h-10 flex text-2xl shrink-0 pb-1 items-center justify-center rounded-full bg-white text-[#1EB9F0] font-bold border mr-3">
                  2
               </div>
               <!-- Step Text -->
               <span class="font-semibold text-lg">Customize Order</span>
               <!-- Left Arrow -->
               <div class="absolute left-[0px] top-0 w-0 h-0 
                  border-t-[30px] border-t-transparent 
                  border-l-[20px] border-l-[#F1F1F1] 
                  border-b-[30px] border-b-transparent">
               </div>
               <!-- Right Arrow -->
               <div class="absolute right-[-20px] top-0 w-0 h-0 border-t-[30px] 
                  border-t-transparent border-l-[20px] border-l-[#1EB9F0] 
                  border-b-[30px] border-b-transparent">
               </div>
            </div>
            <!-- Step 3 -->
            <div class="flex items-center">
               <div class="flex items-center space-x-2  text-gray-600 px-4 pr-4 pl-8">
                  <div
                     class="w-10 h-10 p-0 text-2xl flex shrink-0  pb-1 aspect-squares items-center justify-center rounded-full bg-white text-[#1EB9F0] font-bold border">
                     3
                  </div>
                  <span class="font-semibold text-lg">Final Confirmation</span>
               </div>
            </div>
         </div>
      </div>
      <p class="text-center text-lg font-bold">**Do not hit your back button as you might accidentally place a double
         order.**
      </p>
      <div class="flex items-center justify-center m-3">
         <h3
            class="bg-[#F1F1F1] w-160 text-center text-2xl py-2 pb-3 font-semibold border-2 border-[#DFDFDF] rounded-xl">
            Option 1 of 3 to Customize Your Order
         </h3>
      </div>
      <h2 class="text-center text-5xl font-bold mt-10">WAIT! Your Order Is Not Complete Yet</h2>
      <p class="text-center my-3">Please Watch This Quick Video…</p>
      <div class="flex justify-center items-center w-full max-w-5xl mx-auto">
         <img src="/images/upsell.jpg" class="w-full" alt="Upsell Image">
      </div>
      <h3 class="text-4xl font-black mx-auto w-full max-w-5xl mt-4">
         <span class="inline lg:block text-center"> I have no doubt in my mind</span>
         <span class="inline lg:block text-center">that Nooro Foot Massager</span>
      </h3>
      <p class="text-center mx-auto w-full max-w-2xl py-20">
         <a href="#">No, I'm not interested in learning more about my order. I'm aware I'm going
         to miss out on
         important order details and additional One-Time only offer. Take me to the next step.</a>
      </p>
   </div>
   <footer class="bg-[#1EB9F0] py-7">
      <div class="mx-auto max-w-5xl text-center">
         <img src="/images/logo.png" class="max-w-30 mx-auto mb-4">
         <p class="text-white text-lg">By filling out the field, you consent for YOMZ™ to use automated technology,
            including texts and
            prerecorded messages, to contact you at the number and email provided about YOMZ™ offers.
         </p>
      </div>
   </footer>
</template>