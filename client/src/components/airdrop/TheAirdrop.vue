<script lang="ts" setup>
import { useToast } from 'vue-toastification'
import { useAccountStore } from '~/stores/account'
import { useDivide }  from '~/hooks/useDivide'

const { t } = useI18n()

const account = useAccountStore()

const toast = useToast()

function connect() {
    toast.info(t('connect-wallet'))

    return account.connectWallet()
}

</script>

<template>
    <div class="z-50 bg-[#2c3138] sm:w-11/12 relative ma-1 v-card v-sheet theme--light overflow-hidden">
        
        <div class="flex flex-row justify-center sm:justify-between mx-4  my-7">
            <div class="flex uppercase text-white items-center text-base">
                {{ t('click-to-open-the-blind') }} USDT
            </div>

            <button v-if="!account.currentAccount" @click="connect()" class="base-btn pane-btn v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default" type="button">
                <span class="v-btn__content">{{ t('receive') }}</span>
            </button>

            <TheAirdropButton v-else :address="account.currentAccount.toLowerCase()" />

        </div>

    </div>

</template>
