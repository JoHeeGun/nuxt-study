<script setup>
import {  useRoute } from 'vue-router';

import ListVertical from '@/components/Pages/Product/ListVertical.vue'
import ListHorizontal from '@/components/Pages/Product/ListHorizontal.vue'


const route = useRoute();
let LIST_TYPE = route.params.type;

</script>

<style>

</style>

<template>
    <div v-if="LIST_TYPE === 'feed'">
        <ListVertical />
    </div>
    <div v-else>
        <ListHorizontal />
    </div>
</template>
