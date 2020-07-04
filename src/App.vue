<template lang="pug">
  #app
    .container
      //#nav.p-2
        router-link(to='/') 首頁
        router-link(to='/test') Test
        router-link(to='/articles') Articles
        router-link.ml-5(to='/notes') 課程筆記
    router-view
    //footer.pt-5.pb-3
      .container
        .row
          .col-12
            p Copyright © 2020 Monoame Studio 墨雨設計 版權所有
</template>

<style lang="scss">
@import "@/assets/css/style.scss";

html,
body {
  padding: 0;
  margin: 0;
  pointer-events: none;
  font-size: 17px;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: $white;
}

#nav {

  pointer-events: auto;
  a {
    font-weight: bold;
    color: $white;
    &.router-link-exact-active {
      color: #fa434f;
    }
  }
}

.container{
  // max-width: 1200px;

}
canvas {
  position: fixed;
  left: 0;
  top: 0;
  z-index: -1;
  pointer-events: auto;
}
</style>
