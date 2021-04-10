<template>
  <div id="main" class="flex flex-col w-full h-full">
    <div id="title" class="w-full h-16 border-b-4 text-xl border-black flex justify-center items-center">
      {{ title }}
    </div>
    <div id="content" class="w-full h-full flex-grow overflow-auto">
      <router-view @setViewData="setViewData" :loading="loading" :error="error" :data="data" :ip="IP"/>
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
    <PWAInstallBtn
      v-if="pwaInstallVisibility"
      @close="pwaInstallVisibility = false"
      @install="installPwa"
    />
  </div>
</template>

<script>
import NavbarButton from "@/components/NavbarButton";
import PWAInstallBtn from "@/components/PWAInstallBtn";
import axiosGet from "@/utils/axiosGet";

const IP = '192.168.0.133';
const BASE_URL = 'http://' + IP + ':3000/';
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
  components: {
    NavbarButton,
    PWAInstallBtn,
  },
  data () {
    return {
      LINKS: LINKS,
      loading: false,
      data: {},
      error: false,
      title: LINKS.MY_OFFERS.title,
      selected: LINKS.MY_OFFERS.id,
      pwaInstallVisibility: true,
      IP
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
        const response = await axiosGet(BASE_URL + path);
        this.data = response.data;
        this.loading = false;
      } catch {
        this.error = true;
        this.loading = false;
        await this.$router.push('/profile');
      }
    },
    refresh () {
      this.setViewData(this.selected);
    },
    installPwa () {
      this.pwaInstallVisibility = false;
      if(!this.installPrompt) {
        return;
      }
      this.installPrompt.prompt();
      this.installPrompt.userChoice.then(result => {
        if(result.outcome !== "accepted") {
          this.pwaInstallVisibility = true
        }
        this.installPrompt = null;
      });
    },
  },
  mounted() {
    this.setViewData(LINKS.MY_OFFERS.id);
  },
  created () {
    window.addEventListener("beforeinstallprompt", e => {
      e.preventDefault();
      this.installPrompt = e;
      this.pwaInstallVisibility = true;
    });
  }
}
</script>