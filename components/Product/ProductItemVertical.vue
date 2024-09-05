<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';

const { ITEM_DATA } = defineProps(['ITEM_DATA']);
let VM_IMG_URL = 'https://s3.ap-northeast-2.amazonaws.com/img-dev.vimeal.kr';

const router = useRouter();
const route = useRoute();

onMounted(() => {
    // 기능성, 성분리스트 후 가공
    ITEM_DATA.fncltyUserNmLv2List = ITEM_DATA.fncltyUserNmLv2List.slice(0,3);
    ITEM_DATA.ingrdList = ITEM_DATA.ingrdList.slice(0,2);
    
    ITEM_DATA.ingrdList.forEach(i => {
        if(i.ingrdContUnit === 'CFU') {
            i.ingrdCont = Math.floor(i.ingrdCont/100000000)
            i.ingrdContUnit = '억 CFU'
        }
    })
})


</script>

<style>

</style>

<template>
    <div
        @click="router.push(`/product/detail/${ITEM_DATA.prodNo}`)"
        class="flex flex-wrap cursor-pointer"
		style="-webkit-tap-highlight-color:transparent;"
    >
        <div class="relative pb-[100%] w-full flex items-center justify-center ">   
            <img
                :src="`${ VM_IMG_URL }${ ITEM_DATA.prodImgUrl }`"
                alt="제품이미지"
                class="absolute top-0 left-[50%] translate-x-[-50%] w-auto h-auto max-w-full max-h-full"
            >
            <button
                v-if="ITEM_DATA.salesYn === 'Y' && ITEM_DATA.invntryQty !== 0"
                class="w-[25%] p-[5%] absolute bottom-[8px] right-[8px] flex items-center justify-center  bg-[#00A5FD] rounded-[50%] opacity-80"
            >
                <img 
                    class="w-[100%] h-[100%]" 
                    src="@/assets/images/shopping_cart2.svg" 
                >
            </button>
            <div
                v-if="ITEM_DATA.salesYn === 'Y' && ITEM_DATA.invntryQty === 0"
                class="absolute top-[0] left-[0] w-full h-full flex justify-center items-center text-white text-[16px] bg-[#000000]/[0.6]"
            >
                품절
            </div>
        </div>
        <div
            class="flex-1 mt-[8px]"
        >
            <div 
                v-if="ITEM_DATA.salesYn === 'Y'"
                class="mb-[2px] leading-4"
            >
                <span 
                    class="px-[2px] pb-[2px] text-[12px] text-[#00A5FD] font-700" 
                    style="background-image: linear-gradient(white 50%, rgb(224, 244, 255) 50%);"
                >
                     하루 {{ user ? ITEM_DATA.mbDayPrice?.toLocaleString() : ITEM_DATA.nonMbDayPrice?.toLocaleString() }}원 · {{ ITEM_DATA.totIntkDays }}일분     
                </span>
            </div>

            <div 
                v-if="ITEM_DATA.salesYn === 'Y'"
                class="flex flex-wrap items-center gap-1"
            >
                <span 
                    v-if="ITEM_DATA.mbDscntRate !== 0"
                    class="font-700 text-[18px] text-[#FF6E2F]"
                >
                    {{ ITEM_DATA.mbDscntRate }}%
                </span>
                <span class="font-700 text-[18px]">{{ ITEM_DATA.mbPrice?.toLocaleString() }}원</span>
            </div>

			<div 
				v-if="ITEM_DATA.salesYn === 'Y' && ITEM_DATA.mbDscntRate !== 0"
				class="text-[12px] text-[#949494] line-through" 
			>
				{{ ITEM_DATA.nonMbPrice?.toLocaleString() }}원 
			</div>
			<div class="text-[14px] line-clamp-2 font-medium mt-[4px]">{{ ITEM_DATA.prodNm }}</div>

            <div 
                v-if="ITEM_DATA.starScoreAvg"
                class="flex items-center  mt-[4px]"
            >
                <img 
                    src="@/assets/images/star_pink.svg"
                    class="w-3 "
                />
                <span class="font-normal text-[14px] pl-[4px]">{{ ITEM_DATA.starScoreAvg }}</span>
                <span class="font-300 text-[14px] text-gray-500">/5</span>
                <span 
                    v-if="ITEM_DATA.reviewCnt"
                    class="font-300 text-[14px] text-gray-500 pl-[6px]"
                >
                    ({{ ITEM_DATA.reviewCnt }})
                </span>
            </div>
            <div 
                v-else
                class="flex items-center gap-1 mt-[4px]"
            >
                <img 
                    src="@/assets/images/star_pink.svg"
                    class="w-3 "
                />
                <span class="font-400 text-[12px] text-black">등록된 후기가 없습니다</span>
            </div>


            <div class="my-[6px]">
                <div class="flex flex-wrap items-center gap-[6px] text-[12px] text-[#777]">
                    <div class="flex flex-col gap-[6px]">
                        <span 
                            v-for="(ITEM,index) in ITEM_DATA.ingrdList" :key="index"
                            class="flex w-full items-center gap-[4px]"
                        >
                            <img src="@/assets/images/func_content.svg" />
                            {{ ITEM.cnsmrIngrdNm }}
                            {{ ITEM.ingrdCont }}{{ ITEM.ingrdContUnit }}
                        </span>
                    </div>
                    <span
						class="flex w-full items-center gap-[4px]"
						v-if="ITEM_DATA.dayIntkCnt !== null"
					>
						<img src="@/assets/images/intk_content.svg" /> 하루 {{ ITEM_DATA.dayIntkCnt }}회 {{ ITEM_DATA.onceIntkCont }}{{ ITEM_DATA.userDispIntkUnitNm }}
                    </span>
                </div>
            </div>

            <div class="flex items-center gap-[8px] flex-wrap  mt-[4px]">
                <span
                    class="inline-block py-[3px] px-[5px] bg-[#f5f5f5] text-[12px] rounded-[3px]"
                    v-for="(item, c) in ITEM_DATA.fncltyUserNmLv2List" :key="c"
                >
                    {{ item.fncltyUserNmLv2 }}
                </span>
            </div>

        </div>
    </div>
</template>