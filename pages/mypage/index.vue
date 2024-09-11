<script setup>
import { ref, onMounted, computed } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { vmAxios } from '@/api/vmAxios.js'
import { useUserStore } from '~/store/user';
import { useCartStore } from '~/store/cart';

import TopBar from '@/components/TopBar/TopBar.vue';
import FixedTab from '@/components/TopBar/FixedTab.vue';

import profileImage from '@/assets/images/mylogin.svg'

const userStore = useUserStore();
const CartStore = useCartStore();
const router = useRouter();
const route = useRoute();
// const VM_IMG_URL = 'https://s3.ap-northeast-2.amazonaws.com/img-dev.vimeal.kr';

onBeforeUpdate(() => {
    const isLoggedIn = JSON.parse(localStorage.getItem("vimeal__user")) || '';
    // 로그인되어 있지 않으면 로그인 페이지로 리다이렉트
    if (!isLoggedIn && route.path !== '/login') {
        router.replace('/account/login');
    }
});

definePageMeta({
  title: 'mypage denver',
  name: 'mypage denver',
})

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
    title: '마이페이지'
});
//// topBar 데이터, 이벤트 세팅

// fixedTab 데이터 세팅
let FIXED_TAB_OPTION = ref({
    defaultIndex: 0,
    option: [
        {
            title: '나의 프로필',
            event: () => FIXED_TAB_OPTION.value.defaultIndex = 0
        },
        {
            title: '나의 쇼핑',
            event: () => FIXED_TAB_OPTION.value.defaultIndex = 1
        }
    ]
})
//// fixedTab 데이터 세팅

// 프로필
let PROFILE = ref({});

const getProfile = async () => {
	await vmAxios({
		method: 'POST',
		url: '/user/mypage/profile',
	}).then(res => {
        PROFILE.value = res.data.data;		
	}).catch((err) => {
		console.log(err);
	});
}
//// 프로필

// 주문내역
let ORDER_ITEMS = ref({
    PAYMENT_WAITING_CNT: 0,
    PAYED_CNT: 0,
    DELIVERING_CNT: 0,
    DELIVERED_CNT: 0,
    PURCHASE_DECIDED_CNT: 0,
    CANCELED_CNT: 0,
    RETURNED_CNT: 0,
    EXCHANGED_CNT: 0,
});

const getOrderList = async () => {
	await vmAxios({
		method: 'POST',
		url: '/order/user/mypage/order/status-count',
	}).then(res => {
        res.data.data.forEach(item => {
            const countKey = `${item.orderStatusCd}_CNT`;
            if (ORDER_ITEMS.value.hasOwnProperty(countKey)) {
                ORDER_ITEMS.value[countKey] = item.orderStatusCnt;
            }
        });
	}).catch((err) => {
		console.log(err);
	});
}
//// 주문내역

let USER = computed(() => {
    return userStore.user || '';
})

let CART = computed(() => {
    return CartStore.items || [];
})

const logout = () => {
    
    const result = confirm("로그아웃 하시겠습니까?");
    if(result) {
        localStorage.clear();
        localStorage.removeItem("vimeal__token");
        localStorage.removeItem("vimeal__user");
        userStore.$reset();
        router.replace('/');
    }
    
}

onMounted(() => {
    getProfile();
    getOrderList();
    console.log('useCartStore',CartStore.items[0]);
    console.log('userStore',userStore);
    console.log('CART',CART);
})

</script>

<template>
    <TopBar :TOP_BAR_OPTION="TOP_BAR_OPTION" />
    <FixedTab :FIXED_TAB_OPTION="FIXED_TAB_OPTION"/>

    <!-- 공통 영역 -->
    <section>
        <div class="px-4 py-6">
            <div class="flex justify-between w-full">
                <div class="flex items-center">
                    <div class="relative w-16 h-16 bg-white bg-center bg-no-repeat border border-gray-300 border-solid rounded-full cursor-pointer">
                        <img
                            id="profile"
                            class="w-full rounded-full aspect-square"
                            @error="$event.target.src = profileImage"
                            :src=" PROFILE.profileFileUrl 
                                ? `${ VM_IMG_URL }${ PROFILE.profileFileUrl }`
                                : profileImage
                            "
                            alt="이미지"
                        />
                        <div
                            v-if="USER"
                            class="absolute bottom-0 right-0 flex items-center justify-center w-4 h-4 bg-center bg-no-repeat rounded-full bg-vimeal-blue-500"
                        >
                        <img
                            src="@/assets/images/photo_camera.svg"
                            alt="이미지"
                        />
                        <input
                            id="photo"
                            type="file"
                            @change="handleFileChange($event)"
                            class="hidden"
                        />
                        </div>
                    </div>
                    <div class="pl-4">
                        <div 
                            v-if="USER.nickname"
                            class="text-[18px] font-700"
                        >
                            {{ USER.nickname }}
                        </div>
                        <div
                            @click="router.push('/mypage/edit')"
                            class="text-[#777] text-[14px] mt-1 cursor-pointer"
                        >
                            내 정보 수정하기
                        </div>
                    </div>
                </div>

                <div class="flex flex-col items-center justify-center w-auto pr-2 cursor-pointer">
                    <img src="@/assets/images/favorite.svg" />
                    <div class="text-[12px] font-400 mt-1">보관함</div>
                </div>
            </div>
        </div>
        <div>
            <div
                @click="router.push('/mypage/reserves')"
                class="h-[56px] mx-4 mb-2 flex justify-between items-center cursor-pointer"
                style="border-radius: 8px; background: #f0faff"
            >
                <div class="flex items-center px-4">
                    <img src="@/assets/images/savemoney.svg" />
                    <span class="ml-2 text-[14px] font-700">적립금</span>
                </div>
                <div class="px-4 text-[#00A5FD] text-[18px] font-700">
                    {{ PROFILE.reservesPrice ? PROFILE.reservesPrice.toLocaleString() : 0 }}원
                </div>
            </div>
            
            <div
                @click="router.push('/mypage/coupon')"
                class="h-[56px] mx-4 mb-6 flex justify-between items-center cursor-pointer"
                style="border-radius: 8px; background: #f0faff"
            >
                <div class="flex items-center px-4">
                    <img src="@/assets/images/coupon.svg" />
                    <span class="ml-2 text-[14px] font-700">쿠폰</span>
                </div>
                <div class="px-4 text-[#00A5FD] text-[18px] font-700">
                    {{ PROFILE.cpnCnt ? PROFILE.cpnCnt : 0 }} 장
                </div>
            </div>
        </div>

        <div class="px-4">
            <img
                class="w-full cursor-pointer rounded-8"
                src="@/assets/images/mypage_banner.png"
                alt="친구추가 이벤트 소배너"
            />
        </div>
        
    </section>
    <!-- // 공통영역 -->

    <!-- 나의 프로필 영역 -->
    <section v-if="FIXED_TAB_OPTION.defaultIndex === 0">
        <div class="pt-10 pb-0 pl-4 pr-0">
            <div class="text-[#777] font-700 text-[16px] mb-4">
                나의기록
            </div>
            <div class="flex flex-col gap-6 cursor-pointer">
                <div class="flex flex-row items-center justify-between">
                    <div class="flex">
                        <img src="@/assets/images/health.svg" />
                        <span class="ml-3 text-[16px] font-400">문진기록 보기</span>
                    </div>
                    <div class="px-4 py-1 cursor-pointer">
                        <img src="@/assets/images/expand_more.svg" />
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between">
                    <div class="flex">
                        <img src="@/assets/images/inject.svg" />
                        <span class="ml-3 text-[16px] font-400">섭취기록 보기</span>
                    </div>
                    <div class="px-4 py-1 cursor-pointer">
                        <img src="@/assets/images/expand_more.svg" />
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between">
                    <div class="flex">
                        <img src="@/assets/images/consult.svg" />
                        <span class="ml-3 text-[16px] font-400">상담기록 보기</span>
                    </div>
                    <div class="px-4 py-1 cursor-pointer">
                        <img src="@/assets/images/expand_more.svg" />
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between">
                    <div class="flex">
                        <img src="@/assets/images/question.svg" />
                        <span class="ml-3 text-[16px] font-400">질문기록 보기</span>
                    </div>
                    <div class="px-4 py-1 cursor-pointer">
                        <img src="@/assets/images/expand_more.svg" />
                    </div>
                </div>
            </div>
        </div>
        
        <div class="h-[4px] bg-[#EFEFEF] mt-6"></div>

        <div class="pt-4 pb-0 pl-4 pr-0 mt-3">
            <div class="text-[#777] font-700 text-[16px] mb-4">
                나의활동
            </div>
            <div class="flex flex-col gap-6">
                <div class="flex flex-row items-center justify-between cursor-pointer">
                    <div class="flex">
                        <img src="@/assets/images/health.svg" />
                        <span class="ml-3 text-[16px] font-400">내가 작성한 후기</span>
                    </div>
                    <div class="px-4 py-1 cursor-pointer">
                        <img src="@/assets/images/expand_more.svg" />
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between cursor-pointer">
                    <div class="flex">
                        <img src="@/assets/images/search.svg" />
                        <span class="ml-3 text-[16px] font-400">최근 검색한 제품</span>
                    </div>
                    <div class="px-4 py-1 cursor-pointer">
                        <img src="@/assets/images/expand_more.svg" />
                    </div>
                </div>
            </div>
      </div>

    </section>
    <!-- // 나의 프로필 영역 -->

    <!-- 나의 쇼핑 영역 -->
    <section v-else-if="FIXED_TAB_OPTION.defaultIndex === 1">
        <div class="px-4">
            <div class="pt-6 pb-3">
                <span class="pr-2 text-lg font-bold"> 주문조회 </span>
                <span class="text-gray-500"> (최근 3개월) </span>
            </div>

            <div class="grid grid-flow-col col-span-6 cursor-pointer">
                <div    
                    class="w-full text-center"
                    :class="
                    ORDER_ITEMS.PAYMENT_WAITING_CNT === 0
                        ? 'text-gray-500'
                        : 'text-black'
                    "
                >
                    <div class="text-lg">
                        {{ ORDER_ITEMS.PAYMENT_WAITING_CNT }}
                    </div>
                    <div class="text-xs">
                        입금대기
                    </div>
                </div>
                <div
                    class="w-full text-center"
                    :class="ORDER_ITEMS.PAYED_CNT === 0 
                        ? 'text-gray-500' 
                        : 'text-black'
                    "
                >
                    <div class="text-lg">
                        {{ ORDER_ITEMS.PAYED_CNT }}
                    </div>
                    <div class="text-xs">
                        결제완료
                    </div>
                </div>
                <div
                    class="w-full text-center"
                    :class="ORDER_ITEMS.DELIVERING_CNT === 0 
                        ? 'text-gray-500' 
                        : 'text-black'
                    "
                >
                    <div class="text-lg text-gray-500">
                    {{ ORDER_ITEMS.DELIVERING_CNT }}
                    </div>
                    <div class="text-xs">
                        배송중
                    </div>
                </div>
                <div
                    class="w-full text-center"
                    :class="ORDER_ITEMS.DELIVERED_CNT === 0 
                        ? 'text-gray-500' 
                        : 'text-black'
                    "
                >
                    <div class="text-lg">
                        {{ ORDER_ITEMS.DELIVERED_CNT }}
                    </div>
                    <div class="text-xs">
                        배송완료
                    </div>
                </div>
                <div
                    class="w-full text-center"
                    :class="ORDER_ITEMS.PURCHASE_DECIDED_CNT === 0
                        ? 'text-gray-500'
                        : 'text-black'
                    "
                >
                    <div class="text-lg">
                        {{ ORDER_ITEMS.PURCHASE_DECIDED_CNT }}
                    </div>
                    <div class="text-xs">
                        구매확정
                    </div>
                </div>
            </div>



            <div class="py-4">
                <div class="py-2 cursor-pointer bg-gray-150 rounded-5">
                    <div class="grid grid-cols-3 justify-items-center">
                        <div
                            class="w-full text-center border-r-[1px] border-solid border-0 border-r-gray-300"
                            :class="ORDER_ITEMS.CANCELED_CNT === 0 
                                ? 'text-gray-500' 
                                : 'text-black'
                            "
                        >
                            <div class="text-lg font-bold">
                                {{ ORDER_ITEMS.CANCELED_CNT }}
                            </div>
                            <div class="pt-1 text-sm">
                                취소
                            </div>
                        </div>
                        <div
                            class="w-full text-center border-r-[1px] border-solid border-0 border-r-gray-300"
                            :class="ORDER_ITEMS.RETURNED_CNT === 0 
                                ? 'text-gray-500' 
                                : 'text-black'
                            "
                        >
                            <div class="text-lg font-bold">
                                {{ ORDER_ITEMS.RETURNED_CNT }}
                            </div>
                            <div class="pt-1 text-sm">
                                반품
                            </div>
                        </div>
                        <div
                            class="w-full text-center"
                            :class="ORDER_ITEMS.EXCHANGED_CNT === 0 
                                ? 'text-gray-500' 
                                : 'text-black'
                            "
                        >
                            <div class="text-lg font-bod">
                                {{ ORDER_ITEMS.EXCHANGED_CNT }}
                            </div>
                            <div class="pt-1 text-sm">
                                교환
                            </div>
                        </div>
                    </div>
                </div>
            </div>        
        </div>
    </section>
    <!-- // 나의 쇼핑 영역 -->

    <div class="py-3">
      <div class="h-[4px] bg-[#EFEFEF]"></div>
    </div>

    <!-- 공통 영역 -->
    <section>
        <div class="pl-4 pr-0">
            <div class="text-[#777] font-700 text-[16px] py-4">
                고객센터
            </div>
            <div class="flex flex-col gap-6">
                <div class="flex flex-row items-center justify-between cursor-pointer">
                    <div class="flex">
                        <img src="@/assets/images/noti.svg" />
                        <span class="ml-3 text-[16px] font-400">공지사항</span>
                    </div>
                    <div class="px-4 py-1 cursor-pointer">
                        <img src="@/assets/images/expand_more.svg" />
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between cursor-pointer">
                    <div class="flex">
                        <img src="@/assets/images/questionlist.svg" />
                        <span class="ml-3 text-[16px] font-400">문의내역</span>
                    </div>
                    <div class="px-4 py-1 cursor-pointer">
                        <img src="@/assets/images/expand_more.svg" />
                    </div>
                </div>
                <div class="flex flex-row items-center justify-between cursor-pointer">
                    <div class="flex">
                        <img src="@/assets/images/que.svg" />
                        <span class="ml-3 text-[16px] font-400">자주 묻는 질문</span>
                    </div>
                <div class="px-4 py-1 cursor-pointer">
                    <img src="@/assets/images/expand_more.svg" />
                </div>
                </div>
            </div>
        </div>

        <div class="py-6">
            <div class="h-[4px] bg-[#EFEFEF]"></div>
        </div>

        <div class="px-4">
            <span 
                @click="logout()"
                class="cursor-pointer"
            >
                로그아웃
            </span>
            <div class="flex justify-center pr-4 text-sm text-gray-350 pb-7 pt-9">
                <span class="underline cursor-pointer">
                    탈퇴하기
                </span>
            </div>
        </div>
    </section>
    <!-- // 공통영역 -->
    
</template>