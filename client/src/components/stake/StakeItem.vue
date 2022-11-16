<script lang="ts" setup>
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { ChevronUpIcon } from '@heroicons/vue/solid'
import { useAccountStore } from '~/stores/account'
import { useStakeStore } from '~/stores/stake'
import { useApproveStore } from '~/stores/approve'
import { useCoin } from '~/hooks/useCoin'
import { useMinInvest } from '~/hooks/useMinInvest'

const props = defineProps<{
    index: number,
    plan: any
}>()

const emit = defineEmits(['open'])

const { t } = useI18n()

const { handleSubmit } = useForm()

const account = useAccountStore()

const approve = useApproveStore()

const stake = useStakeStore()

const [isOpen, openCalc] = useToggle()

const total = ref(props.plan.days * props.plan.daily)

const message = ref(`${ t('minimal-stake-amount') } ${ useMinInvest(account.contract) } ${ useCoin(account.contract) }`)

const { value, errorMessage } = useField('value', yup.number().required().typeError(message.value).min(useMinInvest(account.contract), message.value))

watchEffect(() => {
    value.value = useMinInvest(account.contract)
})

const onSubmit = handleSubmit(({ value }) => {
    return stake.invest(value, props.index)
})

</script>

<template>
    <Disclosure :defaultOpen="index == 0" v-slot="{ open }" as="div" aria-expanded="true" class="v-expansion-panel v-expansion-panel--active v-item--active">
        <DisclosureButton @click="emit('open')" aria-expanded="true" class="v-expansion-panel-header plan-item-info v-expansion-panel-header--active">
            <div>{{ plan.days }}</div>
            <div class="notranslate">{{ plan.daily }}%</div>
            <div class="notranslate">{{ total }}%</div>
            <span class="pre-decorate"></span>
            <div class="v-expansion-panel-header__icon">
                <span aria-hidden="true" class="v-icon notranslate theme--light">
                    <ChevronUpIcon :class="{ 'rotate-180': open }" class="v-icon__svg" />
                </span>
            </div>
        </DisclosureButton>

        <transition
            enter-active-class="transition duration-100 ease-out"
            enter-from-class="transform scale-95 opacity-0"
            enter-to-class="transform scale-100 opacity-100"
            leave-active-class="transition duration-100 ease-out"
            leave-from-class="transform scale-100 opacity-100"
            leave-to-class="transform scale-95 opacity-0"
        >

            <div v-show="plan.selected">
                <DisclosurePanel class="v-expansion-panel-content" static>
                    <div class="v-expansion-panel-content__wrap">
                        <div class="stake-pane">
                            <div class="total-return-part">
                                <div>{{ t('total-earn') }}: <span class="return-data notranslate">{{ (value * total / 100).toFixed(2) }}</span>
                                </div>
                                <button @click="openCalc()" class="calc-btn v-btn v-btn--icon v-btn--round theme--light v-size--small" type="button">
                                    <span class="v-btn__content">
                                        <img class="calc-icon" src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KICAgIDxwYXRoIGQ9Ik0yMC43NSAwLjc1SDMuMjVDMS44NzUgMC43NSAwLjc1IDEuODc1IDAuNzUgMy4yNVYyMC43NUMwLjc1IDIyLjEyNSAxLjg3NSAyMy4yNSAzLjI1IDIzLjI1SDIwLjc1QzIyLjEyNSAyMy4yNSAyMy4yNSAyMi4xMjUgMjMuMjUgMjAuNzVWMy4yNUMyMy4yNSAxLjg3NSAyMi4xMjUgMC43NSAyMC43NSAwLjc1Wk0zLjg3NSA2LjM3NUg2LjM3NVYzLjg3NUg4LjI1VjYuMzc1SDEwLjc1VjguMjVIOC4yNVYxMC43NUg2LjM3NVY4LjI1SDMuODc1VjYuMzc1Wk0yMC43NSAyMC43NUgzLjI1TDIwLjc1IDMuMjVWMjAuNzVaTTE4LjI1IDE4LjI1VjE2LjM3NUgxMlYxOC4yNUgxOC4yNVoiIGZpbGw9IiM3ODgwOGUiLz4KPC9zdmc+Cg==">
                                    </span>
                                </button>
                            </div>
                            <div class="stake-text-part">
                                <div :class="{ 'flex-col sm:flex-row': account.contract != 'bnb' }" class="stake-group">
                                
                                    <div v-if="errorMessage" class="stake-msg whitespace-nowrap">{{ errorMessage }}</div>

                                    <div class="v-input base-text-box stake-text-box v-input--dense theme--light v-text-field v-text-field--single-line v-text-field--solo v-text-field--is-booted v-text-field--enclosed">
                                        <div class="v-input__control">
                                            <div class="v-input__slot">
                                                <div class="v-text-field__slot">
                                                    <label v-if="value < 0" class="v-label theme--light" for="input-958" style="left: 0px; right: auto; position: absolute;">{{ t('enter') }} {{ useCoin(account.contract) }} {{ t('amount') }}</label>
                                                    <input v-model="value" type="number" :min="useMinInvest(account.contract)">
                                                </div>
                                            </div>
                                            <div class="v-text-field__details">
                                                <div class="v-messages theme--light">
                                                    <div class="v-messages__wrapper"></div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div v-if="account.currentAccount" :class="{ 'mt-5 sm:mt-0': account.contract != 'bnb' }" class="flex">

                                        <button v-if="account.contract != 'bnb'" @click="approve.approve(value)" class="base-btn stake-btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" type="button">
                                            <span class="v-btn__content">
                                                <Loading v-if="approve.loading" class="h-5 w-5 border-gray-900" />
                                                <span v-else>{{ t('invest') }}</span>
                                            </span>
                                        </button>

                                        <button @click="onSubmit()" class="ml-1 base-btn stake-btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" type="button">
                                            <span class="v-btn__content">
                                                <Loading v-if="stake.loading" class="h-5 w-5 border-gray-900" />
                                                <span v-else>{{ t('stake') }}</span>
                                            </span>
                                        </button>

                                    </div>
                                    
                                    <button v-else @click="account.connectWalletConnect()" class="base-btn stake-btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" type="button">
                                        <span class="v-btn__content">
                                            <Loading v-if="account.loading" class="h-5 w-5 border-gray-900" />
                                            <span v-else>{{ t('unlock-wallet') }}</span>
                                        </span>
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </DisclosurePanel>
            </div>
        </transition>
    </Disclosure>

    <TheModalRoi
        :is-open="isOpen"
        :plan="plan"
        :token="useCoin(account.contract)"
    />
</template>