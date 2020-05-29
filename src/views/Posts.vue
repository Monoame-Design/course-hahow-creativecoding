<template>
  <div class="posts">
    <h1>Tutorials</h1>
    <div class="post-list">
      <div class="post-wrapper" v-for="(item, index) in posts" :key="index">
        <div class="post-content">
          <div class="post-title">{{ item.title.rendered }}</div>
          <div class="post-preview">{{ getPreview(item.excerpt.rendered) }}</div>
        </div>
        <div
          class="post-image"
          :style="`background-image: url('${item._embedded['wp:featuredmedia'][0].source_url}');`"
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Posts",
  components: {},
  data() {
    return {
      posts: []
    };
  },
  methods: {
    getPreview(excerpt) {
      return excerpt.substring(3, excerpt.length - 16) + "...";
    },
    mdToHTML(md) {
      return markdown.toHTML(this.md);
    }
  },
  created() {},
  mounted() {
    axios
      .get("https://creativecoding.in/wp-json/wp/v2/posts?_embed")
      .then(res => {
        this.posts = res.data;
      });
  }
};
</script>

<style lang="scss">
@import "@/assets/css/style.scss";

.posts {
  .post-list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
  }
  .post-wrapper {
    display: flex;
    border: solid 1px $white;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;
    background-color: #000;
    margin: 20px 0;
    padding: 20px;
    color: #fff;
    overflow: hidden;
    @media screen and (max-width: 768px) {
      width: 100%;
    }
    .post-title {
      text-align: left;
      font-size: 24px;
      min-height: 68px;
      font-weight: bold;
    }
    .post-preview {
      text-align-last: left;
      font-size: 14px;
      margin: 15px 0;
    }
  }
  .post-image {
    height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-size: 50% auto;
    background-repeat: no-repeat;
    background-position: center;
    transition: 0.5s ease-in-out;
    mix-blend-mode: luminosity;
    &:hover {
      background-size: 80% auto;
      mix-blend-mode: normal;
      transition: 1s;
      cursor: pointer;
    }
    @media screen and (max-width: 768px) {
      background-size: 100% auto;
      &:hover {
        background-size: 120% auto;
      }
    }
  }
}
</style>
