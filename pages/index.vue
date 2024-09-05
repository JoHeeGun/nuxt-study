<script setup>
import { ref, onMounted, nextTick } from 'vue'
import { useRouter,useRoute } from 'vue-router'
import { vmAxios } from '@/api/vmAxios.js'
import Swiper from 'swiper';

import BannerList from '@/components/Common/BannerList.vue'
import FooterInfo from '@/components/Common/FooterInfo.vue'
import Chemist from '@/components/Consult/Chemist.vue'
import MainTopBar from '@/components/TopBar/MainTopBar.vue'

definePageMeta({
  title: 'home page',
  name: 'home',
  bottomBar: true
})

const router = useRouter();
const route = useRoute();

let VM_IMG_URL = 'https://s3.ap-northeast-2.amazonaws.com/img-dev.vimeal.kr';

let CHEMIST_LIST = ref([]);
let QUESTION_LIST = ref([]);
let TIP_LIST = ref([]);

const getChemist = async () => {
	await vmAxios({
		method: 'POST',
		url: '/consult/manage/list',
	}).then(res => {
        CHEMIST_LIST.value = res.data.data;

        nextTick();
        const mySwiper = new Swiper(`.chemist_swiper`,{
            loop: false,
            spaceBetween: 12,
            slidesPerView: 2.2,
        })
		
	}).catch((err) => {
		console.log(err);
	});
}

const getQuestion = async () => {
    const body = {
        pageNo: 1,
        rows: 3,
    };

    await vmAxios({
		method: 'POST',
		url: '/consult/question/list',
        data:body
	}).then(res => {
        QUESTION_LIST.value = res.data.data;
		
	}).catch((err) => {
		console.log(err);
	});
}

const getTip = async () => {
    const body = {
        pageNo: 1,
        rows: 6,
    };

    await vmAxios({
		method: 'POST',
		url: '/tip/list',
        data:body
	}).then(res => {
        TIP_LIST.value = res.data.data;
		
	}).catch((err) => {
		console.log(err);
	});
}


onMounted(() => {
    getChemist();
    getQuestion();
    getTip();
})

</script>

<template>
    <MainTopBar />
    <div class="flex flex-col w-full">
        <BannerList />

        <div class="flex justify-between gap-2 px-4 pb-8 xsm2:gap-4 xsm2:px-[27.5px]">
            <div class="w-[68px] h-[68px] aspect-square cursor-pointer flex flex-col items-center justify-center gap-2">
                <div class="flex items-center justify-center w-10 h-10 rounded-full aspect-square bg-[#F0FAFF]">
                    <img 
                        @click="router.push('/test')"
                        src="@/assets/images/service.svg" 
                        class="w-5 h-5"
                    />
                </div>
                <div 
                    
                    class="text-sm font-medium leading-tight text-gray-600"
                >
                    서비스 소개
                </div>
            </div>
            <div class="w-[68px] h-[68px] aspect-square cursor-pointer flex flex-col items-center justify-center gap-2">
                <div class="flex items-center justify-center w-10 h-10 rounded-full aspect-square bg-[#FA374A] bg-opacity-10">
                    <img 
                        src="@/assets/images/mission.svg" 
                        class="w-5 h-5"
                    />
                </div>
                <div class="text-sm font-medium leading-tight text-gray-600 ">
                    미션 챌린지
                </div>
            </div>
            <div class="w-[68px] h-[68px] aspect-square cursor-pointer flex flex-col items-center justify-center gap-2">
                <div class="flex items-center justify-center w-10 h-10 rounded-full aspect-square bg-[#CECCFF]">
                    <img 
                        src="@/assets/images/review.svg" 
                        class="w-5 h-5"
                    />
                </div>
                <div class="text-sm font-medium leading-tight text-gray-600 ">
                    후기 이벤트
                </div>
            </div>
            <div class="w-[68px] h-[68px] aspect-square cursor-pointer flex flex-col items-center justify-center gap-2">
                <div class="flex items-center justify-center w-10 h-10 rounded-full aspect-square bg-sky-600 bg-opacity-20">
                    <img 
                        src="@/assets/images/friends.svg" 
                        class="w-5 h-5"
                    />
                </div>
                <div class="text-sm font-medium leading-tight text-gray-600 ">
                    친구 초대
                </div>
            </div>
        </div>

        <!-- spacing -->
        <div class="h-1.5 bg-gray-150"></div>

        <div class="flex flex-wrap px-[8px] pb-[16px] pt-4 h-full">
            <div class="w-[50%] p-[8px] h-full">
                <div
                    class="relative p-[16px] pb-[80px] rounded-[8px] cursor-pointer main_recommend"
                    style="box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12)"
                >
                    <div class="text-xs font-medium text-gray-600">맞춤 영양제 찾기</div>
                    <div class="text-[18px] font-700">AI 영양제 추천</div>
                    <img 
                        src="@/assets/images/icon_pill.png" 
                        class="absolute bottom-[16px] right-[16px] w-[48px] h-[48px]" 
                    />
                </div>
            </div>

            <div class="w-[50%] p-[8px] h-full">
                <div
                    class="relative p-[16px] pb-[80px] rounded-[8px] cursor-pointer main_intake"
                    style="box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12)"
                >
                    <div class="text-xs font-medium text-gray-600">섭취 알림 제공</div>
                    <div class="text-[18px] font-700">영양제 섭취기록</div>
                    <img 
                        class="absolute bottom-[16px] right-[16px] w-[48px] h-[48px]" 
                        src="@/assets/images/icon_calendar.png" 
                    />
                </div>
            </div>

            <div class="w-[50%] p-[8px] h-full">
                <div
                    class="relative p-[16px] pb-[80px] rounded-[8px] cursor-pointer main_commerce"
                    style="box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12)"
                >
                    <div class="text-xs font-medium text-gray-600">식약처 인증 제품</div>
                    <div class="text-[18px] font-700">영양제 구매하기</div>
                    <img 
                        class="absolute bottom-[16px] right-[16px] w-[48px] h-[48px]" 
                        src="@/assets/images/icon_card.png" />
                </div>
            </div>

            <div class="w-[50%] p-[8px] h-full">
                <div
                    class="relative p-[16px] pb-[80px] rounded-[8px] cursor-pointer main_consult"
                    style="box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12)"
                >
                    <div class="text-xs font-medium text-gray-600">온라인 채팅 상담</div>
                    <div class="text-[18px] font-700">약사와 상담하기</div>
                    <img 
                        class="absolute bottom-[16px] right-[16px] w-[48px] h-[48px]" 
                        src="@/assets/images/icon_message2.png" 
                    />
                </div>
            </div>
        </div>

        <!-- spacing -->
        <div class="h-1.5 bg-gray-150"></div>

        <section 
            id="chemist"
            class="pt-6 min-w-[280px] py-4 px-4 bg-[#FCFCFC]"
        >
            <div class="text-[14px] font-400 text-[#949494]">
                1:1 관리를 받고 싶다면
            </div>
            <div class="text-[18px] font-bold text-[#000000]">
                약사님께 채팅 상담 신청해주세요!
            </div>

            <div class="mt-3 swiper chemist_swiper">
                <div class="swiper-wrapper">
                <article
                    class="swiper-slide"
                    v-for="(USER, index) in CHEMIST_LIST"
                    :key="index"
                >
                    <Chemist :USER="USER" />
                </article>
                </div>
            </div>
        </section>

        <section class="px-4 pt-5">
            <div class="relative flex items-center justify-between">
                <div class="flex font-[700] text-[18px] gap-[6px]">
                    <img src="@/assets/images/icon_message1.svg" />약사 Q&A
                </div>
                    <div class="absolute p-4 right-[calc(0%-1rem)] cursor-pointer">
                    <img src="@/assets/images/expand_more2.svg" />
                </div>
            </div>

            <div class="flex flex-col gap-4 pt-4 pb-6">
                <template v-if="QUESTION_LIST != null">
                    <div
                        v-for="(QUESTION, index) in QUESTION_LIST"
                        :key="index"
                        class="w-full px-3 py-4 overflow-hidden break-all bg-white border border-white border-solid cursor-pointer rounded-5"
                        style="box-shadow: 0px 1px 6px rgba(0, 0, 0, 0.12)"
                    >
                        <div class="flex flex-wrap gap-2 pb-2">
                            <div class="border border-solid rounded-[55px] py-1 px-3 bg-white text-gray-600 font-normal text-xs border-gray-300 leading-[18px]">
                                <span>{{ QUESTION.cstTypeNm }}</span>
                            </div>
                            <div class="border border-solid rounded-[55px] py-1 px-3 bg-white text-gray-600 font-normal text-xs border-gray-300 leading-[18px]">
                                <span>{{ QUESTION.fncltyNm }}</span>
                            </div>
                        </div>

                        <div class="text-[16px] font-700 mb-2 truncate ...">
                            {{ QUESTION.qstTitle }}
                        </div>
                        <div class="text-[14px] font-400 truncate ...">
                            {{ QUESTION.contents }}
                        </div>
                    </div>
                </template>
                <template v-else>
                    <div class="text-center">리스트가 없습니다.</div>
                </template>
            </div>

            <button class="w-full py-2 px-[8px] rounded-[5px] text-white text-center bg-vimeal-blue-500">
                약사에게 질문하기
            </button>
        </section>

        <section id="tip" class="h-full px-4 pt-10 pb-6">
            <div class="text-[18px] font-bold text-[#000000]">영양제 꿀팁</div>
            <div class="text-[14px] font-400 text-[#777777]">
                약사가 알려주는 영양제 팩트 정보
            </div>

            <!-- 꿀팁 영역 -->
            <div class="grid grid-cols-2 gap-4 mt-4">
                <template v-if="TIP_LIST != null">
                <div v-for="(tip, index) in TIP_LIST" :key="index">
                    <div class="cursor-pointer w-[100%] pb-[100%] relative">
                    <img
                        class="w-full h-full absolute top-[0] left-[0] object-fill"
                        :src="`${VM_IMG_URL}${tip.imgUrl}`"
                    />
                    </div>
                    <div
                        class="font-[500] text-xs py-1 px-1.5 rounded-[3px] mt-2"
                        style="width: max-content"
                        :class="[
                            tip.tipCategoryNo === 1
                            ? ['text-[#00A5FD]', 'bg-[#F0FAFF]']
                            : tip.tipCategoryNo === 2
                            ? ['text-[#B85165]', 'bg-red-100']
                            : tip.tipCategoryNo === 3
                            ? ['text-[#5A5ACC]', 'bg-purple-300 bg-opacity-30']
                            : tip.tipCategoryNo === 4
                            ? ['text-[#34C36D]', 'bg-[#89e589] bg-opacity-10']
                            : [''],
                        ]"
                    >
                        {{ tip.tipCategoryNm }}
                    </div>
                        <div class="text-[16px] font-[400] mt-1 break-all">
                            {{ tip.title }}
                        </div>
                    <div>
                    <span class="text-[12px] font-[400] text-[#777]">
                        {{ tip.tagNm }}
                    </span>
                    </div>
                </div>
                </template>
            </div>
            <template v-if="TIP_LIST == null">
                <div class="text-center">리스트가 없습니다.</div>
            </template>
            <div class="mt-6 text-[#949494] font-500 w-full py-[8px] text-center border-[#DFDFDF] border-solid border rounded-[5px] cursor-pointer">
                꿀팁 더보기
            </div>
        </section>

        <FooterInfo />
    </div>
  </template>