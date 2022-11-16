<script lang="ts" setup>
import { useMoment } from '~/hooks/useMoment'
import { useAbbreviate } from '~/hooks/useAbbreviate'
import { useCoin } from '~/hooks/useCoin'

defineProps<{ transaction: any }>()

</script>

<template>

    <tr class="text-gray-400">

        <td class="px-3 py-3 text-sm">
            <span :class="[ transaction?.status ? 'bg-green-500' : 'bg-red-500' ]" class="text-white rounded py-0.5 px-1">
               {{ transaction?.status ? '+' : '-' }}{{ useAbbreviate(transaction?.amount) }}
            </span>
        </td>

        <td class="px-3 py-3 text-sm">
            {{ useCoin(transaction?.token) }}
        </td>

        <td class="px-3 py-3 text-sm">
            {{ transaction?.plan }}
        </td>


        <td class="px-4 py-3 text-sm whitespace-nowrap">
            {{ useMoment(transaction?.createdAt) }}
        </td>
    </tr>

</template>