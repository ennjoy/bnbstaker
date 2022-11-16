<script lang="ts" setup>
import { useMoment } from '~/hooks/useMoment'

defineProps<{ user: any }>()
</script>

<template>
    <tr class="text-gray-400">
        <td class="px-4 py-3">
            <div class="flex items-center text-sm">
                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                    <img :src="`https://avatars.dicebear.com/api/avataaars/${ user?.owner }.svg`" class="object-cover w-full h-full rounded-full" alt="" loading="lazy">
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                    <RouterLink :to="{ name: 'Invite', params: { address: user?.owner } }" class="font-semibold hover:underline">{{ user?.owner }}</RouterLink>
                </div>
            </div>
        </td>

        <td class="px-4 py-3">
            <div class="flex items-center text-sm">
                <!-- Avatar with inset shadow -->
                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                    <img :src="`https://avatars.dicebear.com/api/avataaars/${ user?.address }.svg`" class="object-cover w-full h-full rounded-full" alt="" loading="lazy">
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                    <RouterLink :to="{ name: 'Invite', params: { address: user?.address } }" class="font-semibold hover:underline">{{ user?.address }}</RouterLink>
                </div>
            </div>
        </td>
        
        <td class="px-4 py-3 text-sm">
            {{ useMoment(user?.createdAt) }}
        </td>
    </tr>

</template>