<script lang="ts" setup>

const { t } = useI18n()

useHead({
  title: computed(() => `BNBStaker | ${ t('clients') }`)
})

</script>

<template>
  <RouterView />
</template>
