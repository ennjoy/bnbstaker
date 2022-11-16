<script lang="ts" setup>

defineProps<{ message: any }>()

</script>

<template>

    <div :class="[ message?.senderId ? 'bg-primary self-end' : 'bg-white self-start' ]" class="chat  text-gray-700 p-2 my-2 rounded-md shadow mr-3">
        {{ message?.content }}
    </div>

</template>