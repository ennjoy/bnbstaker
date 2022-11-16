<script lang="ts" setup>

const { t } = useI18n()

const route = useRoute()

const plans = ref(['bg-purple-500', 'bg-blue-500', 'bg-orange-500', 'bg-green-500'])
</script>

<template>
    <div class="grid gap-6 mb-8 grid-cols-2 md:grid-cols-4 xl:grid-cols-4">
        <RouterLink v-for="(plan, index) in plans" :key="index" :to="{ name: route.name, query: { ...route.query, plan: index } }" custom v-slot="{ href, navigate }">
            <a :href="href" @click="navigate" :class="[ route.query.plan as any == index ? plan : 'bg-gray-800' ]" class="flex justify-center items-center py-3 rounded text-white">
                <span class="text-base">{{ index }} {{ t('plan') }}</span>
            </a>
        </RouterLink>
    </div>
</template>