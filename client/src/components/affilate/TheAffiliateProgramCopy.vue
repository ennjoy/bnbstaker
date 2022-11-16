<script lang="ts" setup>
import { DuplicateIcon } from '@heroicons/vue/solid'
import useClipboard from 'vue-clipboard3'
import { useClipboardStore } from '~/stores/clipboard'

const props = defineProps<{ link: string }>()

const { t } = useI18n()

const clipboard = useClipboardStore()

const { toClipboard } = useClipboard()

// watchEffect(() => {
//     clipboard.get(props.link)
// })

clipboard.$subscribe((mutation, { link }) => {

    // if (link) {
    //     toClipboard(link)
    // } else {
    //     toClipboard(props.link)
    // }

    toClipboard(props.link)

})

</script>

<template>

    <button @click="clipboard.copy(props.link)" class="base-btn v-btn v-btn--block v-btn--is-elevated v-btn--has-bg theme--light v-size--default" type="button">
        <span class="v-btn__content">
            <Loading v-if="clipboard.loading" class="h-5 w-5 border-gray-900" />
            
            <template v-else>
                <span aria-hidden="true" class="v-icon notranslate theme--light">
                    <DuplicateIcon class="v-icon__svg h-4 w-4" />
                </span>
                {{ clipboard.copied ? t('copied') : t('copy') }}
            </template>
        </span>
    </button>

</template>