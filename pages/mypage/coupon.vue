<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { vmAxios } from '@/api/vmAxios.js'

import TopBar from '@/components/TopBar/TopBar.vue';

const router = useRouter();

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
    title: '쿠폰 내역'
});
//// topBar 데이터, 이벤트 세팅

// 쿠폰
let COUPON_LIST = ref([]);
let COUPON_OPTION = ref({
    pageNo: 1,
    rows: 10,
    scroll: false,
    more: true,
});

const getCoupon = async () => {

    const body = {
        pageNo: COUPON_OPTION.value.pageNo,
        rows: COUPON_OPTION.value.rows
    }
	await vmAxios({
		method: 'POST',
		url: '/user/mypage/coupon/list',
        data:body
	}).then(res => {
        COUPON_LIST.value = res.data.data;
	}).catch((err) => {
		console.log(err);
	});
}
//// 쿠폰


onMounted(() => {
    getCoupon();
})

</script>

<template>
    <TopBar :TOP_BAR_OPTION="TOP_BAR_OPTION" />
    <div
        v-if="COUPON_LIST.length === 0"
        class="flex flex-row items-center justify-center w-full"
        style="height: 70vh"
    >
        쿠폰 내역이 없습니다.
    </div>
    <div class="flex flex-col gap-4 px-4 py-6">
        <div 
            v-for="(COUPON, cpnId) in COUPON_LIST" :key="cpnId"
            class="grid w-full grid-cols-1 gap-1 p-4 bg-white border border-gray-300 border-solid rounded-5"
        >
        <div>
            {{ COUPON.cpnNm }}
        </div>
        <div class="text-2xl font-bold">
            {{ COUPON.cpnDscntAmt }}할인
        </div>
            <div 
                v-if="COUPON.cpnDesc" 
                class="text-xs"
                v-html="COUPON.cpnDesc.replace(/\\n/g, '<br />')"
            >
            </div>
            <div class="text-xs text-vimeal-blue-500">
                {{ COUPON.expiryDt }}
            </div>
        </div>
    </div>
</template>