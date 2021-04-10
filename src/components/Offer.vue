<template>
  <div class="h-60 w-full bg-gray-600 p-4 mb-4 overflow-auto relative">
    <div class="flex flex-col h-full" v-if="!showItems">
      <div class="flex-grow flex justify-between items-center text-white">
        <div class="flex flex-col text-center items-center">
          <img :src="offer.owner.avatar" class="overflow-hidden rounded-full border border-blue-800" alt="profile_pic" width="50" height="50">
          <div class="text-center font-medium">{{ offer.owner.name }}</div>
        </div>
        <div class="flex flex-col text-center items-center">
          <div class="text-xl">Price:</div>
          <div><strong>{{ offer.price + "€" }}</strong></div>
        </div>
        <div class="flex flex-col text-center items-center">
          <div class="text-xl">Status:</div>
          <div><strong>{{ getOfferStatus(offer.status) }}</strong></div>
        </div>
      </div>
      <div class="flex">
        <div class="bg-yellow-400 p-2 flex-grow text-xs flex justify-center items-center" :class="copyLinkActive ? 'bg-green-600' : 'bg-yellow-400'" @click.prevent="copyLink">{{ offer.id }}</div>
        <div class="p-4 border-2 border-blue-400 flex justify-center items-center text-white text-xs" @click.prevent="toggleItemView">ITEMS</div>
      </div>
    </div>
    <div class="flex flex-wrap overflow-y-auto" v-else>
      <div class="absolute top-0 left-0 p-2 text-white" @click.prevent="toggleItemView">
        <font-awesome-icon icon="arrow-left"/>
      </div>
      <div v-for="item in offer.items" :key="item.assetid" class="border-2 rounded-2xl overflow-hidden m-2 relative" :style="'border: ' + item.color">
        <img class="w-24" alt="item" :src="item.icon_url">
        <div class="absolute bottom-0 left-0 right-0 flex justify-center items-center opacity-60 text-white text-xs2 text-center">{{ item.name }}</div>
      </div>
    </div>
  </div>
</template>

<script>
const DEFAULT_LINK_URL = "https://mmtrading.herokuapp.com/offer/";

const OFFER_STATE_VALUES = {
  "-2" : {
    text: 'Owner withdraw',
  },
  "-1" : {
    text: 'Offer canceled',
  },
  "0" : {
    text: 'INITIAL CREATE',
  },
  "1" : {
    text: 'TRADE BAN HOLD',
  },
  "2" : {
    text: 'Offer ready',
  },
  "3" : {
    text: 'Buyer pays',
  },
  "4" : {
    text: 'Offer completed',
  },
}

export default {
  name: "Offer",
  props: {
    offer: {
      type: Object,
      default: () => ({}),
    }
  },
  data () {
    return {
      showItems: false,
      copyLinkActive: false,
    }
  },
  methods: {
    toggleItemView() {
      this.showItems = !this.showItems;
    },
    copyLink() {
      navigator.clipboard.writeText(DEFAULT_LINK_URL + this.offer.id);
      this.copyLinkActive = true;
      setTimeout(() => {
        this.copyLinkActive = false;
      },1000)
    },
    getOfferStatus(status) {
      return OFFER_STATE_VALUES[status].text;
    }
  }
}
</script>