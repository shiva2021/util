<template>
  <footer v-show="isFooterBarVisible" class="footer">
    <div class="container-fluid">
      <div class="level">
        <div class="level-left">
          <div class="level-item">
            <div class="logo">
              <a class="navbar-item" href="https://github.com/shiva2021">
                <img
                  src="/footer_logo.svg"
                  alt="Bulma: a modern CSS framework based on Flexbox"
                  width="112"
                  height="28"
                />
              </a>
            </div>
          </div>
        </div>
        <div class="level-right">
          <div class="level-item">
            <a href="https://www.facebook.com/shivang.chaturvedi.56/" target="_blank">
              <img src="/assets/img/facebook.svg" width="20" class="mr-10" />
            </a>
            <a href="https://www.instagram.com/sh_i_vang/" target="_blank">
              <img src="/assets/img/instagram.svg" width="20" class="mr-10" />
            </a>
            <a href="https://twitter.com/Shivang2191?s=09" target="_blank">
              <img src="/assets/img/twitter.svg" width="20" />
            </a>
          </div>
          <div class="level-item">&copy; {{year}}, Shivang Chaturvedi</div>
        </div>
      </div>
    </div>
  </footer>
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
