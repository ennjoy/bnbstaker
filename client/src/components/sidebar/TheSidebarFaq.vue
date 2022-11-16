<script lang="ts" setup>
import faq from '~/assets/images/faq.svg'

const [isOpen, open] = useToggle()

</script>

<template>

    <span class="v-tooltip v-tooltip--right"></span>
    
    <button @click="open()" aria-expanded="false" aria-haspopup="true" class="stats-btn faq-btn">
        <img :src="faq" class="inner-icon" alt="">
    </button>

    <teleport to="body">
        <TheChat v-if="isOpen" :is-open="isOpen" />
    </teleport>

</template>