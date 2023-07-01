import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'
import type { AppRouter } from '../server/trpc/routers'
import { useAuthStore } from '../store/auth'

export default defineNuxtPlugin(() => {
  const authStore = useAuthStore()
  
  return {
    provide: {
      trpc: createTRPCNuxtClient<AppRouter>({
        links: [
          httpBatchLink({
            url: '/api/trpc',
            headers() {
              const token = authStore.token || ''
              console.log(token);
              return {
                Authorization: token
              }
            }
          })
        ]
      })
    }
  }
})