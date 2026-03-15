###### tags: `互動藝術程式創作入門`

# 章節 2 程式框架 - p5.js 開發入門

## 單元介紹：

在這個單元中，我們將會介紹基礎的 p5.js 語法以及線上編輯器 openprocessing 的操作介面，接著做出一個動態筆刷的小練習，最後會提到一些查詢資源的方式以及如何在本機上執行 p5.js 的檔案。

### 影片與教材
- 工具的歷史淵源 & Open Processing 註冊 (00:00 ~ 07:30)
- 我的第一個程式 (07:30 ~ 25:30)
- cheatsheet、小技巧與本機環境設定 (25:30 ~ 34:39)

---

### 工具的歷史淵源
#### Processing 介紹
- Processing： https://processing.org/overview/
- Processing 的文件： https://processing.org/reference/
#### p5.js 介紹
- Lauren Lee McCarthy：https://lauren-mccarthy.com/p5-js
- p5.js 官網： https://p5js.org/
- p5.js 文件： https://p5js.org/reference/

其他相關的工具介紹：https://creativecoding.in/resources/
哲宇老師的 Open Processing 帳號： https://www.openprocessing.org/user/139364/#sketches
創好帳號後，請記得追蹤課程專用帳號：https://www.openprocessing.org/user/231105

---
### 範例練習
這是今天筆刷練習的成品，我們將會學到如何創建一個新的畫布、修改顏色、加上簡單的判斷式後做出互動的畫筆。

![筆刷練習](https://i.imgur.com/wgigMhT.gif)

沒有程式經驗的同學也不用擔心，可以先跟著一起做，感受ㄧ下用程式繪圖的樂趣。中間的許多細節在後續的章節中都會陸續提到，也可以自己看看 [文件](https://p5js.org/reference/) ，說不定就能迎刃而解，進而享受解決問題的過程喔 😃

---

### 語法回顧 
>老師：不用硬背，忘記的話可以去 [文件](https://p5js.org/reference/) 玩玩看範例

#### 基本函式
###### // 函式 - 能夠執行特定目的或功能的程式碼。偷偷說，其實短短語法背後藏有一大包程式碼，但先別在意 //
- setup() 與 draw()：可理解為「建立繪圖器」及「繪製」。是用 p5 繪圖必備的兩個函式
- createCanvas()：創建畫布。可以設定長寬
- background()：設定背景顏色
- rect()：繪製矩形
- ellipse()：繪製橢形（寬高一樣時就是圓形）
- stroke()：設定邊框顏色
- strokeWeight()：設定邊框粗細
- fill()：設定圖形填色
- print()：把數值打印在 console 中

#### p5.js 內建變數
###### // 變數 - 存有某些數值的神秘空間，叫它的名字就可取得內存的數來做點事 //
- mouseIsPressed：儲存著滑鼠點擊的狀態（點擊時存著 true ; 無點擊時則是 false）
- frameCount：儲存當下的畫面禎數（從渲染開始計算）

#### 程式的流程控制方法 - 關鍵字 `if`
###### // if 這個關鍵字可以用來告訴電腦不同的狀況該怎麼做不同的事 //
```
// if 的基本語法結構 

if(滿足這邊的條件 → 這邊吃到 true)
  {
    這邊會有些程式碼     // 做這些程式指令 //
  }
else
  {
    這邊也會有些程式碼   // 若不滿足條件，則做這邊的程式指令 //
  }
```

範例網址：https://www.openprocessing.org/sketch/858014

---
### Cheatsheet 與小技巧分享

#### Cheatsheet![](https://i.imgur.com/dFNjX01.png)

#### 快速鍵（使用 Mac 的同學只要將 ctrl 代換成 ⌘ 即可）
- Ctrl + F：關鍵字搜尋
- Ctrl + D：多重選取關鍵字
- Alt + 左右：往左 or 右移動一個單字
- Alt + Delete / Backspace：往左 or 右刪除一個單字
- Ctrl + 左右：移動到句首 or 句尾
- Ctrl + Delete / Backspace：往左 or 右刪除一整行
- Tab / Shift + Tab：增加 / 減少縮排
- Ctrl + enter：執行 Code

p5的 Codepen Template (更新版)連結: https://codepen.io/frank890417/pen/LYGQoZy
可以在本機執行的打包檔案 [在這邊](https://drive.google.com/file/d/1yALWLlNrV9QLwn1g5JsfAfZ256iiH2r-/view?usp=sharing)

---

### 課後問題

1. setup() 與 draw() 有什麼不一樣，個別執行的時機跟作用是什麼？
2. 要如何改變畫布的大小呢？
3. background() 裡面可以使用哪些參數，試著從文件中找找看
4. 希望有按下滑鼠的時候，才根據滑鼠的位置改變顏色要怎麼做到呢？
5. 如果我想要改變先前軌跡變淡的速度，要怎麼做呢？
6. 從 [openprocessing](https://www.openprocessing.org/), [pinterest](https://www.pinterest.com/), 或是 [codepen](https://codepen.io/) 之類的平台找幾個覺得有趣的作品，並試著分析ㄧ下他是怎麼做的吧🤩

---

### 其他範例

- [brush (OpenProcessing)](https://www.openprocessing.org/sketch/704595)
- [Frozen brush (OpenProcessing)](https://www.openprocessing.org/sketch/705194)
- [Tapering Circles Brush (OpenProcessing)](https://www.openprocessing.org/sketch/649468)
- [Rotary Brush (OpenProcessing)](https://www.openprocessing.org/sketch/595598)
- [Generative Brushes (OpenProcessing)](https://www.openprocessing.org/sketch/107816/)
- [Interactive Automatic Generative Art with Studio Artist](https://www.youtube.com/watch?v=bFAlPKIlDh4)

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有