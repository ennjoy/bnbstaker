<script lang="ts" setup>

defineProps<{
    admin: any,
    root: boolean
}>()

const { t } = useI18n()

const route = useRoute()
</script>

<template>
    <tr class="text-gray-400">

        <td class="px-4 py-3">
            <div class="flex items-center text-sm">
                <!-- Avatar with inset shadow -->
                <div class="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                    <img :src="`https://avatars.dicebear.com/api/avataaars/${ admin?.address }.svg`" class="object-cover w-full h-full rounded-full" alt="" loading="lazy">
                    <div class="absolute inset-0 rounded-full shadow-inner" aria-hidden="true"></div>
                </div>
                <div>
                    <RouterLink v-if="route.name == 'Manager' && route.params.id ? true : false" :to="{ name: 'Invite', params: { address: admin?.address } }" class="font-semibold hover:underline">{{ admin?.address }}</RouterLink>
                    
                    <div v-else-if="root" class="flex"> 
                        <RouterLink :to="{ name: 'Manager', params: { id: admin?.id } }" class="font-semibold hover:underline">{{ admin?.address }}</RouterLink>
                        <RouterLink :to="{ name: 'Invite', params: { address: admin?.address } }" class="ml-1 flex items-center uppercase text-xs text-gray-500 hover:underline">({{ t('invites') }})</RouterLink>
                    </div>

                    <RouterLink v-else :to="{ name: 'Invite', params: { address: admin?.address } }" class="font-semibold hover:underline">{{ admin?.address }}</RouterLink>
                </div>
            </div>
        </td>

        <td class="px-3 py-3 text-sm">
            {{ admin?.username }}
        </td>

        <td class="px-3 py-3 text-sm">
            {{ admin?.invitesCount }}
        </td>

        <td class="px-3 py-3 text-sm">
            {{ admin?.role }}
        </td>
    </tr>
</template>