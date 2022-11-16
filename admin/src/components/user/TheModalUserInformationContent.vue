<script lang="ts" setup>
import { ethers, contractBNB, contractBUSD, contractUSDT, contractCAKE, contractADA, contractSHIBA, contractDOGE } from '~/utils/ethers'

const props = defineProps<{
    user: any,
    token: string
}>()

const { t } = useI18n()

const referralTotalBonus = ref(0)
const levels = ref([0, 0, 0, 0, 0])

const loadingTotalBonus = ref(false)
const loadingLevels = ref(false)

onMounted(() => {
    let contract: any

    switch (props.token) {
        case 'busd':
            contract = contractBUSD
            break
        case 'usdt':
            contract = contractUSDT
            break
        case 'cake':
            contract = contractCAKE
            break
        case 'ada':
            contract = contractADA
            break
        case 'shiba':
            contract = contractSHIBA
            break
        case 'doge':
            contract = contractDOGE
            break
        default:
            contract = contractBNB
            break
    }

    loadingTotalBonus.value = true

    contract.getUserReferralTotalBonus(props.user?.address)
        .then((result: any) => {
            referralTotalBonus.value = result
            loadingTotalBonus.value = false
        })
        .catch(() => {
            loadingTotalBonus.value = false
        })

    loadingLevels.value = true

    contract.getUserDownlineCount(props.user?.address)
        .then((result: any) => {
            levels.value[0] = parseFloat(result[0])
            levels.value[1] = parseFloat(result[1])
            levels.value[2] = parseFloat(result[2])
            levels.value[3] = parseFloat(result[3])
            levels.value[4] = parseFloat(result[4])

            loadingLevels.value = false
        })
        .catch(() => {
            loadingLevels.value = false
        })
})
</script>

<template>
    <div class="flex flex-col text-gray-400">

        <div class="flex justify-between">
            <span>{{ t('referral-total-bonus') }}: </span>
            <span>
                <span>
                    <Loading v-if="loadingTotalBonus" class="h-5 w-5 border-white" />
                    <span v-else>{{ parseFloat(ethers.utils.formatEther(referralTotalBonus)).toFixed(2) }}</span>
                </span>
            </span>
        </div>

        <div class="flex justify-between">
            <span>{{ t('referrals') }}: </span>
            <div class="flex flex-col">
                <Loading v-if="loadingLevels" class="h-5 w-5 border-white" />
                <template v-else>
                    <span>1 LVL (5%) - {{ levels[0] }}</span>
                    <span>2 LVL (2%) - {{ levels[1] }}</span>
                    <span>3 LVL (1%) - {{ levels[2] }}</span>
                    <span>4 LVL (1%) - {{ levels[3] }}</span>
                    <span>5 LVL (1%) - {{ levels[4] }}</span>
                </template>
            </div>
        </div>
    </div>
    
</template>