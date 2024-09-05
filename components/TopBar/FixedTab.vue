<script setup>
const { FIXED_TAB_OPTION } = defineProps(['FIXED_TAB_OPTION']);
</script>

<template>
    <div 
        class="h-12 bg-white"
        style="box-shadow: 0px 1px 0px 0px rgba(223, 223, 223, 1);"
    >
        <div class="flex h-full px-4">
            <div
                v-for="(option, index) in FIXED_TAB_OPTION.option" :key="index"
                class="flex items-center justify-center text-black cursor-pointer font-700"
                :class="[
                    FIXED_TAB_OPTION.defaultIndex === index
                    ? ['text-black', 'border-0', 'border-b', 'border-solid', 'border-black']
                    : ['text-gray-500']
                ]"
                :style="{ flexBasis: `${100/FIXED_TAB_OPTION.option.length}%` }"
                @click="option.event"
            >
                {{ option.title }}
            </div>
        </div>
  </div>
</template>