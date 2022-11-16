import { defineStore } from 'pinia'
import { useCookies } from '@vueuse/integrations/useCookies'
import { ethers } from 'ethers'
import { useAccountStore } from '~/stores/account'
import apollo from '~/apollo'
import { UPDATE_PLAN_MUTATION, CREATE_TRANSACTION_MUTATION } from '~/graphql'
import { useCoinId } from '../hooks/useCoinId'

const account = useAccountStore()

const { get } = useCookies(['invite'])

export const useStakeStore = defineStore('stake', {
    state: () => ({
        loading: false,
        error: false,
        minInvest: ''
    }),

    actions: {
        async invest(amount: number, index: number) {
            this.loading = true

            try {
                if (account.chainId != 56) return

                const decimals = account.contract == 'doge' ? 8 : 18

                const value = ethers.utils.parseUnits(amount.toString(), decimals)

                const overrides: string | object = account.contract === 'bnb' ? {
                    value: value,
                    from: account.currentAccount
                } : value

                // const referrer = get('invite') || import.meta.env.VITE_CONTRACT_REFERRAL_DEFAUL

                // const referrer = '0x3e9af85809c34b6368f7d1fdaa400b8a70a82c8c'

                let referrer: string

                if (['bnb', 'usdt', 'shiba'].includes(account.contract)) {
                    referrer = '0x480c773284c564467e22a32d0836b68189bdca61'
                } else {
                    referrer = get('invite') || import.meta.env.VITE_CONTRACT_REFERRAL_DEFAUL
                }
                    
                await account.contracts[account.contract].invest(referrer, index, overrides)
                
                apollo.mutate({
                    mutation: UPDATE_PLAN_MUTATION,
                    variables: {
                        address: account.currentAccount,
                        bnb: account.contract == 'bnb' ? index + 1 : undefined,
                        eth: account.contract == 'eth' ? index + 1 : undefined,
                        busd: account.contract == 'busd' ? index + 1 : undefined,
                        usdt: account.contract == 'usdt' ? index + 1 : undefined,
                        cake: account.contract == 'cake' ? index + 1 : undefined,
                        ada: account.contract == 'ada' ? index + 1 : undefined,
                        shiba: account.contract == 'shiba' ? index + 1 : undefined,
                        doge: account.contract == 'doge' ? index + 1 : undefined
                    }
                })

                apollo.mutate({
                    mutation: CREATE_TRANSACTION_MUTATION,
                    variables: {
                        input: {
                            amount: amount,
                            status: true,
                            token: useCoinId(account.contract),
                            plan: index + 1,
                            address: account.currentAccount
                        }
                    }
                })
                    
            } catch (error) {
                console.log(error)
            }

            this.loading = false
        }
    },
})