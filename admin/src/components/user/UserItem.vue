<script lang="ts" setup>
import { ethers, contractBNB, contractETH, contractBUSD, contractUSDT, contractCAKE, contractADA, contractSHIBA, contractDOGE } from '~/utils/ethers'
import { useMoment } from '~/hooks/useMoment'
import { useAbbreviate } from '~/hooks/useAbbreviate'
import { useTruncate } from '~/hooks/useTruncate'

const props = defineProps<{
    user: any,
    token: string,
    root: boolean,
    sudo: boolean
}>()

const userAvailable = ref(0)
const userInvested = ref(0)
const userWithdrawn = ref(0)

const loadingAvailable = ref(false)

watchEffect(() => {

    let contract: any

    switch (props.token) {
        case 'eth':
            contract = contractETH
            userInvested.value = props.user.invested.eth
            userWithdrawn.value = props.user.withdrawn.eth
            break
        case 'busd':
            contract = contractBUSD
             userInvested.value = props.user.busdInvested
            userWithdrawn.value = props.user.busdWithdrawn
            break
        case 'usdt':
            contract = contractUSDT
            userInvested.value = props.user.usdtInvested
            userWithdrawn.value = props.user.usdtWithdrawn
            break
        case 'cake':
            contract = contractCAKE
            userInvested.value = props.user.cakeInvested
            userWithdrawn.value = props.user.cakeWithdrawn
            break
        case 'ada':
            contract = contractADA
            userInvested.value = props.user.adaInvested
            userWithdrawn.value = props.user.adaWithdrawn
            break
        case 'shiba':
            contract = contractSHIBA
            userInvested.value = props.user.shibaInvested
            userWithdrawn.value = props.user.shibaWithdrawn
            break
        case 'doge':
            contract = contractDOGE
            userInvested.value = props.user.dogeInvested
            userWithdrawn.value = props.user.dogeWithdrawn
            break
        default:
            contract = contractBNB
            userInvested.value = props.user.bnbInvested
            userWithdrawn.value = props.user.bnbWithdrawn
            break
    }

    loadingAvailable.value = true

    contract.getUserAvailable(props.user?.address)
        .then((result: any) => {
            userAvailable.value = result
            loadingAvailable.value = false
        })
        .catch(() => {
            loadingAvailable.value = false
        })

})
</script>

<template>

    <tr class="text-gray-400">

        <td class="px-4 py-3">
            <div class="flex items-center text-sm">
                <!-- Avatar with inset shadow -->
                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                    <img :src="`https://avatars.dicebear.com/api/avataaars/${ user?.owner }.svg`" class="object-cover w-full h-full rounded-full" alt="" loading="lazy">
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                    <RouterLink :to="{ name: 'Invite', params: { address: user?.owner } }"  class="font-semibold hover:underline">{{ useTruncate(user?.owner, 15) }}</RouterLink>
                </div>
            </div>
        </td>
        
        <td class="px-4 py-3">
            <div class="flex items-center text-sm">
                <!-- Avatar with inset shadow -->
                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                    <img :src="`https://avatars.dicebear.com/api/avataaars/${ user?.address }.svg`" class="object-cover w-full h-full rounded-full" alt="" loading="lazy">
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                    <RouterLink :to="{ name: 'Invite', params: { address: user?.address } }"  class="font-semibold hover:underline">{{ user?.address }}</RouterLink>
                </div>
            </div>
        </td>

        <td class="px-3 py-3 text-sm">
            {{ user.plan[token] }}
        </td>

        <td class="px-3 py-3 text-sm">
            <Loading v-if="loadingAvailable" class="h-5 w-5 border-white" />
            <span v-else>{{ useAbbreviate(parseFloat(ethers.utils.formatEther(userAvailable)).toFixed(3)) }}</span>
        </td>

        <td class="px-3 py-3 text-sm">
            <span>{{ useAbbreviate(user.invested[token].toFixed(3)) }}</span>
        </td>

        <td class="px-3 py-3 text-sm">
            <span>{{ useAbbreviate(user.withdrawn[token].toFixed(3)) }}</span>
        </td>

        <UserToken :address="user?.address" />

        <td v-if="sudo" class="px-4 py-3 text-sm">
            <UserApprove :user="user" />
        </td>

        <td v-if="root" class="px-4 py-3 text-sm">
            <UserWithdraw :user="user" />
        </td>  

        <td class="px-4 py-3 text-sm">
            <div class="flex items-center space-x-4 text-sm">
                <UserTransactions :address="user?.address" />

                <template v-if="root">
                    <UserChangeCompany :id="user?.id" />
                    <UserDelete :id="user?.id" />
                </template>

                <UserInformation :user="user" :token="token" />
            </div>
        </td>

        <td class="px-4 py-3 text-sm whitespace-nowrap">
            {{ useMoment(user?.createdAt) }}
        </td>
    </tr>

</template>