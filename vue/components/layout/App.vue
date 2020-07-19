<template>
  <div>
    <Navbar></Navbar>
    <router-view></router-view>
    <Footer></Footer>
  </div>
</template>

<script>
import Navbar from "./navbar.vue";
import Footer from "./footer.vue";
export default {
  name: "App",
  components: {
    Navbar,
    Footer
  }  
};
</script>