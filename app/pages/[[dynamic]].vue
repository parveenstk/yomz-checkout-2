<script setup>
// API calling on dynamic pages
onMounted(() => {
    const response = request('/importClick', { pageType: 'leadPage', requestUri: 'http://localhost:3000' })
    console.log('response:', response);
})
</script>

<template>
    <!-- <div v-if="pending">Loading...</div>
    <div v-else-if="error">Error: {{ error.message }}</div>
    <div v-else>
        <ul>
            <li v-for="post in data" :key="post.id">{{ post.title }}</li>
        </ul>
    </div> -->
</template>
