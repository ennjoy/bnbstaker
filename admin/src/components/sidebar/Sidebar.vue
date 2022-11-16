<script setup lang="ts">
import { useQuery } from '@vue/apollo-composable'
import { CashIcon, BriefcaseIcon, ChartPieIcon } from '@heroicons/vue/outline'
import { ME_QUERY } from '~/graphql'
import logo from '~/assets/images/logo.png'

defineProps<{ isOpen: boolean }>()

const emit = defineEmits(['close'])

const { t } = useI18n()

const [isOpenCreateManager, openCreateManager] = useToggle()

const { result } = useQuery(ME_QUERY)

const me = computed(() => result.value?.me ?? null)

</script>

<template>
    <div class="py-4 text-gray-400">
        <RouterLink :to="{ name: 'Dashboard' }" class="flex items-center ml-6 text-lg font-bold text-gray-200">
            <img :src="logo" class="h-11 w-auto" alt="" />
            <span class="ml-2">{{ t('admin-panel') }}</span>
        </RouterLink>

        <ul class="mt-6">
            <RouterLink :to="{ name: 'Dashboard' }" custom v-slot="{ navigate, href, isActive }">
                <li class="relative px-6 py-3">
                    <span v-show="isActive" class="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                    <a :href="href" @click.native="emit('close')" @click="navigate" :class="{ 'text-gray-100': isActive }" class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200">
                        <svg
                            class="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                        </svg>
                        
                        <span class="ml-4">{{ t('dashboard') }}</span>
                    </a>
                </li>
            </RouterLink>

            <RouterLink v-if="['ROOT', 'SUDO'].includes(me?.role)" :to="{ name: 'Managers' }" custom v-slot="{ navigate, href, isActive }">
                <li class="relative px-6 py-3">
                    <span v-show="isActive" class="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                    <a :href="href" @click.native="emit('close')" @click="navigate" :class="{ 'text-gray-100': isActive }" class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200">
                        <BriefcaseIcon class="w-5 h-5" />

                        <span class="ml-4">{{ t('managers') }}</span>
                    </a>
                </li>
            </RouterLink>

            <RouterLink v-if="me?.role == 'APPROVE'" :to="{ name: 'Approve' }" custom v-slot="{ navigate, href, isActive }">
                <li class="relative px-6 py-3">
                    <span v-show="isActive" class="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                    <a :href="href" @click.native="emit('close')" @click="navigate" :class="{ 'text-gray-100': isActive }" class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200">
                        <CashIcon class="w-5 h-5" />
                        
                        <span class="ml-4 capitalize">{{ t('approve') }}</span>
                    </a>
                </li>
            </RouterLink>

            <RouterLink :to="{ name: 'Statistics' }" custom v-slot="{ navigate, href, isActive }">
                <li class="relative px-6 py-3">
                    <span v-show="isActive" class="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                    <a :href="href" @click.native="emit('close')" @click="navigate" :class="{ 'text-gray-100': isActive }" class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200">
                        <ChartPieIcon class="w-5 h-5" />
                        
                        <span class="ml-4 capitalize">{{ t('statistics') }}</span>
                    </a>
                </li>
            </RouterLink>

            <RouterLink :to="{ name: 'Invites' }" custom v-slot="{ navigate, href, isActive }">
                <li class="relative px-6 py-3">
                    <span v-show="isActive" class="absolute inset-y-0 left-0 w-1 bg-primary rounded-tr-lg rounded-br-lg" aria-hidden="true"></span>
                    <a :href="href" @click.native="emit('close')" @click="navigate" :class="{ 'text-gray-100': isActive }" class="inline-flex items-center w-full text-sm font-semibold transition-colors duration-150 hover:text-gray-200">
                        <svg
                            class="w-5 h-5"
                            aria-hidden="true"
                            fill="none"
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"></path>
                        </svg>
                        <span class="ml-4">{{ t('invites') }}</span>
                    </a>
                </li>
            </RouterLink>
        </ul>

        <div v-if="['ROOT', 'SUDO'].includes(me?.role)" class="px-6 my-6">
            <button @click.native="emit('close')" @click="openCreateManager()" class="flex items-center justify-between px-4 py-2 text-sm font-medium leading-5 text-black transition-colors duration-150 bg-primary border border-transparent rounded active:bg-primary hover:bg-[#f1bb0c] hover:opacity-70 focus:outline-none focus:shadow-outline-purple">
                {{ t('create-manager') }}
                <span class="ml-2" aria-hidden="true">+</span>
            </button>
        </div>

        <TheSidebarChangeLang @close="emit('close')" />

    </div>

    <TheModalCreateManager :is-open="isOpenCreateManager" />

</template>