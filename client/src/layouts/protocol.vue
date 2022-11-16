<script lang="ts" setup>
import { useAccountStore } from '~/stores/account'
import { usePriceStore } from '~/stores/price'

const route = useRoute()

const account = useAccountStore()

const price = usePriceStore()

watchEffect(() => {
  price.get()
    .catch(() => price.get())
  account.autoConnect()
  
})

</script>

<template>
  <TheHeader />

  <TheSidebar />

  <RouterView v-slot="{ Component }">
    <transition name="fade" mode="out-in">
      <component :is="Component" :key="route.path" />
    </transition>
  </RouterView>
  
</template>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>