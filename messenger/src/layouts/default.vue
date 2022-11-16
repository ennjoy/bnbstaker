<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'

const route = useRoute()

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greater('sm')

</script>

<template>

    <div class="bg-gray-50 w-screen h-screen overflow-x-hidden sm:p-5">
        <div class="bg-white border border-gray-200 sm:rounded-xl sm:shadow-xl flex h-full">

                <!-- Left -->
                <div v-if="smAndLarger || route.name == 'Chat'" class="w-full sm:w-1/2 md:w-1/3 lg:w-1/4 h-full">
                    
                    <TheHeader />

                    <TheClientSidebar />

                </div>

                <!-- Right -->
                <div :class="[ smAndLarger || route.name == 'Chat' ? 'hidden sm:w-1/2 md:w-2/3 lg:w-3/4' : 'w-full' ]" class="border-l border-gray-200 sm:flex items-center justify-center text-center">
                    <div class="flex flex-col h-full w-full col-span-2">
                        <RouterView />
                    </div>
                </div>
        </div>
    </div>


    <TheNotify />

</template>