<script lang="ts" setup>

defineProps<{ selectedClock: number }>()

</script>

<template>

    <div class="grid gap-6 mb-8 grid-cols-2 md:grid-cols-3 xl:grid-cols-3">
        
        <!-- <TheStatisticPlanZero :selected-clock="selectedClock" /> -->

        <TheStatisticPlanFirst :selected-clock="selectedClock" />

        <TheStatisticPlanSecond :selected-clock="selectedClock" />

        <TheStatisticPlanThird :selected-clock="selectedClock" />

    </div>

</template>