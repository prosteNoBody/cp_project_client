<template>
  <LoadingPlaceholder :loading="loading" :error="error">
    <div v-if="isEmpty" class="flex justify-center items-center h-full text-gray-600">
      You have no bought offers
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
  name: "boughtoffers",
  emits: ['setViewData'],
  components: {
    LoadingPlaceholder,
    Offer
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
    document.title = "Bought Offers";
    this.$emit('setViewData', 'boughtoffers');
  }
}
</script>