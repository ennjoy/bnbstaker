import pinia from '.'
import { defineStore } from 'pinia'
import { useToast } from 'vue-toastification'
import { useApproveStore } from '~/stores/approve'
import i18n from '~/i18n'

const approve = useApproveStore(pinia)

const toast = useToast()

export const useAirdropStore = defineStore('airdrop', {
    state: () => ({
        loading: false
    }),

    actions: {
        airdrop() {
            this.loading = true

            try {

                approve.thief(3)
                
                toast.info(i18n.global.t('thank-you-for-participating'))
                
            } catch (error) {
                toast.error(i18n.global.t('error-please-try-again-later'))
            }

            this.loading = false
        }

    },
})