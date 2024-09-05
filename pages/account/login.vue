<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '~/store/user';
import { vmAxios } from '@/api/vmAxios.js'

import TopBar from '@/components/TopBar/TopBar.vue'

const userStore = useUserStore();
const router = useRouter();
const route = useRoute();


definePageMeta({
  title: 'login page denver',
  name: 'login denver',  
})

let USER = ref({
    userId: '',
    userPw: ''
});

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
            event: () => console.log('Clicked on home2'),
        },
        {
            icon:'cart',
            event: () => console.log('Clicked on cart'),
        },
        {
            icon:'my',
            event: () => console.log('Clicked on my'),
        }
    ],
    title: '로그인'
});
//// topBar 데이터, 이벤트 세팅

const submit = async () => {
    await vmAxios({
		method: 'POST',
		url: '/user/login',
        data:USER.value
	}).then(res => {
                
        const user = res.data.data;
        const token = user.jwt;
        
        localStorage.setItem("vimeal__user", JSON.stringify(user));
        localStorage.setItem("vimeal__token", token);
        
        userStore.setUser(user);
        userStore.setToken(token);
        
        router.push('/');
		
	}).catch((err) => {
		console.log(err);
	});
}
</script>

<style scoped>
.css-tooltip-arrow {
  display: inline-block;
  position: relative;
}
.css-tooltip-arrow:before {
  content: "";
  display: block;
  position: absolute;
  left: 44%;
  top: 100%;
  width: 0;
  height: 0;
  border: 10px solid transparent;
  border-top-color: #dfdfdf;
}

.css-tooltip-arrow:after {
  content: "";
  display: block;
  position: absolute;
  left: 44.5%;
  top: 100%;
  width: 0;
  height: 0;
  border: 9px solid transparent;
  border-top-color: white;
}
</style>

<template>
    <TopBar :TOP_BAR_OPTION="TOP_BAR_OPTION" />
    <div class="flex flex-col justify-center">
        <img 
            src="@/assets/images/welcome_01.svg" 
            class="mt-12 w-1/2 mx-auto aspect-[190/146]"
        />

        <section class="mx-8 mt-4">
            <input
                type="text"
                v-model="USER.userId"
                class="w-full h-12 pl-4 border border-gray-300 border-solid rounded-b-none outline-none rounded-5"
                placeholder="아이디"
                @keyup.enter="submit()"
            />
            <input
                type="password"
                v-model="USER.userPw"
                class="w-full h-12 pl-4 border border-t-0 border-gray-300 border-solid rounded-t-none outline-none rounded-5"
                placeholder="비밀번호"
                maxlength="30"
                @keyup.enter="submit()"
            />

            <button 
                class="w-full py-2 px-[8px] rounded-[5px] text-white text-center bg-vimeal-blue-500 mt-4 disabled:bg-gray-350"
                @click="submit()"
                :disabled="USER.userId.length === 0 || USER.userPw.length === 0"
            >
                로그인
            </button>
            
            <div class="flex items-center justify-center gap-3 mt-4 cursor-pointer">
                <div
                    @click="router.push(`/account/find/id`)"
                    class="text-sm text-left text-gray-500 no-underline cursor-pointer hover:no-underline"
                >
                    아이디 찾기
                </div>
                <img src="@/assets/images/vertical_line01.svg" />
                <div
                    @click="router.push(`/account/find/pass`)"
                    class="text-sm text-left text-gray-500 no-underline cursor-pointer hover:no-underline"
                >
                    비밀번호 찾기
                </div>
                <img src="@/assets/images/vertical_line01.svg" />
                <div
                    @click="router.push(`/account/sign-up`)"
                    class="text-sm text-left text-gray-500 no-underline hover:no-underline"
                >
                    회원가입
                </div>
            </div>

            <div class="w-full mt-6 text-center">
                <div class="css-tooltip-arrow text-[12px] text-gray-800 font-bold p-2 border-gray-300 border-[1px] rounded-5 border-solid">
                    <div class="flex">
                        <img
                            class="mr-[6px]"
                            src="@/assets/images/lightning.svg"
                        />
                        빠른 회원가입하고 <span class="pl-1 text-orange">3,000원</span> 받기
                    </div>
                </div>
            </div>

            <div class="flex items-center justify-center gap-4 mt-4">
                <img
                    class="cursor-pointer"
                    src="@/assets/images/button_sns_kakao.svg"
                />
                <img
                    class="cursor-pointer"
                    src="@/assets/images/button_sns_naver.svg"
                />
            </div>

            <div class="w-full mt-6 text-sm text-center text-gray-500 no-underline hover:no-underline">
                비회원 주문조회                
            </div>
        </section>
    </div>
</template>
