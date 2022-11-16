<script lang="ts" setup>

const [isOpen, open] = useToggle()

</script>

<template>
  <div class="flex h-screen bg-gray-900">

    <TheSidebar />

    <TheSidebarMobile :is-open="isOpen" @close="isOpen = false" />

    <div class="flex flex-col flex-1 w-full">
      <TheHeader @open="open" />

      <main class="h-full overflow-y-auto">
        <div class="container px-6 mx-auto grid">
          <RouterView />
        </div>
      </main>

    </div>
    
  </div>

</template>
