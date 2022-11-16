<script lang="ts" setup>
import { useAbbreviate } from '~/hooks/useAbbreviate'

const { t } = useI18n()

defineProps<{
    totalInvested: number,
    totalWithdrawn: number
}>()

</script>

<template>
    <div class="flex items-center p-4 rounded-lg shadow-xs bg-gray-800">
        <div class="p-3 mr-4 rounded-full text-orange-100 bg-[#f0b90b]">
            <svg class="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 336.41 337.42">
                <g id="Layer_2" data-name="Layer 2">
                    <g id="Layer_1-2" data-name="Layer 1">
                        <path style="fill:#FFFFFF;" class="cls-1" d="M168.2.71l41.5,42.5L105.2,147.71l-41.5-41.5Z"/>
                        <path style="fill:#FFFFFF;" class="cls-1" d="M231.2,63.71l41.5,42.5L105.2,273.71l-41.5-41.5Z"/>
                        <path style="fill:#FFFFFF;" class="cls-1" d="M42.2,126.71l41.5,42.5-41.5,41.5L.7,169.21Z"/>
                        <path style="fill:#FFFFFF;" class="cls-1" d="M294.2,126.71l41.5,42.5L168.2,336.71l-41.5-41.5Z"/>
                    </g>
                </g>
            </svg>
        </div>
        <div>
            <p class="flex items-center mb-2 text-sm font-medium whitespace-nowrap text-gray-400">
                {{ t('total-invested') }} (BUSD) <span class="text-lg ml-1 font-semibold text-gray-200">{{ totalInvested.toFixed(2) }}</span>
            </p>

            <p class="flex items-center mb-2 text-sm font-medium whitespace-nowrap text-gray-400">
                {{ t('total-withdrawn') }} (BUSD) <span class="text-lg ml-1 font-semibold text-gray-200">{{ totalWithdrawn.toFixed(2) }}</span>
            </p>
        </div>
    </div>

</template>