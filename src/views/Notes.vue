<template>
  <div class="notes">
    <h1>課程筆記</h1>
    <div class="toc">
      <div class="chapter" v-for="(chapter, index) in toc" :key="index">
        <h2>{{chapter.title}}</h2>
        <ul>
          <li v-for="(section, index) in chapter.content" :key="index+'_'">
            <router-link :to="{ name: 'Note', params: { hash: getHash(section[1]) }}">{{section[0]}}</router-link>
          </li>
        </ul>
      </div>
    </div>
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
      md: "",
      toc: [
        {
          title: "章節 1 - 基礎繪製與色彩",
          content: [
            [
              "1-2 程式框架 - p5.js 開發入門",
              "https://hackmd.io/@ankycheng/Sy7Vf84_L"
            ],
            [
              "1-3 基礎圖形繪製 - 從點線面到塗鴉",
              "https://hackmd.io/@ankycheng/ryUOgyP_8"
            ],
            [
              "1-4 變數與資料－賦予可變與連續性",
              "https://hackmd.io/@ankycheng/SyX8aEW9I"
            ]
          ]
        },
        {
          title: "章節 2 - 創作生成式藝術",
          content: [
            [
              "2-1 條件:迴圈 與互動 - 建構創作規則",
              "https://hackmd.io/@ankycheng/r16aIoG5I"
            ],
            [
              "2-2 增添色彩－玩耍色彩與留下痕跡",
              "https://hackmd.io/@ankycheng/Bk9VvjfcI"
            ],
            [
              "2-3 進階繪圖 - 畫布操作與編織複雜圖形",
              "https://hackmd.io/@ankycheng/Hycbnu858"
            ]
          ]
        },
        {
          title: "章節 3 - 互動系統與模擬",
          content: [
            [
              "3-1 函數與物件互動 - 建構無法預測的小世界",
              "https://hackmd.io/@ankycheng/HkMQsfh58"
            ],
            [
              "3-2 物件導向與向量 - Class 粒子系統",
              "https://hackmd.io/@ankycheng/SkftLc1hI"
            ],
            [
              "3-3 網頁元素(DOM) - 取得文字、數值和其他輸入",
              "https://hackmd.io/@ankycheng/rythzyPjU"
            ],
            [
              "3-4 韻律、隨機性與噪聲 - 詩意與自然模擬",
              "https://hackmd.io/@ankycheng/S1NXKYSj8"
            ]
          ]
        },
        {
          title: "章節 4 - 進階影音互動與即時資料應用",
          content: [
            [
              "4-1 - 媒體 - 影像、聲音與影片的整合與拆解",
              "https://hackmd.io/@ankycheng/SyzmSKs2L"
            ],
            [
              "4-2 - 使用者影音互動 - 即時串流聲音與影片",
              "https://hackmd.io/@ankycheng/Hk77W02nU"
            ],
            [
              "4-3 - 資料視覺化與API - 將資料轉化成藝術",
              "https://hackmd.io/@ankycheng/r1F86UyTI"
            ]
          ]
        },
        {
          title: "章節 5 - 程式創作的後續應用",
          content: [
            ["5-1 - 發表作品 - 輸出與使用至不同平台", ""],
            ["5-2 - 後續路線與工具介紹 - OF / Unreal / Unity / TD", ""]
          ]
        }
      ]
    };
  },
  methods: {
    mdToHTML(md) {
      return markdown.toHTML(this.md);
    },
    getHash(url) {
      let devided = url.split("/");
      if (devided.length > 1) {
        return devided[devided.length - 1];
      } else {
        return "none";
      }
    }
  },
  created() {},
  mounted() {
    axios
      .get("https://hackmd.io/@ankycheng/creative-coding-intro/download")
      .then(res => {
        // console.log(res);
        this.md = res.data;
      });
  }
};
</script>

<style lang="scss">
.notes {
  pointer-events: none;
  .toc {
    pointer-events: none;
    & > * {
      width: fit-content;
    }
    img {
      max-width: 100%;
    }
    & > * {
      pointer-events: auto;
    }
  }
}
</style>
