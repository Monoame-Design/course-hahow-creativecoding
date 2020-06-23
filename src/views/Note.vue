<template>
  <div class="note-wrapper">
    <div class="notes-list" ref="notesList">
      <h6>Table of Contents</h6>
      <div class="topic" v-for="(item, idx) in index" :key="idx">
        <div class="topic-title">{{ item.title }}</div>
        <div
          class="chapter"
          v-for="(chapter, chapterNo) in item.content"
          :key="chapterNo"
          @click="changeChapter(chapter.hash)"
        >
          {{ chapter.title }}
          <!--<router-link  :to="{ name: 'Note', params: { hash: chapter.hash } }">{{ chapter.title }}</router-link>-->
        </div>
        <div class="toggl-list" @click="toggleList">=</div>
      </div>
    </div>
    <div class="back">
      <router-link :to="{ name: 'Notes', params: { } }">< Back</router-link>
    </div>
    <div class="prev switch-page" v-if="prev" @click="changeChapter(prev.hash)"><</div>
    <div class="next switch-page" v-if="next" @click="changeChapter(next.hash)">></div>
    <div class="note">
      <div class="content" v-html="mdToHTML(md)"></div>
    </div>
  </div>
</template>

<script>
import { markdown } from "markdown";
import index from "@/assets/index.js";

export default {
  name: "Notes",
  components: {},
  data() {
    return {
      md: "",
      index: index.index,
      chapterList: null,
      chapterNo: null,
      prev: null,
      next: null
    };
  },
  methods: {
    mdToHTML(md) {
      return markdown.toHTML(this.md);
    },
    toggleList() {
      let notesList = this.$refs.notesList;
      notesList.classList.contains("list-active")
        ? notesList.classList.remove("list-active")
        : notesList.classList.add("list-active");
    },
    updateContent(hash) {
      axios.get(`https://hackmd.io/@ankycheng/${hash}/download`).then(res => {
        // console.log(res);
        this.md = res.data;
        this.chapterNo = this.chapterList.findIndex(c => c.hash === hash);
        if (this.chapterNo == 1) {
          this.prev = null;
        } else {
          this.prev = this.chapterList[this.chapterNo - 1];
        }
        if (this.chapterNo == this.chapterList.length) {
          this.next = null;
        } else {
          this.next = this.chapterList[this.chapterNo + 1];
        }
      });
    },
    changeChapter(hash) {
      if (this.$route.params.hash === hash) return;
      this.$router.push({ name: "Note", params: { hash: hash } });
      this.updateContent(hash);
    },
    setChapterList() {
      let chapters = [];
      this.index.forEach(t => {
        t.content.forEach(c => {
          chapters.push({
            chapterNo: c.chapterNo,
            hash: c.hash
          });
        });
      });
      this.chapterList = chapters;
    }
  },
  computed: {},
  created() {
    this.setChapterList();
  },
  mounted() {
    let hash = this.$route.params.hash;
    if (hash !== "none") {
      this.updateContent(hash);
    } else this.md = "#目前尚無內容";
  }
};
</script>

<style lang="scss">
.note-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  pointer-events: none;
  & > * {
    pointer-events: auto;
  }
}

.back {
  position: fixed;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100px;
  height: 50px;
  border: 1px solid white;
  top: 84px;
  left: 20px;
  color: white;
  font-size: 20px;
  cursor: pointer;
  overflow: hidden;
  transition: 0.5s ease-in;
  &::after {
    content: "";
    position: absolute;
    width: 100%;
    height: 100%;
    left: -100%;
    top: 0;
    background-color: #fff;
    transition: 0.5s ease-out;
  }
  &:hover {
    // background-color: white;
    &::after {
      left: 0;
    }
    & > a {
      color: black;
    }
  }
  & > a {
    color: white;
  }
  a {
    z-index: 2;
    text-decoration: none;
    &:hover {
      color: black;
      text-decoration: none;
    }
    &:link {
      text-decoration: none;
    }
  }
}

.switch-page {
  cursor: pointer;
  position: fixed;
  font-size: 48px;
  font-weight: bold;
  top: 50%;
  transition: 0.5s;
  &:hover{
    transform: scale(1.5);
    transition: 0.5s;
  }
  &.prev {
    left: 100px;
  }
  &.next {
    right: 100px;
  }
}

.notes-list {
  position: fixed;
  left: -290px;
  // left: 0;
  // bottom: -400px;
  bottom: 10px;
  font-size: 0.8rem;
  padding: 20px 45px 20px 20px;
  background-color: #000;
  border: solid 1px white;
  transition: 0.8s ease-in-out;
  z-index: 1;
  .topic-title {
    margin: 5px 0;
  }
  .chapter {
    position: relative;
    width: fit-content;
    overflow: hidden;
    &:hover {
      cursor: pointer;
      &::after {
        left: 0;
        transition: 0.5s ease-in-out;
      }
    }
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: -100%;
      border-bottom: 1px solid white;
      transition: 0.8s ease-in-out;
    }
  }
  &:hover {
    left: 10px;
    bottom: 10px;
    transition: 0.8s ease-in-out;
  }
  &.list-active {
    left: 10px;
    transition: 0.5s ease-in-out;
  }
  .toggl-list {
    position: absolute;
    font-size: 1.5rem;
    right: 15px;
    top: 5px;
    &:hover {
      cursor: pointer;
    }
  }
}

.note {
  max-width: 700px;
  .content,
  p {
    img {
      max-width: 100%;
    }
    hr {
      margin: 25px 0;
    }
  }
}

code {
  white-space: break-spaces;
}
</style>
