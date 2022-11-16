<script lang="ts" setup>
import { useQuery } from '@vue/apollo-composable'
import { UserGroupIcon, CheckIcon } from '@heroicons/vue/outline'
import { REGISTRATION_COUNT_QUERY } from '~/graphql'

const { t } = useI18n()

const clocks = [
  {
    hours: 1,
    name: 'last-hour'
  },
  {
    hours: 12,
    name: 'twelve-hours'
  },
  {
    hours: 24,
    name: 'a-day'
  },
  {
    hours: 168,
    name: 'a-week'
  },
  {
    hours: 720,
    name: 'month'
  },
  {
    hours: 10_000,
    name: 'all-time'
  },
]

const selectedClock = ref(clocks[2])

const { result, loading } = useQuery(
  REGISTRATION_COUNT_QUERY,
  () => ({
    hours: selectedClock.value?.hours,
  })
)

const registrationCount = computed(() => result.value?.registrationCount ?? null)

</script>

<template>

  <Listbox v-model="selectedClock">
    <div class="relative">
      <ListboxButton class="flex justify-center items-center space-x-2 cursor-pointer mr-5 h-full w-24 text-base p-1 rounded-md bg-primary text-gray-900">
        <Loading v-if="loading" class="h-5 w-5 border-gray-900" />
          <template v-else>
            <span>+{{ registrationCount }}</span>
            <UserGroupIcon class="h-5 w-5 text-gray-900" />
          </template>
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-gray-800 py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption
            v-slot="{ active, selected }"
            v-for="clock in clocks"
            :key="clock.hours"
            :value="clock"
            as="template"
          >
              <li :class="[ active ? 'bg-gray-700 text-gray-300' : 'text-gray-400', 'relative cursor-pointer select-none py-2 pl-10 pr-4' ]">
                  <span :class="[ selected ? 'font-medium' : 'font-normal', 'block truncate' ]">
                    {{ t(clock.name) }}
                  </span>
                  <span v-if="selected" class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400">
                      <CheckIcon class="h-5 w-5" aria-hidden="true" />
                  </span>
              </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>

</template>
