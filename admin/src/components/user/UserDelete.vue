<script lang="ts" setup>
import { useMutation } from '@vue/apollo-composable'
import { TrashIcon } from '@heroicons/vue/outline'
import { USER_DELETE_MUTATION } from '~/graphql'

const props = defineProps<{
    id: string
}>()

const { t } = useI18n()

const { mutate }: any = useMutation(
    USER_DELETE_MUTATION,
    () => ({
        variables: {
            id: props.id
        },
        update: (cache, { data: { userDelete } }) => {
            if (!userDelete) return

            cache.evict({ id: cache.identify({ __typename: 'User', id: props.id }) })
        }
    })
)

function remove() {

    const isConfirm = confirm(t('confirm-deletions'))

    if (isConfirm) {
        mutate()
    }
    
}
</script>

<template>

    <button @click="remove()" class="flex items-center justify-between px-2 py-2 text-sm font-medium leading-5 rounded-lg text-gray-400 hover:text-primary hover:bg-gray-700 focus:outline-none focus:shadow-outline-gray" aria-label="Information">
        <TrashIcon class="w-5 h-5" />
    </button>

</template>