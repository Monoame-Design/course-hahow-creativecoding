###### tags: `互動藝術程式創作入門`

# 章節 12 - 媒體 - 影像、聲音與影片的整合與拆解

## 單元介紹
### 目標
- 能夠使用圖片結合物件互動
- 能夠載入與以動作觸發聲音
- 瞭解如何解構圖片為粒子跟像素
- 瞭解如何將影片放入作品中

## 課程重點

### 圖片的操作

- 操作圖片的流程
    1. 將圖片上傳至 OpenProcessing 的 Files 裡面，記得要先儲存創作才能上傳素材喔
    2. 使用預載入（`preload()`）與 載入圖片 `loadImage()`讓程式在執行之前先載入好圖片
    ```
    function preload(){
        fishImg = loadImage("fish1.png")
        jellyfishImg = loadImage("jellyfish.png")
    }
    ```
- 圖片的操作
    - image：將圖片內容繪製出來 `image(fishImg,0,0,sizeW*1.5,sizeW)`
    - imageMode(CENTER) 圖片繪製位置，像是 `rectMode()` 一樣，設定是由正中間作為繪製的座標或是左上角。

### 物件導向操作圖片
```
class Fish{
 constructor(args){
     this.p = args.p
     this.v = args.v || createVector(0,0)
     this.img = args.img
 }
 draw(){
     push()
         imageMode(CENTER)
         translate(this.p.x, this.p.y)
         scale(0.8)
         image(this.img, 0,0,300,200)
     pop()
 }
 update(){
     this.p.add(this.v)
 }
}
```

### 操作圖片像素
- 取得圖片在特定位置的顏色
    ```
    let moonImg = loadImg('moon.jpg')
    let clr = moonImg.get(mouseX, mouseY)
    fill(clr)
    ```
- 取得像素的注意事項
    - 間格固定像素取值就好，如果每個像素都取值的話造成運算過多，電腦跑不動的問題 😖
    ```
    let span = 50
    for (var i =0;i<moonImg.width;i+=span){
        for (var o =0;o<moonImg.height;o+=span){
            let clr = moonImg.get(i,o)
            fill(clr)
            rect(0,0,span, span)
        }
    }
    ```
- 疊加材質
    - noise texture
    - blendMode(MULTIPY)
    ```
    push()
        blendMode(MULTIPY)
        image(moiseImg,0,0,width,height)
    pop()
    ```

### 操作聲音
- 來源：freesound.org / philharmonia
- 操作
    - soundFormats()：設定聲音檔案類型
    - loadSound()：讀取聲音檔案
    ```
    function preload(){
        sound1 = loadSound("castanets__025_mezzo-forte_struck-singly.mp3")
        sound2 = loadSound("Thai-gong__long_forte_damped.mp3")
        sound3 = loadSound("washboard__025_forte_scraped.mp3")
        noiseTexture=loadImage("noise.jpg")
    }
    ```
    - sound.play()：播放聲音檔
- 結合 easing function
    - 參考 easing.net
    ```
    //gongTs 是觸發聲音時的 frameCount
    let delta = frameCount - gongTs
    let ratio = map(delta, 0, 50, 1, 0, true)
    ratio = easeOutElastic(1-ratio)
    push()
        translate(width/2, height/2)
        ellipse(0,0,ratio*200+200)
    pop()
    ```

### 操作影片
- createVideo
- 設定位置與大小
    - video.position()
    - video.size()
- viedo.play()
    - 可以包在一個函式內處理
        ```
        function videoLoad(){
            vid.loop()
            vid.volume=0
            vid.play()
        }
        ```
- 隱藏影片 `video.hide()`（但還是會繼續播放）
- 使用繪製的方式處理影片可以結合畫布操作
    ```
    scale(0.5)
    translate(random(-10,10), random(-10,10))
    image(vid,0,0)
    ```


## 範例練習

[讀取圖片繪製魚群與水母](https://www.openprocessing.org/sketch/906781)
![](/media/imgur/iUrPM1r.gif)

[結合物件導向與圖片操作](https://www.openprocessing.org/sketch/906787)
![](/media/imgur/QQAKcz1.gif)

[圖片的像素操作與重新繪製](https://www.openprocessing.org/sketch/906798)
![](/media/imgur/7Y6uL8F.gif)

[聲音的使用與使用者互動播放](https://www.openprocessing.org/sketch/906080)
![](/media/imgur/5TiFrml.gif)




## 內容回顧

### 小技巧與心法
- 為抓到的像素顏色增添隨機性
    ```
    let c = moonImg.get(i,o)
    fill(
        c[0] + random(-30, mouseX/20),
        c[1],
        c[2] + random(-30, mouseY/20)
    )
    ```
### p5 的語法們
- [preload()](https://p5js.org/reference/#/p5/preload)：需要在 `setup()` 之前預先執行的函式。
- [loadImage()](https://p5js.org/reference/#/p5/loadImage)：讀取圖片檔案，記得先將圖片上傳到 OpenProcessing 的 Files 上。
- [image()](https://p5js.org/reference/#/p5/image)：繪製由`loadImage()`讀取的圖片或是由 `createGraphics()` 創建的畫布。
- [imageMode()](https://p5js.org/reference/#/p5/imageMode)：設定圖片的繪製位置，可以選擇 `CENTER`, `CORNER` 或是 `CORNERS`。
- [blendMode()](https://p5js.org/reference/#/p5/blendMode):設定繪製的混合模式。
- [loadSound()](https://p5js.org/reference/#/p5/loadSound)：讀取聲音檔案。
- [createVideo()](https://p5js.org/reference/#/p5/createVideo)：創造一個影像元件，參數除了影像檔案之外，也可以放入影像檔案讀取完之後的 callback 函式。
## 課後問題/練習

- 練習製作拼貼遊戲世界
- 解構圖片做成抽象畫
- 結合音效、圖片跟影片做自製樂器

## 參考範例

![](/media/imgur/gpjGcLm.jpg)
https://www.pinterest.com/search/pins/?q=collage%20art&rs=typed&term_meta[]=collage%7Ctyped&term_meta[]=art%7Ctyped

![](/media/imgur/NoAL7xt.png)
https://www.youtube.com/watch?v=zHS0Oq15ceA
vibertthio.com/beact-client

![](/media/imgur/2682o3p.jpg)
https://indieground.net/blog/30-images-wonderfully-ruined-by-glitch-artists/

![](/media/imgur/KLnkF95.jpg)

http://satyarth.me/articles/pixel-sorting/

![](/media/imgur/opo6kOY.png)
https://www.instagram.com/p/CADtGmrI0Ce/

![](/media/imgur/IjvJ27Z.jpg)
https://www.instagram.com/p/B-zFkkjHFSg/

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有