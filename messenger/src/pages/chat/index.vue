<script lang="ts" setup>

const { t } = useI18n()

</script>
   
<template>
  <div class="my-auto sm:w-1/2 md:w-2/3 lg:w-3/4 border-l border-gray-200 sm:flex items-center justify-center text-center">
    <div class="space-y-5">
      <div class="border border-black rounded-full inline-flex p-5 items-center justify-center">
        <svg class="transform translate-y-1" height="52" viewBox="0 0 48 48" width="52">
          <path d="M47.8 3.8c-.3-.5-.8-.8-1.3-.8h-45C.9 3.1.3 3.5.1 4S0 5.2.4 5.7l13.2 13c.5.4 1.1.6 1.7.3l16.6-8c.7-.3 1.6-.1 2 .5.4.7.2 1.6-.5 2l-15.6 9.9c-.5.3-.8 1-.7 1.6l4.6 19c.1.6.6 1 1.2 1.1h.2c.5 0 1-.3 1.3-.7l23.2-39c.5-.5.5-1.1.2-1.6z"></path>
        </svg>
      </div>
      <div class="space-y-0.5">
        <h1 class="font-semibold text-xl">{{ t('your-clients') }}</h1>
        <p class="text-gray-600 min-w-46">{{ t('this-is-where-your-dialogue') }}</p>
      </div>
    </div>
  </div>
</template>

<route lang="yaml">
name: Chat
</route>