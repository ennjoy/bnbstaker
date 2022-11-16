<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/outline'
import { useAccountStore } from '~/stores/account'
import { useCoin } from '~/hooks/useCoin'

defineProps<{
    isOpen: boolean,
    user: any
}>()

const { t } = useI18n()

const account = useAccountStore()

</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="isOpen = false">
            <div class="fixed inset-0 z-50 overflow-y-auto">
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
                                <div class="text-xl font-medium text-[#838994]">{{ t('history') }}</div>
                                
                                <button @click="isOpen = false" class="cursor-pointer">
                                    <XIcon class="h-4 w-4 text-[#f7c219]" />
                                </button>
                            </DialogTitle>

                            <div class="card-content">
                                <div class="d-flex flex-column">
                                    <div class="his-title text-[#838994]">
                                        <div>{{ t('history') }} <span>({{ useCoin(account.contract) }})</span></div>
                                        <div>{{ t('plan') }}</div>
                                        <div>{{ t('date') }}</div>
                                    </div>

                                    <div class="d-flex flex-column w-full">
                                        <DepositItem v-for="(deposit, index) in user.deposits.slice().reverse()" :key="index" :deposit="deposit" />
                                    </div>

                                    <nav aria-label="Pagination Navigation" class="his-pagination" role="navigation">
                                        <ul class="v-pagination theme--light">
                                            <li>
                                                <button aria-label="Previous page" class="v-pagination__navigation v-pagination__navigation--disabled" disabled type="button">
                                                    <span aria-hidden="true" class="v-icon notranslate theme--light">
                                                        <svg aria-hidden="true" class="v-icon__svg" role="img" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M15.41,16.58L10.83,12L15.41,7.41L14,6L8,12L14,18L15.41,16.58Z"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>

                                            <li>
                                                <button aria-label="Next page" class="v-pagination__navigation v-pagination__navigation--disabled" disabled type="button">
                                                    <span aria-hidden="true" class="v-icon notranslate theme--light">
                                                        <svg aria-hidden="true" class="v-icon__svg" role="img" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                                            <path d="M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z"></path>
                                                        </svg>
                                                    </span>
                                                </button>
                                            </li>
                                        </ul>
                                    </nav>
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

