<template>
  <component :is="layout"></component>
</template>

<script>
import Default from "../views/layouts/Default.vue";
import auth from "./services/Auth.js";
import store from "./stores/user";

export default {
  data: () => ({
      layout: Default
  }),
  components: {
    Default
  },
  mounted() {
    if (!auth.isLogin()) {
      store.commit("userLogout")
    }
  }
};
</script>
