<script lang="ts" setup>
import safe from '~/assets/images/safe.svg'
import dataGrowth from '~/assets/images/data-growth.svg'
import support from '~/assets/images/support.svg'

const { t } = useI18n()

const [isOpen, open] = useToggle()

</script>

<template>

    <div class="brief-info">
        <div class="container">
            <div class="brief-header text-left">
                #{{ t('start-your-yield-farm') }}
            </div>

            <div class="brief-item-wrapper">
                
                <div class="brief-item">
                    <div class="icon-part">
                        <div class="v-avatar" style="height: 64px; min-width: 64px; width: 64px;">
                            <img :src="safe" class="brief-icon" alt="">
                        </div>
                    </div>
                    <div class="brief-title">
                        {{ t('ironclad-security') }}
                    </div>
                    <div class="brief-text">
                        {{ t('the-smart-contract-code-has-been') }}
                    </div>
                </div>

                <div class="brief-item">
                    <div class="icon-part">
                        <div class="v-avatar" style="height: 64px; min-width: 64px; width: 64px;">
                            <img :src="dataGrowth" class="brief-icon" alt="">
                        </div>
                    </div>
                    <div class="brief-title">
                        {{ t('high') }} &amp; {{ t('stable-apr') }}
                    </div>
                    <div class="brief-text">
                        {{ t('in-the-code-sets-the-highest') }}
                    </div>
                </div>

                <div @click="open()" class="brief-item cursor-pointer">
                    <div class="icon-part">
                        <div class="v-avatar" style="height: 64px; min-width: 64px; width: 64px;">
                            <img :src="support" class="brief-icon" alt="">
                        </div>
                    </div>
                    <div class="brief-title">
                        {{ t('customer-support') }}
                    </div>
                    <div class="brief-text">
                        {{ t('bnbstaker-provides-you-our') }}
                    </div>
                </div>

            </div>
        </div>
    </div>

    <TheChat v-if="isOpen" :is-open="isOpen" />

</template>