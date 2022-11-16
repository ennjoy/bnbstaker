import WalletConnectProvider from '@walletconnect/web3-provider/dist/umd/index.min.js'

export const provider = new WalletConnectProvider({
    rpc: {
        56: 'https://bsc-dataseed1.binance.org',
    },
    chainId: 56,
    qrcode: true
})
