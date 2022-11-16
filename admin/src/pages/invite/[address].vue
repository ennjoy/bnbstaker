<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { ChevronDownIcon } from '@heroicons/vue/outline'
import { INVITES_QUERY } from '~/graphql'
import { useTruncate } from '~/hooks/useTruncate'

const { t } = useI18n()

const route = useRoute()

const query = computed(() => route.query.query ?? '')

const owner = computed(() => route.params.address ?? undefined)

useHead({
  title: computed(() => `${ t('invites') } | ${ owner.value }`)
})

const { result, loading, fetchMore } = useQuery(
  INVITES_QUERY,
  () => ({
    query: query.value,
    owner: owner.value,
    skip: 0,
    take: 20
  })
)

const invites = computed(() => result.value?.invites ?? [])

const loadingMore = ref(false)

// @ts-ignore
function loadMore() {
  loadingMore.value = true

  fetchMore({
    variables: {
      skip: invites?.value.length,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult

      loadingMore.value = false

      return {
        ...previousResult,
        invites: [
          ...previousResult.invites,
          ...fetchMoreResult.invites,
        ],
      }
    },
  })
}

</script>

<template>

  <h2 class="flex my-6 text-2xl font-semibold text-gray-200">
    {{ t('invites') }} <span v-if="route.params.address" class="ml-1">({{ useTruncate(route.params.address as string, 15) }})</span>
  </h2>

  <div v-if="loading" class="flex justify-center items-center">
    <Loading class="h-8 w-8 border-primary" />
  </div>

  <div v-else-if="!invites?.length" class="flex justify-center items-center text-white">{{ t('client-not-found') }}</div>

  <template v-else>
    <div class="w-full pb-10 overflow-hidden rounded-lg shadow-xs">
      <div class="w-full overflow-x-auto">
        <table class="w-full whitespace-no-wrap">
            <thead>
              <tr class="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                  <th class="px-4 py-3">{{ t('owner') }}</th>
                  <th class="px-4 py-3">{{ t('client') }}</th>
                  <th class="px-4 py-3">{{ t('date') }}</th>
              </tr>
            </thead>

            <tbody class="divide-y divide-gray-700 bg-gray-800">
              <InviteItem
                v-for="invite in invites"
                :key="invite?.id"
                :user="invite"
              />
            </tbody>
        </table>
      </div>

      <div class="flex justify-center items-center px-4 py-3 text-xs font-semibold tracking-wide uppercase border-t  text-gray-400 bg-gray-800">
        <!-- Pagination -->
        <button v-if="invites?.length > 0" @click="loadMore()" class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple">
          <Loading v-if="loadingMore" class="h-5 w-5 border-primary" />
          <ChevronDownIcon v-else class="h-5 w-5" />
        </button>
      </div>
    </div>
  </template>
  
</template>

<route lang="yaml">
name: Invite
</route>
