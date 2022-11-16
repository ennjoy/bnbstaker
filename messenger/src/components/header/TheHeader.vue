<script lang="ts" setup>

const { t } = useI18n()

</script>

<template>

    <!-- Account -->
    <div class="flex items-center border-b border-gray-200 p-3 relative">
        
        <TheSidebarChangeLang />

        <div class="flex items-center mx-auto">
            <!-- <button class="select-none font-semibold focus:outline-none">{{ t('clients') }}</button> -->

            <TheHeaderChangeRoom />
        </div>
        
        <!-- <button @click="useLogout">
            <LogoutIcon class="h-6 w-6 text-gray-500" />
        </button> -->

        <TheHeaderDropdown />

    </div>

</template>