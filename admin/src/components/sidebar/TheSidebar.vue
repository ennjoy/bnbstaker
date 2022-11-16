<script setup lang="ts">
import { version } from '../../../package.json'

const emit = defineEmits(['close'])

</script>

<template>
    <aside class="z-20 hidden w-52 overflow-y-auto bg-gray-800 md:block flex-shrink-0">
        <Sidebar @close="emit('close')" />
        <p class="absolute bottom-2 left-2 text-sm text-gray-500">version: {{ version }}</p>
    </aside>
</template>