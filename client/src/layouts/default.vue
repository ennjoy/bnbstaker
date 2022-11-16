<script lang="ts" setup>
import { useAccountStore } from '~/stores/account'
import { usePriceStore } from '~/stores/price'

const account = useAccountStore()

const price = usePriceStore()

watchEffect(() => {
  account.autoConnect()
})

onMounted(() => {
  
  price.get()
})
</script>

<template>
  <TheHeader />

  <TheSidebar />

  <RouterView />
  
</template>
