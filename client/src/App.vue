<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { VISIT_QUERY } from '~/graphql'

const { t } = useI18n()

useHead({
  title: computed(() => `BNBStaker | ${ t('earn-from') } 8% - 18% ${ t('up-to') } 240%`)
})

const loading = useInterval(1000)

useQuery(VISIT_QUERY)

</script>

<template>
  <TheSpinner v-if="!loading" />

  <div v-else class="v-application--wrap">
    <RouterView />
  </div>
  
</template>
