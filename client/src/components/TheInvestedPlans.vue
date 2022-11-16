<script lang="ts" setup>

const { t } = useI18n()

</script>

<template>

    <div class="v-card__text">

         <div class="roi-plan-table">
            <div class="roi-header">
                <div>
                    {{ t('days') }}
                </div>
                <div class="whitespace-nowrap">
                    %{{ t('daily') }}
                </div>
                <div>
                    {{ t('total') }}
                </div>
            </div>
            <div class="plan-item notranslate">
                <div>7</div>
                <div>18%</div>
                <div>126%</div>
            </div>
            <div class="plan-item notranslate">
                <div>15</div>
                <div>10%</div>
                <div>150%</div>
            </div>
            <div class="plan-item notranslate">
                <div>30</div>
                <div>8%</div>
                <div>240%</div>
            </div>
        </div>
        
        <div class="role-text">
            {{ t('you-will-enjoy-stable-passive') }}
        </div>
    </div>

</template>