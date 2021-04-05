<template>
  <div id="main" class="flex flex-col w-full h-full">
    <div id="title" class="w-full h-16 border-b-4 text-xl border-black flex justify-center items-center">
      {{ title }}
    </div>
    <div id="content" class="w-full h-full flex-grow overflow-auto">
      <router-view @setViewData="setViewData" :loading="loading" :error="error" :data="data"/>
    </div>
    <div id="navbar" class="h-20 flex border-t-2 border-black">
      <NavbarButton
        :selected="selected"
        :data="LINKS.MY_OFFERS"
      />
      <NavbarButton
        :selected="selected"
        :data="LINKS.BOUGHT_OFFERS"
      />
      <NavbarButton
        is-reload-button
        @refresh="refresh"
        :data="{link: selected, icon: 'redo-alt'}"
      />
      <NavbarButton
        :selected="selected"
        :data="LINKS.USER"
        no-border
      />
    </div>
  </div>
</template>

<script>
import NavbarButton from "@/components/NavbarButton";
import axiosGet from "@/utils/axiosGet";
const LINKS = {
  MY_OFFERS: {
    id: 'myoffers',
    link: '/myoffers',
    icon: 'list',
    title: 'My Offers',
    apiCall: 'owned',
  },
  BOUGHT_OFFERS: {
    id: 'boughtoffers',
    link: '/bought',
    icon: 'coins',
    title: 'Bought Offers',
    apiCall: 'bought',
  },
  USER: {
    id: 'userprofile',
    link: '/profile',
    icon: 'user',
    title: 'User Profile',
    apiCall: 'user',
  },
};

export default {
  components: {NavbarButton},
  data () {
    return {
      LINKS: LINKS,
      loading: false,
      data: {},
      error: false,
      title: LINKS.MY_OFFERS.title,
      selected: LINKS.MY_OFFERS.id,
    };
  },
  methods: {
    setViewData (value) {
      for(let view of Object.values(LINKS)) {
        if(view.id === value) {
          this.loadData(view.apiCall);
          this.title = view.title;
          this.selected = view.id;
        }
      }
    },
    async loadData (path) {
      this.data = null;
      this.error = null;
      this.loading = true;
      try {
        const response = await axiosGet(path);
        this.data = response.data;
      } catch {
        this.error = true;
      }
      this.loading = false;
    },
    refresh () {
      this.setViewData(this.selected);
    },
    created () {
      this.setViewData(LINKS.MY_OFFERS.id);
    }
  }
}
</script>