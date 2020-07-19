<template>
  <div id="app">
    <Navbar></Navbar>
    <div class="content">
       <router-view></router-view>
    </div>
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