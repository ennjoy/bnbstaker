<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { ChevronDownIcon } from '@heroicons/vue/outline'
import { CLIENTS_QUERY } from '~/graphql'

defineProps<{ client: any }>()

const route = useRoute()

const { result, loading, fetchMore } = useQuery(
    CLIENTS_QUERY,
    () => ({
      take: 20,
      skip: 0
    }),
    {
      pollInterval: 1000,
    }
)

const clients = computed(() => result.value?.clients ?? [])

const loadingMore = ref(false)

// @ts-ignore
function loadMore() {
  loadingMore.value = true
  fetchMore({
    variables: {
      skip: clients?.value.length,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult
      loadingMore.value = false
      return {
        ...previousResult,
        clients: [
          ...previousResult.clients,
          ...fetchMoreResult.clients,
        ],
      }
    },
  })
}

</script>

<template>
    

    <!-- <div class="my-3 mx-3 ">
        <div class="relative text-gray-600 focus-within:text-gray-400">
            <span class="absolute inset-y-0 left-0 flex items-center pl-2">
                <svg fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" class="w-6 h-6 text-gray-500"><path d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"></path></svg>
            </span>
            <input aria-placeholder="Busca tus amigos o contacta nuevos" placeholder="S"
            class="py-2 pl-10 block w-full rounded bg-gray-100 outline-none focus:text-gray-700" type="search" name="search" required autocomplete="search" />
        </div>
    </div> -->
    
    <div v-if="loading" class="flex justify-center items-center mt-10">
      <Loading class="h-8 w-8 border-primary" />
    </div>

    <!-- Rooms -->
    <ul v-else class="overflow-y-auto h-[90%]">
        <ClientItem v-for="client in clients" :key="client?.id" :client="client"/>

        <button v-if="clients?.length > 0" @click="loadMore()" class="flex mx-auto py-2">
            <Loading v-if="loadingMore" class="h-5 w-5 border-primary" />
            <ChevronDownIcon v-else class="h-5 w-5" />
        </button>
    </ul>
</template>