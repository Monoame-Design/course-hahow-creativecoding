<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/pacman.png" />
    <HelloWorld msg="Welcome to Creative Coding Taiwan" />
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from "@/components/HelloWorld.vue";
var a = 1;
export default {
  name: "Home",
  components: {
    HelloWorld
  }
};
</script>

<style scoped lang="scss">
.home {
  text-align: center;
  height: 90vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    width: 20%;
  }
  h3 {
    margin: 40px 0 0;
  }
  ul {
    list-style-type: none;
    padding: 0;
  }
  li {
    display: inline-block;
    margin: 0 10px;
  }
  a {
    color: #42b983;
  }
}
</style>