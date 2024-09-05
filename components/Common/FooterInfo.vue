<script setup>
import { ref } from 'vue'

let visibleCompanyInfo = ref(false);

</script>

<style>

</style>

<template>
    <div class="p-8 mt-6 text-center bg-gray-150">
        <div class="flex items-center justify-center pb-6">
            <img
                src="@/assets/images/logo.svg"
                class="cursor-pointer"
            />
        </div>
        <div class="text-[14px] text-gray-500 font-700">고객센터 070-7791-0039</div>
        <div class="text-[12px] text-gray-500 mt-2">평일 오전 9시- 오후 5시 운영</div>
        <div class="text-[12px] text-gray-500 mt-[2px]">(점심시간 오후 12시 - 오후 1시)</div>
        <div class="flex justify-center gap-2 mt-4">
        <button class="px-2 font-normal text-gray-600 bg-transparent bg-white border border-gray-300 py-1 text-[14px] rounded-5 border-solid disabled:bg-gray-350">
            자주 묻는 질문 (FAQ)
        </button>
        <button class="px-2 font-normal text-gray-600 bg-transparent bg-white border border-gray-300 py-1 text-[14px] rounded-5 border-solid disabled:bg-gray-350">
            입점/제휴 문의하기
        </button>
        </div>
        <div class="flex justify-center gap-4 mt-6">
        <div class="flex flex-col gap-8 text-left">
            <div class="text-xs text-gray-500 font-700 leading-[18px]">
            이용약관 및 개인정보 처리방침
            </div>
            <div 
                @click="visibleCompanyInfo=!visibleCompanyInfo"
                class="flex justify-center items-center text-[12px] text-gray-500 font-normal cursor-pointer" 
            >
            사업자정보
            <span class="-ml-1">
                <img 
                    v-if="visibleCompanyInfo" 
                    src="@/assets/images/arrow_drop_up.svg"
                >
                <img 
                v-else 
                src="@/assets/images/arrow_drop_down.svg">
            </span>
            </div>
        </div>
        </div>
        <div 
            v-if="visibleCompanyInfo" 
            class="mt-3 text-[12px] text-gray-500 text-center"
        >
        <div>(주)와이즈셀렉션 &nbsp;&nbsp; 대표 &nbsp; 남윤진</div>
        <div>본점: 강원도 춘천시 한림대학길 1, 창업보육센터 12305호</div>
        <div>서울지점: 서울시 구로구 디지털로 33길 48, 11층 1109, 1110호</div>
        <div>사업자등록번호 &nbsp; 446-86-00971
            &nbsp;<a class="text-gray-500 underline cursor-pointer" href="http://www.ftc.go.kr/bizCommPop.do?wrkr_no=4468600971" target="_blank">사업자정보</a></div>
        <div>통신판매업신고번호 &nbsp; 제 2022-강원춘천-0869호</div>
        <div>건강기능판매업신고번호 &nbsp; 제 2018-0098657호</div>
        <div>© Wise Selection Inc. &nbsp; All rights reserved.</div>
        </div>
        <div class="flex mt-8 gap-[26px] justify-center">
        <!-- <a href="https://www.instagram.com/vi_meal" target="_blank"><img :src="require('@/assets/images/instagram.svg')"></a>
        <a href="https://blog.naver.com/yselection" target="_blank"><img :src="require('@/assets/images/naver_blog.svg')"></a>
        <a href="https://www.youtube.com/channel/UCfCcOIIxB8lgna0FUdwfoQw" target="_blank"><img :src="require('@/assets/images/youtube.svg')"></a>
        <a href="https://vimeal.tistory.com" target="_blank"><img :src="require('@/assets/images/tistory.svg')"></a> -->
        </div>
    </div>
</template>
