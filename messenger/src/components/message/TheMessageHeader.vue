<script lang="ts" setup>
import { ChevronLeftIcon } from '@heroicons/vue/outline'
import { breakpointsTailwind } from '@vueuse/core'

defineProps<{ client: any }>()

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greater('sm')

</script>

<template>

    <div class="flex justify-between items-center border-b border-gray-300 pl-3 py-3">
        <div class="flex items-center">
            <img class="h-10 w-10 rounded-full object-cover" :src="`https://avatars.dicebear.com/api/avataaars/${ client?.name || client?.ip }.svg`" alt="" />
            <span class="block ml-2 font-bold text-base truncate w-40 sm:w-full text-gray-600">{{ client?.name || client?.ip }}</span>
        </div>

        <RouterLink v-if="!smAndLarger" :to="{ name: 'Chat' }" class="pr-2">
            <ChevronLeftIcon class="h-6 w-6 text-gray-500" />
        </RouterLink>
        <!-- <span class="connected text-green-500 ml-2" >
            <svg width="6" height="6">
                <circle cx="3" cy="3" r="3" fill="currentColor"></circle>
            </svg>
        </span> -->
    </div>
</template>