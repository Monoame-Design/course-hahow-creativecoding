###### tags: `互動藝術程式創作入門`

# 章節 6 增添色彩－玩耍色彩與留下痕跡

## 單元介紹

### 目標

1. 學習在 p5 指定顏色與基礎的顏色操作
2. 認識 RGB 與 HSB 兩種色彩系統
3. 如何配色與混色
4. 疊合模式(Blendmode)的應用
5. 利用色彩的週期變化與隨機範圍
6. 作品中的色彩管理

## 課程重點

### p5 中的 [color](https://p5js.org/reference/#/p5/color) 物件：可以放在 `fill()`、`background()`、`stroke()` 等方法裡面，控制繪圖顏色的物件。
- 宣告方式：`var clr = color(參數)` 要注意變數命名不能用`color`，會跟 p5 的函式名稱衝突。
- 透過不同方式指定顏色：`color(參數)` 的刮號內可以接收多種不同類型的參數來指定顏色：
    - 只給ㄧ個數值：`color(100)` -> 相同於 `color(100,100,100)` 的灰階
    - 直接給予 RGB 的數值：`color(255,0,0)` -> 紅色，也可以加上第四個參數透明度(0~255) `color(255,0,0, 99)` -> 透明度 100/256 的紅色
    - 填入顏色的名稱：`color('salmon')` 填入的是用引號包起來的字串，顏色的名稱們可以參考這邊 [HTML Color Names](https://www.w3schools.com/colors/colors_names.asp)
    - 填入色票號碼：`color('#00ff00')` -> 一樣式字串，但是裡面是 `#` 開頭的色票號碼
    - 先宣告色彩模式再填入色碼：`color('rgb(0,0,255)')`／`color('hsl(150,100%,50%)')`
    - 實際的操作與更多範例可以參考[官方文件](https://p5js.org/reference/#/p5/color)
- 使用方式：宣告過後把這個顏色物件的變數塞到相對應的函數裡面，例如上述先告了 `var clr = color('red')`，就可以直接使用 `fill(clr)` 的方式設定填色、`background(clr)`設定背景顏色。
- 取得顏色/透明度：`_getBlue()`/`_getGreen()`/`_getRed()`/`_getAlpha()`，不論模式回傳 rgb(0-255)，alpha(0-100)
- 設定顏色/透明度：`setBlue()`/`setGreen()`/`setRed()`/`setAlpha()`



### RGB：使用紅、綠、藍三色交疊後產生的顏色
![RGB 色光圖](/media/imgur/hqz3KrV.png)

- 使用方式
    1. 透過 `colorMode(RGB)`
    2. `var clr =  color(R,G,B)`
- 從上圖可知，`color(255,0,0)` 是純紅色，`color(255,255,0)`是黃色，`color(255,255,255)`是白色、`color(0,0,0)`是黑色，rgb 都相同的話就是灰階，以此類推
- RGB模式的透明度會在 0~255

### HSB(HSV)：由色相(Hue)、飽和度(Saturation)、亮度(Brightness/Value)三要素組成，相對於 RGB 會更容易直接控制想要的顏色與範圍。
![](/media/imgur/PCk53e8.png)


- 顏色的組成：
    - Hue:色相，上圖中一圈 0~360 度可以想像對應到彩虹的紅~紫
    - Saturation:飽和度，上圖中越接近圓心飽和度越低，看起來比較灰，飽和度高則是更鮮豔
    - Brightness：亮度，上圖中越上面的顏色亮度越高
    - Alpha: 透明度
- p5 中的宣告方式：
    1. 先用 colorMode(HSB) 指定為 HSB 模式
    2. `var clr = color(色相(0-360), 飽和度(0-100), 亮度(0-100))`
    3. 如果使用這個方式宣告的顏色，可以用 `clr._setAlpha(透明度(0-1))`設定透明度。


### Blend mode:顏色之間互相影響的方式
- 使用方式：`blendMode(模式名稱)`
- 帶入不同的模式在物件交疊的時候會有不同的顏色效果，各種不同的效果可以參照下圖：
![](/media/imgur/egYRGUd.jpg)
ref: https://butterfliesandbugs.wordpress.com/tag/blendmode/


### 管理色彩：使用陣列
- 陣列操作基礎：
    - 物件可以理解為ㄧ個可以連續放很多資料的一維儲存空間
    - 裡面放的東西可以是任何型態，像是先前提過的數字、字串、boolean 值等等，用`,`隔開
    - 宣告ㄧ個陣列的變數： `var arr = [資料1,資料2,資料3,資料4, ...]` 後面視需求還可以放很多很多...
    - 陣列值的取用：從 0 開始，`arr[0]` 是取第ㄧ個物件（資料1）、`arr[1]` 是取第二個物件（資料2），以此類推
    - 陣列的長度：`arr.length`
- 結合色票操作：
    1. 先宣告ㄧ個陣列的色票：`var colors = ["#E4572E","#17BEBB","#FFC914","#2E282A","#76B041"]`
    2. 隨機取用裡面的色票：
        ```
        var clr = random(colors)
        fill(clr)
        ```
        或是
        ```
        for(var i=0; i<15; i++){
            var clr = colors[i%colors.length] // 這樣在迴圈內就可以依序取得色票的顏色
            fill(clr)
            ...
        }
        
        ```
    3. 要指定某個特定的色票：
        ```
        var clr = colors[0] //取用第ㄧ個色票
        fill(clr)
        ```

## 範例練習

[Color Madness HSB](https://www.openprocessing.org/sketch/890712)
結合多個色塊的排列，並且用上每個色塊的 x,y位置、`frameCount`、範圍內的隨機顏色變化，創造出會不斷變動的色彩效果。

![](/media/imgur/NVMRiex.gif)

[LerpColor](https://www.openprocessing.org/sketch/890727)
使用 `lerpColor()` 創造顏色的漸層，搭配滑鼠位置與色彩重疊的效果。

![](/media/imgur/bIHBf2C.gif)


[BLENDMode Screen](https://www.openprocessing.org/sketch/890730)
使用 `blendMode` 搭配隨機色票，讓筆刷的圓形交疊時呈現繽紛的色彩。
![](/media/imgur/nKETIHZ.gif)


## 內容回顧

### 注意內容
- 調用函式的順序: 在 openProcessing 裡面如果要使用 p5 內建的方法或是屬性（例如 `color()`, `fill()`...），需要在 `setup()` 或是 `draw()` 裡面才可以用喔，如果放在程式的最上面會因為還沒有讀取 p5 的套件內容而執行錯誤 🤯

    ```
    //錯誤的寫法
    var clr = color('#525566'); // <- 電腦會因為不知道 color() 是什麼所以出錯
    setup(){...}
    draw(){...}
    
    // 正確的寫法
    var clr;
    setup(){
        clr = color('#525566');
        ...
    }
    draw(){
        fill(clr);
        ...
    }
    ```

### 創作技巧：
- 結合繪製元素的位置與 `frameCount` 可以創造出持續變動的顏色變化效果。如：`color('hsb((pos.x+pos.y+frameCount*5)%360, 100%, 100%)')`
- 色相可以加入一定範圍內的 random 讓顏色保持一定的一致性，假如想要都是綠色系的顏色，可以用 `colorMode(HSB);clr = color(random(-50,50)+125,100,100);` 讓顏色不要偏離太多。
- 不一定要都用很高亮度的顏色，偶爾降低彩度會讓色彩更柔和。
- 創作心法：光線、多彩 / 無彩、色散、軌跡、光暈、融合

### p5 語法
[colorMode(Mode)](https://p5js.org/reference/#/p5/colorMode)：設定 p5 的色彩模式
[LerpColor(c1, c2, amt)](https://p5js.org/reference/#/p5/lerpColor)：回傳兩個顏色物件的過度中，特定比例的顏色。例如 amt 為 0 的情況下，回傳的顏色是 c1， amt 為 1 的情況下，回傳 c2。
[blendMode(Mode)](https://p5js.org/reference/#/p5/blendMode)：設定色彩混和模式。

## 課後問題


## 延伸閱讀/資源
- 什麼是 console？
    console 可以理解我們跟程式碼溝通的介面，像是先前用的 `print()` 也算是 console 的一種，讓我們可以看到某些變數現在的狀態。而每個瀏覽器也有自己內建的 console，以 chrome 為例，在瀏覽器中按右鍵，選擇檢查（Inspect），再點選 Console 就可以進到瀏覽器的後台，我們也可以在這邊執行程式碼直接讓瀏覽器去執行。關於更多相關的資訊，可以參考 Google 的[官方文件](https://developers.google.com/web/tools/chrome-devtools/console?hl=zh-tw)。
- [Color Picker Chrome插件](https://chrome.google.com/webstore/detail/colorpick-eyedropper/ohcpnigalekghcmgcdcenkpelffpdolg)
- https://coolors.co/ 色票生成工具

## 參考範例
![](/media/imgur/Fpb5nW5.png)
https://www.pinterest.com/pin/502292164683954823/
https://trendland.com/andy-gilmore-kaleidoscopic-illustrations/
![](/media/imgur/C5HPv59.jpg)
https://twitter.com/zachlieberman/status/1019221645737840640
https://www.instagram.com/zach.lieberman/?hl=en

![](/media/imgur/KpPvG1A.jpg)
https://www.instagram.com/mattmillsart/

![](/media/imgur/N7xtppX.jpg)
![](/media/imgur/pXN4Ysq.jpg)

https://derivative.ca/community-post/night-getty-what-i-see-what-you-get
![](/media/imgur/vHjRq4x.jpg)
https://www.openprocessing.org/sketch/890774

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有