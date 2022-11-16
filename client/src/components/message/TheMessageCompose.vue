<script lang="ts" setup>
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useMutation } from '@vue/apollo-composable'
import { PaperAirplaneIcon } from '@heroicons/vue/solid'
import { MESSAGES_QUERY, CREATE_MESSAGE_MUTATION } from '~/graphql'

const { t } = useI18n()

const schema = yup.object({
  content: yup.string().required().min(2).max(512)
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const { value: content } = useField('content')

const { mutate, loading, onDone }: any = useMutation(
  CREATE_MESSAGE_MUTATION,
  () => ({
    update: (cache, { data: { createMessage } }) => {
      
        console.log(createMessage)

        const data: any = cache.readQuery({
          query: MESSAGES_QUERY
        })

        const newData = JSON.parse(JSON.stringify(data))

        newData?.messages?.push(createMessage)

        cache.writeQuery({
          query: MESSAGES_QUERY,
          data: newData
        })
      
    }
  })
)

onDone(() => {
  resetForm()
})

const onSubmit = handleSubmit(values => {
  mutate({
    input: {
      content: values.content
    }
  })
})
</script>

<template>

    <div class="relative w-full p-2 flex items-center justify-between  border-gray-300 bg-white">
        <input v-model="content" :placeholder="t('enter-your-message')" class="py-1.5 mx-1 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" type="text" required>
        
        <button @click="onSubmit" class="outline-none focus:outline-none" type="submit">
            <Loading v-if="loading" class="h-5 w-5 text-gray-400" />
            <PaperAirplaneIcon v-else class="text-gray-400 h-7 w-7 origin-center transform rotate-90" />
        </button>
    </div>

</template>
