<template>
  <div class="post">
    <div class="content" v-html="htmlContent"></div>
  </div>
</template>

<script>
export default {
  name: "Posts",
  components: {},
  data() {
    return {
      htmlContent: ""
    };
  },
  methods: {},
  created() {},
  mounted() {
    axios
      .get(
        `https://creativecoding.in/wp-json/wp/v2/posts/${this.$route.params.id}`
      )
      .then(res => {
        this.htmlContent = res.data.content.rendered;
      });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/style.scss";

.post {
  img,
  video {
    max-width: 100%;
    max-height: 50vh;
    // margin-left: 50%;
    // transform: translateX(-50%);
  }
  figure {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .EnlighterJSRAW,
  .wp-block-code {
    background-color: rgb(30, 30, 30);
    padding: 10px;
    color: white;
  }
}
</style>
