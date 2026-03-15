###### tags: `互動藝術程式創作入門`

# 章節 15 - 發表作品 - 輸出與使用至不同平台

## 單元介紹

### 目標

- 學習將p5.js作品輸出為獨立運作的網頁
- 學會將作品內嵌到一般網頁中
- 更多展示跟應用作品的方式
- 發表作品的心態
- 簡介Processing與p5.js的轉換

## 課程重點
### 展示方式
- 在本機編輯
    - 推薦的程式編輯器 [VSCode](https://code.visualstudio.com/) + [Live Server 外掛](https://marketplace.visualstudio.com/items?itemName=ritwickdey.LiveServer)
    - 設定 windowWidth, windowHeight
    - 引用 js：在 html 的 head 標籤裡面使用 script 標籤引用
        ```htmlmixed=
        <head>
            <script src="mySketch.js" type="text/javascript"></script>
            <script src="https://cdn.jsdelivr.net/npm/p5@1.0.0/lib/p5.js" type="text/javascript"></script>
        </head>
        ```
    - 設定 css：在 html 的 style tag 裡面設定
        ```htmlmixed=
        <style>
            body {margin:0}
        </style>
        ```
    - resize()
        ```
        function windowResized(){
            resizeCanvas(windowWidth, windowHeight);
        }
        ```

- Github Page
    - 到 [GitHub](https://github.com/) 註冊帳號：
    - 建立新的程式碼儲存倉庫
        ![](https://i.imgur.com/4OpgGTy.png)
    - 上傳程式碼，選擇所有的程式文件並 commit
        ![](https://i.imgur.com/Vp8cHzQ.png)
        ![](https://i.imgur.com/ykqQexD.png)
    - 到 Settings -> GitHub Pages 發佈
        - Source 選擇 `master branch`
        - 發佈之後就可以看到呈現的網址囉！
        ![](https://i.imgur.com/yRhuDHE.png)

- 在自己的網站放上作品
    - 放置場景
        - 全景頁面
            ![](https://i.imgur.com/anP4eB4.jpg)
        - 部分區塊
            ![](https://i.imgur.com/KHj69vs.jpg)
        - 背景
            ![](https://i.imgur.com/Ie7pOsO.gif)
    - 使用 iFrame
        - `<iframe src="你的作品網址"></iframe>`：可以包覆其他網站的 HTML 標籤
        - 設定長寬（寫在 css）
        - CSS 常用設定
            - width：寬度
            - height：高度
            - position：定位方式
            - border：邊框樣式
            - z-index：圖層層級
        - 單位
            - px, vh, %

- 下載畫布
    - 右鍵 -> 下載
    - 使用 `save()` 函式
        ```
        function mousePressed(){
            save() // 將當下的話面儲存為圖檔
        }
        ```
    - pixelDensity()：設定像素密度
    - 輸出不同大小
    - 大量產生 - 挑選的策略

- 投影的表現方式
    - Chrome 全螢幕設定
    - 在外接螢幕上展現
    - 結合 WebCam 偵測
- 展示的細節 - 增加作品完整度
    - 音樂音效
    - 材質
    - 互動
    - 說明與來由

### Processing 與 P5.js
- 語法差異 - Processing to p5.js
    - Processing 是以 JAVA 為基礎的程式語言，而 p5 是以 JavaScript 為基礎，但是 P5 已經盡可能依照 Processing 的語法設計，所以大多數的語法都是可以通用的
    - 差異的細節與轉換可以參考官方的文件：https://github.com/processing/p5.js/wiki/Processing-transition
- 在 OpenProcessing 中使用 Processing 語法
    ![](https://i.imgur.com/YjY8cKf.png)

### 心法與小技巧

- 輸出圖片的時候可以盡量把畫布的大小拉大，保留更多細節
- 視覺排版的提醒
    - 字形
    - 層次
    - 一致的顏色與元素
    - 排列整齊
    - 後期使用率竟與調色
- 作品結合互動與聲音
- tag @bosscodingplease


### TA時間安排
> 在完成並繳交前面 14 章的作業之後，可以為最後的小專案預約一個老師參與的 TA 時間，老師會直接給予作品的建議以及方向，報名連結在此：https://calendly.com/monoamestudio/creative-coding-ta


### 課後練習
- 將自己的作品輸出成獨立網頁分享
- 重新設計一套你喜歡的書/音樂/主題視覺
- 錄製作品影片放在IG 記得tag跟老闆分享！
- 將自己的作品投影出來大尺寸感受

### 課外閱讀
- 試看同學作品發表
    https://www.youtube.com/watch?v=w-K94aGZsYo

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有