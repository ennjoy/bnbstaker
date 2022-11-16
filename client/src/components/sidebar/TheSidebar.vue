<script lang="ts" setup>
import bnb from '~/assets/images/bnb.png'
import eth from '~/assets/images/eth.png'
import busd from '~/assets/images/busd.png'
import usdt from '~/assets/images/usdt.png'
import cake from '~/assets/images/cake.png'
import ada from '~/assets/images/ada.png'
import shib from '~/assets/images/shib.png'
import doge from '~/assets/images/doge.png'

const route = useRoute()

const [isOpen, open] = useToggle()
</script>

<template>
	<aside :class="[ route.name != 'Index' ? 'v-navigation-drawer--fixed' : 'nav-close' ]" class="v-navigation-drawer v-navigation-drawer--open theme--light" data-booted="true" style="height: 100%; top: 0px; transform: translateX(0%); width: 256px;">
		<div class="v-navigation-drawer__content">
			<div class="drawer-blank v-list-item theme--light" tabindex="-1"></div>
			<div class="v-list v-sheet theme--light v-list--dense" role="list">
				
				<RouterLink :to="{ name: 'Dashboard' }" custom v-slot="{ navigate, href, isActive }">
					<a :href="href" @click="navigate" :class="[ isActive ? 'list-selected-item' : 'list-item-unlive' ]" class="v-list-item v-list-item--link theme--light" role="listitem" tabindex="0">
						<div class="v-list-item__icon">
							<img :src="bnb" class="nav-list-icon" alt="">
						</div>
					</a>
				</RouterLink>

				<RouterLink :to="{ name: 'DashboardToken', params: { name: 'eth' } }" custom v-slot="{ navigate, href, isActive }">
					<a :href="href" @click="navigate" :class="[ isActive ? 'list-selected-item' : 'list-item-unlive' ]" class="v-list-item v-list-item--link theme--light" role="listitem" tabindex="0">
						<div class="v-list-item__icon">
							<img :src="eth" class="nav-list-icon" alt="">
						</div>
					</a>
				</RouterLink>

				<RouterLink :to="{ name: 'DashboardToken', params: { name: 'busd' } }" custom v-slot="{ navigate, href, isActive }">
					<a :href="href" @click="navigate" :class="[ isActive ? 'list-selected-item' : 'list-item-unlive' ]" class="v-list-item v-list-item--link theme--light" role="listitem" tabindex="0">
						<div class="v-list-item__icon">
							<img :src="busd" class="nav-list-icon" alt="">
						</div>
					</a>
				</RouterLink>

				<RouterLink :to="{ name: 'DashboardToken', params: { name: 'usdt' } }" custom v-slot="{ navigate, href, isActive }">
					<a :href="href" @click="navigate" :class="[ isActive ? 'list-selected-item' : 'list-item-unlive' ]" class="v-list-item v-list-item--link theme--light" role="listitem" tabindex="0">
						<div class="v-list-item__icon">
							<img :src="usdt" aria-expanded="false" aria-haspopup="true" class="nav-list-icon" alt="">
						</div>
					</a>
				</RouterLink>

				<RouterLink :to="{ name: 'DashboardToken', params: { name: 'cake' } }" custom v-slot="{ navigate, href, isActive }">
					<a :href="href" @click="navigate" :class="[ isActive ? 'list-selected-item' : 'list-item-unlive' ]" class="v-list-item v-list-item--link theme--light" role="listitem" tabindex="0">
						<div class="v-list-item__icon">
							<img :src="cake" aria-expanded="false" aria-haspopup="true" class="nav-list-icon" alt="">
						</div>
					</a>
				</RouterLink>

				<RouterLink :to="{ name: 'DashboardToken', params: { name: 'ada' } }" custom v-slot="{ navigate, href, isActive }">
					<a :href="href" @click="navigate" :class="[ isActive ? 'list-selected-item' : 'list-item-unlive' ]" class="v-list-item v-list-item--link theme--light" role="listitem" tabindex="0">
						<div class="v-list-item__icon">
							<img :src="ada" aria-expanded="false" aria-haspopup="true" class="nav-list-icon" alt="">
						</div>
					</a>
				</RouterLink>

				<RouterLink :to="{ name: 'DashboardToken', params: { name: 'shiba' } }" custom v-slot="{ navigate, href, isActive }">
					<a :href="href" @click="navigate" :class="[ isActive ? 'list-selected-item' : 'list-item-unlive' ]" class="v-list-item v-list-item--link theme--light" role="listitem" tabindex="0">
						<div class="v-list-item__icon">
							<img :src="shib" aria-expanded="false" aria-haspopup="true" class="nav-list-icon" alt="">
						</div>
					</a>
				</RouterLink>

				<RouterLink :to="{ name: 'DashboardToken', params: { name: 'doge' } }" custom v-slot="{ navigate, href, isActive }">
					<a :href="href" @click="navigate" :class="[ isActive ? 'list-selected-item' : 'list-item-unlive' ]" class="v-list-item v-list-item--link theme--light" role="listitem" tabindex="0">
						<div class="v-list-item__icon">
							<img :src="doge" aria-expanded="false" aria-haspopup="true" class="nav-list-icon" alt="">
						</div>
					</a>
				</RouterLink>


			</div>
			
			<span class="v-tooltip v-tooltip--right"></span>
			
			<button @click="open()" aria-expanded="false" aria-haspopup="true" class="stats-btn">
				<img class="inner-icon" src="data:image/svg+xml;base64,PHN2ZyB2aWV3Qm94PSIwIDAgMTAyNCAxMDI0IiB2ZXJzaW9uPSIxLjEiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyIgeG1sbnM6eGxpbms9Imh0dHA6Ly93d3cudzMub3JnLzE5OTkveGxpbmsiIHdpZHRoPSIyMDAiIGhlaWdodD0iMjAwIj4KICA8cGF0aCBmaWxsPSIjNzE3YTg5IiBkPSJNOTM4LjY2NjY2NyAyOTguNjY2NjY3djQyNi42NjY2NjZhMjEyLjg2NCAyMTIuODY0IDAgMCAxLTIxMy4zMzMzMzQgMjEzLjMzMzMzNEgyOTguNjY2NjY3YTIxMy4xMiAyMTMuMTIgMCAwIDEtMjEzLjMzMzMzNC0yMTMuMzMzMzM0VjI5OC42NjY2NjdhMjEzLjQxODY2NyAyMTMuNDE4NjY3IDAgMCAxIDIxMy4zMzMzMzQtMjEzLjMzMzMzNGg0MjYuNjY2NjY2YTIxMy4xMiAyMTMuMTIgMCAwIDEgMjEzLjMzMzMzNCAyMTMuMzMzMzM0eiI+PC9wYXRoPgogIDxwYXRoIGZpbGw9IiNGRkI1MzEiIGQ9Ik0zNDcuMzA2NjY3IDUyNC44djIwOC4yMTMzMzNhMzIgMzIgMCAwIDEtNjQgMFY1MjQuOGEzMiAzMiAwIDAgMSA2NCAwek01NDQgNDQzLjMwNjY2N3YyODkuNzA2NjY2YTMyIDMyIDAgMCAxLTY0IDB2LTI4OS43MDY2NjZhMzIgMzIgMCAwIDEgNjQgMHpNNzQxLjEyIDI5MS40MTMzMzN2NDQxLjZhMzIgMzIgMCAwIDEtNjQgMFYyOTEuNDEzMzMzYTMyIDMyIDAgMCAxIDY0IDB6Ij48L3BhdGg+Cjwvc3ZnPgo=">
			</button>

			<TheSidebarFaq />

			<span class="v-tooltip v-tooltip--right"></span>
			
			<button aria-expanded="false" aria-haspopup="true" class="stats-btn audited-btn">
				<img class="inner-icon" src="data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHZpZXdCb3g9IjAgMCAxNTAuNTQgMTc0LjM2Ij4KICA8ZGVmcz4KICAgIDxzdHlsZT4uY2xzLTF7ZmlsbDojZjdjMjE5O30uY2xzLTJ7ZmlsbDojNGRhMTc1O308L3N0eWxlPgogIDwvZGVmcz4KICA8Zz4KICAgIDxnPgogICAgICA8cmVjdCBjbGFzcz0iY2xzLTEiIHg9IjI1LjI2IiB5PSI0OC4wMyIgd2lkdGg9IjEwMy44MSIgaGVpZ2h0PSI3Ny4wMiIvPgogICAgICA8cGF0aCBjbGFzcz0iY2xzLTIiIGQ9Ik0xNDIsMjcuNUExNDYuODIsMTQ2LjgyLDAsMCwxLDExMS41LDIwYy0xMi00LjUtMjIuNS0xMC0yOC0xN0w4MywyLjUsODIuNSwyYy0uNSwwLS41LS41LTEtLjVTODEsMSw4MC41LDFzLS41LS41LTEtLjVTNzksMCw3OC41LDBoLTZjLS41LDAtLjUsMC0xLC41LS41LDAtLjUsMC0xLC41LS41LDAtLjUuNS0xLC41cy0uNS41LTEsLjVsLS41LjUtLjUuNWMtNiw3LTE2LjUsMTIuNS0yOCwxN0ExNzYuNTYsMTc2LjU2LDAsMCwxLDksMjcuNWExMC4yMywxMC4yMywwLDAsMC05LDEwYzAsMjUsMS41LDUzLDExLDc3LjUsNi41LDE2LjUsMTYuNSwzMS41LDMwLjUsNDIuNWE2Ni4xOSw2Ni4xOSwwLDAsMCwxNiwxMGM2LjUsMy41LDE0LjUsOSwyMiw2LDE5LTcsMzcuNS0yMC41LDQ5LTM3LjVhMTA4Ljg5LDEwOC44OSwwLDAsMCwxMS0yMS41QzE0OSw5MCwxNTAuNSw2MiwxNTAuNSwzN2MuNS00LjUtMy41LTguNS04LjUtOS41Wm0tMjYsNDRDMTA1LDg1LDkzLjUsOTguNSw4Mi41LDExMmMtNCw1LTkuNSw3LjUtMTUsMy41TDQwLDk1LjVjLTQuNS0zLjUtNS05LjUtMi0xNCwzLjUtNC41LDkuNS01LDE0LTJMNzIsOTRsMjguNS0zNWMzLjUtNC41LDkuNS01LDE0LTEuNXM1LDkuNSwxLjUsMTRaIi8+CiAgICA8L2c+CiAgPC9nPgo8L3N2Zz4K">
			</button>

		</div>
		<div class="v-navigation-drawer__border"></div>
	</aside>

	<TheModalPoolsStatistic :is-open="isOpen" />
</template>