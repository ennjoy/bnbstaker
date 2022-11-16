<script lang="ts" setup>

const emit = defineEmits(['open'])

const { t } = useI18n()

const route = useRoute()

const router = useRouter()

const query = computed({
    get(value: string) {
        return value
    },

    set(newValue: string) {
        return router.push({
            ...route,
            query: {
                ...route.query,
                query: newValue.replace(/\s/g, '')
            }
        })
    }
})
</script>

<template>
    <header class="z-10 py-4 shadow-md bg-gray-800">
        <div class="container flex items-center justify-between h-full px-6 mx-auto text-primary">
            <!-- Mobile hamburger -->
            <button @click="emit('open')" class="p-1 mr-5 -ml-1 rounded-md md:hidden focus:outline-none focus:shadow-outline-purple" aria-label="Menu">
                <svg class="w-6 h-6" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z" clip-rule="evenodd"></path>
                </svg>
            </button>
            
            <!-- Search input -->
            <div class="flex justify-center flex-1 lg:mr-32">
                <div class="relative w-full max-w-xl mr-6 focus-within:text-primary">
                    <div class="absolute inset-y-0 flex items-center pl-2">
                        <svg class="w-4 h-4" aria-hidden="true" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clip-rule="evenodd"></path>
                        </svg>
                    </div>

                    <input v-model="query" :placeholder="t('search')" class="w-full h-10 pl-8 pr-2 text-sm border-0 rounded-md focus:shadow-outline-gray focus:placeholder-gray-600 bg-gray-700 text-gray-200 focus:bg-gray-900 focus:border-purple-300 focus:outline-none focus:shadow-outline-purple form-input" type="text" aria-label="Search">
                </div>

                <TheHeaderUserStatistics />
            </div>

            <TheHeaderAccount />
        
        </div>
    </header>
</template>