<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from "./navbar.vue";
export default {
  name: "App",
  components: {
    Navbar
  }
};
</script>