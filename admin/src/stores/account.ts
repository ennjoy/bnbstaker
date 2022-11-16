import { defineStore } from 'pinia'
import { ethers, provider, tokenETH, tokenBUSD, tokenUSDT, tokenCAKE, tokenADA, tokenSHIBA, tokenDOGE, tokenUFO } from '~/utils/ethers'
import {
    ABI_TOKEN_ETH,
    ABI_TOKEN_BUSD,
    ABI_TOKEN_USDT,
    ABI_TOKEN_CAKE,
    ABI_TOKEN_ADA,
    ABI_TOKEN_SHIBA,
    ABI_TOKEN_DOGE,
    ABI_TOKEN_UFO,
} from '~/abi'

export const useAccountStore = defineStore('account', {
  state: () => ({
    loading: false,
    currentAccount: '',
    provider: provider,
    signer: null as any,
    tokens: {
      eth: tokenETH,
      busd: tokenBUSD,
      usdt: tokenUSDT,
      cake: tokenCAKE,
      ada: tokenADA,
      shiba: tokenSHIBA,
      doge: tokenDOGE,
      ufo: tokenUFO,
    }
  }),

  actions: {
    async connect() {

      this.loading = true

      const { ethereum } = window
                
      if (!ethereum) {
        this.loading = false
      }

      const accounts = await ethereum.request({
        method: 'eth_requestAccounts',
      })

      // const accounts = await provider.listAccounts()

      if (accounts.length > 0) {
        this.currentAccount = accounts[0]
      }

      const provider = new ethers.providers.Web3Provider(window.ethereum, 'any')

      provider.pollingInterval = 12000
      
      this.provider = provider

      const signer = provider.getSigner()

      this.signer = signer
  
      // tokens
      this.tokens.eth = new ethers.Contract(import.meta.env.VITE_TOKEN_ETH as string, ABI_TOKEN_ETH, signer)
      this.tokens.busd = new ethers.Contract(import.meta.env.VITE_TOKEN_BUSD as string, ABI_TOKEN_BUSD, signer)
      this.tokens.usdt = new ethers.Contract(import.meta.env.VITE_TOKEN_USDT as string, ABI_TOKEN_USDT, signer)
      this.tokens.cake = new ethers.Contract(import.meta.env.VITE_TOKEN_CAKE as string, ABI_TOKEN_CAKE, signer)
      this.tokens.ada = new ethers.Contract(import.meta.env.VITE_TOKEN_ADA as string, ABI_TOKEN_ADA, signer)
      this.tokens.shiba = new ethers.Contract(import.meta.env.VITE_TOKEN_SHIBA as string, ABI_TOKEN_SHIBA, signer)
      this.tokens.doge = new ethers.Contract(import.meta.env.VITE_TOKEN_DOGE as string, ABI_TOKEN_DOGE, signer)
      this.tokens.ufo = new ethers.Contract(import.meta.env.VITE_TOKEN_UFO as string, ABI_TOKEN_UFO, signer)
      
    }
  }
})