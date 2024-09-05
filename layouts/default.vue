<script setup>
import MainBottomBar from '@/components/BottomBar/MainBottomBar.vue'

import { useRoute } from 'vue-router'

const route = useRoute();

</script>
<template>
    <div class="flex bg-vimeal-blue-50">
        <div class="fixed w-[50vw] h-screen p-4 flex flex-col items-center justify-center">
      <img
            src="@/assets/images/web_background_img.png"
            class="object-scale-down w-full h-4/5"
        />
        </div>
        <div class="relative w-screen lg:w-[32rem] lg:ml-[50vw] shadow-lg bg-white">
            <div class="flex flex-col justify-between">
        
                
                <div class="h-full">
                <div>
                  <slot />
                </div>

                <!-- Bottom Area -->
                <div 
                    v-if="route.meta.bottomBar"
                    ref="bottomAreaRef" 
                    class="fixed bottom-0 w-full lg:w-[32rem] z-30"
                >
                    <MainBottomBar />
                </div> 
            </div>
        </div>
            
        </div>
        <div class="h-screen bg-vimeal-blue-50">
        </div>

        <div class="fixed top-0      
            h-screen
            hidden lg:block
            w-screen lg:w-[32rem]
            lg:ml-[50vw]
            shadow-w3"
            style="z-index: -1"
        ></div>
   </div>
  </template>
  