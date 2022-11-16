<script lang="ts" setup>
import { ethers } from 'ethers'
import { useAccountStore } from '~/stores/account'

const account = useAccountStore()

const user = reactive({
    loading: false,
    error: false,
    checkpoint: 0,
    balance: 0,
    totalDeposits: 0,
    totalWithdrawn: 0,
    available: 0,
    deposits: [] as any,
    referralTotalBonus: 0,
    levels: [0, 0, 0, 0, 0]
})

watchEffect(() => {
	account.setContract('bnb')
})

useIntervalFn(() => {
    
    if (!account.currentAccount) return

    user.balance = parseFloat(account.balance)

    account.contracts.bnb.getUserCheckpoint(account.currentAccount)
        .then((result: any) => {
            user.checkpoint = parseInt(result) * 1000
        })

    account.contracts.bnb.getUserTotalDeposits(account.currentAccount)
        .then((result: any) => {
            user.totalDeposits = parseFloat(ethers.utils.formatEther(result))
        })

    account.contracts.bnb.getUserTotalWithdrawn(account.currentAccount)
        .then((result: any) => {
            user.totalWithdrawn = parseFloat(ethers.utils.formatEther(result))
        })
    
    account.contracts.bnb.getUserAvailable(account.currentAccount)
        .then((result: any) => {
            user.available = parseFloat(ethers.utils.formatEther(result))
        })

    account.contracts.bnb.getUserAmountOfDeposits(account.currentAccount)
        .then((depLength: any) => {
            for (var i = 0, completed = 0; i < parseInt(depLength); i++) {
                ((index) => {
                    account.contracts.bnb.getUserDepositInfo(account.currentAccount, index)
                        .then((result: any) => {

                            user.deposits[index] = result

                            completed++

                            if (completed >= i) {
                                // self.overlay.historyLoad = 0;
                            }
                        })
                })(i)
            }
        })
    
    account.contracts.bnb.getUserReferralTotalBonus(account.currentAccount)
        .then((result: any) => {
            const format = ethers.utils.formatEther(result)
            user.referralTotalBonus = parseFloat(format)
        })

    account.contracts.bnb.getUserDownlineCount(account.currentAccount)
        .then((result: any) => {
            user.levels[0] = parseFloat(result[0])
            user.levels[1] = parseFloat(result[1])
            user.levels[2] = parseFloat(result[2])
            user.levels[3] = parseFloat(result[3])
            user.levels[4] = parseFloat(result[4])
        }) 
})

</script>

<template>
    <Container :user="user" />
</template>

<route lang="yaml">
name: Dashboard
meta:
  layout: protocol
</route>
