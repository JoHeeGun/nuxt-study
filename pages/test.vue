<script setup>
import { ref, onMounted } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter();
const route = useRoute();
// import { useStore } from '@/store';

// const store = useStore();

// const count = store.count;
// const username = store.username;
// const countPlusTen = store.getCountPlusTen();

// const increment = () => {
//   store.increment();
// };

onMounted(() => {
    console.log('router',router);
    console.log('testPage',route);
})
</script>

<template>
    <div>
        <nuxt-link to="/">홈으로</nuxt-link>
        <!-- <p>Count: {{ count }}</p>
        <p>Username: {{ username }}</p>
        <p>Count + 10: {{ countPlusTen }}</p>
        <button @click="increment">Increment</button> -->
    </div>
</template>
