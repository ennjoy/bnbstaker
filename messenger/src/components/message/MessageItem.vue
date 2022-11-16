<script lang="ts" setup>
import { useMutation } from '@vue/apollo-composable'
import { TrashIcon } from '@heroicons/vue/outline'
import { useMoment } from '~/hooks/useMoment'
import { DELETE_MESSAGE_MUTATION } from '~/graphql'

defineProps<{
    message: any
}>()

const { mutate, loading }: any = useMutation(
    DELETE_MESSAGE_MUTATION,
    () => ({
        update: (cache, { data: { deleteMessage } }) => {
            cache.evict({ id: cache.identify({ __typename: 'Message', id: deleteMessage?.id }) })
        }
    })
)

</script>   

<template>
    <transition
        enter-active-class="transition duration-100 ease-out"
        enter-from-class="transform scale-95 opacity-0"
        enter-to-class="transform scale-100 opacity-100"
        leave-active-class="transition duration-75 ease-in"
        leave-from-class="transform scale-100 opacity-100"
        leave-to-class="transform scale-95 opacity-0"
    >
        <li class="clearfix2">
            <div :class="[ !message?.senderId ? 'justify-end' : 'justify-start' ]" class="w-full flex">

                <div :class="[ !message?.senderId ? 'text-white bg-blue-400' : 'text-gray-700 bg-gray-100' ]" class="rounded px-5 py-2 my-2 max-w-[300px] truncate relative">
                    <span class="block whitespace-normal w-52 sm:w-full">{{ message?.content }}</span>
                    <span class="block text-xs text-right">{{ useMoment(message?.createdAt) }}</span>
                </div>

                <button v-if="!message?.senderId" @click="mutate({ id: message?.id })" class="p-2 cursor-pointer">
                    <Loading v-if="loading" class="h-4 w-4 border-primary" />
                    <TrashIcon v-else class="flex text-gray-500 h-4 w-4" />
                </button>
                
            </div>
        </li>
    </transition>
    
</template>