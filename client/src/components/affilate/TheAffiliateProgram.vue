<script lang="ts" setup>
import { useAccountStore } from '~/stores/account'

defineProps<{ user: any }>()

const { t } = useI18n()

const account = useAccountStore()

const link = ref('')

const [isOpen, open] = useToggle()

watchEffect(() => {
    if (account.currentAccount) {
        link.value = `https://${ window.location.hostname }/?invite=${ account.currentAccount }&token=${ account.contract }`
    } else {
        link.value = t('unlock-wallet')
    }
})
</script>

<template>
    <div class="ma-1 v-card v-sheet theme--light">
        <div class="v-card__title">
            {{ t('affiliate-program') }}
        </div>
        <div class="card-content">
            <div class="ref-earnings-wrapper">
                <div class="earnings-part">
                    <div class="farm-item-title">
                        {{ t('total-earnings') }}:
                    </div>
                    <span class="harvest-data">{{ user.referralTotalBonus.toFixed(4) }}</span>
                </div>
                <span class="card-divider"></span>
                <div class="ref-wrapper notranslate" style="font-size: 16px;">

                    <div class="ref-item">
                        <div>
                            1 {{ t('lvl') }} - 5%
                        </div>
                        <div class="ref-data">
                            {{ user.levels[0] }}
                        </div>
                    </div>
                    <div class="ref-item">
                        <div>
                            2 {{ t('lvl') }} - 2%
                        </div>
                        <div class="ref-data">
                            {{ user.levels[1] }}
                        </div>
                    </div>
                    <div class="ref-item">
                        <div>
                            3 {{ t('lvl') }} - 1%
                        </div>
                        <div class="ref-data">
                            {{ user.levels[2] }}
                        </div>
                    </div>
                    <div class="ref-item">
                        <div>
                            4 {{ t('lvl') }} - 1%
                        </div>
                        <div class="ref-data">
                            {{ user.levels[3] }}
                        </div>
                    </div>
                    <div class="ref-item">
                        <div>
                            5 {{ t('lvl') }} - 1%
                        </div>
                        <div class="ref-data">
                            {{ user.levels[4] }}
                        </div>
                    </div>
                </div>
            </div>

            <div class="ref-pane">
                <div class="farm-item-title">
                    {{ t('your-personal-link') }}
                </div>

                <div class="v-input base-text-box ref-text-box notranslate v-input--is-label-active v-input--is-dirty v-input--is-readonly v-input--dense theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed">
                    <div class="v-input__control">
                        <div class="v-input__slot">
                            <div class="v-text-field__slot">
                                <input :value="link" @focus="$event.target.select()" readonly type="text">
                            </div>
                        </div>
                        <div class="v-text-field__details">
                            <div class="v-messages theme--light">
                                <div class="v-messages__wrapper"></div>
                            </div>
                        </div>
                    </div>
                </div>

                <TheAffiliateProgramCopy v-if="account.currentAccount" :link="link" />
                
                <div class="v-dialog__container material-modal" role="dialog"></div>
                
                <button v-if="false" @click="open()" aria-expanded="false" aria-haspopup="true" class="buy-btn v-btn v-btn--block v-btn--is-elevated v-btn--has-bg theme--light v-size--default" role="button" type="button">
                    <span class="v-btn__content">{{ t('promo-materials') }}</span>
                </button>

                <div class="info-item">
                    <img class="pre-icon" src="data:image/svg+xml;base64,PHN2ZyB2ZXJzaW9uPSIxLjEiIGlkPSJDYXBhXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgogICAgIHZpZXdCb3g9IjAgMCA1MTIgNTEyIiBzdHlsZT0iZW5hYmxlLWJhY2tncm91bmQ6bmV3IDAgMCA1MTIgNTEyOyIgeG1sOnNwYWNlPSJwcmVzZXJ2ZSI+Cgk8Zz4KCQk8cGF0aCBmaWxsPSIjNzE3YTg5IiAgZD0iTTI1NiwwQzExNC44NDQsMCwwLDExNC44NDQsMCwyNTZzMTE0Ljg0NCwyNTYsMjU2LDI1NnMyNTYtMTE0Ljg0NCwyNTYtMjU2UzM5Ny4xNTYsMCwyNTYsMHogTTI5OC42NjcsNDE2CgkJCWMwLDUuODk2LTQuNzcxLDEwLjY2Ny0xMC42NjcsMTAuNjY3aC02NGMtNS44OTYsMC0xMC42NjctNC43NzEtMTAuNjY3LTEwLjY2N1YyNTZoLTEwLjY2N2MtNS44OTYsMC0xMC42NjctNC43NzEtMTAuNjY3LTEwLjY2NwoJCQl2LTQyLjY2N2MwLTUuODk2LDQuNzcxLTEwLjY2NywxMC42NjctMTAuNjY3SDI4OGM1Ljg5NiwwLDEwLjY2Nyw0Ljc3MSwxMC42NjcsMTAuNjY3VjQxNnogTTI1NiwxNzAuNjY3CgkJCWMtMjMuNTMxLDAtNDIuNjY3LTE5LjEzNS00Mi42NjctNDIuNjY3UzIzMi40NjksODUuMzMzLDI1Niw4NS4zMzNzNDIuNjY3LDE5LjEzNSw0Mi42NjcsNDIuNjY3UzI3OS41MzEsMTcwLjY2NywyNTYsMTcwLjY2N3oiLz4KCTwvZz4KPC9zdmc+Cg==">
                    <div class="info-content">
                        {{ t('you-must-have-at-least') }}
                    </div>
                </div>
            </div>
        </div>
    </div>

    <TheModalPromoMaterials :is-open="isOpen" />

</template>