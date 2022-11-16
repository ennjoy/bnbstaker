<script lang="ts" setup>
import { RefreshIcon } from '@heroicons/vue/outline'

defineProps<{
    id: string
}>()

const [isOpen, open] = useToggle()

</script>

<template>

    <button @click="open()" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray" aria-label="Information">
        <RefreshIcon class="w-5 h-5" />
    </button>
    
    <TheModalChangeCompany v-if="isOpen" :is-open="isOpen" :id="id" @close="isOpen = false" />

</template>