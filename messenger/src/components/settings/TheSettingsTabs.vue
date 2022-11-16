<script setup>

const { t } = useI18n()

</script>

<template>
    <TabGroup :defaultIndex="1">
        <TabList class="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
            
            <Tab as="template" v-slot="{ selected }">
                <button
                    :class="[
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-900',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]"
                    >
                    {{ t('notifications') }}
                </button>
            </Tab>

            <Tab as="template" v-slot="{ selected }">
                <button
                    :class="[
                        'w-full rounded-lg py-2.5 text-sm font-medium leading-5 text-gray-900',
                        'ring-white ring-opacity-60 ring-offset-2 ring-offset-gray-400 focus:outline-none focus:ring-2',
                        selected
                            ? 'bg-white shadow'
                            : 'text-blue-100 hover:bg-white/[0.12] hover:text-white',
                        ]"
                    >
                    {{ t('answering-machine') }}
                </button>
            </Tab>
        </TabList>

        <TabPanels class="mt-2">
            <TabPanel
                :class="[
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 outline-none focus:outline-none',
                ]"
            >
                <TheSettingsSoundNotify />
            </TabPanel> 

            <TabPanel
                :class="[
                    'rounded-xl bg-white p-3',
                    'ring-white ring-opacity-60 ring-offset-2 ring-offset-blue-400 focus:outline-none',
                ]"
            >
                <TheSettingsAnsweringMachine />
            </TabPanel>
        </TabPanels>
    </TabGroup>
</template>



