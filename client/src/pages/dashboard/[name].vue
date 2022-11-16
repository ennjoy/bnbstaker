<script lang="ts" setup>
import { ethers } from 'ethers'
import { useAccountStore } from '~/stores/account'

const route = useRoute()

const account = useAccountStore()

const name = computed(() => route.params.name)

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
	account.setContract(name.value)
})

useIntervalFn(() => {
    
    if (!account.currentAccount) return
    
    account.contracts[name.value].getUserCheckpoint(account.currentAccount)
        .then((result: any) => {
            user.checkpoint = parseInt(result) * 1000
        })

    account.tokens[name.value].balanceOf(account.currentAccount)
        .then((result: any) => {
            user.balance = parseFloat(ethers.utils.formatEther(result))
        })
    
    account.contracts[name.value].getUserTotalDeposits(account.currentAccount)
        .then((result: any) => {
            user.totalDeposits = parseFloat(ethers.utils.formatEther(result))
        })

    account.contracts[name.value].getUserTotalWithdrawn(account.currentAccount)
        .then((result: any) => {
            user.totalWithdrawn = parseFloat(ethers.utils.formatEther(result))
        })
    
    account.contracts[name.value].getUserAvailable(account.currentAccount)
        .then((result: any) => {
            user.available = parseFloat(ethers.utils.formatEther(result))
        })

    account.contracts[name.value].getUserAmountOfDeposits(account.currentAccount)
        .then((depLength: any) => {
            for (var i = 0, completed = 0; i < parseInt(depLength); i++) {
                ((index) => {
                    account.contracts[name.value].getUserDepositInfo(account.currentAccount, index)
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
    
    account.contracts[name.value].getUserReferralTotalBonus(account.currentAccount)
        .then((result: any) => {
            user.referralTotalBonus = parseFloat(ethers.utils.formatEther(result))
        })

    account.contracts[name.value].getUserDownlineCount(account.currentAccount)
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
name: DashboardToken
meta:
  layout: protocol
</route>
