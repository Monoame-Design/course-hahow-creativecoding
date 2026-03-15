###### tags: `互動藝術程式創作入門`

# 章節 9 韻律、隨機性與噪聲 - 詩意與自然模擬

## 單元介紹

### 目標

- 瞭解旋轉、圓形與極座標的概念
- 如何利用弦波函數產生韻律感
- 利用噪聲產生連續的亂數
- 如何使用噪聲產生自然感的動態與形狀
- 瞭解速度曲線與如何產生動態

## 課程重點

### 複習一下三角函數 😖
- 極座標的概念
    ![sin cos](https://i.imgur.com/h1FRD5B.png =500x)
- 定義：
    - 一種三角形裡面角度與邊長的對應關係
    - 我們有一個三角形：
        ![](https://i.imgur.com/d6UITaY.png =250x)
    - sin(正弦)：
        - 在直角三角形中，一個銳角 angle A 的正弦定義為它的對邊與斜邊的比值，也就是：sinθ = a/c
        - θ 從 0 ~ 2PI(0 ~ 360度)的過程中，sin(θ)會呈現 `0 -> 1 -> 0 -> -1 -> 0` 這樣的結果變化。
    - cos(餘弦)
        - 在直角三角形中，一個銳角 angle A 的餘弦定義為它的鄰邊與斜邊的比值，也就是：sinθ = b/c
        - θ 從 0 ~ 2PI(0 ~ 360度)的過程中，cos(θ)會呈現 `1 -> 0 -> -1 -> 0 -> 1` 這樣的結果變化。
        ![](https://upload.wikimedia.org/wikipedia/commons/3/3b/Circle_cos_sin.gif =500x)
    - atan2()
        - 回傳兩個參數的反正切（-PI ~ PI 之間）
        - 可以理解取某個座標(x,y)與原點(0,0)組成的現段與 X 軸所構成的夾角弧度
            ![](https://i.imgur.com/3Jm72py.png =250x)
        - p5 中的應用
            ```
            translate(width / 2, height / 2);
            let a = atan2(mouseY - height / 2, mouseX - width / 2);
            rotate(a);
            ```

- 弧度與角度的轉換
    - [angleMode](https://p5js.org/reference/#/p5/angleMode) `angleMode(弧度 RADIANS/ 角度DEGREES)` //預設是弧度
    - 角度與弧度的關係 (0~360 度 = 0 ~ 2PI)
- 在創作上的應用
    - 創造區間內來回變動的數字：
        - sin(frameCount) -> -1 ~ 1
        - map(sin(frameCount),-1,1,區間的底限,區間的上限)


### 亂數/噪聲
- 使用亂數
    - [random()](https://p5js.org/reference/#/p5/random)：隨機的亂數
    - [noise()](https://p5js.org/reference/#/p5/noise)：連續的亂數
        - noise 的生成：在一個連續的 n 維空間採樣
            ![https://flafla2.github.io/2014/08/09/perlinnoise.html](https://i.imgur.com/jlcbJ56.png =400x)
            ![](https://i.imgur.com/CIP51dD.png =400x)
        - 相較於random，noise 取的的亂數都會跟前後有相關，因此亂數之間不會出現大幅度的差距。
        - 在一次的繪製中，noise 取得的亂數是固定的，不像是 random 會不斷變動
            ![](https://i.imgur.com/HvrcJTJ.gif)
            //noise 生成的亂數
            ![](https://i.imgur.com/hFBXXKs.gif)
            //random 生成的亂數
        - p5中， noise 可以接收最多 3 維的參數
            ![https://docs.substance3d.com/sddoc/3d-simplex-noise-168199190.html](https://i.imgur.com/nB090yd.png =150x)
        - 結合 noise 與粒子系統
            ```
            for(let p of particles){
                fill(p.clr)
                ellipse(p.x, p.y, 2)
                p.x += noise(p.x/200, p.y/200, 1000) -0.5
                p.y += noise(p.x/200, p.y/200, 10000) -0.5
            }
            ```
        - 應用：地形生成、色相儀、雲朵...
        - 延伸閱讀：[Perlin Noise](https://zh.wikipedia.org/wiki/Perlin%E5%99%AA%E5%A3%B0)

### 速度曲線的應用
- 速度與分佈曲線
    ![](https://i.imgur.com/kkmKahr.png)
    - https://easings.net/
    - https://www.openprocessing.org/sketch/897433
- 速度曲線函式
    - 把我們要用的區間 map 到 0~1 的區間內（X），並依序丟到速度曲線的函式中計算，如此一來我們就可以得到在這個區間內計算過後的曲線數值(Y)，像是上面的圖片。

## 範例練習

[波狀函數的繪圖](https://www.openprocessing.org/sketch/897653)
![](https://i.imgur.com/y61aSS3.gif =500x)


[跟著滑鼠跑的眼睛 eyes atan2 demo](https://www.openprocessing.org/sketch/897662)
![](https://i.imgur.com/zjP6Fe3.gif =500x)

[TextSpiral](https://www.openprocessing.org/sketch/897518)
![](https://i.imgur.com/oBm4Dyf.gif =500x)

[noise demo](https://www.openprocessing.org/sketch/897665)
![](https://i.imgur.com/kEUJw2Q.gif =500x)

[sin+noise spiral](https://www.openprocessing.org/sketch/897672)
![](https://i.imgur.com/8ZWIoe0.gif =500x)

[motion demo](https://www.openprocessing.org/sketch/897673)
![](https://i.imgur.com/4TqBLgw.gif =500x)


## 內容回顧

### 小技巧與心法

- 產生多個物件時，加入韻律感：
    ```
    for(let i=-width/2;i<width/2;i+=50){
        let delta = map(i, -width/2, width/2, 0,20)
        let ratio = map(sin(frameCount/10+i),-1,1,0,1)        
        fill(180*ratio,80,80)
        ellipse(i,0,(sin(frameCount/10+delta)+1)*30+10)
    }
    ```
- 韻律與重複
- 軌跡
- 動作與舞蹈
- 自然借鑑 動植物
- 形狀
- 船跟海浪
- DNA
- 眼睛看像方向

### p5 的語法們
[angleMode](https://p5js.org/reference/#/p5/angleMode)：p5 的角度模式（弧度 / 角度）
[sin()](https://p5js.org/reference/#/p5/sin)：取得弧度的正弦值
[cos()](https://p5js.org/reference/#/p5/cos)：取得弧度的餘弦值
[atan2()](https://p5js.org/reference/#/p5/atan2)：取的兩數的反正切
[noise()](https://p5js.org/reference/#/p5/noise)：Perlin noise 取值
[PI](https://p5js.org/reference/#/p5/PI):常數 π 
[TWO_PI](https://p5js.org/reference/#/p5/TWO_PI):常數 2*π 

## 課後問題

## 參考範例

![](https://i.imgur.com/TORHTMw.png)
https://dev.to/bramses/use-code-to-make-stuff-2-processing-a-bit-of-touchdesigner-lk

![]( https://media.giphy.com/media/j2w1a1E4Ohi9vpWSnm/giphy.gif)
https://www.openprocessing.org/sketch/888258


![](https://media.giphy.com/media/LNlA77RPcEHBbzSeUJ/giphy.gif)
https://www.openprocessing.org/sketch/888258

![](https://i.pinimg.com/originals/37/42/72/37427222f201e6d2420d518c91655190.gif)
https://www.pinterest.es/pin/414190496971893095/

![](https://i.imgur.com/Rz19Bpo.png)
https://www.pinterest.com/pin/567101778068077798/

![](https://i.imgur.com/4AP85jb.png)
https://codepen.io/vcomics/pen/djqNrm

![](https://i.imgur.com/Pv3QTk3.jpg)
https://tylerxhobbs.com/

![](https://i.imgur.com/icx5EHf.png)
https://www.openprocessing.org/sketch/835766

![](https://i.imgur.com/SQQaMNg.jpg)
https://www.openprocessing.org/sketch/897428

![](https://media.giphy.com/media/W50nwWs1CF4H6R1Itb/giphy.gif)
https://www.openprocessing.org/sketch/895972

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有