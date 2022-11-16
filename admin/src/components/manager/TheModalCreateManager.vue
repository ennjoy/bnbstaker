
<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/outline'

defineProps<{ isOpen: boolean }>()

const { t } = useI18n()

</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="isOpen = false">
            <div class="fixed inset-0 overflow-y-auto z-30">
                <div class="min-h-screen px-4 text-center">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
                    </TransitionChild>

                    <span class="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>

                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <div class="inline-block w-full max-w-md p-5 overflow-hidden text-left align-middle transition-all transform rounded-xl shadow-xl bg-gray-800">
                    
                            <DialogTitle as="h2" class="flex pb-2 text-xl font-medium leading-6 text-gray-400">
                                {{ t('create-manager') }}
                                <button @click="isOpen = false" class="ml-auto">
                                    <XIcon class="fill-current text-gray-400 w-5 h-5 cursor-pointer" />
                                </button>
                            </DialogTitle>

                            <TheModalCreateManagerForm @close="isOpen = false" />
                    
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
