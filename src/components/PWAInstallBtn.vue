<template>
  <div class="fixed bottom-0 left-0 right-0 h-20 bg-white border border-gray-200 m-2">
    <div
        class="absolute top-0 right-0 w-8 h-8 flex justify-center items-center cursor-pointer z-10"
        @click.prevent="$emit('close')"
    >
      <font-awesome-icon icon="times" class="w-4 h-4"/>
    </div>
    <div class="absolute inset-0 flex justify-center items-center">
      Download app to your mobile:
      <div
          @click="$emit('install')"
          class="cursor-pointer rounded-2xl ml-2 text-white bg-purple-800 flex justify-center items-center p-2"
      >
        INSTALL
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "PWAInstallBtn",
  emits: ['close', 'install'],
}
</script>