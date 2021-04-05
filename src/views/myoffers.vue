<template>
  <LoadingPlaceholder :loading="loading" :error="error">

  </LoadingPlaceholder>
</template>

<script>
import LoadingPlaceholder from "@/components/LoadingPlaceholder";

export default {
  name: "myoffers",
  emits: ['setViewData'],
  components: {
    LoadingPlaceholder,
  },
  props: {
    loading: Boolean,
    data: {
      type: Object,
      default: () => ({})
    },
    error: Boolean,
  },
  mounted() {
    document.title = "My Offers";
    this.$emit('setViewData', 'myoffers');
  }
}
</script>