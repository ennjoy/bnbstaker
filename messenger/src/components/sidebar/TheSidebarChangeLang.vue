
<script lang="ts" setup>
const { locale } = useI18n()

const langs = ['cn', 'us']

const selectedLang = ref(locale)

function change(symbol: string) {
  locale.value = symbol
  localStorage.setItem('locale', symbol)
}

</script>

<template>
  <Listbox v-model="selectedLang">
    <div class="relative">
      <ListboxButton class="relative flex justify-center items-center w-10 h-10">
        <img :src="`https://hatscripts.github.io/circle-flags/flags/${ selectedLang }.svg`" class="h-6 w-6" alt="" />
      </ListboxButton>

      <transition
        leave-active-class="transition duration-100 ease-in"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <ListboxOptions class="absolute mt-1 max-h-60 w-full overflow-auto rounded-md bg-white text-base shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none sm:text-sm">
          <ListboxOption
            v-slot="{ active }"
            v-for="lang in langs"
            :key="lang"
            :value="lang"
            @click="change(lang)"
            as="template"
          >
            <li :class="[ active ? 'bg-gray-100' : 'text-gray-900', 'relative cursor-pointer select-none flex justify-center p-2' ]">
              <img :src="`https://hatscripts.github.io/circle-flags/flags/${ lang }.svg`" class="h-6 w-6" alt="" />
            </li>
          </ListboxOption>
        </ListboxOptions>
      </transition>
    </div>
  </Listbox>
</template>
