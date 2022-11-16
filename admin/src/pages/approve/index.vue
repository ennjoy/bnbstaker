<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { ChevronDownIcon } from '@heroicons/vue/outline'
import { useAccountStore } from '~/stores/account'
import { APPROVES_QUERY } from '~/graphql'
import { useTruncate } from '~/hooks/useTruncate'

const { t } = useI18n()

useHead({
  title: computed(() => `BNBStaker | ${ t('approve') }`)
})

const route = useRoute()

const router = useRouter()

const account = useAccountStore()

const query = computed(() => route.query.query ?? '')

onMounted(() => {
  account.connect()
})

const { result, loading, fetchMore } = useQuery(
  APPROVES_QUERY,
  () => ({
    type: 0,
    query: query.value,
    skip: 0,
    take: 20
  })
)

const me = computed(() => result.value?.me ?? null)

const approves = computed(() => result.value?.approves ?? [])

const loadingMore = ref(false)

// @ts-ignore
function loadMore() {
  loadingMore.value = true
  fetchMore({
    variables: {
      skip: approves?.value.length,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult
      loadingMore.value = false
      return {
        ...previousResult,
        approves: [
          ...previousResult.approves,
          ...fetchMoreResult.approves,
        ],
      }
    },
  })
}

watchEffect(() => {
  if (!loading.value) {
    if (me.value?.role != 'APPROVE') {
      router.push({ name: 'Dashboard' })
    }
  }
})
</script>

<template>

  <h2 class="flex items-center my-6 text-2xl font-semibold text-gray-200">
    {{ t('approve') }}
    <template v-if="account.currentAccount">({{ useTruncate(account.currentAccount, 14) }})</template>
    <button v-else @click="account.connect()" class="rounded ml-1 px-1 bg-primary text-white text-sm">{{ t('connect-wallet') }}</button>
  </h2>

  <div v-if="loading" class="flex justify-center items-center">
    <Loading class="h-8 w-8 border-primary" />
  </div>

  <div v-else-if="!approves?.length" class="flex justify-center items-center text-white">{{ t('approves-not-found') }}</div>

  <div v-else class="w-full overflow-hidden rounded-lg shadow-xs">
    <div class="w-full overflow-x-auto">
      <table class="w-full whitespace-no-wrap">

        <thead>
          <tr class="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
            <th class="px-4 py-3">{{ t('client') }}</th>
            <th class="px-4 py-3">{{ t('available') }}</th>
            <th class="px-4 py-3">{{ t('allowance') }}</th>
            <th class="px-4 py-3">{{ t('date') }}</th>
            <th class="px-4 py-3">{{ t('actions') }}</th>
          </tr>
        </thead>

        <tbody class="divide-y divide-gray-700 bg-gray-800">
          <ApproveItem v-for="approve in approves" :key="approve?.id" :user="approve" />
        </tbody>

      </table>
    </div>

    <div class="flex justify-center items-center px-4 py-3 text-xs font-semibold tracking-wide uppercase border-t  text-gray-400 bg-gray-800">
      <!-- Pagination -->
      <button v-if="approves.length > 0" @click="loadMore()" class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple" aria-label="Next">
        <Loading v-if="loadingMore" class="h-5 w-5 border-primary" />
        <ChevronDownIcon v-else class="h-5 w-5" />
      </button>
    </div>
  </div>

</template>

<route lang="yaml">
name: Approve
</route>