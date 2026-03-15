###### tags: `互動藝術程式創作入門`

# 章節 3 基礎圖形繪製 - 從點線面到塗鴉

## 單元介紹

在這個單元中，我們將會介紹繪製各種圖形的方法！
「圖形」是組成作品最基礎的元素。舉凡常見的方形、圓形或者三角形等，也可以自己繪製更複雜的圖形。熟悉這些操作之後可以讓我們更得心應手的把心裡所想的內容組合出來！

---


## 圖形的組成

### 幾何抽象主義
Google Arts 介紹：[幾何抽象主義 Google Arts& Culture](https://artsandculture.google.com/entity/%E5%B9%BE%E4%BD%95%E6%8A%BD%E8%B1%A1%E4%B8%BB%E7%BE%A9/m05bw0l)
有許多範例可以參考的 IG：[generative.hut](https://www.instagram.com/generative.hut/)

常見的表現手法與組成元素：
- 韻律感
- 材質，如光影、深度
- 軌跡
- 位置

---

## 範例練習 - 變動的圖形：練習繪製屬於你的角色[（範例）](https://www.openprocessing.org/sketch/874368)

在本次的範例中，我們將練習使用圓形、點以及特製形狀來繪製屬於你的角色！
例如會學習到如何畫出這樣的海星，並再加上一些小技巧，例如最後讓海星的觸手、眼睛與背景產生動態的變化。就完成這個有點ㄎ一ㄤ的微醺海星囉～

![](https://i.imgur.com/bkPvCKS.gif)

---

## 重點回顧＆一些操作的小技巧 
### 繪製形狀的方法整理

###### // 透過一些函式並放入「位置」、「大小」等資訊（aka. 引數）就能夠繪製出如矩形、圓形 、三角形等形狀；除此之外，也能自己繪製自製形狀 //
- 橢 / 圓形：使用函式 [ellipse()](https://p5js.org/reference/#/p5/ellipse) 來繪製。
- 矩形：使用函式 [rect()](https://p5js.org/reference/#/p5/rect) 來繪製。要注意的是圖形位置的基準點預設是**左上角**。因此可以函式 [rectMode()](https://p5js.org/reference/#/p5/rectMode) 來改變圖形的定位方式。
- 三角形：利用函式 [triangle()](https://p5js.org/reference/#/p5/triangle) 放入三個點的資訊即可畫出。
- 自製形狀：是使用 [beginShape()](https://p5js.org/reference/#/p5/beginShape)、[vertex()](https://p5js.org/reference/#/p5/vertex)、[endShape()](https://p5js.org/reference/#/p5/endShape) 這三個函式的組合，來將多點連在一起所構成的任意圖形，就像是小時候玩的「連連看」一樣。
  其繪製語法是：
    

```
beginShape()             // 圖形的起點 //
  vertex()/curveVertex() // 決定頂點在哪裡，可以包很多 //
  vertex()/curveVertex()  
  vertex()/curveVertex()                     
  .....                  
endShape()               // 圖形的終點。引入 CLOSE 才會將圖形封閉起來 // 
```

###### // vertex() 直接把點連起來，所以圖形中點的轉折會很明顯；但 curveVertex() 使用了「[樣條函數](https://zh.wikipedia.org/wiki/%E6%A0%B7%E6%9D%A1%E5%87%BD%E6%95%B0)」在點的位置計算出弧形，因此繪製出來的圖形更圓滑了。//



 - 形狀的調整方法

    - 調整框線顏色：[stroke()](https://p5js.org/reference/#/p5/stroke)
    - 調整外框粗細：[strokeWeight()](https://p5js.org/reference/#/p5/strokeWeight)
    - 改變圖形填充：[fill()](https://p5js.org/reference/#/p5/fill)

### 豐富畫面的小技巧們

###### // 善用 mouseX、mouseY 及 frameCount 等 p5 原生變數，來動態地改變圖形的模樣吧！//
可以嘗試以下技巧：
   - 讓圖形 / 框線跟著滑鼠移動 
   - 用滑鼠位置改變線條粗度
   - 改變圖形填色
   - 調整 frameCount 的倍數來改變繪圖的速度
   - 不設定填色，以產生外框線條的堆積效果
   - 隨著時間改變圖形位置或大小




### 程式小技巧
###### // 我們可以運用一些程式的語法幫助更方便創作！//
- 三元條件運算子
    ###### // 可以更快速地做一些簡單的條件判斷來控制輸出 //
```
要判斷的某個條件 ? 若符合條件的輸出結果 : 若不符合條件的輸出結果
    
mouseX>width/2?fill('green'):fill('red') // 滑鼠在畫布的右半側時圖形填充為綠；反之為紅 // 
```
- 利用 [text()](https://p5js.org/reference/#/p5/text) 在畫面上印出滑鼠位置以方便我們尋找座標點
    ###### // 記得要用引號 ' ' 來包住「靜態字」（aka.字串）的範圍，並用加號 '+' 連接靜態字與變數 // 
```
text('這個是：'+mouseX,250,250) // 會在 250,250 的位置渲染出「這個是：滑鼠Ｘ座標」//
```


---

## 課後問題

1. ellipse() 跟 circle() 有什麼不一樣，有辦法用 ellipse() 繪製出 circle() 的圖形嗎？
2. 我們如何繪製不規則的圖形？需要使用到哪些指令呢？
3. 透過可以畫面的元素（如圖形、邊框顏色、粗細、大小、填色等）與各種參數（如 frameCount, mouseX, mouseY, mouseIsPressed 等）互相搭配，可以顯示出讓人驚艷的效果，也試試看隨意的搭配，看看會有什麼變化吧，像是 "隨著滑鼠位置變化邊框粗細，或是判斷是否透過點擊滑鼠改變圖形的填色"
4. 如何用三元運算子表達這個判斷式的結果`if(imHungry){return 'eatDinner'}else{return 'goToSleep'}`
5. 如何讓繪製的圖形隨時間變形/變色呢？ 需要使用到什麼變數？
6. 曲線是不是不能應用在非封閉線段？
7. 很想知道重複偏移要如何使用？

**課程素材僅供教學，不提供其他商業用途**
 ---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有