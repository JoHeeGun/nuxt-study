<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { vmAxios } from '@/api/vmAxios.js'

import TopBar from '@/components/TopBar/TopBar.vue';
import ProductItemVertical from '@/components/Product/ProductItemVertical.vue'


const router = useRouter();
const route = useRoute();

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

// 피드 리스트
let LIST_DATA = ref([]);

const getList = async () => {
    await vmAxios({
		method: 'GET',
		url: `/main/feed?feedNo=${route.params.cate}`,
	}).then(res => {
        
        TOP_BAR_OPTION.value.title = res.data.data[0].feedDesc;
        LIST_DATA.value = res.data.data[0].feedProdList;

	}).catch((err) => {
		console.log(err);
	});    
}
//// 피드 리스트

onMounted(() => {
    getList();
})

</script>

<style>

</style>

<template>
    <TopBar :TOP_BAR_OPTION="TOP_BAR_OPTION"/>
    <div class="flex flex-wrap px-[12px] pb-[20px]">

        <div 
            v-for="(item, index) in LIST_DATA" :key="index"
            class="w-[50%] p-[4px] pb-[52px]"
        >
            <ProductItemVertical 
                :ITEM_DATA="item"
            />
        </div>
    </div>
</template>