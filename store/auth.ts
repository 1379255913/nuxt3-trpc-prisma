import { defineStore } from "pinia"


export const useAuthStore = defineStore('auth', {
  state: () => ({
    username: '',
    user: {} as Record<string, any>,
    token: '',
  }),

  actions: {
    async login(username: string, password: string) {
      const { $trpc } = useNuxtApp()
      const res = await $trpc.auth.login.mutate({
        username,
        password,
        type: 'student',
      })
      if (!res) {
        throw new Error('登录失败')
      }
      console.log(22222);
      
      this.username = username
      this.user = res.user
      this.token = res.token
    }
  }
  
})