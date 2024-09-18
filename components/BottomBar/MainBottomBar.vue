<script setup>
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';

const route = useRoute();
const router = useRouter();

const TAB_MENU = ref([
        {
            name: "홈",
            icon: "home",
            path: "/",
        },
        {
            name: "제품구매",
            icon: "product",
            path: "/product",
        },
        {
            name: "맞춤추천",
            icon: "healthSurvey",
            path: "/healthSurvey",
        },
    ]   
)

</script>

<style>

</style>

<template>
  <div class="flex bg-white border-0 border-t border-gray-300 border-solid h-14">
    <div
      v-for="(MENU, index) in TAB_MENU"
      :key="index"
      @click="router.push(MENU.path)"
      class="flex flex-col items-center justify-center cursor-pointer"
      :style="{ flexBasis: `${100 / TAB_MENU.length}%` }"
    >
      <div class="w-8">
        <img :src="route.meta.name === MENU.icon 
            ? `/${MENU.icon}_fill.svg` 
            : `/${MENU.icon}.svg`
        "/>
      </div>
      <span
        class="text-2xs"
        :class="
          route.meta.name === MENU.icon
            ? 'text-vimeal-blue-500'
            : 'text-gray-500'
        "
      >
        {{ MENU.name }}
      </span>
    </div>
  </div>
</template>
