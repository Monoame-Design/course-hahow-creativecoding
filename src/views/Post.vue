<template>
  <div class="posts">
    <h1>Tutorials</h1>
    <div class="post-list">
      <div class="post-wrapper" v-for="(item, index) in posts" :key="index">
        <div class="post-content">
          <div class="post-title">{{ item.title.rendered }}</div>
          <div class="post-preview">
            {{ getPreview(item.excerpt.rendered) }}
          </div>
        </div>
        <div class="post-image">
          <img :src="item._embedded['wp:featuredmedia'][0].source_url" alt />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Post",
  components: {},
  data() {
    return {
      posts: []
    };
  },
  methods: {
    getPreview(excerpt) {
      return excerpt.substring(3, excerpt.length - 16) + "...";
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
.posts {
  .post-list {
    padding: 10px;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    align-items: flex-start;
    justify-content: center;
  }
  .post-wrapper {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 25vw;
    background-color: #000;
    margin: 0 20px 20px 20px;
    padding: 20px;
    color: #fff;
    @media screen and (max-width: 768px) {
      width: 80vw;
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
  .post-image img {
    width: 100%;
  }
}
</style>
