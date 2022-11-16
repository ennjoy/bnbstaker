<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/outline'

defineProps<{ isOpen: boolean }>()

const { t } = useI18n()

</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="isOpen = false">
        <div class="fixed inset-0 z-40 overflow-y-auto">
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
                        <div class="text-xl font-medium text-[#838994]">{{ t('promo-materials') }}</div>
                        
                        <button @click="isOpen = false" class="cursor-pointer">
                            <XIcon class="h-4 w-4 text-[#f7c219]" />
                        </button>
                    </DialogTitle>

                    <div class="card-content">
                        <div class="promo-size-chip">
                            <div>
                                {{ t('select-size') }}:
                            </div>
                            <div class="notranslate v-item-group theme--light v-slide-group v-chip-group">
                                <div class="v-slide-group__prev v-slide-group__prev--disabled">
                                    
                                </div>
                                <div class="v-slide-group__wrapper">
                                    <div class="v-slide-group__content">
                                        <span class="v-chip v-slide-item--active v-chip--active v-chip--clickable v-chip--no-color theme--light v-size--default" tabindex="0">
                                            <span class="v-chip__content">{{ t('logo') }} 800x800</span>
                                        </span>
                                        <span class="bg-[#838994] v-chip v-chip--clickable v-chip--no-color theme--light v-size--default" tabindex="0">
                                            <span class="v-chip__content">300x250</span>
                                        </span>
                                        <span class="v-chip v-chip--clickable v-chip--no-color theme--light v-size--default" tabindex="0">
                                            <span class="v-chip__content">468x60</span>
                                        </span>
                                        <span class="v-chip v-chip--clickable v-chip--no-color theme--light v-size--default" tabindex="0">
                                            <span class="v-chip__content">728x90</span>
                                        </span>
                                        <span class="v-chip v-chip--clickable v-chip--no-color theme--light v-size--default" tabindex="0">
                                            <span class="v-chip__content">1140x90</span>
                                        </span>
                                    </div>
                                </div>
                                <div class="v-slide-group__next v-slide-group__next--disabled">
                                    
                                </div>
                            </div>
                        </div>

                        <hr aria-orientation="horizontal" class="v-divider theme--light" role="separator">

                        <div>
                            <button class="base-btn view-btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" type="button">
                                <span class="v-btn__content">{{ t('view') }}</span>
                            </button>
                            <button class="base-btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" type="button">
                                <span class="v-btn__content">{{ t('copy-code') }}</span>
                            </button>
                        </div>
                        <div>
                            <div class="v-input mx-2 mt-4 code-text-box notranslate v-textarea v-input--is-label-active v-input--is-dirty v-input--is-readonly theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed">
                                <div class="v-input__control">
                                    <div class="v-input__slot">
                                        <div class="v-text-field__slot">
                                            <textarea id="input-189" readonly rows="5"></textarea>
                                        </div>
                                    </div>
                                    <div class="v-text-field__details">
                                        <div class="v-messages theme--light">
                                            <div class="v-messages__wrapper"></div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="modal-bottom" style="text-align: center;"></div>
                    </div>


                </div>
            </TransitionChild>
            </div>
        </div>
        </Dialog>
    </TransitionRoot>
</template>

