<script lang="ts" setup>

const { t } = useI18n()

const enabled = ref(localStorage.getItem('notifications') ? false : true)

watch(enabled, () => {
    if (localStorage.getItem('notifications')) {
        localStorage.removeItem('notifications')
    } else {
        localStorage.setItem('notifications', 'false')
    }
})

</script>

<template>

    <div class="w-full">

        <div class="flex justify-between">

        <div>{{ t('sound-notifications') }}</div>

        <Switch
            v-model="enabled"
            :class="enabled ? 'bg-primary' : 'bg-red-400'"
            class="relative inline-flex h-[24px] w-[39px] shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75"
        >
            <span class="sr-only">{{ t('sound-notifications') }}</span>
            <span
                aria-hidden="true"
                :class="enabled ? 'translate-x-4' : 'translate-x-0'"
                class="pointer-events-none inline-block h-[19px] w-[19px] transform rounded-full bg-white shadow-lg ring-0 transition duration-200 ease-in-out"
            />
        </Switch>

    </div>

    </div>

</template>