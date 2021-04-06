<template>
  <LoadingPlaceholder :loading="loading" :error="error">
    <div v-if="isEmpty" class="flex justify-center items-center h-full text-gray-600">
      You have no owned offers
    </div>
    <div v-else>
      <Offer v-for="offer in data.offers" :key="offer.id" :offer="offer"/>
    </div>
  </LoadingPlaceholder>
</template>

<script>
import LoadingPlaceholder from "@/components/LoadingPlaceholder";
import Offer from "@/components/Offer";

export default {
  name: "myoffers",
  emits: ['setViewData'],
  components: {
    Offer,
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
  computed: {
    isEmpty() {
      return this.data.offers?.length === 0;
    }
  },
  mounted() {
    document.title = "My Offers";
    this.$emit('setViewData', 'myoffers');
  }
}
</script>