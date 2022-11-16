
<script lang="ts" setup>
import * as yup from 'yup'
import { useToast } from 'vue-toastification'
import { useForm, useField } from 'vee-validate'
import { useQuery, useMutation } from '@vue/apollo-composable'
import { XIcon, CheckIcon, SelectorIcon, RefreshIcon } from '@heroicons/vue/outline'
import { ALL_ADMIN_QUERY, CHANGE_COMPANY_MUTATION } from '~/graphql'

const props = defineProps<{
    id: string,
    isOpen: boolean
}>()

const emit = defineEmits(['close'])

const { t } = useI18n()

const toast = useToast()

const query = ref('')

const { result, loading } = useQuery(
  ALL_ADMIN_QUERY,
  () => ({
    query: query.value || undefined
  })
)

const allAdmin = computed(() => result.value?.allAdmin ?? [])

const selected = ref(allAdmin.value[0])

const schema = yup.object({
    company: yup.string().required()
})

const { handleSubmit, resetForm } = useForm({
  validationSchema: schema,
})

const { value: company, errorMessage: companyError }: any = useField('company', selected.value?.id)

watchEffect(() => company.value = selected.value?.id)

const { mutate, loading: loadingChange, onDone } = useMutation(CHANGE_COMPANY_MUTATION)

const onSubmit = handleSubmit((values) => {

    mutate({
        companyId: values.company,
        id: props.id
    })

})

onDone(() => {
    toast.success(t('user-transferred-successfully'))
    resetForm()
    emit('close')
})
</script>

<template>
    <TransitionRoot appear :show="isOpen" as="template">
        <Dialog as="div" @close="isOpen = false">
            <div class="fixed inset-0 overflow-y-auto z-30">
                <div class="min-h-screen px-4 text-center">
                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0"
                        enter-to="opacity-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100"
                        leave-to="opacity-0"
                    >
                        <DialogOverlay class="fixed inset-0 bg-black opacity-30" />
                    </TransitionChild>

                    <span class="inline-block h-screen align-middle" aria-hidden="true">
                        &#8203;
                    </span>

                    <TransitionChild
                        as="template"
                        enter="duration-300 ease-out"
                        enter-from="opacity-0 scale-95"
                        enter-to="opacity-100 scale-100"
                        leave="duration-200 ease-in"
                        leave-from="opacity-100 scale-100"
                        leave-to="opacity-0 scale-95"
                    >
                        <div class="inline-block w-full max-w-md p-5 overflow-hidden text-left align-middle transition-all transform rounded-xl shadow-xl bg-gray-800">
                    
                            <DialogTitle as="h2" class="flex pb-2 text-xl font-medium leading-6 text-gray-400">
                                {{ t('change-company') }}
                                <button @click="isOpen = false" class="ml-auto">
                                    <XIcon class="fill-current text-gray-400 w-6 h-6 cursor-pointer" />
                                </button>
                            </DialogTitle>
                            
                            <div class="px-5 pb-5">

                                <div class="text-gray-300">{{ t('enter-username') }}</div>

                                <Combobox v-model="selected">
                                    <div class="relative mt-1">
                                        <div class="relative w-full cursor-default overflow-hidden rounded-lg focus:border-primary bg-gray-700 text-left shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-300 sm:text-sm">
                                            <ComboboxInput
                                                class="w-full py-2 pl-3 pr-10 text-sm leading-5 border-gray-600 bg-gray-700 focus:border-primary focus:outline-none focus:shadow-outline-purple text-gray-300 focus:shadow-outline-gray"
                                                :displayValue="(admin) => admin?.username"
                                                @change="query = $event.target.value"
                                            />
                                           <!-- `${ admin.username } ${ admin.role }`  -->
                                            <ComboboxButton class="absolute inset-y-0 right-0 flex items-center pr-2">
                                                <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
                                            </ComboboxButton>
                                        </div>

                                        <TransitionRoot
                                            leave="transition ease-in duration-100"
                                            leaveFrom="opacity-100"
                                            leaveTo="opacity-0"
                                            @after-leave="query = ''"
                                        >
                                            <ComboboxOptions class="absolute z-50 mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-700 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
                                                
                                                <div v-if="loading" class="flex justify-center items-center">
                                                    <Loading class="h-5 w-5 border-primary" />
                                                </div>

                                                <div v-else-if="!allAdmin.length && query !== ''" class="relative cursor-default select-none py-2 px-4 text-gray-300">
                                                    {{ t('company-not-found') }}
                                                </div>

                                                <template v-else>

                                                    <ComboboxOption
                                                        v-for="admin in allAdmin"
                                                        as="template"
                                                        :key="admin.id"
                                                        :value="admin"
                                                        v-slot="{ selected, active }"
                                                    >
                                                        <li
                                                            class="relative cursor-default select-none py-2 pl-10 pr-4"
                                                            :class="{
                                                                'bg-gray-500 text-white': active,
                                                                'text-gray-300': !active,
                                                            }"
                                                        >
                                                            <span :class="{ 'font-medium': selected, 'font-normal': !selected }" class="block truncate">
                                                                {{ admin.username }}
                                                            </span>
                                                            <span
                                                                v-if="selected"
                                                                class="absolute inset-y-0 left-0 flex items-center pl-3"
                                                                :class="{ 'text-white': active, 'text-gray-300': !active }"
                                                            >
                                                                <CheckIcon class="h-5 w-5" aria-hidden="true" />
                                                            </span>
                                                        </li>
                                                    </ComboboxOption>
                                                </template>
                                            </ComboboxOptions>
                                        </TransitionRoot>

                                    </div>
                                </Combobox>

                                <p>{{ companyError }}</p>
                            </div>

                            <hr class="mt-4">

                            <div class="flex flex-row-reverse p-3">
                                <div class="flex-initial pl-3">
                                    <button
                                        @click="onSubmit"
                                        type="button"
                                        class="flex items-center px-5 py-2.5 font-medium tracking-wide text-black capitalize bg-primary rounded hover:bg-opacity-70 focus:outline-none transition duration-300 transform active:scale-95 ease-in-out"
                                    >
                                        <div v-if="loadingChange" class="flex justify-center w-24 py-0.5">
                                            <Loading class="h-5 w-5 border-white" />
                                        </div>
                                        
                                        <div v-else class="flex">
                                            <RefreshIcon class="h-6 w-6" />
                                            <span class="pl-2 mx-1">{{ t('change') }}</span>
                                        </div>
                                    </button>
                                </div>


                            </div>
                                                
                        </div>
                    </TransitionChild>
                </div>
            </div>
        </Dialog>
    </TransitionRoot>
</template>
