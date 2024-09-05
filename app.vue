<script setup>
import { onMounted } from 'vue';
import { useUserStore } from '~/store/user';

const userStore = useUserStore();

onMounted(() => {
  
  const token = localStorage.getItem("vimeal__token") || '';
  const user = JSON.parse(localStorage.getItem("vimeal__user")) || '';

  if(token && user) {
    userStore.setUser(user);
    userStore.setToken(token);
  }
})

</script>
<template>
  <div>
    <NuxtLayout>
      <NuxtPage/>
    </NuxtLayout>
  </div>
</template>