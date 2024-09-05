<script setup>
import { ref, onMounted } from 'vue'
import profileImage from '@/assets/images/mylogin.svg'

let VM_IMG_URL = 'https://s3.ap-northeast-2.amazonaws.com/img-dev.vimeal.kr';

const PROPS = defineProps({
    USER: {
		Type: Object,
		default: {}
	},
})

</script>

<style>

</style>

<template>
    <div class="grid overflow-hidden">
      <div class="px-2 py-2">
        <!-- image section -->
        <div
          class="w-full h-full px-4 py-4 bg-white border border-white border-solid cursor-pointer rounded-5"
          style="filter: drop-shadow(rgba(0, 0, 0, 0.12) 0px 1px 6px)"
        >
          <div class="w-[60px] h-[60px]">
            <img
              class="w-full h-full rounded-full"
              :src="`${VM_IMG_URL}${USER.profileFileUrl}`"
              @error="$event.target.src = profileImage"
            />
          </div>
          <div class="mt-2 font-[700] text-[16px]">{{ USER.userNm }} 약사</div>
          <div class="font-[400] text-[14px] h-[21px]">{{ USER.pharmacyNm ? USER.pharmacyNm : '' }}</div>
          <!-- <template v-if="USER.userNo == myUserID">
            <div
              class="text-center z-100 w-full text-white py-1.5 text-[12px] mt-2"
            >
              자신
            </div>
          </template>
          <template v-else>
            <div
             
              class="text-center z-100 cursor-pointer bg-[#00A5FD] w-full rounded-[50px] text-white py-1 h-[32px] text-[14px] font-[500] mt-2 flex items-center justify-center"
            >
              상담신청
            </div>
          </template>  -->
        </div>
      </div>
    </div>
</template>
