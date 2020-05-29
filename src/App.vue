<template>
  <div id="app" class="container">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/test">Test</router-link> |
      <router-link to="/posts">Articles</router-link> |
      <router-link to="/notes">Notes</router-link>
    </div>
    <router-view />
  </div>
</template>

<style lang="scss">
@import "@/assets/css/style.scss";

html,
body {
  padding: 0;
  margin: 0;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  // text-align: center;
  // color: #2c3e50;
  color: $white;
}

#nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: $white;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
