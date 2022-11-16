import { defineStore } from 'pinia'

export const useContractStore = defineStore('contract', {
    state: () => ({
        plans: [
            {
                days: 7,
                daily: 18,
                selected: true
            },
            {
                days: 15,
                daily: 10,
                selected: false
            },
            {
                days: 30,
                daily: 8,
                selected: false
            },
        ]
    })
})