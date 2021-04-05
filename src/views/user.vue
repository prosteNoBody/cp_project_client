<template>
  <LoadingPlaceholder :loading="loading">
    <div v-if="error" class="flex justify-center items-center h-full w-full">
      <a href="http://localhost:3000/login">
        <img
            src="https://community.cloudflare.steamstatic.com/public/images/signinthroughsteam/sits_02.png"
            alt="loginPicture"
        />
      </a>
    </div>
    <div class="flex flex-col justify-center items-center h-full w-full" v-else>
      <div class="border-blue-400 text-blue-400" :class="buttonStyle">
        {{data.name}}
      </div>
      <div class="border-green-400 text-green-400" :class="buttonStyle">
        Credit: <strong class="ml-2">{{data.credit}}€</strong>
      </div>
      <div class="border-red-400 text-red-400 select-none" :class="buttonStyle" @click.prevent="logout">
        LOG OUT
      </div>
    </div>
  </LoadingPlaceholder>
</template>

<script>
import LoadingPlaceholder from "@/components/LoadingPlaceholder";

export default {
  name: "userprofile",
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
  computed: {
    buttonStyle () {
      return "flex justify-center items-center h-20 w-1/2 border-4 mb-8";
    }
  },
  methods: {
    initJWT() {
      const token = this.$route.query.token;
      if(token) {
        localStorage.setItem('jwtToken', token);
        this.$router.push('/profile');
      }
    },
    logout() {
      localStorage.removeItem('jwtToken');
      this.$emit('setViewData', 'userprofile');
    }
  },
  async mounted() {
    document.title = "User Profile";
    this.initJWT();
    this.$emit('setViewData', 'userprofile');
  }
}
</script>