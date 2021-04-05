<template>
  <div class="w-full" :class="{'border-r-2 border-gray': !noBorder}">
    <button v-if="isReloadButton" class="w-full h-full focus:outline-none" @click.prevent="$emit('refresh')">
      <div class="w-full h-full flex justify-center items-center" :class="bgStyle">
        <font-awesome-icon :icon="data.icon"/>
      </div>
    </button>
    <router-link v-else :to="data.link">
      <div class="w-full h-full flex justify-center items-center" :class="bgStyle">
          <font-awesome-icon :icon="data.icon"/>
      </div>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "NavbarButton",
  emits: ['refresh'],
  props: {
    selected: String,
    isReloadButton: Boolean,
    noBorder: Boolean,
    data: {
      type: Object,
      default: () => ({})
    },
  },
  computed: {
    bgStyle () {
      return this.isReloadButton ? 'bg-blue-300' : this.data.id === this.selected ? 'bg-gray-300' : 'bg-white';
    }
  }
}
</script>