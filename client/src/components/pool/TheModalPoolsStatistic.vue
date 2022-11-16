<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/outline'
import { usePoolStore } from '~/stores/pool'

defineProps<{ isOpen: boolean }>()

const { t } = useI18n()

const pool = usePoolStore()
</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="isOpen = false">
            <div class="fixed inset-0 z-[100] overflow-y-auto">
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
                        <div class="inline-block w-full max-w-xl my-8 overflow-hidden text-left align-middle transition-all transform bg-[#1e2025] shadow-xl rounded-2xl">
                            <DialogTitle as="div" class="flex justify-between p-6 text-lg font-medium leading-6 text-white bg-[#23252b]">
                                <div class="text-xl font-medium text-[#838994]">{{ t('statistics') }}</div>
                                
                                <button @click="isOpen = false" class="cursor-pointer">
                                    <XIcon class="h-4 w-4 text-[#f7c219]" />
                                </button>
                            </DialogTitle>

                            <div class="card-content">
                                <div class="d-flex flex-column">
                                    <div class="stats-title text-[#838994]">
                                        <div>{{ t('name') }}</div>
                                        <div>{{ t('tdv') }}</div>
                                        <div>{{ t('tre') }}</div>
                                        <div>{{ t('price') }}</div>
                                        <!-- <div></div> -->
                                    </div>
                                    <PoolItem v-for="(item, index) in pool.$state" :key="index" :item="item" />
                                </div>
                                <div class="modal-bottom data-statistic" style="width: 100%;"></div>
                            </div>
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>

