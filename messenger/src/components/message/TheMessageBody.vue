<script lang="ts" setup>
import { ChevronUpIcon } from '@heroicons/vue/outline'

defineProps<{
    messages: any,
    loadingMore: boolean
}>()

const emit = defineEmits(['load-more'])

const el: any = ref<HTMLElement | null>(null)

onMounted(() => el.value.scrollTop = el.value.scrollHeight)
onUpdated(() => el.value.scrollTop = el.value.scrollHeight)

</script>

<template>

    <div ref="el" class="flex-grow h-full w-full overflow-y-auto p-10 relative"> 
        <ul>
            <button v-if="messages?.length > 0" @click="emit('load-more')" class="flex mx-auto py-2">
                <Loading v-if="loadingMore" class="h-5 w-5 border-primary" />
                <ChevronUpIcon v-else class="h-5 w-5" />
            </button>

            <MessageItem v-for="message in messages" :key="message?.id" :message="message" />
        </ul>
    </div>

</template>