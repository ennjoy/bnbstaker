<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import { useAccountStore } from '~/stores/account'
import { usePriceStore } from '~/stores/price'
import logo from '~/assets/images/logo.png'
import twitter from '~/assets/images/twitter.svg'
import bnb from '~/assets/images/bnb.png'
import up from '~/assets/images/up.svg'

const { t } = useI18n()

const route = useRoute()

const account = useAccountStore()

const price: any = usePriceStore()

const breakpoints = useBreakpoints(breakpointsTailwind)

const smAndLarger = breakpoints.greater('sm')

const telegramURL = ref(import.meta.env.VITE_TELEGRAM_URL as string)

</script>

<template>
	<header class="nav-bar v-sheet theme--light v-toolbar v-app-bar v-app-bar--fixed h-16 mt-0 left-0 right-0 translate-y-0" data-booted="true">
		<div class="v-toolbar__content h-16">
			<RouterLink :to="{ name: 'Index' }" class="logo-link notranslate nuxt-link-exact-active nuxt-link-active">
                <img :src="logo" class="logo-icon" alt="">
                <div class="logo-text-wrapper">
                    <span class="logo-text">BNB<span class="ml-0.5">STAKER</span></span>
                    <div class="logo-via-txt">
                        {{ t('innovation') }}
                    </div>
                </div>
            </RouterLink>
            
			<div class="spacer"></div>

            <template v-if="route.name != 'Index'">
                <div v-show="smAndLarger" class="price-info notranslate">
                    <div class="coin-price">
                        <img :src="bnb" class="price-coin" alt="">
                        <div>{{ price[account.contract]?.usd }}</div>
                    </div>

                    <div v-if="price[account.contract]?.usd_24h_change" :class="[ Math.sign(price[account.contract]?.usd_24h_change) == 1 ? 'price-up' : 'price-down' ]" class="change-info">
                        <img v-if="Math.sign(price[account.contract]?.usd_24h_change) == 1" :src="up" class="change-coin" alt="">
                        <img v-else class="change-coin" src="data:image/svg+xml;base64,PD94bWwgdmVyc2lvbj0iMS4wIiBlbmNvZGluZz0idXRmLTgiPz4KPCEtLSBHZW5lcmF0b3I6IEFkb2JlIElsbHVzdHJhdG9yIDIzLjAuMSwgU1ZHIEV4cG9ydCBQbHVnLUluIC4gU1ZHIFZlcnNpb246IDYuMDAgQnVpbGQgMCkgIC0tPgo8c3ZnIHZlcnNpb249IjEuMSIgaWQ9ImxheWVyXzEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHg9IjBweCIgeT0iMHB4IgoJIHZpZXdCb3g9IjAgMCAzMDkuOCAyMDAiIHN0eWxlPSJlbmFibGUtYmFja2dyb3VuZDpuZXcgMCAwIDMwOS44IDIwMDsiIHhtbDpzcGFjZT0icHJlc2VydmUiPgo8c3R5bGUgdHlwZT0idGV4dC9jc3MiPgoJLnN0MHtmaWxsOiNFMzU1NjE7fQo8L3N0eWxlPgo8cGF0aCBjbGFzcz0ic3QwIiBkPSJNMjIyLjcsMTk1LjFjLTguNi0wLjQtMTYtOC42LTE1LjUtMTcuMWMwLjQtOC41LDguNy0xNS44LDE3LjItMTUuNGgyNS45bC04MC42LTc5LjhsLTQxLDQwLjYKCWMtMy41LDQuMi05LjYsNy43LTE1LjUsNi45Yy0zLjctMC41LTcuMi0yLjItOS43LTQuOUw1LjIsMjguMWMtNi43LTUuOS03LTE3LjQtMC43LTIzLjdjNi4zLTYuMiwxOC01LjgsMjMuOSwwLjlsODYuNyw4NS45CglsMzguOS0zOC41YzMuNi0zLjksNy4xLTguNiwxMi41LTkuNGM1LjQtMC44LDExLjIsMS4zLDE0LjgsNS40bDkyLjIsOTEuM3YtMjUuOWMtMC4xLTguNiw3LjctMTYuNSwxNi40LTE2LjVzMTYuNSw3LjksMTYuNCwxNi41Cgl2NjQuOWMwLDguNS03LjgsMTYuMi0xNi40LDE2LjJIMjIyLjciLz4KPC9zdmc+Cg==">   
                        <div>{{ price[account.contract]?.usd_24h_change }}%</div>
                    </div>
                </div>
                
                <TheHeaderConnectButton />
            </template>

			<template v-else>
                <div v-if="false" class="social-icon-wrapper">
                    <div class="social-icon">
                        <img :src="twitter" class="inner-icon" alt="">
                    </div>
                    <span>Twitter</span>
                </div>
                <a :href="telegramURL" class="social-icon-wrapper" target="_blank">
                    <div class="social-icon">
                        <img class="inner-icon" src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZmlsbD0iIzcxN2E4OSIgZD0ibTkuNDE3IDE1LjE4MS0uMzk3IDUuNTg0Yy41NjggMCAuODE0LS4yNDQgMS4xMDktLjUzN2wyLjY2My0yLjU0NSA1LjUxOCA0LjA0MWMxLjAxMi41NjQgMS43MjUuMjY3IDEuOTk4LS45MzFsMy42MjItMTYuOTcyLjAwMS0uMDAxYy4zMjEtMS40OTYtLjU0MS0yLjA4MS0xLjUyNy0xLjcxNGwtMjEuMjkgOC4xNTFjLTEuNDUzLjU2NC0xLjQzMSAxLjM3NC0uMjQ3IDEuNzQxbDUuNDQzIDEuNjkzIDEyLjY0My03LjkxMWMuNTk1LS4zOTQgMS4xMzYtLjE3Ni42OTEuMjE4eiIvPgo8L3N2Zz4K">
                    </div>
                    <span>Telegram</span>
                </a>

                <div v-if="false" class="social-icon-wrapper">
                    <div class="social-icon">
                        <img class="inner-icon" src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMjQgMjQiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+CiAgPHBhdGggZmlsbD0iIzcxN2E4OSIgZD0ibTkuNDE3IDE1LjE4MS0uMzk3IDUuNTg0Yy41NjggMCAuODE0LS4yNDQgMS4xMDktLjUzN2wyLjY2My0yLjU0NSA1LjUxOCA0LjA0MWMxLjAxMi41NjQgMS43MjUuMjY3IDEuOTk4LS45MzFsMy42MjItMTYuOTcyLjAwMS0uMDAxYy4zMjEtMS40OTYtLjU0MS0yLjA4MS0xLjUyNy0xLjcxNGwtMjEuMjkgOC4xNTFjLTEuNDUzLjU2NC0xLjQzMSAxLjM3NC0uMjQ3IDEuNzQxbDUuNDQzIDEuNjkzIDEyLjY0My03LjkxMWMuNTk1LS4zOTQgMS4xMzYtLjE3Ni42OTEuMjE4eiIvPgo8L3N2Zz4K">
                    </div>
                    <span>{{ t('channel') }}</span>
                </div>

                <TheHeaderChangeLang />
            </template>

		</div>
	</header>
</template>