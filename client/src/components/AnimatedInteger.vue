<script lang="ts" setup>
import { useAbbreviate } from '~/hooks/useAbbreviate'
import { useDivide } from '~/hooks/useDivide'

const props = withDefaults(defineProps<{
   value: number,
   abbreviate?: boolean
}>(), {
  value: 0,
  abbreviate: true
})

const displayNumber = ref(0)

const interval: any = ref(false)

watchEffect(() => {
   clearInterval(interval.value)

   if (Math.round(props.value) == Math.round(displayNumber.value)) return

   interval.value = window.setInterval(() => {
      if (displayNumber.value != props.value) {
         let change = (props.value - displayNumber.value) / 10
         change = change >= 0 ? Math.ceil(change) : Math.floor(change)
         displayNumber.value = displayNumber.value + change
      }
   }, 10)
})
</script>

<template>
   {{ abbreviate ? useAbbreviate(displayNumber) : useDivide(displayNumber) }}
</template>