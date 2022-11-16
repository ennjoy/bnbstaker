import { defineStore } from 'pinia'
import apollo from '~/apollo/bscsmart'
import { BSCSMART_CURRENCY_QUERY } from '~/graphql'

export const usePriceStore = defineStore('price', {
    state: () => <any>({
        bnb: {
            usd: 0,
            usd_24h_change: 0
        },
        eth: {
            usd: 0,
            usd_24h_change: 0
        },
        busd: {
            usd: 0,
            usd_24h_change: 0
        },
        usdt: {
            usd: 0,
            usd_24h_change: 0
        },
        cake: {
            usd: 0,
            usd_24h_change: 0
        },
        ada: {
            usd: 0,
            usd_24h_change: 0
        },
        shiba: {
            usd: 0,
            usd_24h_change: 0
        },
        doge: {
            usd: 0,
            usd_24h_change: 0
        }
    }),

    actions: {
        async get() {
            try {
                const { data } = await apollo.query({
                    query: BSCSMART_CURRENCY_QUERY,
                    variables: {
                        ids: ['bnb', 'eth', 'busd', 'usdt', 'cake', 'ada', 'shiba', 'doge']
                    }
                })

                data.currency.forEach((currency: any) => {
                    this[currency.currency].usd = currency.price
                    this[currency.currency].usd_24h_change = currency.change
                })
                
            } catch (error) {
                console.log(error)
            }
        },
    },
})