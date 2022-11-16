<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { CursorClickIcon, RefreshIcon, CashIcon, ChevronDoubleDownIcon, CakeIcon, SelectorIcon, CheckIcon, ChevronDownIcon} from '@heroicons/vue/outline'
import { STATISTIC_QUERY } from '~/graphql'
import { useMoment } from '~/hooks/useMoment'
import { useCoin } from '~/hooks/useCoin'
import { useToken } from '~/hooks/useToken'
import { useAbbreviate } from '~/hooks/useAbbreviate'

const { t } = useI18n()

useHead({
  title: computed(() => `BNBStaker | ${ t('statistics') }`)
})

const route = useRoute()

const query = computed(() => route.query.query ?? '')

const clocks = [
  {
    hours: 1,
    name: 'last-hour'
  },
  {
    hours: 12,
    name: 'twelve-hours'
  },
  {
    hours: 24,
    name: 'a-day'
  },
  {
    hours: 168,
    name: 'a-week'
  },
  {
    hours: 720,
    name: 'month'
  },
  {
    hours: 10_000,
    name: 'all-time'
  },
]

const selectedClock = ref(clocks[5])

const { result, loading, fetchMore } = useQuery(
    STATISTIC_QUERY,
    () => ({
        query: query.value,
        hours: selectedClock.value?.hours,
        token: useToken(route.query.token as string),
        skip: 0,
        take: 20,
    })
)

const visitCount = computed(() => result.value?.visitCount ?? 0)

const replenishmentCount = computed(() => result.value?.replenishmentCount ?? 0)

const withdrawalsCount = computed(() => result.value?.withdrawalsCount ?? 0)

const allTransactions = computed(() => result.value?.allTransactions ?? [])

const loadingMore = ref(false)

// @ts-ignore
function loadMore() {
  loadingMore.value = true
  fetchMore({
    variables: {
      skip: allTransactions?.value.length,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult
      loadingMore.value = false
      return {
        ...previousResult,
        allTransactions: [
          ...previousResult.allTransactions,
          ...fetchMoreResult.allTransactions,
        ],
      }
    },
  })
}
</script>

<template>

    <div class="flex items-center">
        <h2 class="my-6 text-2xl pr-1 font-semibold text-gray-200">
            {{ t('statistics') }}
        </h2>

        <Listbox v-model="selectedClock">
            <div class="relative">
            
                <ListboxButton class="relative cursor-default rounded-lg bg-primary py-2 w-24 pl-3 pr-10 text-left shadow-md sm:text-sm">
                    <span class="block truncate">{{ t(selectedClock.name) }}</span>
                    
                    <span class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
                        <SelectorIcon class="h-5 w-5 text-gray-900" aria-hidden="true" />
                    </span>

                </ListboxButton>

                <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <ListboxOptions class="absolute mt-1 max-h-60 w-28 overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                    <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="clock in clocks"
                        :key="clock.hours"
                        :value="clock"
                        as="template"
                    >
                        <li :class="[ active ? 'bg-gray-700 text-gray-300' : 'text-gray-400', 'relative cursor-pointer select-none py-2 pl-10' ]">
                            <span :class="[ selected ? 'font-medium' : 'font-normal', 'block truncate' ]">
                                {{ t(clock.name) }}
                            </span>
                            <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                            </span>
                        </li>
                    </ListboxOption>
                    </ListboxOptions>
                </transition>

            </div>
        </Listbox>

    </div>

    <TheTokenSwitch />

    <TheStatisticPlan :selected-clock="selectedClock?.hours" />

    <div v-if="loading" class="flex justify-center items-center">
        <Loading class="h-8 w-8 border-primary" />
    </div>

    <div v-else-if="!allTransactions?.length" class="flex justify-center items-center text-white">{{ t('transactions-not-found') }}</div>

    <template v-else>

        <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">

            <!-- Card -->
            <div class="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                <div class="p-3 mr-4 rounded-full bg-purple-500">
                    <CursorClickIcon class="h-6 w-6 text-white" />
                </div>
                <div>
                    <p class="flex items-center mb-2 text-sm font-medium whitespace-nowrap text-gray-400">
                        {{ t('visits') }}
                    </p>

                    <span class="text-lg ml-1 font-semibold text-gray-200">{{ selectedClock.hours == 10_000 ? visitCount + 7450 + visitCount : visitCount }}</span>
                </div>
            </div>

            <!-- Card -->
            <div v-if="false" class="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                <div class="p-3 mr-4 rounded-full bg-green-500">
                    <RefreshIcon class="h-6 w-6 text-white" />
                </div>
                <div>
                    <p class="flex items-center mb-2 text-sm font-medium whitespace-nowrap text-gray-400">
                        {{ t('recharged') }}
                    </p>

                    <span class="text-lg ml-1 font-semibold text-gray-200">0</span>
                </div>
            </div>

            <!-- Card -->
            <div class="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                <div class="p-3 mr-4 rounded-full bg-yellow-500">
                    <CashIcon class="h-6 w-6 text-white" />
                </div>
                <div>
                    <p class="flex items-center mb-2 text-sm font-medium whitespace-nowrap text-gray-400">
                        {{ t('replenishment') }}
                    </p>

                    <span class="text-lg ml-1 font-semibold text-gray-200">{{ replenishmentCount?.count }} ({{ useAbbreviate(replenishmentCount?.sum?.toFixed(2)) }})</span>
                </div>
            </div>

            <!-- Card -->
            <div class="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                <div class="p-3 mr-4 rounded-full bg-orange-500">
                    <ChevronDoubleDownIcon class="h-6 w-6 text-white" />
                </div>
                <div>
                    <p class="flex items-center mb-2 text-sm font-medium whitespace-nowrap text-gray-400">
                        {{ t('withdrawals') }}
                    </p>

                    <span class="text-lg ml-1 font-semibold text-gray-200">{{ withdrawalsCount?.count }} ({{ useAbbreviate(withdrawalsCount?.sum?.toFixed(2)) }})</span>
                </div>
            </div>

            <div v-if="false" class="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
                <div class="p-3 mr-4 rounded-full bg-emerald-500">
                    <CakeIcon class="h-6 w-6 text-white" />
                </div>

                <div>
                    <p class="flex items-center mb-2 text-sm font-medium whitespace-nowrap text-gray-400">
                        {{ t('first-replenishment') }}
                    </p>

                    <span class="text-lg ml-1 font-semibold text-gray-200">0</span>
                </div>
            </div>

        </div>

        <div class="w-full pb-10 overflow-hidden rounded-lg shadow-xs">
            <div class="w-full overflow-x-auto">
            <table class="w-full whitespace-no-wrap">
                <thead>
                    <tr class="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                        <th class="px-3 py-3">{{ t('client') }}</th>
                        <th class="px-3 py-3">{{ t('amount') }}</th>
                        <th class="px-3 py-3">{{ t('token') }}</th>
                        <th class="px-3 py-3">{{ t('plan') }}</th>
                        <th class="px-3 py-3">{{ t('date') }}</th>
                    </tr>
                </thead>

                <tbody class="divide-y divide-gray-700 bg-gray-800">

                    <tr v-for="transaction in allTransactions" :key="transaction?.id" class="text-gray-400">

                        <td class="px-4 py-3">
                            <div class="flex items-center text-sm">
                                <!-- Avatar with inset shadow -->
                                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                                    <img :src="`https://avatars.dicebear.com/api/avataaars/${ transaction?.author?.address }.svg`" class="object-cover w-full h-full rounded-full" alt="" loading="lazy">
                                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                                </div>
                                <div>
                                    <RouterLink :to="{ name: 'Invite', params: { address: transaction?.author?.address } }"  class="font-semibold hover:underline">{{ transaction?.author?.address }}</RouterLink>
                                </div>
                            </div>
                        </td>

                        <td class="px-3 py-3 text-sm">
                            <span :class="[ transaction?.status ? 'bg-green-500' : 'bg-red-500' ]" class="text-white rounded py-0.5 px-1">
                                {{ transaction?.status ? '+' : '-' }}{{ transaction?.amount.toFixed(3) }}
                            </span>
                        </td>

                        <td class="px-3 py-3 text-sm">
                            {{ useCoin(transaction.token) }}
                        </td>

                        <td class="px-3 py-3 text-sm">
                            {{ transaction.plan }}
                        </td>

                        <td class="px-4 py-3 text-sm whitespace-nowrap">
                            {{ useMoment(transaction?.createdAt) }}
                        </td>
                    </tr>

                </tbody>
            </table>

            </div>

            <div class="flex justify-center items-center px-4 py-3 text-xs font-semibold tracking-wide uppercase border-t  text-gray-400 bg-gray-800">
                <!-- Pagination -->
                <button v-if="allTransactions?.length > 0" @click="loadMore()" class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple">
                    <Loading v-if="loadingMore" class="h-5 w-5 border-primary" />
                    <ChevronDownIcon v-else class="h-5 w-5" />
                </button>
            </div>

        </div>

    </template>

</template>

<route lang="yaml">
name: Statistics
</route>