<template>
  <nav class="navbar is-fixed-bottom is-transparent">
    <div class="navbar-menu">
      <div class="navbar-end">
        <div class="navbar-item">&copy; {{year}}, Shivang Chaturvedi</div>
        <div class="navbar-item">
            <a href="https://www.facebook.com/shivang.chaturvedi.56/" target="_blank">
                <img src="/assets/img/facebook.svg" width="20" >
            </a>
        </div>
        <div class="navbar-item">
            <a href="https://www.instagram.com/sh_i_vang/" target="_blank">
                <img src="/assets/img/instagram.svg" width="20" >
            </a>
        </div>
        <div class="navbar-item">
            <a href="https://twitter.com/Shivang2191?s=09" target="_blank">
                <img src="/assets/img/twitter.svg" width="20" >
            </a>
        </div>
        <div class="navbar-brand">
          <a class="navbar-item" href="https://github.com/shiva2021">
            <img
              src="/Artboard.svg"
              alt="Bulma: a modern CSS framework based on Flexbox"
              width="112"
              height="28"
            />
          </a>
        </div>
      </div>
    </div>
  </nav>
</template>

<script>
import moment from "moment";
export default {
  name: "FooterBar",
  computed: {
    year() {
      return moment().year();
    }
  },
  data() {
    return {
      isFooterBarVisible: true
    };
  }
};
</script>
