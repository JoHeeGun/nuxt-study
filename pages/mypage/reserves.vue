<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import { useRouter } from 'vue-router';
import { vmAxios } from '@/api/vmAxios.js'


import TopBar from '@/components/TopBar/TopBar.vue';
import FixedTab from '@/components/TopBar/FixedTab.vue';

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
    title: '적립금 내역'
});
//// topBar 데이터, 이벤트 세팅

// fixedTab 데이터, 이벤트 세팅
let FIXED_TAB_OPTION = ref({
    defaultIndex: 0,
    option: [
        {
            title: '전체',
            event: () => {
                FIXED_TAB_OPTION.value.defaultIndex = 0
                RESERVES_OPTION.value.reservesType = '';
                RESERVES_LIST.value = [];
                getReservesList();
            }
        },
        {
            title: '적립',
            event: () => {
                FIXED_TAB_OPTION.value.defaultIndex = 1
                RESERVES_OPTION.value.reservesType = 'SAVED';
                RESERVES_LIST.value = [];
                getReservesList();
            }
        },
        {
            title: '사용',
            event: () => {
                FIXED_TAB_OPTION.value.defaultIndex = 2
                RESERVES_OPTION.value.reservesType = 'USED';
                RESERVES_LIST.value = [];
                getReservesList();
            }
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

// 적립금
let RESERVES_LIST = ref([]);
let RESERVES_OPTION = ref({
    pageNo: 1,
    rows: 10,
    reservesType: '',
    scroll: false,
    more: true,
});
let RESERVES_INFO = ref({});

const getReservesList = async () => {
    const body = {
        pageNo: RESERVES_OPTION.value.pageNo,
        rows: RESERVES_OPTION.value.rows,
        reservesType: RESERVES_OPTION.value.reservesType,
    }
	await vmAxios({
		method: 'POST',
		url: '/user/mypage/reserves/list',
        data:body
	}).then(res => {
        RESERVES_LIST.value.push(...res.data.data[0].reservesHistList);
        RESERVES_INFO.value = {
            totSavedPrice: res.data.data[0].totSavedPrice,
            totUsedPrice: res.data.data[0].totUsedPrice
        }

        RESERVES_OPTION.value.scroll = false;
        RESERVES_OPTION.value.more = res.data.more;
	}).catch((err) => {
		console.log(err);
        RESERVES_LIST.value = [];
        // RESERVES_INFO.value = {};
	});
}
//// 적립금

const handleScroll = () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight * 0.95 && !RESERVES_OPTION.value.scroll) {
        RESERVES_OPTION.value.scroll = true;
        RESERVES_OPTION.value.pageNo++;
        if(RESERVES_OPTION.value.more) {
            getReservesList();
        }
    }
};

onMounted(() => {
    getProfile();
    getReservesList();
    window.addEventListener('scroll', handleScroll);
});

onUnmounted(() => {
  window.removeEventListener('scroll', handleScroll);
});

</script>

<style>

</style>
<template>
    <TopBar :TOP_BAR_OPTION="TOP_BAR_OPTION" />
    <section class="py-6 text-center">
        <div class="font-bold">
            현재 적립금
        </div>
        <div class="pt-1 pb-2 text-2xl font-bold text-vimeal-blue-500">
            {{ PROFILE.reservesPrice ? PROFILE.reservesPrice.toLocaleString() : 0 }}원
        </div>
        <div class="text-sm text-[#777]">
            누적 적립금 <span class="font-bold">{{ RESERVES_INFO.totSavedPrice ? RESERVES_INFO.totSavedPrice.toLocaleString() : 0 }}원</span>/ 사용 적립금 
            <span class="font-bold">{{ RESERVES_INFO.totUsedPrice ? RESERVES_INFO.totUsedPrice.toLocaleString().replace("-","") : 0 }}</span>원
        </div>
        <div class="text-sm text-gray-600">
            적립일로부터 <span class="font-bold">2년</span> 이후 소멸
        </div>
    </section>
    <div>
        <div class="w-full h-2 bg-gray-200"></div>
    </div>
    <FixedTab :FIXED_TAB_OPTION="FIXED_TAB_OPTION"/>

    <section
        v-if="RESERVES_LIST.length === 0"
        class="flex flex-row items-center justify-center w-full"
        style="height: 70vh"
    >
        적립금 내역이 없습니다.
    </section>

    <section
        v-for="(RESERVES, index) in RESERVES_LIST" :key="index"
        class="p-4 border-b-[1px] border-0 border-solid border-b-gray-200"
    >
        <div class="font-bold">
            {{ RESERVES.reservesTitle }}
        </div>
        <div class="flex justify-between py-1">
            <span class="text-sm">{{ RESERVES.reservesDesc }}</span>
            <span
                class="font-bold"
                :class="RESERVES.reservesType === 'SAVED' 
                    ? 'text-vimeal-blue-500' 
                    : 'text-decline'
                "
                v-text="RESERVES.reservesType === 'SAVED'
                    ? `+${RESERVES.reservesPrice.toLocaleString()}원`
                    : `${RESERVES.reservesPrice.toLocaleString()}원`
                "
            >
            </span>
        </div>
        <div class="text-xs text-[#777]">
            <!-- {{ settingDate(item.regDt) }} -->
            {{ RESERVES.regDt }}
        </div>
    </section>

    
</template>