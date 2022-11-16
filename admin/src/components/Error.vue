<script lang="ts" setup>
import { ExclamationCircleIcon } from '@heroicons/vue/outline'

defineProps<{
    title: string
    content: any
}>()

</script>

<template>
    <div class="flex gap-4 bg-red-100 p-4 rounded-xl">
        <div class="w-max">
            <div class="h-10 w-10 flex rounded-full bg-gradient-to-b from-red-100 to-red-300 text-red-700">
                <ExclamationCircleIcon class="h-5 w-5 m-auto" />
            </div>
        </div>
        <div class="space-y-1 text-sm">
        <h6 class="font-medium text-red-900">{{ title }}</h6>
            <p class="text-red-700 leading-tight">
                {{ content }}
            </p>
        </div>
    </div>
</template>
        