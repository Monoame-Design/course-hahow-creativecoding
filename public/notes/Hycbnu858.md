###### tags: `互動藝術程式創作入門`

# 章節 7 進階繪圖 - 畫布操作與編織複雜圖形

## 單元介紹

### 目標

- 瞭解畫布的概念
- 可以使用移動、旋轉、變形畫布來繪製不同圖形
- 透過迴圈與堆疊畫布操作
- 儲存/還原畫布的狀態
- 製作多張額外的畫布使用

## 課程重點

### 畫布的操作：移動、旋轉與縮放

[畫布的操作實例](https://www.openprocessing.org/sketch/888896)

#### 移動畫布 [translate()](https://p5js.org/reference/#/p5/translate)
- 相對於現在的位置移動畫布 `translate(往右的距離，往下的距離)`
- 所以使用以下方式可以繪製出多個方形，但是與修改繪製方形位置不同，我們是直接修改畫布的位置
    ```
    for(var i=0; i<20;i++){
        rect(0,0,50,50) // 都是在位置 (0,0) 的地方繪製
        translate(50,0) // 但是畫完之後畫布往右邊移動了 50 px
    }
    ```
- 也可以透過 translate() 製作出筆刷的效果
    ```
    translate(mouseX, mouseY)
    rect(0,0,50,50)
    ```

#### 旋轉畫布 [rotate()](https://p5js.org/reference/#/p5/rotate)
- 相對於現在的畫布角度，轉移 `r` 度 `rotate(r)` ，需要注意這邊的角度是弧度，不是角度喔！
- 如果要使用角度，可以先用 `angleMode(DEGREES)` 或是 `angleMode(RADIANS)` 來設定單位。*註：角度的 0~360 度，對應到的是 0 ~ 2PI 喔！*
    ![](https://i.imgur.com/J6P8XGX.png)

#### 縮放畫布 [scale()](https://p5js.org/reference/#/p5/scale)
- 相對於目前的畫布大小進行縮放，如 `scale(0.5)`。 -> 變成 0.5 倍，1 的話是原本的大小。


#### 保存/還原畫布設定 [push()](https://p5js.org/reference/#/p5/push)/[pop()](https://p5js.org/reference/#/p5/pop)
- 儲存當下的畫布狀態：push()
- 回到前一個畫布狀態：pop()
![](https://i.imgur.com/Qr1JACS.png)
- 搭配迴圈使用，如此一來可以確保每次迴圈裡面的初始畫布都是一樣的，不會因為我們的操作而混亂：
    ```
    for(var i = 0; i < 10; i++){
        push() //先保存狀態
        ...
        // 繪製一堆東西
        // 隨意的對畫布使用 scale(), rotate(), transform() 等操作，像是 rotate(i/8*360)
        // 再繪製一些東西
        pop() // 還原到上面 push() 的狀態
    }
    ```

### 創建多張畫布
- 操作方式：
    1. 建立畫布： `graphic = createGraphics(100,100)` // 參數是畫布的大小
    2. 在畫布內繪製圖形，例如： `graphic.ellipse(mouseX, mouseY, 20, 20)`，基本上跟一般的繪製一樣，只是需要在 createGraphics() 做出來的這個物件上使用。
    3. 用 image() 畫出畫布內容： `image(graphic,0,0)` //要在原本的 canvas 的哪個位置繪製 graphic 這張畫布的內容。
- 使用技巧
    - 疊加畫布讓彼此之間的圖形不受影響，例如可以維持原先畫布的背景，同時在新的畫布上面化連續的圖案。
    - 應用在遮罩、多層空間概念的創作等地方。


#### 使用色票方式：可以參考 [2-2 筆記](https://hackmd.io/6SO8DZCDR6GlAYK2ga4yPw?both#%E7%AE%A1%E7%90%86%E8%89%B2%E5%BD%A9%EF%BC%9A%E4%BD%BF%E7%94%A8%E9%99%A3%E5%88%97)


## 範例練習
[translate demo](https://www.openprocessing.org/sketch/891571)
結合 translate() 與 rotate() 與色票變換的互動色彩筆刷
![](https://i.imgur.com/nYe1BSZ.gif)

[sunflower](https://www.openprocessing.org/sketch/891579)
除了選轉與移動畫布，也加上了 shearX() 偏移畫布的作法
![](https://i.imgur.com/Lvj46BL.gif)

[使用 rotate() 與 frameCount 的計算做出擴散的效果](https://www.openprocessing.org/sketch/891578)
![](https://i.imgur.com/QvAjA6p.gif)

[應用兩張畫布的疊合效果](https://www.openprocessing.org/sketch/891586)
![](https://i.imgur.com/txEyraA.gif)

## 內容回顧
小技巧：
- 使用滑鼠的位置影響畫布大小或是傾斜角度
    ```
    scale(map(mouseX,0,width,-PI/2,PI))
    shearX(map(mouseX,0,width,-PI/2,PI))
    ```
- 結合 rotate()、translate() 與 frameCount 創造不同的效果
    先 translate()，再 rotate()
    ```
    function draw() {
      translate(width/2,height/2)
      translate(frameCount,0)
      rotate(frameCount)
      rect(0,0,50,50)
    }
    ```
    ![](https://i.imgur.com/MfFeM5q.gif)

    先 rotate()，再 translate()
    ```
    function draw() {
      translate(width/2,height/2)
      rotate(frameCount)
      translate(frameCount,0)
      rect(0,0,50,50)
    }
    ```
    ![](https://i.imgur.com/dg9AMIS.gif)
- scale() 搭配 sqrt(),log() 與 frameCount 做出放射狀的感覺
    ```
    scale(1/squrt(frameCount)*5)
    // 或是
    scale(1/log(frameCount)*3)
    ```
- 創作心法：
    - 韻律與重複
    - 格線系統
    - 反射
    - 自然借鑑 動植
    - 層次
    - 變化與延伸

### p5 語法
- [translate()](https://p5js.org/reference/#/p5/translate):移動畫布座標
- [rotate()](https://p5js.org/reference/#/p5/rotate)：旋轉畫布，要注意角度模式的使用（angleMode(DEGREES) & angleMode(RADIANS)）
- [scale()](https://p5js.org/reference/#/p5/scale)：縮放畫布
- [push()](https://p5js.org/reference/#/p5/push)：儲存畫布狀態
- [pop()](https://p5js.org/reference/#/p5/pop)：回復到前一個畫布狀態
- [shearX()](https://p5js.org/reference/#/p5/shearX)/[shearY()](https://p5js.org/reference/#/p5/shearY)：傾斜畫布
- [resetMatrix()](https://p5js.org/reference/#/p5/resetMatrix)：重設畫布狀態
- [createGraphics()](https://p5js.org/reference/#/p5/createGraphics)：創建新的一個畫布物件
- [image()](https://p5js.org/reference/#/p5/image)：繪製東西，此單元中用來繪製 `createGraphics()` 做出來的畫布物件

### let 與 var 差別
`let` 與 `var` 都是在 JavaScript 中宣告變數的指令，`let` 是在 ES6(ECMAScript6)的標準中訂定的，那他們主要有什麼差別呢？
- 作用範圍不同：用 `var` 定義的變數在整個瀏覽器中都可以被使用，雖然方便，但也造成了污染全域的問題；也就是某些不會被用到的變數，佔用了瀏覽器的記憶體空間。 `let` 的話變數只會保留在執行的`{}`（區塊）裡面，執行完之後空間就會被回收，則可以避免上述的問題。
- 全域變數：用 `var` 宣告的變數，都可以直接透過瀏覽器的最高層級 `window` 去呼叫，像是 `var a = 666; console.log(window.a) //666`，但是 `let` 宣告的變數則不會，像是 `let a = 777; console.log(window.b) //undefined`
- 能否被重複宣告：用 `var` 宣告的變數，可以再多次 `var` 宣告替代，但是如果重複對 `let` 宣告的變數宣告的話則會報錯：`SyntaxError: Identifier 'xxx' has already been declared`
- 還有其他的特性與優缺點，考量到課程的方向，就不在這邊展開，有興趣的同學可以參考例如此篇文章：[ECMAScript6 入門：var、let、const 差異](https://w3c.hexschool.com/blog/530adff5) 的解說。

* angle mode

## 課後練習
- 利用隨機顏色與圖形重複網格
- 做渦狀連續transform的應用

## 參考範例
![](https://i.imgur.com/dhZq5lv.png)
https://www.pinterest.com/pin/396879785912174429/
![](https://i.imgur.com/DvUKcyG.jpg)
https://tylerxhobbs.com/essays/2019/reflections-on-five-years-of-making-art-through-programming
![](https://i.imgur.com/SNjA3Ub.jpg)
https://fineartamerica.com/featured/beneath-the-sea-spiral-kathy-kelly.html
![](https://i.imgur.com/CXyiVA5.png)
https://www.openprocessing.org/sketch/700092
![](https://i.imgur.com/7T67U28.png)
https://vimeo.com/258459372
![](https://i.imgur.com/62MNZEn.png)
http://narf.pl/posts/procedural-trees

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有