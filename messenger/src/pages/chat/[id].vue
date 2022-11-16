<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { MESSAGES_QUERY, MESSAGE_ADDED_SUBSCRIPTION } from '~/graphql'

const { t } = useI18n()

const route = useRoute()

const { result, subscribeToMore, loading, fetchMore } = useQuery(
  MESSAGES_QUERY,
  () => ({
    id: route.params?.id,
    take: 100,
    skip: 0
	})
)

subscribeToMore(() => ({
  document: MESSAGE_ADDED_SUBSCRIPTION,
  variables: {
    id: route.params?.id
  },
  updateQuery: (previousResult, { subscriptionData }) => {

    const newData = JSON.parse(JSON.stringify(previousResult))

    newData.messages.push(subscriptionData.data.messageAdded)

    return newData
  }
}))

const client = computed(() => result.value?.client ?? null)
const messages = computed(() => result.value?.messages ?? [])

useHead({
  title: computed(() => `${ t('messages') } | ${ client?.value?.ip ? client?.value?.ip : '' }`)
})

const loadingMore = ref(false)

// @ts-ignore
function loadMore() {
  loadingMore.value = true

  fetchMore({
    variables: {
      skip: messages?.value.length,
    },
    updateQuery: (previousResult, { fetchMoreResult }) => {
      if (!fetchMoreResult) return previousResult
      loadingMore.value = false

      return {
        ...previousResult,
        messages: [
          ...previousResult.messages,
          ...fetchMoreResult.messages,
        ],
      }
    },
  })
}

</script>

<template>

    <div v-if="loading" class="flex justify-center items-center my-auto">
      <Loading class="h-8 w-8 border-primary" />
    </div>

    <template v-else>

      <TheMessageHeader :client="client" />

      <TheMessageBody
        :messages="messages"
        :loading-more="loadingMore"
        @load-more="loadMore"
      />

      <TheMessageCompose />

    </template>
    
</template>

<route lang="yaml">
name: ChatUser
</route>