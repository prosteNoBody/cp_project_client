<template>
  <div class="flex flex-col justify-center items-center w-full h-full" v-if="loading">
    <div class="flex justify-center items-center">
      <div class="absolute animate-ping inline-flex h-10 w-10 rounded-full bg-purple-400 opacity-75"></div>
      <div class="absolute inline-flex rounded-full h-10 w-10 bg-purple-500"></div>
    </div>
    <div class="font-medium mt-10">
      Loading...
    </div>
  </div>
  <div class="flex justify-center items-center h-full w-full text-gray-600 font-medium" v-else-if="error">
    Error in fetching data
  </div>
  <slot v-else/>
</template>

<script>
export default {
  name: "LoadingPlaceholder",
  props: {
    loading: Boolean,
    error: Boolean,
  }
}
</script>