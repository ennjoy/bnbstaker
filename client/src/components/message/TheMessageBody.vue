<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { MESSAGES_QUERY } from '~/graphql'

const { t } = useI18n()

const route = useRoute()

const { result, loading } = useQuery(
  MESSAGES_QUERY,
  () => ({
    id: route.params?.id
	}),
  {
    pollInterval: 1000,
  }
)

const messages = computed(() => result.value?.messages ?? [])

const el: any = ref<HTMLElement | null>(null)

onMounted(() => el.value.scrollTop = el.value.scrollHeight)
onUpdated(() => el.value.scrollTop = el.value.scrollHeight)
</script>

<template>

    <div ref="el" class="flex flex-col h-screen bg-gray-50 px-2 chat-services expand overflow-auto">

      <div v-if="loading" class="flex justify-center items-center my-auto">
        <Loading class="h-8 w-8 border-primary" />
      </div>

      <div v-else-if="messages.length == 0" class="text-gray-400 flex justify-center items-center">
        {{ t('if-you-have-problem') }}
      </div>

      <template v-else>
        <MessageItem v-for="message in messages" :key="message?.id" :message="message" />
      </template>
        
    </div>

</template>
