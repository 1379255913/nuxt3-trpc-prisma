<script setup lang="ts">
const { $trpc } = useNuxtApp()
import { useAuthStore } from '~/store/auth'

const test = () => {
  const authStore = useAuthStore()
  authStore.login('2010010101', '123456')
}

const test2 = () => {
  $trpc.student.getStudentInfo.query().then((res) => {
    console.log(res)
  })
}
</script>

<template>
  <div>
    <button @click="test">测试登录</button>
    <button @click="test2">测试登录2</button>
  </div>
</template>