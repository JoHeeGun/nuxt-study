<script setup>
import { ref, onMounted, nextTick } from 'vue';
import Swiper from 'swiper';

const mainBannerList = ref( 
    [   
        { 
            url: 'main_banner1.png',
            router: '/guide' 
        }, 
        { 
            url: 'main_banner2.png',
            router: '/healthSurvey' 
        }, 
        { 
            url: 'main_banner3.png', 
            router: '/reviewEvent' 
        }, 
        { 
            url: 'main_banner4.png',
            router: '/friendInvite' 
        }, 
        { 
            url: 'main_banner5.png', 
            router: '/intakeChallenge' 
        }, 
        { 
            url: 'main_banner6.png', 
            router: '/missionChallenge' 
        }, 
        { 
            url: 'main_banner7.png', 
            router: '/product' 
        } 
    ]
)

const swiperSetting = async () => {
    await nextTick();
    const prodImgSelector = '.swiper-container';
    const prodImgConfig = {
        loop: true,
        freeMode: true,
        slidesPerView: "auto",
        grabCursor: true,    
        autoplay: {
            delay: 5000,
            disableOnInteraction: false,
        },
        pagination: {
            el: ".swiper-pagination",
            type: "fraction",
        },
        navigation: {
            nextEl: '.swiper-button-next',
            prevEl: '.swiper-button-prev',
        },
    };
    const swiper = new Swiper(prodImgSelector, prodImgConfig);
}

onMounted(() => {
    swiperSetting();
})
</script>

<style>
/* 화살표 스타일 */
.swiper-button-next::after,
.swiper-button-prev::after {
  transform: scale(0.5); 
}
</style>

<template>
    <div class="w-full px-4 py-6">
        <div class="relative w-full overflow-hidden swiper-container">
            <div class="swiper-wrapper">
                <div
                    v-for="(banner, index) in mainBannerList" :key="index"
                    class="swiper-slide"
                >
                    <img :src="`/${banner.url}`" />
                </div>

            </div>
        </div>
    </div>
  </template>