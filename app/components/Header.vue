<template>
    <header class="w-full border-b border-gray-200 bg-white">
        <div class="max-w-[1200px] mx-auto flex items-center justify-between px-2 py-2 md:py-2">

            <!-- Left: Logo -->
            <div class="flex-shrink-0">
                <NuxtImg src="/images/logo.png" alt="YOMZ" class="h-10 lg:h-14" />
            </div>

            <!-- Center: SSL Secure -->
            <div class="hidden lg:flex items-center gap-2">
                <NuxtImg src="/images/ssl.png" alt="SSL" class="w-26" />
            </div>

            <!-- Right: Flag + Contact -->
            <div class="flex items-center gap-2">
                <NuxtImg src="/images/flag.png" alt="US Flag" class="w-16" />
                <div class="text-sm lg:text-sm text-gray-800 text-center">
                    <div class="hidden sm:block">
                        <span class="font-bold block text-lg">Contact Us:</span>
                        <a href="mailto:support@yomz.co" class="text-black-600 hover:underline">support@yomz.co</a>
                    </div>
                </div>
            </div>

        </div>
    </header>
</template>