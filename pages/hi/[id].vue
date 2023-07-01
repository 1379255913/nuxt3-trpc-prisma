<script setup lang="ts">
const { $trpc } = useNuxtApp()

const { data, error } = await useAsyncData(() => $trpc.auth.login.query({
  username: '2010010101',
  password: '123456',
  type: 'student',
}))
</script>

<template>
  <div>
    <button>测试登录</button>
    <p>{{ data }}</p>
    <p>{{ error }}</p>
  </div>
</template>