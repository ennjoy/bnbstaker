<script lang="ts" setup>
import { useAccountStore } from '~/stores/account'
import { useTruncate } from '~/hooks/useTruncate'

const { t } = useI18n()

const account = useAccountStore()

</script>

<template>
    <button @click="account.currentAccount ? account.disconnectWallet() : account.connectWallet()" :class="[ account.currentAccount ? 'connected-btn': 'base-btn' ]" class="v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" type="button">
        <span class="v-btn__content">
            <Loading v-if="account.loading" class="h-5 w-5 border-gray-900" />
            <span v-else-if="account.currentAccount" class="d-flex flex-row align-center">{{ useTruncate(account.currentAccount, 10) }}</span>
            <span v-else class="d-flex flex-row align-center">{{ t('connect') }}</span>
        </span>
    </button>
</template>