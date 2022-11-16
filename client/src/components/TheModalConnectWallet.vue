<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/outline'
import metamask from '~/assets/images/metamask.svg'
import trust from '~/assets/images/trust.svg'
import bsc from '~/assets/images/bsc.svg'
import walletconnect from '~/assets/images/walletconnect.svg'

defineProps<{ isOpen: boolean }>()

const { t } = useI18n()

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
            <DialogOverlay class="fixed inset-0" />
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
            <div class="web3-modal-card inline-block w-full max-w-md my-8 overflow-hidden text-left align-middle transition-all transform bg-[#1e2025] shadow-xl rounded-2xl">
                <DialogTitle as="div" class="flex justify-between p-6 text-lg font-medium leading-6 text-white bg-[#23252b]">
                    <div class="text-xl font-medium text-[#838994]">{{ t('connect-wallet') }}</div>
                    
                    <button @click="isOpen = false" class="cursor-pointer">
                        <XIcon class="h-4 w-4 text-[#f7c219]" />
                    </button>
                </DialogTitle>

                <div class="providers-content notranslate">
                  <div class="inner-content">
                      <div class="wallet-block">
                          <img :src="metamask" class="provider-icon" alt="">
                          <div class="text-[#838994]">MetaMask</div>
                        </div>
                    <div class="wallet-block">
                        <img :src="trust" class="provider-icon" alt="">
                        <div class="text-[#838994]">Trust</div>
                    </div>
                </div>
                
                <div class="inner-content">
                    <div class="wallet-block">
                        <img :src="bsc" class="provider-icon" alt="">
                        <div class="text-[#838994]">Binance Wallet</div>
                    </div>
                    <div class="wallet-block">
                        <img :src="walletconnect" class="provider-icon" alt="">
                        <div class="text-[#838994]">WalletConnect</div>
                    </div>
                </div>
                </div>

                <div class="modal-bottom wallet-intro">
                    <div class="intro-item-wrapper">
                        <div class="intro-item">
                            <span aria-hidden="true" class="v-icon notranslate theme--light" style="font-size: 14px; height: 14px; width: 14px;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg" style="font-size: 14px; height: 14px; width: 14px;">
                                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
                                </svg>
                            </span> How to use Metamask
                        </div>
                        <div class="intro-item">
                            <span aria-hidden="true" class="v-icon notranslate theme--light" style="font-size: 14px; height: 14px; width: 14px;">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" role="img" aria-hidden="true" class="v-icon__svg" style="font-size: 14px; height: 14px; width: 14px;">
                                <path d="M14,3V5H17.59L7.76,14.83L9.17,16.24L19,6.41V10H21V3M19,19H5V5H12V3H5C3.89,3 3,3.9 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V12H19V19Z"></path>
                                </svg>
                            </span> How to Add BSC to Metamask
                        </div>
                    </div>
                </div>

            </div>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

