<script lang="ts" setup>
import { useMediaControls } from '@vueuse/core'
import { useSubscription } from '@vue/apollo-composable'
import { MESSAGE_NOTIFY_SUBSCRIPTION } from '~/graphql'

const { result } = useSubscription(MESSAGE_NOTIFY_SUBSCRIPTION)

const audio = ref<HTMLMediaElement | null >()

const { playing } = useMediaControls(audio, { 
  src: 'sound/notify.mp3',
})

const isLeft = usePageLeave()

watch(result, (data: any) => {

    if (localStorage.getItem('notifications') || isLeft.value) {

        console.log('New message received:', data.messageNotify)
        
        playing.value = true
    }

})

</script>

<template>

    <audio ref="audio" />

</template>