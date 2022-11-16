<script lang="ts" setup>
import { breakpointsTailwind } from '@vueuse/core'
import { useTruncate } from '~/hooks/useTruncate'
import logo from '~/assets/images/logo.png'
import logoBg from '~/assets/images/logo-bg.svg'
import phone from '~/assets/images/phone.png'
import bnb from '~/assets/images/bnb.png'
import busd from '~/assets/images/busd.png'
import usdt from '~/assets/images/usdt.png'
import cake from '~/assets/images/cake.png'
import ada from '~/assets/images/ada.png'
import doge from '~/assets/images/doge.png'
import shib from '~/assets/images/shib.png'
import abstract from '~/assets/images/abstract.svg'
import investorBg from '~/assets/images/investor-bg.svg'
import promoterBg from '~/assets/images/promoter-bg.svg'
import roleBg from '~/assets/images/role-bg.png'

const { t } = useI18n()

const breakpoints = useBreakpoints(breakpointsTailwind)
const smAndLarger = breakpoints.greater('sm')

</script>

<template>
	<main class="v-main" data-booted="true" style="padding: 0px;">
		<div class="v-main__wrap">
			<div :class="{ 'home-page-sm': !smAndLarger  }" class="home-page" style="min-height: 860px;">
				<div class="top-content">
					<img :src="logoBg" class="bg-img" alt="">
					<div class="container">
						<div class="top-text-left">
							<div class="text-wrapper">
								<div class="prj-title">
									<div class="logo-wrapper"><img :src="logo" alt="" /></div>
									<div class="logo-text notranslate">
										<span style="font-weight: 700; margin-right: 2px;">BNB</span>STAKER
									</div>
								</div>

								<div class="my-2">
									<TheAirdrop />
								</div>

								<div class="brief-text">
									#{{ t('stable') }} &amp; {{ t('profitable') }}<br>
									{{ t('experimental-yield-farming') }}<br>
									{{ t('on-binance-smart-chain') }}
								</div>

								<div class="daily-text-wrapper">
									<div class="daily-text">
										{{ t('earn-from') }} 8% - 18% {{ t('up-to') }} 240%
									</div>
								</div>

								<div class="btn-wrapper">
									<RouterLink :to="{ name: 'Dashboard' }" class="base-btn pane-btn enter-btn v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default">
										<span class="v-btn__content">{{ t('enter-app') }}</span>
									</RouterLink>
									
									<TheDocButton />
								</div>
							</div>
						</div>
						<div class="top-pic-right">
							<div class="bg-circle">
								<span class="b-circle-1"></span>
								<span class="b-circle-2"></span>
								<span class="b-circle-3"></span>
								<span class="b-circle-4"></span>
								<span class="b-circle-5"></span>
							</div>
              				<img class="phone-img" :src="phone" alt="">
							<div class="top-coins-1"><img :src="bnb" alt=""></div>
							<div class="top-coins-2"><img :src="busd" alt=""></div>
							<div class="top-coins-3"><img :src="shib" alt=""></div>
							<div class="top-coins-4"><img :src="doge" alt=""></div>
							<div class="top-coins-5"><img :src="usdt" alt=""></div>
							<div class="top-coins-6"><img :src="ada" alt=""></div>
							<div class="top-coins-7"><img :src="cake" alt=""></div>
						
						</div>
					</div>
				</div>
				<div class="coins-info">
					<div class="container">
						<div :class="{ 'coins-board-wrapper-sm': !smAndLarger }" class="coins-board-wrapper">
							<div class="brief-header">
								#{{ t('global-statistics') }}
							</div>
							<div class="coins-board">
								
								<TheGlobalStats />

								<a href="https://bscscan.com/address/0x625b02b687ec38f3085af5b108dda410775fa76a" class="verified-btn" target="_blank">
									<div class="btn-inner">
										<div>{{ t('verified-contract') }}</div>
										<span>[ {{ useTruncate('0x625b02b687ec38f3085af5b108dda410775fa76a', 15) }} ]</span>
									</div>
								</a>

								<a href="https://bscsmart.tech/audit/bnbstaker" class="verified-btn btn-mb-4" target="_blank">
									<div class="btn-inner">
										<div>{{ t('audit-report') }}</div>
									</div>
								</a>

								<div class="launch-info">
									{{ t('bnbstaker-is-committed') }}
								</div>
							</div>
						</div>
					</div>
				</div>
				<div class="role-brief">
					<img :src="roleBg" class="role-bg" alt="">
					<div class="grid-shi"></div>
					<div class="container">
						<div class="brief-header text-left">
							#{{ t('make-your-crypto-work-for-you') }}
						</div>

						<div :class="{ 'content-wrapper': smAndLarger }">
							<div class="role-wrapper">
								<div class="investor-card v-card v-sheet theme--light">
									<img :src="investorBg" class="card-bg" alt="">
									<div class="v-card__title">
										{{ t('as-an-investor') }}
									</div>
									
									<TheInvestedPlans />
								</div>
							</div>
							<div class="role-wrapper">
								<div class="promoter-card v-card v-sheet theme--light">
									<img :src="promoterBg" class="card-bg" alt="">
									<div class="v-card__title">
										{{ t('as-a-promoter') }}
									</div>
									<div class="v-card__text">
										<div class="ref-table notranslate">
											<div class="ref-item">
												<div>
													{{ t('lvl') }} 1
												</div>
												<div>
													5%
												</div>
											</div>
											<div class="ref-item">
												<div>
													{{ t('lvl') }} 2
												</div>
												<div>
													2%
												</div>
											</div>
											<div class="ref-item">
												<div>
													{{ t('lvl') }} 3
												</div>
												<div>
													1%
												</div>
											</div>
											<div class="ref-item">
												<div>
													{{ t('lvl') }} 4
												</div>
												<div>
													1%
												</div>
											</div>
											<div class="ref-item">
												<div>
													{{ t('lvl') }} 5
												</div>
												<div>
													1%
												</div>
											</div>
										</div>
										<div class="role-text">
											{{ t('you-will-be-pleasantly') }}
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<TheBriefInfo />

				<div class="d-flex flex-column justify-center align-center start-to-join">
					<img :src="abstract" class="abstract-bg-1" alt="">
          			<img :src="abstract" class="abstract-bg-2" alt="">
					<div class="join-wrapper my-8">
						<div class="join-title">
							{{ t('start-joining-now') }}
						</div>
            
						<RouterLink :to="{ name: 'Dashboard' }" class="base-btn v-btn v-btn--is-elevated v-btn--has-bg v-btn--router theme--light v-size--default">
							<span class="v-btn__content">{{ t('enter-app') }}</span>
						</RouterLink>
					</div>
				</div>
			</div>

			<div class="footer footer-narrow-width">
				<TheFooter />
			</div>
      
		</div>
	</main>
</template>

<route lang="yaml">
name: Index
</route>