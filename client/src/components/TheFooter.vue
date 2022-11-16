<script lang="ts" setup>
// import { useLang } from '~/hooks/useLang'
import twitter from '~/assets/images/twitter.svg'
import instagram from '~/assets/images/instagram.svg'
import facebook from '~/assets/images/facebook.svg'
import global from '~/assets/images/global.svg'

const { locale, t } = useI18n()

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

const telegramURL = ref(import.meta.env.VITE_TELEGRAM_URL as string)
const instagramURL = ref(import.meta.env.VITE_INSTAGRAM_URL as string)
const twitterURL = ref(import.meta.env.VITE_TWITTER_URL as string)
const facebookURL = ref(import.meta.env.VITE_FACEBOOK_URL as string)

</script>

<template>
    <div class="container">
        <div class="func-wrapper">
            <div class="btn-group-wrapper">

                <a :href="telegramURL" class="social-icon-wrapper" target="_blank">
                    <div class="social-icon">
                        <img class="inner-icon" src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZmlsbD0iIzcxN2E4OSIgZD0ibTkuNDE3IDE1LjE4MS0uMzk3IDUuNTg0Yy41NjggMCAuODE0LS4yNDQgMS4xMDktLjUzN2wyLjY2My0yLjU0NSA1LjUxOCA0LjA0MWMxLjAxMi41NjQgMS43MjUuMjY3IDEuOTk4LS45MzFsMy42MjItMTYuOTcyLjAwMS0uMDAxYy4zMjEtMS40OTYtLjU0MS0yLjA4MS0xLjUyNy0xLjcxNGwtMjEuMjkgOC4xNTFjLTEuNDUzLjU2NC0xLjQzMSAxLjM3NC0uMjQ3IDEuNzQxbDUuNDQzIDEuNjkzIDEyLjY0My03LjkxMWMuNTk1LS4zOTQgMS4xMzYtLjE3Ni42OTEuMjE4eiIvPgo8L3N2Zz4K">
                    </div>
                    <span>Telegram</span>
                </a>

                <a :href="twitterURL" class="social-icon-wrapper" target="_blank">
                    <div class="social-icon">
                        <img :src="twitter" class="inner-icon" alt="">
                    </div>
                    <span>Twitter</span>
                </a>

                <a :href="instagramURL" class="social-icon-wrapper" target="_blank">
                    <div class="social-icon">
                        <img :src="instagram" class="inner-icon" alt="">
                    </div>
                    <span>Instagram</span>
                </a>

                <a :href="facebookURL" class="social-icon-wrapper" target="_blank">
                    <div class="social-icon">
                        <img :src="facebook" class="inner-icon" alt="">
                    </div>
                    <span>Facebook</span>
                </a>

            </div>

            <div class="">
                <Listbox v-model="selectedLang">
                    <ListboxButton class="notranslate menu-btn-frame">
                        <img :src="global" style="width: 24px;">
                        <!-- <span class="">{{ useLang(locale) }}</span> -->

                        <img :src="`https://hatscripts.github.io/circle-flags/flags/${ locale }.svg`" class="h-5 w-5 lang-text" alt="" />
                        <!-- <span aria-hidden="true" class="v-icon notranslate ml-auto theme--light" style="font-size: 14px; height: 14px; width: 14px;"></span> -->
                    </ListboxButton>
                
                    <transition
                        leave-active-class="transition duration-100 ease-in"
                        leave-from-class="opacity-100"
                        leave-to-class="opacity-0"
                    >
                        <ListboxOptions as="div" class="v-menu__content theme--light menuable__content__active" role="menu" style="bottom: 100px; right: 1px; transform-origin: left top; z-index: 8;">
                                <ListboxOption
                                    v-for="lang in langs"
                                    :key="lang.name"
                                    :value="lang"
                                    as="div"
                                    @click="change(lang.symbol)" class="v-list menu-list notranslate text-left v-sheet theme--light"
                                >
                                <div class="v-list-item v-list-item--link theme--light" role="menuitem" tabindex="0">
                                    <div class="flex justify-center">
                                        <img :src="`https://hatscripts.github.io/circle-flags/flags/${ lang.symbol }.svg`" class="h-5 w-5" alt="" />
                                    </div>
                                </div>
                            </ListboxOption>
                        </ListboxOptions>

                    </transition>
                </Listbox>
            </div>
        </div>

        <div class="mx-2 pt-1 text-sm" style="border-top: 1px solid rgb(43, 46, 53);">
            &copy; {{ new Date().getFullYear() }} BNBStaker {{ t('all-rights-reserved') }}
        </div>
        
	</div>
</template>