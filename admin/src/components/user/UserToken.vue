<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { USER_TOKEN_QUERY } from '~/graphql'
import { ethers } from '~/utils/ethers'
import { useAbbreviate }  from '~/hooks/useAbbreviate'

const props = defineProps<{ address: string }>()

const { result, loading } = useQuery(
    USER_TOKEN_QUERY,
    () => ({
        path: `address/${ props.address }/balances_v2/?&key=ckey_e7422813cac0466186fb63e7f2e`
    }),
    {
        clientId: 'covalenthqClient',
        fetchPolicy: 'no-cache'
    }
)

const tokens = computed(() => result.value?.balance.data ?? [])

function tokenColor(symbol: string) {
    let token: any

    switch (symbol) {
        case 'BNB':
            token = 'bg-[#F0B90B]'
            break
        case 'ETH':
            token = 'bg-[#8C8C8C]'
            break
        case 'BUSD':
            token = 'bg-[#F0B90B]'
            break
        case 'USDT':
            token = 'bg-[#50AF96]'
            break
        case 'Cake':
            token = 'bg-[#633001]'
            break
        case 'ADA':
            token = 'bg-[#0033AD]'
            break
        case 'SHIB':
            token = 'bg-[#F00500]'
            break
        case 'DOGE':
            token = 'bg-[#988430]'
            break
    }

    return token

}
</script>

<template>

    <td v-if="loading" class="px-3 py-3">
        <Loading class="h-5 w-5 border-white" />
    </td>

    <td v-else class="grid grid-cols-2 gap-1 text-[8px] sm:text-[10px] lg:text-[12px] py-1">
        <template v-for="token in tokens?.items">
            <span
                v-if="[
                    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                    '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
                    '0xe9e7cea3dedca5984780bafc599bd69add087d56',
                    '0x55d398326f99059ff775485246999027b3197955',
                    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
                    '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
                    '0x2859e4544c4bb03966803b044a93563bd2d0dd4d',
                    '0xba2ae424d960c26247dd6c32edc70b295c744c43'
                ].includes(token?.contract_address)"
                :class="tokenColor(token.contract_ticker_symbol)"
                class="py-0.5 px-1 whitespace-nowrap rounded flex justify-center text-white"
            >
                {{ useAbbreviate(token?.contract_decimals == 8 ? parseFloat(ethers.utils.formatUnits(token?.balance, 8)).toFixed(3) : parseFloat(ethers.utils.formatEther(token?.balance)).toFixed(3)) }} {{ token.contract_ticker_symbol }}
            </span>
        </template>
    </td>

    <!-- <td class="grid grid-cols-2 gap-1 text-[8px] sm:text-[10px] lg:text-[12px] py-1">
        <template v-for="token in tokens">
            <span
                v-if="[
                    '0xeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee',
                    '0x2170ed0880ac9a755fd29b2688956bd959f933f8',
                    '0xe9e7cea3dedca5984780bafc599bd69add087d56',
                    '0x55d398326f99059ff775485246999027b3197955',
                    '0x0e09fabb73bd3ade0a17ecc321fd13a19e81ce82',
                    '0x3ee2200efb3400fabb9aacf31297cbdd1d435d47',
                    '0x2859e4544c4bb03966803b044a93563bd2d0dd4d',
                    '0xba2ae424d960c26247dd6c32edc70b295c744c43'
                ].includes(token.address)"
                :class="tokenColor(token.tickerSymbol)"
                class="py-0.5 px-1 whitespace-nowrap rounded flex justify-center text-white"
            >
                {{ useAbbreviate(token?.decimals == 8 ? parseFloat(ethers.utils.formatUnits(token?.balance, 8)).toFixed(3) : parseFloat(ethers.utils.formatEther(token?.balance)).toFixed(3)) }} {{ token.tickerSymbol }}
            </span>
        </template>
    </td> -->
</template>