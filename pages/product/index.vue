<script setup>
import { ref, onMounted, nextTick } from 'vue';
import { useRouter,useRoute } from 'vue-router'
import { vmAxios } from '@/api/vmAxios.js'
import Swiper from 'swiper';
import { useCartStore } from '~/store/cart';

import MainTopBar from '@/components/TopBar/MainTopBar.vue'
import BannerList from '@/components/Common/BannerList.vue'
import FooterInfo from '@/components/Common/FooterInfo.vue'
import ProductItemVertical from '@/components/Product/ProductItemVertical.vue'

const router = useRouter();
const route = useRoute();
const CartStore = useCartStore();

definePageMeta({
  title: 'product page',
  name: 'product',
  bottomBar: true
})

// 카테고리
let CATEGORY = ref({
    FUN_CATE: [],
    INGRD_CATE: []
});

let CATE_TYPE = ref('FUN');
let FUN_MORE  = ref(false);
let INGRD_MORE  = ref(false);

const getCategory = async () => {
	await vmAxios({
		method: 'GET',
		url: '/main/label',
	}).then(res => {

        CATEGORY.value.FUN_CATE = res.data.data.funcList;
        CATEGORY.value.FUN_CATE.unshift({
            fncltyNm: '전체',
            fncltyNo: 'all'
        });

        CATEGORY.value.INGRD_CATE = res.data.data.ingrdGroupList;
        CATEGORY.value.INGRD_CATE.unshift({
            repNm: '전체',
            repGroupNo: 'all'
        });

	}).catch((err) => {
		console.log(err);
	});
}
//// 카테고리

// 피드
let FEED_LIST = ref([]);
let SCROLL = ref({
    currentX: 0,
    finishX: 0
});

const geFeedList = async () => {
    await vmAxios({
		method: 'GET',
		url: '/main/feed',
	}).then(res => {
        FEED_LIST.value = res.data.data.filter(el => el.feedProdList?.length !== 0);

        nextTick(() =>{
            FEED_LIST.value.forEach((i,index) => {
                setSwiper(index);
            });
        });
        CartStore.addItem(FEED_LIST.value[0]);
        
	}).catch((err) => {
		console.log(err);
	});   
}

const setSwiper = (index) => {
    
    const mySwiper = new Swiper(`.js-swiper-feed-1-${index}`,{
        slidesPerView: 2.1,
        spaceBetween: 8,
        loop: false,
        freeMode: true,
        a11y: false,
    })
    mySwiper.on('touchStart', (e) => {
        SCROLL.value.currentX = e.touches.currentX; // 터치 시작 x 좌표
    });

    mySwiper.on('touchEnd', (e) => {
        SCROLL.value.finishX = e.touches.currentX; // 터치 끝 x 좌표
    });
}
//// 피드


onMounted(() => {
    getCategory();
    geFeedList();


})

</script>

<style  scoped>
</style>

<template>
    <MainTopBar />
    <BannerList />

    <section>
        <div class="px-[16px] flex gap-[11px]">
            <div class="flex-1">
                <button
                    class="w-full px-[12px] py-[8px] rounded-[50px] text-[12px] xsm2:text-[14px]"
                    :class="CATE_TYPE === 'FUN' ? 'bg-[#00A5FD] text-white font-700' : 'bg-[#EFEFEF] text-gray-600 font-500'"
                    @click="CATE_TYPE = 'FUN' "
                >건강고민별 제품 찾기</button>
            </div>
            <div class="flex-1">
                <button
                    class="w-full px-[12px] py-[8px] rounded-[50px] text-[12px] xsm2:text-[14px]"
                    :class="CATE_TYPE === 'INGRD' ? 'bg-[#00A5FD] text-white font-700' : 'bg-[#EFEFEF] text-gray-600 font-500'"
                    @click="CATE_TYPE = 'INGRD' "
                >
                    성분별 제품 찾기
                </button>
            </div>
        </div>
        <div v-show="CATE_TYPE === 'FUN'">
            <div
                class="mt-[20px] overflow-hidden"
                :class="FUN_MORE ? 'h-auto': 'h-[114px]'"
            >
                <div class="flex flex-wrap px-[12px]">
                    <div
                        v-for="(item, index) in CATEGORY.FUN_CATE" :key="`fun_${index}`"
                        class="p-[4px] w-[33.33%] text-[11px] cursor-pointer
                            xsm2:w-[33.33%] xsm2:text-[14px]
                            sm:w-[25%]
                            md:w-[20%]
                            lg:w-[33.33%]
                        "
                    >
                        <div
                            class="flex items-center justify-center h-[30px] px-[8px] border border-solid border-[#dfdfdf] rounded-[5px] text-center text-[#777]"
                            @click="router.push(`/product/list/fun/${item.fncltyNo}`)"
                        >
                            {{ item.fncltyNm }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="flex justify-center mt-[15px] py-[5px] text-[14px] text-[#777] cursor-pointer"
                @click="FUN_MORE = !FUN_MORE"
            >
                더보기
                <i 
                    class="icon icon-dropdown ml-[3px]"	
                    :class="{'rotate-[180deg]': FUN_MORE }"
                ></i>
            </div>
        </div>
        <div v-show="CATE_TYPE === 'INGRD'">
            <div
                class="mt-[20px] overflow-hidden"
                :class="INGRD_MORE ? 'h-auto': 'h-[114px]'"
            >
                <div class="flex flex-wrap px-[12px]">
                    <div
                        v-for="(item, index) in CATEGORY.INGRD_CATE" :key="`fun_${index}`"
                        class="p-[4px] w-[33.33%] text-[11px] cursor-pointer
                            xsm2:w-[33.33%] xsm2:text-[14px]
                            sm:w-[25%]
                            md:w-[20%]
                            lg:w-[33.33%]
                        "
                    >
                        <div
                            class="flex items-center justify-center h-[30px] px-[8px] border border-solid border-[#dfdfdf] rounded-[5px] text-center text-[#777]"
                            @click="router.push(`/product/list/ingrd/${item.repGroupNo}`)"
                        >
                            {{ item.repNm }}
                        </div>
                    </div>
                </div>
            </div>
            <div
                class="flex justify-center mt-[15px] py-[5px] text-[14px] text-[#777] cursor-pointer"
                @click="INGRD_MORE = !INGRD_MORE"
            >
                더보기
                <i 
                    class="icon icon-dropdown ml-[3px]"	
                    :class="{'rotate-[180deg]': INGRD_MORE }"
                ></i>
            </div>
        </div>

        <div
            class="py-[25px] border-t-[8px] border-solid border-[#EFEFEF] pl-4"
            v-for="(item, index) in FEED_LIST" :key="`per_${index}`"
        >
            <div class="flex justify-between items-center px-[16px] mb-[16px]">
                <div class="text-[20px] font-700">{{item.feedNm}}</div>
                <button @click="router.push(`/product/list/feed/${item.feedNo}`)">
					<!-- <div class="rotate-[270deg]">
						<i class="text-gray-500 cursor-pointer icon icon-dropdown"></i>
					</div> -->
                    >
				</button>
            </div>
            
            <div>
                <div 
					class="swiper pl-[16px]" 
					:class="`js-swiper-feed-1-${index}`"
				>
                    <div class="swiper-wrapper" >
                        <div 
                            class="swiper-slide"
                            v-for="(sItem, index) in item.feedProdList" :key="`ch_${index}`"
                        >
							<ProductItemVertical 
								:ITEM_DATA="sItem"
								@goDetail="goDetail"
								@addCart="addCart"
							/>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    </section>

    <FooterInfo />
</template>