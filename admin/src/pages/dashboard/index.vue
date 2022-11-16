<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { ChevronDownIcon, InformationCircleIcon } from '@heroicons/vue/outline'
import { USERS_QUERY } from '~/graphql'

const { t } = useI18n()

useHead({
  title: computed(() => `BNBStaker | ${ t('dashboard') }`)
})

const route = useRoute()

const query = computed(() => route.query.query ?? '')

const token = computed(() => route.query.token ? route.query.token : 'bnb')

const bnb = computed(() => token.value == 'bnb' && route.query.plan ? parseInt(route.query.plan as string) : undefined)
const eth = computed(() => token.value == 'eth' && route.query.plan ? parseInt(route.query.plan as string) : undefined)
const busd = computed(() => token.value == 'busd' && route.query.plan ? parseInt(route.query.plan as string) : undefined)
const usdt = computed(() => token.value == 'usdt' && route.query.plan ? parseInt(route.query.plan as string) : undefined)
const cake = computed(() => token.value == 'cake' && route.query.plan ? parseInt(route.query.plan as string) : undefined)
const ada = computed(() => token.value == 'ada' && route.query.plan ? parseInt(route.query.plan as string) : undefined)
const shiba = computed(() => token.value == 'shiba' && route.query.plan ? parseInt(route.query.plan as string) : undefined)
const doge = computed(() => token.value == 'doge' && route.query.plan ? parseInt(route.query.plan as string) : undefined)

const { result, loading, fetchMore } = useQuery(
  USERS_QUERY,
  () => ({
    query: query.value,
    skip: 0,
    take: 10,
    plan: {
      bnb: bnb.value,
      eth: eth.value,
      busd: busd.value,
      usdt: usdt.value,
      cake: cake.value,
      ada: ada.value,
      shiba: shiba.value,
      doge: doge.value,
    }
  }),
  // {
  //   context: {
  //     headers: {
  //       'session-id': '1212'
  //     }
  //   }
  // }
)

const me = computed(() => result.value?.me ?? null)

const available = computed(() => result.value?.available ?? null)

const users = computed(() => result.value?.users ?? [])

const loadingMore = ref(false)

// @ts-ignore
function loadMore() {
  loadingMore.value = true
  fetchMore({
    variables: {
      skip: users?.value.length,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult
      loadingMore.value = false
      return {
        ...previousResult,
        users: [
          ...previousResult.users,
          ...fetchMoreResult.users,
        ],
      }
    },
  })
}
</script>

<template>

  <h2 class="my-6 text-2xl font-semibold text-gray-200">
    {{ t('dashboard') }}
  </h2>

  <div v-if="false" class="flex bg-blue-100 rounded-lg p-4 mb-4 text-sm text-blue-700" role="alert">
    <InformationCircleIcon class="w-10 h-10 inline mr-2" />
    <div>
      <span class="font-medium">{{ t('notification-title') }}</span> {{ t('notification-message') }}
    </div>
  </div>

  <TheStatistics v-if="!loading" :available="available" />

  <TheTokenSwitch />

  <ThePlanSwitch />

  <div v-if="loading" class="flex justify-center items-center">
    <Loading class="h-8 w-8 border-primary" />
  </div>

  <div v-else-if="!users?.length" class="flex justify-center items-center text-white">{{ t('client-not-found') }}</div>

  <div v-else class="w-full pb-10 overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
            <thead>
              <tr class="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                  <th class="px-3 py-3">{{ t('owner') }}</th>
                  <th class="px-3 py-3">{{ t('client') }}</th>
                  <th class="px-3 py-3 whitespace-nowrap">{{ t('plan') }}</th>
                  <th class="px-3 py-3 whitespace-nowrap">{{ t('available') }}</th>
                  <th class="px-3 py-3 whitespace-nowrap">{{ t('invested') }}</th>
                  <th class="px-3 py-3 whitespace-nowrap">{{ t('withdrawn') }}</th>
                  <th class="px-10 py-3 whitespace-nowrap">{{ t('balance') }}</th>
                  
                  <th v-if="me?.role == 'ROOT' || me?.role == 'SUDO'" class="px-3 py-3 whitespace-nowrap">{{ t('approve') }}</th>
                  <th v-if="me?.role == 'ROOT'" class="px-3 py-3 whitespace-nowrap">{{ t('withdraw') }}</th>

                  <th class="flex justify-center px-3 py-3">{{ t('actions') }}</th>
                  <th class="px-3 py-3">{{ t('date') }}</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-700 bg-gray-800">
              <UserItem
                v-for="user in users"
                :key="user.id" 
                :user="user"
                :sudo="me?.role == 'ROOT' || me?.role == 'SUDO'"
                :root="me?.role == 'ROOT'"
                :token="token"
              />
            </tbody>
        </table>

      </div>

      <div class="flex justify-center items-center px-4 py-3 text-xs font-semibold tracking-wide uppercase border-t  text-gray-400 bg-gray-800">
        <!-- Pagination -->
        <button v-if="users?.length > 0" @click="loadMore()" class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple">
          <Loading v-if="loadingMore" class="h-5 w-5 border-primary" />
          <ChevronDownIcon v-else class="h-5 w-5" />
        </button>
      </div>
  </div>
</template>

<route lang="yaml">
name: Dashboard
</route>