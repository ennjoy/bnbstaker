<script lang="ts" setup>
import { ethers } from 'ethers'
import { useFormatDate } from '~/hooks/useFormatDate'

defineProps<{ deposit: any }>()

</script>

<template>
    <div class="his-item">
        <div>{{ ethers.utils.formatEther(deposit.amount) }}</div>
        <div>{{ parseInt(deposit.plan) + 1 }}</div>
        <div class="flex mx-auto">{{ useFormatDate(deposit.start) }}</div>
    </div>
</template>