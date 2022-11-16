<script lang="ts" setup>
import { XIcon } from '@heroicons/vue/solid'
import bnbstaker from '/picture.png'

defineProps<{ isOpen: boolean }>()

const { t } = useI18n()

</script>

<template>

  <transition
      enter-active-class="duration-300 ease-out"
      enter-from-class="transform opacity-0"
      enter-to-class="opacity-100"
      leave-active-class="duration-200 ease-in"
      leave-from-class="opacity-100"
      leave-to-class="transform opacity-0"
    >

      <div v-show="isOpen" class="fixed bottom-0 right-0 z-50 flex flex-col items-end ml-6 w-full">
        <div class="chat-modal show flex flex-col sm:mr-5 sm:mb-5 shadow-lg justify-center w-full sm:w-1/2 md:w-1/3 lg:w-1/4">

            <!-- admin profile -->
            <div class="flex rounded-t-lg justify-between items-center text-gray-900 p-2 bg-primary  shadow-lg mr-5 w-full">
                <div class="flex items-center">
                    <img :src="bnbstaker" alt="picture" class="rounded-full w-8 h-8 mr-1">
                    <h2 class="font-semibold tracking-wider">{{ t('support') }}</h2>
                </div>

                <div @click="isOpen = false" class="px-2 py-1 rounded self-end cursor-pointer">
                    <XIcon class="h-5 w-5" />
                </div>


                <!-- <div class="flex items-center justify-center">
                    <small class="mr-1">online</small>
                    <div class="rounded-full w-2 h-2 bg-white"></div>
                </div> -->
            </div>

            <!-- messages -->
            <TheMessageBody />

            <!-- message compose -->
            <TheMessageCompose />

        </div>
      </div>

  </transition>

</template>

<style>
  .chat-services {
    transition: .5s;
    max-height: 0;
  }

  .chat-services.expand{
    max-height: 350px;
  }

  .message {
    max-width: 250px;
  }

  .chat-modal {
    transition: .5s;
    opacity: 0;
    transform: translateX(500px);
  }

  .chat-modal.show{
    opacity: 1;
    transform: translateX(0);
  }

  @keyframes animateModal {
    from {
      transform: translateX(200px) opacity(0);
    }

    to {
      transform: translateX(0) opacity(1);
    }
  }
</style>