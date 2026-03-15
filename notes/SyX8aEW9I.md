###### tags: `互動藝術程式創作入門`

# 章節 4 變數與資料－賦予可變與連續性

## 單元介紹

### 我們會學到
1. 了解「變數」是什麼
2. 我們為什麼要使用變數
3. 如何使用變數及注意事項
4. 進階操作變數使創作更有效率、更有趣

## 課程重點

### 什麼是「變數」 (variable)？
「變數」是程式語言中非常重要的概念。你可以想像它其實像一個抽屜，可將某些資料儲存起來。只要呼叫這個抽屜的名字就可以取用存在其中的資料。
在 JavaScript 中，變數宣告的語法為：
```javascript=
var r = 100     // 概念像是把 100 這個「數字」儲存在叫做 r 的這個抽屜中
var txt = '你好' // 也可以存「字串」在裡面 
```
取用變數的方法：呼叫它的名字！
```javascript=
print(r)       // 透過 print() 把 r 的內容印出來。結果會是 100 
print(txt)     // 會印出「'你好'」
```

###### // NOTE : 在程式語言中，'=' 代表「賦予數值」，'==' 才是數學中的「等於」！// 

### 為什麼要用變數，變數哪裡好用？
- 減少重複的數值，程式碼管理起來更方便
    例如畫多個相同半徑的球時，可以快速同時改變他們的半徑。
    ```javascript=
    var r = 50
    
    ellipse(width/2, height/3, 50) 
    ellipse(width/2, height/2, 50)     // 這兩個圓半徑重複了
    
    ellipse(width/2, height/3, r, r)
    ellipse(width/2, height/2, r, r)   // 這樣更好管理！
    ```
- 暫存之後可能會用到的資料
    利用變數的特性，先將經過運算的資料儲存起來，等到要用時再呼叫。
    例如下面的寫法就會比上面乾淨明瞭：
    ```
    // 不使用變數的寫法
    .....某些程式碼
    
    fill(r/2 + 40, mouseX/2 +40, mouseY/2 +40 + mouseX/5) // 要用到顏色了，來直接運算！但這樣看起來很醜...
    ```
    
    ```
    // 使用變數的寫法
    var brightnessR = r/2 + 40
    var brightnessG = mouseX/2 + 40
    var brightnessB = mouseY/2 + 40 + mouseX/5   // 這些算好後先準備起來
    
    .....某些程式碼
    
    fill(brightnessR, brightnessG, brightnessB)  // 要用到顏色囉，這樣好看多了！
    ```
- 做較複雜運算時能夠解構、梳理並進一步清晰邏輯
    我們可以直接拿變數再做進一步處理並存起。這能讓變數間的邏輯關係更清晰，而且你也不用在意原先的變數是怎麼來的。
    ```
    var halfWidth = width/2    // 要一半視窗寬度，直接拿 width 來用！你也不用在意 p5 到底是怎麼去抓到視窗寬度
    ```
    再以上面顏色的例子來說，若我沒有取用原先做好的變數來運算：
    ```
    var darkR = (r/2 + 40)/2
    var darkG = (mouseX/2 + 40)/2
    var darkB = (mouseY/2 + 40 + mouseX/5)/2
    
    fill(darkR, darkG, darkB)
    ```
    跟這個相比：
    ```
    var darkR = brightnessR/2
    var darkG = brightnessG/2
    var darkB = brightnessB/2  // 反正我要更暗的，直接拿原先的 brightness 除以 2 就好了
    
    fill(darkR, darkG, darkB) 
    ```
    後者一眼就知道 dark 是拿原先的 brightness 來砍半。因此透過如此撰寫，邏輯會看起來更明確且直觀
    
- 保留先前的狀態，並藉此形成連續的狀態變化
    這是變數運算特性的應用。我們可以把某些狀態，例如位置、大小、顏色等狀態先設定為變數，然後以先前的值運算並放回原先變數中來複寫舊內容，藉此來實現動態且連續地改變變數內容。
    例如把球的位置設定為 x, y 兩個變數，我們透過以上技巧就可以畫出球移動的效果：
    ```
    // 球會往畫面右下方移動
    var x = 50, y = 50
    
    function draw(){
        ellipse(x, y, 50) // 會取到更新的 x 及 y 位置資訊，並藉此畫出圓
        x = x+5           // 每次都拿原先的 x 來加 5，並塞回原先的 x
        y += 5            // 等同於 y = y+5，只是簡略寫法
    }
    ```
- 賦予數值與資料意義
    對於電腦來說這些變數其實也只是一堆數字。所以變數的命名除了可以讓我們呼叫之外，最主要是為了讓人類自己可以看得懂，並且透過這些名字建立邏輯關係以方便我們操作跟編寫
    ```
    var ballPositionX = 200    // 指「球的 x 位置」
    var ballSize = 15          // 指「球的大小」
    var rectFillColor = 'red'  // 指「矩形的填充色」
    ```

### 變數可以裝哪些東西（資料型態）？

基礎的資料型態：
- 數字: `0`,`1`,`2`,`-1`,`-2`,`0.1`,`0.2` ... 各種可以被用來計算的數字
- 字串：`'yellow'`, `'pig'`, `'範例好難'`... 可以簡單的想像成是被包覆起來的一段文字
- boolean：即所謂「布林變數」，是用來判斷邏輯正確與否的。只會有`true`/`false`兩個值，也就是「是」或「不是」。
    例如把 p5 的 `mouseIsPressed` 打印出來，就只會看到 true 或是 false，分別代表有按下去 / 沒按下去。我們在使用 `if()` 判斷式的時候也會使用到 boolean 的概念呦！

### 變數的命名方式與習慣

- 要言之有意：例如滑鼠的位置命名為 `mousePos` 會比 `asdfgqwert` 來的清楚明白，協助以後的自己與同事更好地了解程式碼。
- 駝峰式命名 (Camel case)：若變數的名字是由多個單字構成，規則是頭一個單字的字首小寫，其他單字字首大寫，例如 `var camelCase = '駝峰式命名規則'`。
- 避免使用到語法 / 套件的保留字：JavaScript 內建的 `function`, `window`, `alert` ，或是 p5 的 `width`, `height`, `mouseX`, `mouseY` 之類的都要避免，以免造成程式錯誤。命名前可以參考ㄧ下 [p5 的文件](https://p5js.org/reference/) 或是 [JavaScript 的保留字](https://www.w3schools.com/js/js_reserved.asp)。


## 範例練習

### [彈跳球球](https://www.openprocessing.org/sketch/883254)
透過球球當前位置計算下個位置，也讓滑鼠的位置參與互動，點擊的話會讓球的位置逼近滑鼠，最後加上超過畫面底部的話動量反向的設定，讓球有種彈跳的感覺。
![](https://i.imgur.com/13KddZU.gif)

### [彩色磚牆](https://www.openprocessing.org/sketch/883263)
使用使用變數判斷目前 x 的位置，如果超出寬度的話就換行，另外使用 `random()` 增加色塊的寬度與顏色的多樣性。
![](https://i.imgur.com/didnNIN.gif)

### [模擬時鐘](https://www.openprocessing.org/sketch/883303)
透過 p5 內建方法拿到當前的時分秒，再用 `map()` 把時間對應到可以用在 `arc()` 上面的弧度，是很好用的技巧！
![](https://i.imgur.com/z5sw4ES.gif)


## 內容回顧

### 變數入門

- 變數的宣告語法： var 變數的名稱 = 變數的內容
- 變數可以裝什麼？ 最基本的資料型態有 數字、字串與 boolean 值等等
- 變數的命名方式與習慣：駝峰式命名

### p5 好用的函式與方法
#### 數值操作：
- [map()](https://p5js.org/reference/#/p5/map)：將某個區間的數值對映到另ㄧ個區間
- [lerp()](https://p5js.org/reference/#/p5/lerp)：在兩個值之間依特定比例取值（線性插值）
- [random()](https://p5js.org/reference/#/p5/random)：隨機取值

#### 形狀：
- [arc()](https://p5js.org/reference/#/p5/arc)：繪製扇形

#### 時間：
- [hour()](https://p5js.org/reference/#/p5/hour)：取得當前時
- [minute()](https://p5js.org/reference/#/p5/minute)：取得當前分
- [second()](https://p5js.org/reference/#/p5/second)：取得當前秒

### 其他
- [賦值運算符（assignment operator）](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Operators/Assignment_Operators)：把原先變數 x 的值經過某個運算另一個值 y 之後，賦值給 x。如 `x+=1` 的計算結果會等同於 `x = x+1`，等號前可以放入任意的運算，例如 `x *= 2 ` 的計算結果會等同於 `x = x*2`。
- [CSS 色彩名稱](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)：可以直接填入 fill() 函式的顏色字串值，例如 `'yellow'`, `'red'`, `'cornflowerblue'` 之類。可以[點這邊](https://developer.mozilla.org/zh-CN/docs/Web/CSS/color_value)看可以用的顏色。 
- [數值的運算與處理](https://www.w3schools.com/js/js_arithmetic.asp)：
    - %：讀作 mod，用來取餘數。例如 `16%3 => 1`
    - abs()：取絕對值。例如 `abs(-4) => 4`
    - floor()：取「地板」，即為「無條件捨去」。例如`floor(1.4) => 1`
    - ceil()：取「天花板」，即為「無條件進位」。例如`ceil(1.4) => 2`
    - `+`,`-`,`*`,`/` ：分別為加減乘除

## 五、課後問題
1. 變數是什麼？我們為什麼要使用變數？
2. 除了提到的三種類型（數字、字串、boolean），JavaScript 這個程式語言還有哪些資料型態呢？

## 六、作業方向
創造你的時間表達方式：除了時鐘之外，還有哪些元素與型態可以作為表達時間的方式呢？水的流動、星辰的轉動或是張眼閉眼都可以是時間走動的象徵，活用 p5 的時間函數與 map() 應對，呈現ㄧ個屬於你的時間表達吧！

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有