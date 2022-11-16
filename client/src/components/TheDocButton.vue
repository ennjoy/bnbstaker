<script lang="ts" setup>

const { locale, t } = useI18n()

</script>

<template>
    <a :href="`docs/${ locale }.jpg`" class="buy-btn pane-btn doc-btn v-btn v-btn--is-elevated v-btn--has-bg theme--light v-size--default" type="button" target="_blank">
        <span class="v-btn__content">{{ t('document') }}</span>
    </a>
</template>