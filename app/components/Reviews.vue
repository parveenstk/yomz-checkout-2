<template>
    <div name="reviews-section">
        <h2
            class="text-3xl lg:text-2xl font-bold border-b text-centerc border-[#e7e7e7] lg:pb-4 pb-2 pt-4 mb-3 text-center">
            <span class="block md:inline">Families Like You</span>
            <span class="block md:inline"> Already Trust YOMZ</span>
        </h2>
        <!-- Review item -->
        <article class="pt-6 pr-3 pb-6 pl-3 border-b border-[#e7e7e7]">

            <div class="flex items-center gap-4">
                <img class="w-12 h-12 rounded-full object-cover" src="/images/rw-1.jpg" alt="" />
                <div class="flex-1 min-w-0">
                    <div class="flex items-baseline gap-2">
                        <h3 class="font-semibold text-gray-900 truncate">Deb M.</h3>
                        <span class="text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Verified
                            Buyer</span>
                    </div>
                    <div class="mt-1 flex items-center gap-2">
                        <!-- Stars -->
                        <div class="flex items-center">
                            <svg v-for="i in 5" :key=i class="w-4 h-4 text-yellow-400" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.452 2.684c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.56 9.387c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.287-3.96z" />
                            </svg>
                        </div>
                    </div>
                </div>
            </div>

            <div class="mt-1">
                <h4 class="font-semibold text-gray-800">Perfect for the whole fam!
                </h4>
                <p class="mt-2 mb-2 leading-[1.2] text-700 text-[#6b6d76] text-sm">
                    I got YOMZ for my 4yo daughter. It only took a week to get a bag for me lol. I've
                    noticed a difference in my gut health and my daughter's moods. When my husband gets
                    back
                    from deployment, we'll be getting a 3rd bag!
                </p>
                <time class="text-[#90949c] text-xs text-400 ml-auto">10/7/25</time>
            </div>
        </article>

        <!-- Review item -->
        <article class="pt-6 pr-3 pb-6 pl-3 border-b border-[#e7e7e7]">
            <div class="flex items-center gap-4">
                <img class="w-12 h-12 rounded-full object-cover" src="/images/rw-3.jpg" alt="" />
                <div class="flex-1 min-w-0">
                    <div class="flex items-baseline gap-2">
                        <h3 class="font-semibold text-gray-900 truncate">Misty C.</h3>
                        <span class="text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Verified
                            Buyer</span>
                    </div>
                    <div class="mt-1 flex items-center gap-2">
                        <!-- Stars -->
                        <div class="flex items-center">
                            <svg v-for="i in 5" :key="i" class="w-4 h-4 text-yellow-400" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.452 2.684c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.56 9.387c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.287-3.96z" />
                            </svg>
                        </div>

                    </div>
                </div>
            </div>

            <div class="mt-1">
                <h4 class="font-semibold text-gray-800">All my husband's fault...</h4>
                <p class="mt-2 mb-2 leading-[1.2] text-700 text-[#6b6d76] text-sm">
                    My husband loves gummies, so when he found YOMZ, he had to try, didn't care if it
                    was
                    nutritious, just that it tasted good. Once I tried them, I started reading up on
                    them. I
                    was
                    shocked to find out how nutritious they are, so I had to order for me and our 6yo
                    soccer-crazy daughter.
                </p>
                <time class="text-[#90949c] text-xs text-400 ml-auto">10/06/25</time>
            </div>
        </article>

        <!-- Review item -->
        <article class="pt-6 pr-3 pb-6 pl-3 border-b border-[#e7e7e7]">

            <div class="flex items-center gap-4">
                <img class="w-12 h-12 rounded-full object-cover" src="/images/rw-2.jpg" alt="" />
                <div class="flex-1 min-w-0">
                    <div class="flex items-baseline gap-2">
                        <h3 class="font-semibold text-gray-900 truncate">Sheila T.</h3>
                        <span class="text-sm text-green-600 bg-green-50 px-2 py-0.5 rounded-full font-medium">Verified
                            Buyer</span>
                    </div>
                    <div class="mt-1 flex items-center gap-2">
                        <!-- Stars -->
                        <div class="flex items-center">
                            <svg v-for="i in 5" :key=i class="w-4 h-4 text-yellow-400" viewBox="0 0 20 20"
                                fill="currentColor" aria-hidden="true">
                                <path
                                    d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.286 3.96a1 1 0 00.95.69h4.164c.969 0 1.371 1.24.588 1.81l-3.37 2.448a1 1 0 00-.364 1.118l1.287 3.96c.3.921-.755 1.688-1.54 1.118L10 13.347l-3.452 2.684c-.785.57-1.84-.197-1.54-1.118l1.287-3.96a1 1 0 00-.364-1.118L2.56 9.387c-.783-.57-.38-1.81.588-1.81h4.164a1 1 0 00.95-.69l1.287-3.96z" />
                            </svg>
                        </div>

                    </div>
                </div>
            </div>

            <div class="mt-1">
                <h4 class="font-semibold text-gray-800">Meets our many needs...</h4>
                <p class="mt-2 mb-2 leading-[1.2] text-700 text-[#6b6d76] text-sm">
                    We're a very active family. Hubs is into boats, my son football, daughter
                    volleyball,
                    and
                    I'm a runner. So a snack that's nutritious AND convenient is a must. YOMZ is
                    perfect.
                    Highly
                    recommend!
                </p>
                <time class="text-[#90949c] text-xs text-400 ml-auto">9/29/25</time>
            </div>
        </article>
    </div>
</template>