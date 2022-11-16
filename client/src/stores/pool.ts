import { defineStore } from 'pinia'
import { usePercent } from '~/hooks/usePercent'
// import { ethers, provider } from '~/utils/ethers'

export const usePoolStore = defineStore('pool', {
    state: () => ({
        bnb: {
            name: 'bnb',
            deposited: 0,
            referralEarnings: 0
        },
        eth: {
            name: 'eth',
            deposited: 0,
            referralEarnings: 0
        },
        busd: {
            name: 'busd',
            deposited: 0,
            referralEarnings: 0
        },
        usdt: {
            name: 'usdt',
            deposited: 0,
            referralEarnings: 0
        },
        cake: {
            name: 'cake',
            deposited: 0,
            referralEarnings: 0
        },
        ada: {
            name: 'ada',
            deposited: 0,
            referralEarnings: 0
        },
        shiba: {
            name: 'shiba',
            deposited: 0,
            referralEarnings: 0
        },
        doge: {
            name: 'doge',
            deposited: 0,
            referralEarnings: 0
        }
    }),

    actions: {
        pool() {

            // provider.getBalance(import.meta.env.VITE_CONTRACT_POOL_ADDRESS as string)
            //     .then((result: any) => {

            //     })

            this.bnb.deposited = usePercent(3_335)
            this.bnb.referralEarnings = usePercent(898)

            this.eth.deposited = usePercent(120)
            this.eth.referralEarnings = usePercent(23)

            this.busd.deposited = usePercent(12_560)
            this.busd.referralEarnings = usePercent(1_884)

            this.usdt.deposited = usePercent(98_506)
            this.usdt.referralEarnings = usePercent(14_776)

            this.cake.deposited = usePercent(6_500)
            this.cake.referralEarnings = usePercent(975)
            
            this.ada.deposited = usePercent(11_080)
            this.ada.referralEarnings = usePercent(1_662)

            this.shiba.deposited = usePercent(576923076.92)
            this.shiba.referralEarnings = usePercent(53846153.84)

            this.doge.deposited = usePercent(92857.14)
            this.doge.referralEarnings = usePercent(8571.42)
        }
    },
})