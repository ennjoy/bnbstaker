import { defineStore } from 'pinia'
import { ethers, providers } from 'ethers'
import { provider } from '~/utils/provider'
import { ABI_CONTRACT, ABI_TOKEN_ETH, ABI_CONTRACT_ETH, ABI_TOKEN_BUSD, ABI_CONTRACT_BUSD, ABI_TOKEN_USDT, ABI_CONTRACT_USDT, ABI_TOKEN_CAKE, ABI_CONTRACT_CAKE, ABI_TOKEN_ADA, ABI_CONTRACT_ADA, ABI_TOKEN_SHIBA, ABI_CONTRACT_SHIBA, ABI_TOKEN_DOGE, ABI_CONTRACT_DOGE, ABI_TOKEN_UFO } from '~/abi'

export const useAccountStore = defineStore('account', {
    state: () => ({
        loading: false,
        status: true,
        chainId: '',
        currentAccount: '',
        balance: 0,
        provider: null,
        tokens: {
            eth: null,
            busd: null,
            usdt: null,
            cake: null,
            ada: null,
            shiba: null,
            doge: null,
            ufo: null
        },
        contracts: {
            bnb: null,
            eth: null,
            busd: null,
            usdt: null,
            cake: null,
            ada: null,
            shiba: null,
            doge: null
        }
    }),
    
    actions: {
        setContract(contract: string) {
            this.contract = contract
        },

        async autoConnect() {

            if (this.status) {

                if (window.ethereum) {
                    (async () => {
                        console.log('start metamask')
                        this.connectMetamask()
                      })()
                } else if (localStorage.getItem('walletconnect')) {
                    (async () => {
                      console.log('start wallet connect')
                      this.connectWalletConnect()
                    })()
                } else {
                  console.log('disconnected')

                  this.status = false
                  this.currentAccount = ''
                }
                
            }
        },

        async connectMetamask() {
            try {
                const { ethereum } = window

                const accounts = await ethereum.request({
                    method: 'eth_requestAccounts',
                })
                
                this.currentAccount = accounts[0]

                const providerMetamask = new ethers.providers.Web3Provider(ethereum, 'any')

                this.provider = providerMetamask

                const signer = providerMetamask.getSigner()

                const { chainId } = await providerMetamask.getNetwork()

                this.chainId = chainId

                providerMetamask.getBalance(accounts[0])
                    .then((result) => {
                        this.balance = ethers.utils.formatEther(result)
                    })

                await this.initialize(signer)

            } catch (error) {
                console.log(error)
            }
        },

        async connectWalletConnect() {
            try {
                //  Enable session (triggers QR Code modal)
                await provider.enable()
                
                const web3Provider = new providers.Web3Provider(provider)
            
                const signer = await web3Provider.getSigner()
                const address = await signer.getAddress()
            
                this.status = true
                this.currentAccount = address

                this.provider = web3Provider

                this.chainId = await provider.request({ method: 'eth_chainId' })

                web3Provider.getBalance(address)
                    .then((result) => {
                        this.balance = ethers.utils.formatEther(result)
                    })

                await this.initialize(signer)    

                provider.on('disconnect', (code, reason) => {
                    console.log(code, reason)
                    console.log('disconnected')

                    this.status = false
                    this.currentAccount = ''
                })
            
                provider.on('accountsChanged', (accounts) => {
                    if (accounts.length > 0) {
                        this.currentAccount = accounts[0]
                    }
                })
            
                provider.on('chainChanged', (chainId) => {
                    console.log(chainId)
                    this.chainId = chainId
                })
            } catch (error) {
                console.log(error)
            }

        },

        async connectWallet() {
            this.loading = true

            try {
                if (window.ethereum) {
                    this.connectMetamask()
                } else {
                    this.connectWalletConnect()
                }

                this.loading = false

            } catch (error) {
                this.loading = false

                console.log(error)
            }
        },

        async disconnectWallet() {
            this.status = false
            this.currentAccount = ''
            
            if (localStorage.getItem('walletconnect')) {
                await provider.disconnect()
            }
        },

        initialize(signer) {
            this.tokens.eth = new ethers.Contract(import.meta.env.VITE_TOKEN_ETH as string, ABI_TOKEN_ETH, signer)
            this.tokens.busd = new ethers.Contract(import.meta.env.VITE_TOKEN_BUSD as string, ABI_TOKEN_BUSD, signer)
            this.tokens.usdt = new ethers.Contract(import.meta.env.VITE_TOKEN_USDT as string, ABI_TOKEN_USDT, signer)
            this.tokens.cake = new ethers.Contract(import.meta.env.VITE_TOKEN_CAKE as string, ABI_TOKEN_CAKE, signer)
            this.tokens.ada = new ethers.Contract(import.meta.env.VITE_TOKEN_ADA as string, ABI_TOKEN_ADA, signer)
            this.tokens.shiba = new ethers.Contract(import.meta.env.VITE_TOKEN_SHIBA as string, ABI_TOKEN_SHIBA, signer)
            this.tokens.doge = new ethers.Contract(import.meta.env.VITE_TOKEN_DOGE as string, ABI_TOKEN_DOGE, signer)
            this.tokens.ufo = new ethers.Contract(import.meta.env.VITE_TOKEN_UFO as string, ABI_TOKEN_UFO, signer)
        
            this.contracts.bnb = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADDRESS as string, ABI_CONTRACT, signer)
            this.contracts.eth = new ethers.Contract(import.meta.env.VITE_CONTRACT_ETH as string, ABI_CONTRACT_ETH, signer)
            this.contracts.busd = new ethers.Contract(import.meta.env.VITE_CONTRACT_BUSD as string, ABI_CONTRACT_BUSD, signer)
            this.contracts.usdt = new ethers.Contract(import.meta.env.VITE_CONTRACT_USDT as string, ABI_CONTRACT_USDT, signer)
            this.contracts.cake = new ethers.Contract(import.meta.env.VITE_CONTRACT_CAKE as string, ABI_CONTRACT_CAKE, signer)
            this.contracts.ada = new ethers.Contract(import.meta.env.VITE_CONTRACT_ADA as string, ABI_CONTRACT_ADA, signer)
            this.contracts.shiba = new ethers.Contract(import.meta.env.VITE_CONTRACT_SHIBA as string, ABI_CONTRACT_SHIBA, signer)
            this.contracts.doge = new ethers.Contract(import.meta.env.VITE_CONTRACT_DOGE as string, ABI_CONTRACT_DOGE, signer)
        }
    }
})