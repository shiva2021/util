let mix = require("laravel-mix");
mix.setPublicPath("public/build");
mix.sass("vue/assets/sass/app.scss", "public/build/sass");

mix.js("vue/main.js", "public/build");
mix.webpackConfig({
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "vue"),
      "@resources": path.resolve(__dirname, "resources"),
      "@public": path.resolve(__dirname, "public"),
    }
  },
  output: {
    filename: "[name].js",
    chunkFilename: "js/[name].main.js",
    publicPath: "/build/"
  }
});
