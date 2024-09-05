<script setup>
import { computed } from 'vue';

const { score, gap } = defineProps(['score','gap']);


const width = computed(() => {
    let values = [];
        for (let i = 0; i < 5; i++) {
            values.push(i > score ? 0 : score > i + 1 ? 100 : (score - i) * 100);
        }
    return values;
})

</script>

<style>

</style>

<template>
    <div
        class="flex"
        :style="{ gap: `${gap}px` }"
    >
        <div
            v-for="i in 5" :key="i"
            class="relative"
            :style="{ height: `${10}px` }"
        >
            <div 
                class="absolute top-0 flex h-full gap-1 overflow-hidden"
                :style="{ width: `${width[i-1]}%` }"
            >
                <img
                    src="@/assets/images/star_fill_pink.svg"
                    class="max-w-[10px] w-[10px] h-[10px]"
                >
            </div>
            <div class="flex h-full gap-1">
                <img
                    src="@/assets/images/star_empty.svg"
                    class="max-w-[10px] w-[10px] h-[10px]"
                >
            </div>
        </div>
    </div>
</template>