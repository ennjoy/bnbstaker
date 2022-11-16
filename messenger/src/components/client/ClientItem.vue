<script lang="ts" setup>
import { useMoment } from '~/hooks/useMoment'

defineProps<{ client: any }>()

</script>

<template>

    <li>
        <RouterLink :to="{ name: 'ChatUser', params: { id: client.id } }" custom v-slot="{ href, navigate, isActive }">
            <a :href="href" @click="navigate" :class="{ 'bg-gray-100': isActive }" class="flex items-center w-full px-4 py-2 select-none hover:bg-gray-100 focus:outline-none">
                <img :src="`https://avatars.dicebear.com/api/avataaars/${ client.name || client.ip }.svg`" class="w-12 mr-3 rounded-full border" alt="" />
                <div class="transform translate-y-0.5 text-left">
                    <h3 class="leading-4 truncate w-52 sm:w-full">{{ client.name || client.ip  }}</h3>
                   
                    <span class="text-xs text-gray-500">{{ useMoment(client?.updatedAt) }}</span>
                </div>
            </a>
        </RouterLink>
    </li>

</template>