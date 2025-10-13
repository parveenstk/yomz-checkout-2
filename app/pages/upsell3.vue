<template>
    <div class="w-full bg-white py-4 lg:px-4 px-1">
        <UpsellBreadCrumbs optNumbar="2" />

        <div class="flex items-center justify-center m-3">
            <h3
                class="bg-[#FFEB00] lg:w-140 w-full text-center lg:text-xl text-sm py-2 extrablod border-2 border-[#DFDFDF] rounded-xl">
                 Please Watch Also This Important Message Below Now
            </h3>
        </div>

        <!-- video -->
        <UpsellVideo />

        <h3 class="lg:text-4xl text-2xl extrablod mx-auto w-full max-w-5xl mt-4 text-center">
            <span class="inline lg:block text-center"> to decrease our prices</span>
            <span class="inline lg:block text-center"> and to make</span>
        </h3>

    </div>

    <section class="lg:py-10 py-4 bg-white">

        <h2 class="lg:text-5xl text-4xl extrablod lg:mb-16 lg:mt-20 mb-4 mt-4 text-center">CHOOSE YOUR PACKAGE</h2>
        <div class="max-w-5xl mx-auto px-3 ">
            <div class="grid grid-cols-1 lg:grid-cols-8 gap-6">
                <div class="col-span-4 lg:col-start-3 flex justify-center">
                    <!-- Column 2 -->
                    <div class="bg-gray-100 lg:ml-16 lg:mr-16 ml-0 mr-0 p-0 rounded-xl shadow text-center overflow-hidden 
            transform transition duration-300 
            hover:scale-105 hover:shadow-xl cursor-pointer mx-auto">
                        <p class="text-xl p-3 bg-[#196580] text-white font-bold">MOST POPULAR</p>
                        <div class="p-3">
                            <p class="text-5xl extrablod text-[#196580]">3 PERSON</p>
                            <p class="text-2xl font-black mb-2">28 Day Supply Each</p>
                            <NuxtImg src="/images/desktop-bag-3.png" class="mb-3" />

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
                                <NuxtImg src="/images/white-check.svg" class="h-6" />4 FREE BONUSES!
                            </p>
                            <p
                                class="flex w-full items-center justify-start gap-1 bg-[#196580] py-1 pl-2 mb-2 rounded-lg text-white font-bold">
                                <NuxtImg src="/images/white-check.svg" class="h-6" />FREE US SHIPPING!
                            </p>
                            <button type="button"
                                class="rounded-xl block w-full text-center p-3 bg-[#FFEB00] text-black">
                                <span class="block text-3xl extrablod">ADD TO ORDER</span>
                                <span class="block font-extrabold text-xs">90 DAY MONEY BACK GUARANTEE!</span>
                            </button>
                            <!-- <p class="text-center font-sm mt-1">* Plus applicable sales tax</p> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <p class="text-center mx-auto w-full max-w-3xl lg:py-20 py-6 lg:text-lg text-xs lg:px-0 px-4">
            <a href="#">No thank you... I'm declining this offer. I fully understand this may be my only chance at
                securing this offer at this unheard of, and downright crazy, low price again...</a>
        </p>
    </section>

    <section class="lg:py-20 py-4 bg-[#fff9b8]">
        <div class="max-w-5xl mx-auto">
            <h2 class="lg:text-5xl text-4xl extrablod lg:mb-16 lg:mt-0 mb-4 mt-3 text-center">FAQS</h2>

            <div class="space-y-3">

                <div class="space-y-4">
                    <!-- FAQ 1 -->
                    <details class="group bg-white border rounded-lg p-5 shadow-sm">
                        <summary class="flex items-center justify-between cursor-pointer list-none">
                            <h3 class="text-lg font-semibold text-gray-800">What is Hidden Hunger?</h3>
                            <span class="ml-3 transform group-open:rotate-180 transition-transform">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p class="mt-3 text-gray-600">It’s the “silent pandemic” that’s ruining the health of over 2
                            billion people across the world. Hidden Hunger is when you get enough calories from your
                            diet every day but not enough nutrients. You may feel full (not physically hungry) but your
                            body is starving for nutrients.

                        </p>
                    </details>

                    <!-- FAQ 2 -->
                    <details class="group bg-white border rounded-lg p-5 shadow-sm">
                        <summary class="flex items-center justify-between cursor-pointer list-none">
                            <h3 class="text-lg font-semibold text-gray-800">Is YOMZ right for me and my family?</h3>
                            <span class="ml-3 transform group-open:rotate-180 transition-transform">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p class="mt-3 text-gray-600">If you and your family are experiencing unexplained fatigue,
                            digestive issues like constipation or bloating, a lack of energy, brain fog, loss of focus,
                            uncommon moodiness, and even developmental issues in your kids, then yes, YOMZ is right for
                            you.<br><br>

                            If your family is always on the go, and thus regularly eats processed foods instead of
                            freshly prepared ones, then yes, YOMZ is right for you.<br><br>

                            If your family does have the time to eat meals made fresh, yet you’re still experiencing any
                            of the issues above, then yes, YOMZ is right for you.<br><br>

                            If you want a tasty snack that delivers the phytonutrient equivalent of 3 servings of fruits
                            and vegetables combined, then yes, YOMZ is for you.<br><br>

                            If your family enjoys eating mouthwatering gummies packed with antioxidants, micronutrients,
                            vitamins, fiber, and more… then yes, YOMZ is right for you.<br><br>

                            If your family loves naturally sweetened gummies that are good for you and have just 1g of
                            sugar, then yes, YOMZ is for you.</p>
                    </details>

                    <!-- FAQ 3 -->
                    <details class="group bg-white border rounded-lg p-5 shadow-sm">
                        <summary class="flex items-center justify-between cursor-pointer list-none">
                            <h3 class="text-lg font-semibold text-gray-800">Is YOMZ safe for my kids?
                            </h3>
                            <span class="ml-3 transform group-open:rotate-180 transition-transform">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p class="mt-3 text-gray-600">The YOMZ mission is to end Hidden Hunger for 100 million people.
                            The best way to reach that goal is to ensure that each YOMZ gummy is crafted using the
                            finest quality science-backed ingredients and state of the art, precision-engineered
                            equipment in the strictest and most sterile conditions. Each YOMZ gummy is non-GMO,
                            keto-friendly, vegan-friendly, gluten-free, and only 1g of sugar. Plus, every YOMZ gummy
                            undergoes rigorous 3rd-party inspections and quality control to ensure high quality, purity,
                            and potency. As always, we recommend speaking to your doctor about YOMZ before taking it.

                        </p>
                    </details>

                    <!-- FAQ 4 -->
                    <details class="group bg-white border rounded-lg p-5 shadow-sm">
                        <summary class="flex items-center justify-between cursor-pointer list-none">
                            <h3 class="text-lg font-semibold text-gray-800">Who is the founder, Nastya?
                            </h3>
                            <span class="ml-3 transform group-open:rotate-180 transition-transform">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p class="mt-3 text-gray-600">Nastya is the star of YouTube’s biggest kids series, Like Nastya.
                            She founded YOMZ to help her fans throughout the world tackle Hidden Hunger, which she used
                            to suffer herself. Once she realized how new and improved she felt after taking YOMZ, it
                            became her mission - and thus the YOMZ mission - to end Hidden Hunger for 100 million
                            people.

                        </p>
                    </details>

                    <!-- FAQ 5 -->
                    <details class="group bg-white border rounded-lg p-5 shadow-sm">
                        <summary class="flex items-center justify-between cursor-pointer list-none">
                            <h3 class="text-lg font-semibold text-gray-800">Which YOMZ is for me?

                            </h3>
                            <span class="ml-3 transform group-open:rotate-180 transition-transform">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p class="mt-3 text-gray-600">YOMZ comes in 3 unforgettable flavors: Peachy, Strawbeary, and
                            Beary Berry. You can choose your 3 flavors in either Original or Sour. The only difference
                            between the two is that Sour has a tangier bite for those who like mouthwatering and
                            mouthpuckering tartness. Otherwise, all ingredients are the same, and both have only 1g of
                            sugar.

                        </p>
                    </details>

                    <!-- FAQ 6 -->
                    <details class="group bg-white border rounded-lg p-5 shadow-sm">
                        <summary class="flex items-center justify-between cursor-pointer list-none">
                            <h3 class="text-lg font-semibold text-gray-800">How many packs should I order?
                            </h3>
                            <span class="ml-3 transform group-open:rotate-180 transition-transform">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p class="mt-3 text-gray-600">One bag of YOMZ has 28 packs. Each bag contains 8 delicious,
                            potent gummies and equals 1 serving per day. So one bag of YOMZ is roughly a month’s worth.
                            Each member of your family should have their own bag per month. This means ordering a bag
                            for each member of your family.

                        </p>
                    </details>

                    <!-- FAQ 7 -->
                    <details class="group bg-white border rounded-lg p-5 shadow-sm">
                        <summary class="flex items-center justify-between cursor-pointer list-none">
                            <h3 class="text-lg font-semibold text-gray-800">When is the best time to take YOMZ?

                            </h3>
                            <span class="ml-3 transform group-open:rotate-180 transition-transform">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p class="mt-3 text-gray-600">Anytime you and your family feel it’s time to enjoy a delicious,
                            nutritious snack. By a wide margin, our customers say the most popular part of the day is
                            mid-afternoon. But there are plenty of fans who’ve made it a morning or nightly routine.
                            Bottom line? It’s up to you.

                        </p>
                    </details>

                    <!-- FAQ 8 -->
                    <details class="group bg-white border rounded-lg p-5 shadow-sm">
                        <summary class="flex items-center justify-between cursor-pointer list-none">
                            <h3 class="text-lg font-semibold text-gray-800">Is this a one-time payment?
                            </h3>
                            <span class="ml-3 transform group-open:rotate-180 transition-transform">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p class="mt-3 text-gray-600">Yes, your order today is a one-time payment with no auto-ship or
                            hidden charges.

                        </p>
                    </details>

                    <!-- FAQ 9 -->
                    <details class="group bg-white border rounded-lg p-5 shadow-sm">
                        <summary class="flex items-center justify-between cursor-pointer list-none">
                            <h3 class="text-lg font-semibold text-gray-800">What if YOMZ isn't for me and my family?
                            </h3>
                            <span class="ml-3 transform group-open:rotate-180 transition-transform">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p class="mt-3 text-gray-600">That’s OK. It happens. Delicious, nutritious, and easy to take
                            gummy snacks are not for everyone. So every bag of YOMZ Gummies is backed by our Picky Momz
                            90-Day 100% Happiness Guarantee. If for any reason, YOMZ isn't everything you thought it
                            would be, simply reach out to us and we’ll refund your money on the spot. No hassles, no
                            guilt, no risk. All we ask is that you share any uneaten YOMZ Gummies with someone who might
                            enjoy a tasty, good-for-you snack.

                        </p>
                    </details>

                    <!-- FAQ 10 -->
                    <details class="group bg-white border rounded-lg p-5 shadow-sm">
                        <summary class="flex items-center justify-between cursor-pointer list-none">
                            <h3 class="text-lg font-semibold text-gray-800">What do I do now?

                            </h3>
                            <span class="ml-3 transform group-open:rotate-180 transition-transform">
                                <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </span>
                        </summary>
                        <p class="mt-3 text-gray-600">Why not try YOMZ? There’s no risk on your part with our Picky Momz
                            90-Day 100% Happiness Guarantee. Click on the button below to order YOMZ today. Choose
                            Original or Sour, how many people you're ordering for, and then enter your details on our
                            secure checkout page. Then we’ll ship your order right away, along with your free bonuses:
                            YOMZ collectible sticker to showcase your smart choice, free entry to get your order today
                            100% refunded, and our custom Hidden Hunger booklet. Plus, don't forget: your order today
                            directly helps hungry families in need as you join our mission to end Hidden Hunger for 100
                            million people.

                        </p>
                    </details>
                </div>

            </div>
        </div>
    </section>

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
