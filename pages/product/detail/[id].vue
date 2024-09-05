<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { vmAxios } from '@/api/vmAxios.js'
import { useUserStore } from '~/store/user';

import TopBar from '@/components/TopBar/TopBar.vue';
import StarRating from '@/components/Common/StarRating.vue';
import FixedTab from '@/components/TopBar/FixedTab.vue';

const router = useRouter();
const route = useRoute();
const userStore = useUserStore();
let VM_IMG_URL = 'https://s3.ap-northeast-2.amazonaws.com/img-dev.vimeal.kr';

// topBar 데이터, 이벤트 세팅
let TOP_BAR_OPTION = ref({
    left: [ 
        {
            icon:'goback',
            event: () => router.go(-1)
        }
    ],
    right: [
        {
            icon:'home2',
            event: () => router.push('/')
        },
        {
            icon:'cart',
            event: () => router.push('/cart')
        },
        {
            icon:'my',
            event: () => router.push('/mypage')
        }
    ],
});
//// topBar 데이터, 이벤트 세팅

// fixedTab 데이터 세팅

let FIXED_TAB_OPTION = ref({
    defaultIndex: 0,
    option: [
        {
            title: '제품정보',
            event: () => FIXED_TAB_OPTION.value.defaultIndex = 0
        },
        {
            title: '상세정보',
            event: () => FIXED_TAB_OPTION.value.defaultIndex = 1
        },
        {
            title: '후기',
            event: () => FIXED_TAB_OPTION.value.defaultIndex = 2
        },
        {
            title: 'Q&A',
            event: () => FIXED_TAB_OPTION.value.defaultIndex = 3
        }
    ]
})
//// fixedTab 데이터 세팅

// 제품 상세
let ITEM = ref({});
let DATA_LOADED = ref(false);

const getProduct = async () => {
    await vmAxios({
		method: 'GET',
		url: `/prod/detail?prodNo=${route.params.id}`,
	}).then(res => {
        
        ITEM.value = res.data.data;
        TOP_BAR_OPTION.value.title = ITEM.value.prodInfo.prodNm;

    
        DATA_LOADED.value = true;
        
	}).catch((err) => {
		console.log(err);
	});    
}
//// 제품 상세


onMounted(() => {
    getProduct();
})

</script>

<style>

</style>

<template>
    <TopBar :TOP_BAR_OPTION="TOP_BAR_OPTION"/>

    <section v-if="DATA_LOADED">

        <section>
            <div class="flex justify-center w-full h-full swiper main-img-swiper aspect-square">
                <div class="relative swiper-wrapper">
                    <div
                        v-for="(img, index) in ITEM.prodSwiperImgList" :key="index"
                        class="flex items-center justify-center swiper-slide"
                    >
                        <img 
                            :src="`${ VM_IMG_URL }${ img }`"
                            class="w-auto h-auto max-w-full max-h-full cursor-pointer"
                        >
                    </div>
                </div>
                <!-- <div 
                    v-if="ITEM.prodSwiperImgList.length > 1"
                    class="swiper-pagination"
                >
                </div> -->
            </div>
            <div class="flex flex-col p-4">
                <div class="font-400">
                    {{ ITEM.prodInfo.brandNm }}
                </div>
                <div class="py-2 text-xl font-700">
                    {{ ITEM.prodInfo.prodNm }}
                </div>

                <div 
                    v-if="ITEM.prodInfo.starScoreAvg"
                    class="flex flex-row items-center gap-2"
                >
                    <div 
                        v-if="ITEM.prodInfo.starScoreAvg"
                        class="flex items-center gap-1"
                    >
                        <StarRating
                            :score="ITEM.prodInfo.starScoreAvg"
                            :gap="3.3"
                        />
                        <span ITEM="text-sm text-gray-700 font-400">
                            {{ ITEM.prodInfo.starScoreAvg }}
                        </span>
                    </div>
                    <button
                        v-if="ITEM.prodInfo.reviewCnt"
                        class="text-sm text-gray-600 underline bg-transparent border-0 font-400"
                    >
                        {{ ITEM.prodInfo.reviewCnt }}건의 후기 더보기
                    </button>
                </div>
                <div 
                    class="flex items-center gap-1"
                    v-else
                >
                    <img 
                        src="@/assets/images/star_pink.svg"
                        class="w-3 aspect-square"
                    />
                    <span class="font-400 text-[12px] text-black">등록된 후기가 없습니다</span>
                </div>

                <section 
                    v-if="ITEM.prodInfo.salesYn === 'Y'"
                    class="flex flex-col gap-2 "
                >
                    <div class="flex flex-col gap-2">
                        
                        <div class="flex items-center gap-2">
                            <div 
                                v-if="ITEM.prodInfo.mbDscntRate !== 0"
                                class="text-xl font-800 text-orange"
                            >
                                {{ ITEM.prodInfo.mbDscntRate }}%
                            </div>
                            <div class="text-xl text-black font-800">
                                {{ ITEM.prodInfo.mbPrice.toLocaleString() }}원
                            </div>
                            <div 
                                v-if="ITEM.prodInfo.mbDscntRate !== 0"
                                class="text-sm text-gray-500 line-through font-400"
                            >
                                {{ ITEM.prodInfo.nonMbPrice.toLocaleString() }}원
                            </div>
                        </div>
                    
                        <div
                            v-if="!userStore.user"
                            class="text-sm text-[#0073C5]"
                        >
                            로그인 후, 할인 및 적립 혜택이 제공됩니다.
                        </div>
                    </div>
                    <div class="flex flex-row bg-vimeal-blue-50 rounded-5">
                        <span class="w-full p-2 text-center text-vimeal-blue-500 font-700">
                            하루 {{ userStore.user ? ITEM.prodInfo.mbDayPrice.toLocaleString() : ITEM.prodInfo.nonMbDayPrice.toLocaleString() }}원 · {{ ITEM.prodInfo.totIntkDays }}일분
                        </span>
                    </div>
                </section>
            </div>
            <div class="flex items-center h-12 border-0 border-t border-gray-300 border-solid">
                <div class="flex items-center justify-center w-full gap-2 cursor-pointer">
                    <img src="@/assets/images/share.svg"/>
                    공유
                </div>
                <div class="w-px h-8 bg-gray-300">
                </div>
                <div class="flex items-center justify-center w-full gap-2 cursor-pointer">
                    <img :src="ITEM.prodInfo.userLockerExistYn ? `/like.svg` : `/like_no.svg`"/>
                    보관
                </div> 
            </div>
            
        </section>
        <!-- spacing -->
        <div class="h-2 bg-gray-200"></div>


        <!-- 제품정보 -->
        <section>
            <div class="flex flex-col gap-4 p-4">
                <span class="font-700">
                    인증정보
                </span>
                <div class="flex flex-col gap-2">
                    <div class="flex gap-4 pb-2">
                        <div class="flex items-center justify-center gap-4 text-2xs">
                            <div class="flex flex-col items-center gap-1">
                                <img
                                    class="w-10 h-10 aspect-square"
                                    src="@/assets/images/health_mark.png" 
                                />
                                건강기능식품인증
                            </div>
                            <div 
                                v-if="ITEM.prodInfo.gmpYn"
                                class="flex flex-col items-center gap-1"
                            >
                                <img 
                                    class="w-10 h-10 aspect-square"
                                    src="@/assets/images/gmp_mark.png"
                                />
                                GMP인증
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- spacing -->
		<div class="h-2 bg-gray-200"></div>

        <!-- 배송정보 -->
		<section v-if="ITEM.prodInfo.salesYn === 'Y'">
			<div class="flex flex-col gap-4 p-4">
				<span class="font-700">
					배송정보 (로젠택배)
				</span>
				<div class="flex flex-col gap-2">
					<div class="flex gap-2">
						<span class="flex-none w-20">
							배송비
						</span>
						<span>
							3,000원(제주/도서산간지역 5,000원)<br/>
							30,000원 이상 구매 시 무료배송
						</span>
					</div>
					<div class="flex gap-2">
						<span class="flex-none w-20">
							배송기간
						</span>
						<span>
							평균 1~2일 소요(일부지역 변동가능)<br/>
							평일 15시까지 주문 시 당일 출고
						</span>
					</div>
				</div>
			</div>
			<div class="h-2 bg-gray-200"></div>
		</section> 

        <!-- product ( 제품정보 ) -->
		<section>
			<div class="flex flex-col gap-4 p-4">
				<span class="font-700">
					제품정보
				</span>
				<div class="flex flex-col gap-2">
					<div class="flex gap-2">
						<span class="flex-none w-20">
						제조국
						</span>
						<span>
						{{ ITEM.prodInfo.mnfctCountry }}
						</span>
					</div>
					<div class="flex gap-2">
						<span class="flex-none w-20">
							제조사
						</span>
						<span>
							{{ ITEM.prodInfo.mnfctCompany ? ITEM.prodInfo.mnfctCompany : '-' }}
						</span>
					</div>
				</div>
			</div>
		</section>

        <!-- spacing -->
		<div class="h-2 bg-gray-200"></div>

        <div 
			class="pt-3"
			id="tabs"
		>
            <FixedTab :FIXED_TAB_OPTION="FIXED_TAB_OPTION"/>
		</div>
        

        <section v-if="FIXED_TAB_OPTION.defaultIndex === 0">
            00000
        </section>
    </section>
</template>