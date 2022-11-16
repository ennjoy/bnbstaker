<script setup>
import { CheckIcon, SelectorIcon } from '@heroicons/vue/solid'

const { t } = useI18n()

const router = useRouter()

const rooms = [
  {
    index: 0,
    name: 'clients'
  }
  // {
  //   index: 0,
  //   name: 'choose-a-room'
  // },
  // {
  //   index: 1,
  //   name: 'first-room'
  // },
  // {
  //   index: 2,
  //   name: 'second-room'
  // },
]

const selectedRoom = ref(JSON.parse(localStorage.getItem('room')) || rooms[0])

watch(selectedRoom, (value) => {
    localStorage.setItem('room', JSON.stringify(value))

    router.push({ name: 'Chat', query: { room: value?.index } })
})

</script>

<template>

    <Listbox v-model="selectedRoom">
      <div class="relative mt-1">
        <ListboxButton
          class="relative w-full cursor-default py-2 pl-3 pr-10 text-left focus:outline-none focus-visible:border-indigo-500 focus-visible:ring-2 focus-visible:ring-white focus-visible:ring-opacity-75 focus-visible:ring-offset-2 focus-visible:ring-offset-orange-300 sm:text-sm"
        >
          <span class="block uppercase truncate">{{ t(selectedRoom.name) }}</span>
          <span
            class="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2"
          >
            <SelectorIcon class="h-5 w-5 text-gray-400" aria-hidden="true" />
          </span>
        </ListboxButton>

        <transition
          leave-active-class="transition duration-100 ease-in"
          leave-from-class="opacity-100"
          leave-to-class="opacity-0"
        >
          <ListboxOptions
            class="absolute mt-1 z-50 max-h-60 w-full overflow-auto rounded-md bg-white py-1 text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm"
          >
            <ListboxOption
              v-slot="{ active, selected }"
              v-for="room in rooms"
              :key="room.index"
              :value="room"
              as="template"
            >
              <li
                :class="[
                  active ? 'bg-gray-100 text-gray-800' : 'text-gray-900',
                  'relative cursor-default select-none py-2 pl-10 pr-4',
                ]"
              >
                <span
                  :class="[
                    selected ? 'font-medium' : 'font-normal',
                    'block truncate',
                  ]"
                  >{{ t(room.name) }}</span
                >
                <span
                  v-if="selected"
                  class="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-500"
                >
                  <CheckIcon class="h-5 w-5" aria-hidden="true" />
                </span>
              </li>
            </ListboxOption>
          </ListboxOptions>
        </transition>
      </div>
    </Listbox>

</template>