<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { ME_QUERY } from '~/graphql'
import { useLogout } from '~/hooks/useLogout'

const { t } = useI18n()

const { result } = useQuery(ME_QUERY)

const me = computed(() => result.value?.me ?? null)

</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div>
      <MenuButton class="align-middle rounded-full focus:shadow-outline-purple focus:outline-none">
        <img class="object-cover w-8 h-8 rounded-full" :src="`https://avatars.dicebear.com/api/avataaars/${ me?.address }.svg`" alt="" aria-hidden="true">
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition duration-100 ease-out"
      enter-from-class="transform scale-95 opacity-0"
      enter-to-class="transform scale-100 opacity-100"
      leave-active-class="transition duration-75 ease-in"
      leave-from-class="transform scale-100 opacity-100"
      leave-to-class="transform scale-95 opacity-0"
    >
      <MenuItems class="absolute right-0 w-56 mt-2 origin-top-right rounded-md shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none border-gray-700 text-gray-300 bg-gray-700">
          <div class="px-1 py-1">
              <MenuItem>
                  <button @click="useLogout" class="inline-flex items-center w-full px-2 py-1 text-sm font-semibold transition-colors duration-150 rounded-md hover:bg-gray-800 hover:text-gray-200" href="#">
                      <svg class="w-4 h-4 mr-3" aria-hidden="true" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor">
                          <path d="M11 16l-4-4m0 0l4-4m-4 4h14m-5 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h7a3 3 0 013 3v1"></path>
                      </svg>
                      <span>{{ t('logout') }}</span>
                  </button>
              </MenuItem>
          </div>
      </MenuItems>
    </transition>
  </Menu>
</template>