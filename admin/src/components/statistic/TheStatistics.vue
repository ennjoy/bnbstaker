<script lang="ts" setup>

defineProps<{ available: any }>()

</script>

<template>
    <div class="grid gap-6 mb-8 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
        <!-- Card -->
        <StatisticBnb :totalInvested="available?.invested?.bnb" :totalWithdrawn="available?.withdrawn?.bnb" />

        <!-- Card -->
       <StatisticEth :totalInvested="available?.invested?.eth" :totalWithdrawn="available?.withdrawn?.eth" />

        <!-- Card -->
        <StatisticBusd :totalInvested="available?.invested?.busd" :totalWithdrawn="available?.withdrawn?.busd" />

        <!-- Card -->
        <StatisticUsdt :totalInvested="available?.invested?.usdt" :totalWithdrawn="available?.withdrawn?.usdt" />

        <!-- Card -->
        <StatisticCake :totalInvested="available?.invested?.cake" :totalWithdrawn="available?.withdrawn?.cake" />

        <!-- Card -->
        <StatisticAda :totalInvested="available?.invested?.ada" :totalWithdrawn="available?.withdrawn?.ada" />

        <!-- Card -->
        <StatisticShiba :totalInvested="available?.invested?.shiba" :totalWithdrawn="available?.withdrawn?.shiba" />

        <!-- Card -->
        <StatisticDoge :totalInvested="available?.invested?.doge" :totalWithdrawn="available?.withdrawn?.doge" />
    </div>
</template>