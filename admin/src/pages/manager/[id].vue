<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { ChevronDownIcon } from '@heroicons/vue/outline'
import { ADMINS_QUERY } from '~/graphql'

const { t } = useI18n()

const route = useRoute()

const query = computed(() => route.query.query ?? '')

const owner = computed(() => route.params.id ?? undefined)

useHead({
  title: computed(() => `${ t('managers') } | ${ owner.value }`)
})

const { result, loading, fetchMore } = useQuery(
  ADMINS_QUERY,
  () => ({
    query: query.value,
    owner: owner.value,
    skip: 0,
    take: 20
  })
)

const me = computed(() => result.value?.me ?? [])

const admins = computed(() => result.value?.admins ?? [])

const loadingMore = ref(false)

// @ts-ignore
function loadMore() {
  loadingMore.value = true
  fetchMore({
    variables: {
      skip: admins?.value.length,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult
      loadingMore.value = false
      return {
        ...previousResult,
        admins: [
          ...previousResult.admins,
          ...fetchMoreResult.admins,
        ],
      }
    },
  })
}

</script>

<template>

  <h2 class="my-6 text-2xl font-semibold text-gray-200">
    {{ t('managers') }}
  </h2>

  <div v-if="loading" class="flex justify-center items-center">
    <Loading class="h-8 w-8 border-primary" />
  </div>

  <template v-else>
    <div class="w-full pb-10 overflow-hidden rounded-lg shadow-xs">
        <div class="w-full overflow-x-auto">
          <table class="w-full whitespace-no-wrap">
              <thead>
                <tr class="text-xs font-semibold tracking-wide text-left uppercase border-b border-gray-700 text-gray-400 bg-gray-800">
                    <th class="px-3 py-3 whitespace-nowrap">{{ t('address') }}</th>
                    <th class="px-4 py-3">{{ t('username') }}</th>
                    <th class="px-4 py-3">{{ t('invites') }}</th>
                    <th class="px-4 py-3">{{ t('role') }}</th>
                </tr>
              </thead>

              <tbody class="divide-y divide-gray-700 bg-gray-800">
                  <AdminItem
                    v-for="admin in admins"
                    :key="admin?.id" 
                    :admin="admin"
                    :root="me?.role == 'ROOT'"
                  />
              </tbody>
          </table>

        </div>

        <div class="flex justify-center items-center px-4 py-3 text-xs font-semibold tracking-wide uppercase border-t  text-gray-400 bg-gray-800">
            <!-- Pagination -->
            <button v-if="admins?.length > 0" @click="loadMore()" class="px-3 py-1 rounded-md rounded-r-lg focus:outline-none focus:shadow-outline-purple">
                <Loading v-if="loadingMore" class="h-5 w-5 border-primary" />
                <ChevronDownIcon v-else class="h-5 w-5" />
            </button>
        </div>
    </div>
  </template>
</template>

<route lang="yaml">
name: Manager
</route>