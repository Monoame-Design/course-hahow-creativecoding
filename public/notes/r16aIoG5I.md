###### tags: `互動藝術程式創作入門`

# 章節 5 條件:迴圈與互動 - 建構創作規則

## 單元介紹

### 目標

1. 了解程式中達成重複的「for 迴圈」概念與常見的應用方式
2. 了解如何在重複中套用規則與創造變化
3. 嘗試不同的重複概念應用與變化
4. 結合變數、使用者操作創作重複的作品
5. 使用變數做出場景管理

## 課程重點

### 程式中的重複 - for 迴圈

```
// for 的基本語法結構

for(計數變數的起始狀態; 結束條件; 每次結束後變數如何變化)
  {
    概念相同，需要重複執行的事情
  }
```
    
    
所以如果我們要水平間隔每 100px 畫一個圓，共三次的話
下面兩種寫法的結果會是一樣的：

寫法一：手動複製貼上＝人工迴圈

```
    ellipse(0,100,30,30)
    ellipse(100,100,30,30) // 相較於上面，右移動了 100 px
    ellipse(200,100,30,30) // 相較於上面，又右移動了 100 px
```

寫法二：使用程式語言的 for 迴圈
```
    for(var i=0; i<3 ; i++){
      ellipse(100*i, 100, 30, 30)  // 計數變數 i 只要小於 3 時都會做這件事，直到不滿足條件則停下並跳出該程式區塊
    }
```
### 進階技巧：多層 for 迴圈
一層的 for 迴圈中還可以再包另一層，如此可以做更複雜的重複～
```
    for(var i=0; i<2; i++){
      for(var j=0; j<2; j++){    // 在每一個 i 中，都會這層迴圈完再跳往下一個 i
        ellipse(50*i, 50*j, 40)  // 分別於 (50*i, 0) 和 (50*i, 50) 畫圓，畫完之後再往下一個 i 繼續重複
      }
    }
```

## 範例練習

1. [創造線框感的圓](https://www.openprocessing.org/sketch/889973)
    使用多個圓形重複堆疊起來，使用了 map() 把讓重疊的圓行邊框出現漸層，再控制滑鼠的位置，改變圓形的大小
    ![](https://i.imgur.com/hvx41XA.gif)
2. [重複且規律排列的網格系統](https://www.openprocessing.org/sketch/889991)
    自己定義一些會影響畫面隨機性的變數，例如讓 count 從 0 開始數，每執行完一次 for 迴圈就 +1，而在迴圈內如果對 count 取餘數（%），符合特定條件才繪製，就會創造出有規律的排列感覺。最後再對顏色與內部色塊做點隨機變化，就完成多樣的網格畫面了！
    ![](https://i.imgur.com/K58WBuz.png)

3. [山脈筆刷](https://www.openprocessing.org/sketch/889995)
    將一群大小有隨機與特定比例變化的圈圈堆疊起來，看起來就像是一座座的山⛰
    ![](https://i.imgur.com/1Aaf4Lb.gif)
4. [狀態變換的筆刷](https://www.openprocessing.org/sketch/889996)
    筆刷的部分加入了前一禎圖片的滑鼠位置(pmouseX, pmouseY)，與當前的滑鼠位置做距離計算（dist），藉由 dist 的大小來決定噴濺的距離。另外加上點擊滑鼠之後可以改變繪圖狀態，切換噴灑、圓形、方形的繪製結果。
    ![](https://i.imgur.com/sUHsJDX.gif)

## 內容回顧

### 常見的重複使用手法

- 改變物件大小、方向、時間、頻率
- 重複粒子、文字、符號、紋理、以及動作等
- 善用重複可以讓畫面看起來有整體感

### 可以利用的創作小技巧

- 用 `random()` 時限制某個顏色的範圍，可讓畫面的色相更一致但又具有不同變化，如：`color(random(200,255), 150 , 250)`
- 利用變數，如宣告一個 `count`，讓程式能夠根據方塊的編號製造規律變化，甚至再進一步利用 % 取餘數、`frameCount` 等創造更豐富圖形
- 加入隨機的繪圖要素，例如：
    ```
    if(random()<0.5){
       ellipse()     // 一半的機率會畫出圓
    }
    ```
- 偵測滑鼠移動速度，來製造類似噴濺的效果。例如使用 `dist` 來取得 `(pmouseX, pmouseY)` 與 `(mouseX, mouseY)` 的距離，隨著移動距離的遠近來決定筆刷粒子的分散程度。
    - 可以利用`sqrt` 收斂一下計算出來的數值，以免粒子們太過分散
    - 也可以再乘以某個數字，以更細緻的控制散度
- 善用變數及 if/else 條件判斷來設定不同的場景狀態，以產生不同的繪圖行為。比方可以切換筆刷的型態、畫筆 & 橡皮擦之類的操作，例如：

    ```
    var mode = 1   // 設定 mode 這個狀態計數變數。我們預計定在 1～3 之間切換

    // 這邊設定狀態對應的繪圖方式

    if(mode == 1){ 
      rect(mouseX, mouseY, 100,100)    // 如果是 1 的話，就畫方形
    }else if(mode == 2){
      ellipse(mouseX, mouseY, 100,100) // 如果是 2 的話，就畫圓形
    }else{
      point(mouseX, mouseY)            // 其餘狀況就畫點。在這個例子裡面是指 mode 為 3 時
    }

    // 這邊設定如何改變狀態計數。讓狀態在一定的區間內跳動

    function mousePressed(){
      mode++          // 每當點擊滑鼠，狀態計數就加 1
        if (mode>3){ 
          mode=1      // 如果狀態超過 3 就切換回 1
      }	
    }
    ```

### 新的 p5 語法（能力解鎖！）

- **抓取使用者的操作行為**
    1. [mousePressed()](https://p5js.org/reference/#/p5/mousePressed)：當滑鼠點擊的時要執行的動作
    2. [mouseMoved()](https://p5js.org/reference/#/p5/mouseMoved)：當滑鼠移動的時候要執行的動作
    3. keyPressed()
    4. keyTyped()
    5. mouseReleased()：相對於 mousePressed()，是負責偵測使用者放開點擊的動作
- **畫布操作**
    1. [rotate()](https://p5js.org/reference/#/p5/rotate)：旋轉當前的畫布。
    2. [scale()](https://p5js.org/reference/#/p5/scale)：縮放當前的畫布。
    3. translate()：平移當前的畫布。

- **數值運算**
    1. [dist()](https://p5js.org/reference/#/p5/dist)：取得兩點間的距離。給兩點的 x 與 y 位置，回傳相對的距離長度。
    2. floor() / ceil()
    3. min() / max()
    4. abs()
    5. sqrt()：取某值的平方根
    6. [pmouseX](https://p5js.org/reference/#/p5/pmouseX) / [pmouseY](https://p5js.org/reference/#/p5/pmouseY)：是變數，存著前一禎時的滑鼠位置。

- **圖形繪製補充**
    1. 矩形的圓角設定：[rect()](https://p5js.org/reference/#/p5/rect) 的第 5~8 個之後的參數（們）。



## 課後問題

## 課後作業
圖騰、花磚、樹葉、花園、波浪甚至是人群，有什麼是具備重複概念的場景呢？使用用程式把他們呈現出來吧！

## 延伸閱讀
### function 的概念
### function() 跟 property的差別？（函式 vs 變數）

## 參考案例
![](https://i.imgur.com/i6WVwG4.jpg)
https://www.epochtimes.com/b5/17/10/2/n9693014.htm
https://www.pinterest.com/search/pins/?q=generative&rs=typed&term_meta[]=generative%7Ctyped
![](https://i.imgur.com/nIBFsOB.jpg)
![](https://i.imgur.com/CkyOmcu.jpg)
https://www.openprocessing.org/sketch/859999
![](https://i.imgur.com/o2Ipa6c.png)
https://www.openprocessing.org/sketch/881611
![](https://i.imgur.com/mpSl0yN.jpg)
https://www.openprocessing.org/sketch/880483

![](https://i.imgur.com/lipja4V.png)
https://www.openprocessing.org/sketch/889996

![](https://i.imgur.com/mlsYVFM.jpg)
https://www.openprocessing.org/sketch/890072

https://www.pinterest.com/search/pins/?q=Textile%20patterns&rs=autocomplete_bubble&b_id=BCJbOvr0wqY_AAAAAAAAAACQHHazYOT-gVVCYQtg6OJsLuFSjCxjANcln4VGNHtmbYlrSUxqlP98U-8JV6OjwXQc0t7nsnvwEVjxitaI2E_M&source_id=Z0g5Lb1l

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有