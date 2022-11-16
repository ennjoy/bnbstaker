<script lang="ts" setup>
import { SelectorIcon } from '@heroicons/vue/outline'

const emit = defineEmits(['close'])

const { locale } = useI18n()

const langs = [
    {
        symbol: 'cn',
        name: '中国'
    },
    {
        symbol: 'us',
        name: 'EN'
    }
]

const selectedLang = ref(locale.value == 'us' ? langs[1] : langs[0])

function change(symbol: string) {
    locale.value = symbol
    localStorage.setItem('locale', symbol)
}
</script>

<template>
    <div class="flex space-x-2 px-6">
        <Listbox v-model="selectedLang">
            <div class="relative mt-1">

                <ListboxButton class="relative flex space-x-2 w-full py-2 px-10 text-left bg-gray-900 rounded-lg shadow-md cursor-default focus:outline-none focus-visible:ring-2 focus-visible:ring-opacity-75 focus-visible:ring-white focus-visible:ring-offset-orange-300 focus-visible:ring-offset-2 focus-visible:border-indigo-500 sm:text-sm">
                    <img :src="`https://hatscripts.github.io/circle-flags/flags/${ locale }.svg`" class="w-5 h-5" alt="" />
                    <span class="block truncate">{{ selectedLang.name }}</span>
                    <span class="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                        <SelectorIcon class="w-5 h-5 text-gray-400" aria-hidden="true" />
                    </span>
                </ListboxButton>
        
                <transition
                    leave-active-class="transition duration-100 ease-in"
                    leave-from-class="opacity-100"
                    leave-to-class="opacity-0"
                >
                    <ListboxOptions
                    class="absolute w-full py-1 mt-1 overflow-auto text-base bg-gray-900 rounded-md shadow-lg max-h-60 ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
                    >
                    <ListboxOption
                        v-slot="{ active, selected }"
                        v-for="lang in langs"
                        :key="lang.name"
                        :value="lang"
                        @click="change(lang.symbol)"
                        @click.native="emit('close')"
                        as="template"
                    >
                        <li :class="[ active ? 'text-gray-400 bg-gray-800' : 'text-gray-200', 'cursor-default select-none relative py-2 pl-10 pr-4' ]">
                            <span :class="[ selected ? 'font-medium' : 'font-normal', 'block truncate' ]">{{ lang.name }}</span>
                            <span class="absolute inset-y-0 left-0 flex items-center pl-3">
                                <img :src="`https://hatscripts.github.io/circle-flags/flags/${ lang.symbol }.svg`" class="w-5 h-5" alt="" />
                            </span>
                        </li>
                    </ListboxOption>
                    </ListboxOptions>
                </transition>
            </div>
        </Listbox>
    </div>
</template>