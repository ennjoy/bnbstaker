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
        <div class="p-2 mr-4 rounded-full text-orange-100 bg-[#8C8C8C]">
            <svg class="h-7 w-7" xmlns="http://www.w3.org/2000/svg" xml:space="preserve" width="100%" height="100%" version="1.1" shape-rendering="geometricPrecision" text-rendering="geometricPrecision" image-rendering="optimizeQuality" fill-rule="evenodd" clip-rule="evenodd"
                viewBox="0 0 784.37 1277.39"
                xmlns:xlink="http://www.w3.org/1999/xlink"
                xmlns:xodm="http://www.corel.com/coreldraw/odm/2003">
                <g id="Layer_x0020_1">
                <metadata id="CorelCorpID_0Corel-Layer"/>
                <g id="_1421394342400">
                <g>
                    <polygon fill="#343434" fill-rule="nonzero" points="392.07,0 383.5,29.11 383.5,873.74 392.07,882.29 784.13,650.54 "/>
                    <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,0 -0,650.54 392.07,882.29 392.07,472.33 "/>
                    <polygon fill="#3C3C3B" fill-rule="nonzero" points="392.07,956.52 387.24,962.41 387.24,1263.28 392.07,1277.38 784.37,724.89 "/>
                    <polygon fill="#8C8C8C" fill-rule="nonzero" points="392.07,1277.38 392.07,956.52 -0,724.89 "/>
                    <polygon fill="#141414" fill-rule="nonzero" points="392.07,882.29 784.13,650.54 392.07,472.33 "/>
                    <polygon fill="#393939" fill-rule="nonzero" points="0,650.54 392.07,882.29 392.07,472.33 "/>
                </g>
                </g>
                </g>
            </svg>
        </div>
        <div>
            <p class="flex items-center mb-2 text-sm font-medium whitespace-nowrap text-gray-400">
                {{ t('total-invested') }} (ETH) <span class="text-lg ml-1 font-semibold text-gray-200">{{ totalInvested.toFixed(3) }}</span>
            </p>

            <p class="flex items-center mb-2 text-sm font-medium whitespace-nowrap text-gray-400">
                {{ t('total-withdrawn') }} (ETH) <span class="text-lg ml-1 font-semibold text-gray-200">{{ totalWithdrawn.toFixed(3) }}</span>
            </p>
        </div>
    </div>
</template>