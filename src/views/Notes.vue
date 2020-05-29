<template>
  <div class="notes">
    <h1>Tutorials</h1>
    <div class="md" v-html="mdToHTML(md)"></div>
  </div>
</template>

<script>
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
    axios.get("https://hackmd.io/4StBPlPLSNK_bkiUUgGnpw/download").then(res => {
      // console.log(res)
      this.md = res.data;
    });
  }
};
</script>

<style lang="scss">
.notes {
  .md {
    img {
      max-width: 100%;
    }
  }
}
</style>
