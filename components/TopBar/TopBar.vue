<script setup>
const { TOP_BAR_OPTION } = defineProps(['TOP_BAR_OPTION']);

let actionCount = TOP_BAR_OPTION.left.length > TOP_BAR_OPTION.right.length 
    ? TOP_BAR_OPTION.left.length 
    : TOP_BAR_OPTION.right.length;
</script>

<template>
    <div class="sticky top-0 w-full lg:w-[32rem] z-40">
        <div class="flex items-center justify-between h-12 px-4 bg-white border-0 border-b border-gray-300 border-solid">

            <section class="flex justify-start w-auto gap-3">
                <div 
                    v-for="(action,index) in actionCount" :key="index"
                    class="flex items-center justify-center w-[22px] h-[22px]"
                >
                    <img
                        v-if="TOP_BAR_OPTION.left[index]"
                        :src="`/_nuxt/assets/images/${TOP_BAR_OPTION.left[index].icon}.svg`"
                        class="cursor-pointer"
                        @click="TOP_BAR_OPTION.left[index].event"
                    />
                </div>
            </section>

            <section class="flex justify-center w-full px-2 truncate font-700">
                <span class="truncate">
                    {{ TOP_BAR_OPTION.title }}
                </span>
            </section>

            <section class="flex justify-start w-auto gap-3">
                <div 
                    v-for="(action,index) in actionCount" :key="index"
                    class="flex items-center justify-center w-[22px] h-[22px]"
                >
                    <img
                        v-if="TOP_BAR_OPTION.right[index]"
                        :src="`/_nuxt/assets/images/${TOP_BAR_OPTION.right[index].icon}.svg`"
                        class="cursor-pointer"
                        @click="TOP_BAR_OPTION.right[index].event"
                    />
                </div>
            </section>
        </div>
    </div>
</template>