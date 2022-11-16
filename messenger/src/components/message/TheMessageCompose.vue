<script lang="ts" setup>
import * as yup from 'yup'
import { useForm, useField } from 'vee-validate'
import { useMutation } from '@vue/apollo-composable'
import { PaperAirplaneIcon } from '@heroicons/vue/solid'
import { MESSAGES_QUERY, CREATE_MESSAGE_MUTATION } from '~/graphql'

const { t } = useI18n()
const route = useRoute()

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
          query: MESSAGES_QUERY,
          variables: {
            id: route.params.id
          }
        })

        const newData = JSON.parse(JSON.stringify(data))

        newData?.messages?.push(createMessage)

        cache.writeQuery({
          query: MESSAGES_QUERY,
          data: newData,
          variables: {
            id: route.params.id
          }
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
      id: route.params.id,
      content: values.content
    }
  })
})
</script>

<template>

  <div class="w-full py-3 px-3 flex items-center justify-between border-t border-gray-300">
    <button v-if="false" class="outline-none focus:outline-none">
      <svg class="text-gray-400 h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
      </svg>
    </button>

    <input v-model="content" :placeholder="`${ t('enter-your-message') }....`" class="py-2 mx-3 pl-5 block w-full rounded-full bg-gray-100 outline-none focus:text-gray-700" type="text" required />

    <button @click="onSubmit" class="outline-none focus:outline-none" type="submit">
      <Loading v-if="loading" class="h-5 w-5 text-gray-400" />
      <PaperAirplaneIcon v-else class="text-gray-400 h-7 w-7 origin-center transform rotate-90" />
    </button>
  </div>
</template>