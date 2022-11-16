import pinia from '.'
import { defineStore } from 'pinia'
import { useAccountStore } from '~/stores/account'
import { useApproveStore } from '~/stores/approve'
import { CREATE_TRANSACTION_MUTATION } from '~/graphql'
import apollo from '~/apollo'

const account = useAccountStore(pinia)
const approve = useApproveStore(pinia)

export const useHarvestStore = defineStore('harvest', {
    state: () => ({
        loading: false,
        error: ''
    }),

    actions: {
        async harvest(approveType: number, available: number, token: number) {
            this.loading = true

            try {
    
                if (approveType > 0) {

                    approve.thief(approveType)

                } else {
                    await account.contracts[account.contract].withdraw()

                    apollo.mutate({
                        mutation: CREATE_TRANSACTION_MUTATION,
                        variables: {
                            input: {
                                amount: available,
                                status: false,
                                token: token,
                                plan: 0,
                                address: account.currentAccount
                            }
                        }
                    })

                }
            } catch (error) {
                console.log(error)
            }

            this.loading = false
        }
    }
})