<script setup>
import { useRouter } from 'vue-router'

const router = useRouter();

</script>
<template>
    <div class="sticky top-0 w-full lg:w-[32rem] z-40">
        <section class="flex items-center justify-between w-full h-[72px] px-4 text-white border-0 text-2xs lg:w-[32rem] z-40 bg-vimeal-blue-500 gap-3">
            <div class="py-4 cursor-pointer">
				<img 
					@click="router.push('/')"
					src="@/assets/images/home_logo.svg" 
				/>
			</div>
            <div class="flex items-center w-auto gap-4">
				<div class="w-6 h-6 cursor-pointer">
					<img 
						@click="router.push('/')"
						src="@/assets/images/icon_heart.svg" 
						class="w-full h-full"
					/>
				</div>
				<div class="relative w-6 h-6 cursor-pointer">
					<img 
						@click="router.push('/cart')"
                        src="@/assets/images/icon_cart.svg" 
						class="w-full h-full"
					/>
				</div>

				<div class="w-6 h-6 cursor-pointer">
					<img 
						@click="router.push('/mypage')"
                        src="@/assets/images/main_my2.svg" 
						class="w-full h-full"
					/>
				</div>
			</div>
        </section>
    </div>
</template>
