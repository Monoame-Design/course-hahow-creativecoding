<template>
  <div class="note">
    <h1>課程筆記</h1>
    <div class="content" v-html="mdToHTML(md)"></div>
  </div>
</template>

<script>
// <div class="md" v-html="mdToHTML(md)"></div>
import { markdown } from "markdown";
export default {
  name: "Notes",
  components: {},
  data() {
    return {
      md: ""
    };
  },
  methods: {
    mdToHTML(md) {
      return markdown.toHTML(this.md);
    }
  },
  created() {},
  mounted() {
    let hash = this.$route.params.hash;
    if (hash !== "none") {
      axios.get(`https://hackmd.io/@ankycheng/${hash}/download`).then(res => {
        // console.log(res);
        this.md = res.data;
      });
    } else this.md = "#目前尚無內容";
  }
};
</script>

<style lang="scss">
.note {
  .content {
    img {
      max-width: 100%;
    }
  }
}
</style>
