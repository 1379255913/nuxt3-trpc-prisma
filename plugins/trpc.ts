import { createTRPCNuxtClient, httpBatchLink } from 'trpc-nuxt/client'

import type { AppRouter } from '../server/trpc/routers'

export default defineNuxtPlugin(() => ({
  provide: {
    trpc: createTRPCNuxtClient<AppRouter>({
      links: [
        httpBatchLink({
          url: '/api/trpc'
        })
      ]
    })
  }
}))