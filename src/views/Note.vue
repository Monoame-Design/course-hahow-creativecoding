<template lang="pug">
  .page.page-note.pt-5.pb-5
    .container.pt-3.pb-5
      .note-wrapper
        .notes-list(ref='notesList')
          h6 Table of Contents
          .topic(v-for='(item, idx) in index' :key='idx')
            .topic-title {{ item.title }}
            .chapter(v-for='(chapter, chapterNo) in item.content' :key='chapterNo' @click='changeChapter(chapter.hash)')
              | {{ chapter.title }}
              // <router-link  :to="{ name: 'Note', params: { hash: chapter.hash } }">{{ chapter.title }}</router-link>
            .toggl-list(@click='toggleList') =
        .back
          router-link(:to="{ name: 'Notes', params: { } }")
            i.fas.fa-angle-left
            |   Back
          
        router-link.prev.switch-page(v-if='prev', 
        :to="{ name: 'NoteChap', params: { chapterNo: prev.chapterNo } }" )
          i.fas.fa-angle-left
        router-link.next.switch-page(v-if='prev', 
        :to="{ name: 'NoteChap', params: { chapterNo: next.chapterNo } }" )
          i.fas.fa-angle-right
        .note.animate__animated.animate__fadeIn
          .content(v-html='mdToHTML(md)')

</template>

<script>
var MarkdownIt = require('markdown-it')
var hljs = require('highlight.js'); // https://highlightjs.org/
//import javascript from 'highlight.js/lib/languages/javascript';
//hljs.registerLanguage('javascript', javascript);
var markdownRenderer = require('markdown-it')({
  html: true,
  linkify: true,
  typographer: true,
  highlight: function (str, lang) {
    if (!lang) lang="javascript"
    if (lang && hljs.getLanguage(lang)) {
      try {
        console.log(hljs.highlight(lang, str, true).value)
        return '<pre class="hljs"><code>' +
               hljs.highlight(lang, str, true).value +
               '</code></pre>';
      } catch (__) {}
    }

    return '<pre class="hljs"><code>' + markdownRenderer.utils.escapeHtml(str) + '</code></pre>';
  }
});
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
      let preMd = md
      preMd = preMd.replace(/\!\[([\S\s]*?)\]\(([\S\s]*?)=.*?\)/g,"![$1]($2)")
      let postResult = markdownRenderer.render(preMd);
      postResult = postResult.replace(/<a /g,"<a target='_blank' ")
      return postResult
    },
    toggleList() {
      let notesList = this.$refs.notesList;

      if (notesList.classList.contains("list-active")){
        notesList.style.left = "-290px";
      }else{
        notesList.style.left = "-10px";
      }
        

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
        this.$nextTick(()=>{
          document.querySelectorAll('note-wrapper').forEach((block) => {
            hljs.highlightBlock(block);
          });
        })
      });
    },
    changeChapter(chapNo) {
      if (this.$route.params.chapNo === chapNo) return;
      this.$router.push({ name: "NoteChap", params: { chapNo: chapNo } });
      // this.updateContent(hash);
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

    let hash = this.$route.params.hash;
    if (!hash){
      let list = [].concat.apply([],this.index.map(t=>t.content))
      console.log(list);         
      hash = list.find(c=>c.chapterNo==this.$route.params.chapterNo).hash;
    }
    if (hash !== "none") {
      this.updateContent(hash);
    } else this.md = "#目前尚無內容";
  },
  mounted() {
  }
};
</script>

<style lang="scss">
i{
  color: white;
}
.note-wrapper {
  // display: flex;
  // flex-direction: column;
  // align-items: center;
  // justify-content: center;
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
  &:hover {
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
  overflow-wrap: break-word;
  .content,
  p {
    img {
      max-width: 100%;
      min-width: 50%;
      display: block;
    }
    hr {
      margin: 25px 0;
    }
  }
  h1{
    font-size: 3rem;
    font-weight: 900;
    margin-bottom: 30px;
    margin-top: 20px;
  }
  h2{
    font-size: 2rem;
    margin-top: 50px;
    padding-bottom: 10px;
    border-bottom: solid 1px rgba(white,0.5);
    margin-bottom: 20px;

  }
  h3{
    font-size: 1.5rem;
    margin-top: 25px;
  }
  h4{
    margin-top: 15px;
  }
  p,li{
    letter-spacing: 0.02em;
    line-height: 1.85;
  }
  img{
    margin-top: 20px;
    margin-bottom: 20px;
    background-color: #fff;
  }
  a{
    color: #ff6363;
    font-weight: bold;
    letter-spacing: 0.05em;
  }

}

@media (max-width: 768px) {
  .note {
    margin: 40px 0px 0px 40px;
    max-width: 70vw;
  }
  .back {
    position: absolute;
    left: 10px;
    top: 10px;
  }

  .switch-page {
    cursor: pointer;
    position: fixed;
    font-size: 48px;
    font-weight: bold;
    top: 20%;
    transition: 0.5s;
    &:hover {
      transform: scale(1.2);
    }
    &.prev {
      left: 10px;
    }
    &.next {
      right: 10px;
    }
  }
}
</style>
