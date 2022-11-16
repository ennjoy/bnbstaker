<script lang="ts" setup>

defineProps<{ isOpen: boolean }>()

const emit = defineEmits(['close'])
</script>

<template>

    <div v-show="isOpen" class="fixed inset-0 z-10 flex items-end bg-black bg-opacity-50 sm:items-center sm:justify-center"></div>
  
    <Transition
      name="slide"
      enter-active-class="animated slideInLeft"
      leave-active-class="animated slideOutLeft"
    >
      <div v-show="isOpen" class="fixed inset-y-0 z-20 flex-shrink-0 w-64 mt-16 overflow-y-auto bg-gray-800 md:hidden">
        <Sidebar :is-open="isOpen" @close="emit('close')" />
      </div>
    </Transition>

</template>

<style>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.2s ease;
}
</style>  