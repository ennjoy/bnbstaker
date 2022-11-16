<script lang="ts" setup>
// import { useLang } from '~/hooks/useLang'
import global from '~/assets/images/global.svg'

const { locale } = useI18n()

const langs = [
    {
        symbol: 'us',
        name: 'EN'
    },
    {
        symbol: 'cn',
        name: '中国'
    },
    {
        symbol: 'kr',
        name: 'KR'
    },
    {
        symbol: 'my',
        name: 'MY'
    },
    {
        symbol: 'th',
        name: 'TH'
    },
    {
        symbol: 'vn',
        name: 'VN'
    },
    {
        symbol: 'jp',
        name: 'JPN'
    },
    {
        symbol: 'in',
        name: 'IND'
    }
]

const selectedLang = ref(langs[0])

function change(symbol: string) {
    locale.value = symbol
    localStorage.setItem('locale', symbol)
}
</script>

<template>
    <Listbox v-model="selectedLang">
        <div>
            <ListboxButton class="notranslate menu-btn-frame">
                <img :src="global" class="w-6">
      
                <!-- <span class="lang-text">{{ useLang(locale) }}</span> -->
                
                <img :src="`https://hatscripts.github.io/circle-flags/flags/${ locale }.svg`" class="h-5 w-5 lang-text" alt="" />

                <span v-if="false" aria-hidden="true" class="v-icon notranslate ml-auto theme--light text-sm h-[14px] w-[14px]">
                    <svg aria-hidden="true" class="v-icon__svg text-sm h-[14px] w-[14px]" role="img" viewbox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z"></path>
                    </svg>
                </span>
            </ListboxButton>

            <transition
            leave-active-class="transition duration-100 ease-in"
            leave-from-class="opacity-100"
            leave-to-class="opacity-0"
            >
                <ListboxOptions as="div" class="v-menu__content theme--light v-menu__content--fixed menuable__content__active" role="menu" style="top: 70px; transform-origin: left top; z-index: 82; opacity: 0.9; right: 0px;">
                    <div class="v-list menu-list notranslate text-left v-sheet theme--light">
                        <ListboxOption
                        v-for="lang in langs"
                        :key="lang.name"
                        :value="lang"
                        as="template"
                        @click="change(lang.symbol)"
                        class="v-list-item v-list-item--link" role="menuitem" tabindex="0"
                    >
                            <div >
                                <!-- {{ lang.name }} -->

                                <img :src="`https://hatscripts.github.io/circle-flags/flags/${ lang.symbol }.svg`" class="h-5 w-5" alt="" />
                            </div>
                            
                        </ListboxOption>
                    </div>
                </ListboxOptions>

            </transition>
        </div>
    </Listbox>
</template>