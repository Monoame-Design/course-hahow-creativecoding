###### tags: `互動藝術程式創作入門`

# 章節 13 - 使用者影音互動 - 即時串流聲音與影片

## 單元介紹

### 目標

- 學習如何抓取跟分析聲音製作互動
- 瞭解如何抓取與繪製使用者的即時影片
- 學習如何把即時影像轉成即時抽象畫
- 能夠追蹤影像中的顏色

## 課程重點

### 使用麥克風
- p5.AudioIn
    - 建立一個新的麥克風
        ```
        let mic = new p5.AudioIn()
        mic.start()
        ```
    - 使用 lerp 讓接收的資訊更平滑
        ```
        let micLevel = mic.getLevel()
        r = lerp(micLevel, micLevel*5000, 0.05)
        ellipse(width/2, height/2 ,r)
        ```
- p5.FFT 分析聲音頻譜
    - 使用方式
        ```
        let mic = new p5.AudioIn()
        mic.start()
        fft = new p5.FFT()
        fft.setInput(mic)

        let spectrum = fft.analyze() // 回傳一個長度為 1024 的陣列
        ```
    - 製作漸淡的音頻軌跡
        ```
        background(0,20)
        noFill()
        beginShape()
        for(let i = 0; i<spectrum.length/1.5;i++){
            vertex(i, height/2-specturm[i]*2)
        }
        endShape()
        copy(0,0,width, height,0,-1,width,height)
        ```
    - `getCentroid()` 取得中心頻率
        - 結合顏色
        ```
        let center = fft.getCentroid()
        colorMode(HSB)
        fill(map(center,500,8000,0,400),100,100)
        ```

### 繪製陰影

```
drawingContext.shadowColor = color(0,100)
drawingContext.shadowOffsetY = -5
drawingContext.shadowBlur = 20
```

### 使用影像
- P5.createCapture()
    - 使用方式
        ```
        capture = createCapture(VIDEO)
        image(capturem mouseX, mouseY)
        ```
    - 先儲存 capture 抓到的影像，再去處理儲存起來的影像
        ```
        let cacheGraphic
        cacheGraphic = createGraphic(640,480)
        cacheGraphic.image(capture, 0,0)
        for(var i=0 ; i<cacheGraphic.width; i+=10){
            var pixel = cacheGraphic[i]
            fill(pixel)
            rect(i,o,10)
        }
        ```
- 修正攝影機左右相反的問題
    ```
    cacheGprhic.translate(640,0) // 先往右邊移動一倍的距離
    cacheGraphic.scale(-1,1) // 翻轉畫布
    ```
- 取得亮度：`(pixel[0] + pixel[1] + pixel[2])/3 //RGB 的平均值`
    ```
    let cacheGraphic
    cacheGraphic = createGraphic(640,480)
    cacheGraphic.image(capture, 0,0)
    for(var i=0 ; i<cacheGraphic.width; i+=10){
        var pixel = cacheGraphic[i]
        bk = (pixel[0] + pixel[1] + pixel[2])/3 //RGB 的平均值
        fill(bk) //變成灰階的版本
        rect(i,o,10)
    }
        ```
- 文字雲的創作
    - 取的當前像素的亮度 `bk = (pixel[0] + pixel[1] + pixel[2])/3`
    - 取得當前亮度對應到的文字（假設共有 10 個字可選擇）：
        ```
        let txt = "一二三四五田雷電龕龘"
        let bkId = int(map(bk, 0, 255, 10, 0))
        text(txt[bkId])
        ```

### 影片操作進階－追蹤顏色
- 引用 Tracking.js 的方式，以下則一即可：
    - 在新的 tab 中使用 [`trackingjs` 的程式碼](https://cdnjs.cloudflare.com/ajax/libs/tracking.js/1.1.3/tracking-min.js) ，刪掉註解的部分以避免執行錯誤。
    - 參考這個 [sketch](https://www.openprocessing.org/sketch/930323)，在一個新個 tab 裡面新增下列程式碼即可：
        ```
        var s = document.createElement("script");
        s.type = "text/javascript";
        s.src = "https://cdnjs.cloudflare.com/ajax/libs/tracking.js/1.1.3/tracking-min.js";
        document.head.appendChild(s);
        ```
- 綁定 capture 的影片
    ```
    capture = createCapture(VIDEO)
    capture.poistion(0,0)
    capture.id("myVideo")
    colors = new tracking.colorTracker(['yellow','magenta','cyan']) //追蹤特定顏色
    tracking.track("#myVideo",colors) // 綁定影片
    ```
- tracking 的 `colorTracker` 可以抓取特定的顏色，並回傳一個有這些色塊位置與大小的陣列。
    ```
    [
        {
            color: "yellow"
            height: 473
            width: 543
            x: 96
            y: 0
        },
        {
            color: "yellow"
            height: 472
            width: 541
            x: 98
            y: 0
        }...
    ]
    ```
- 綁定資料更新的事件
    ```
    colors.on('track',updateData) // 綁定事件，畫面更新的時候執行 updateData
    
    function updateData(event){
	    data = event.data
    }
    ```
- 把資料繪製到螢幕上
    ```
    fill('yellow')
	if (data){
		for(var i=0;i<data.length;i++){
			fill(data[i].color)
			rect(
                data[i].x,data[i].y,
                data[i].width,data[i].height
                )
		}
	}
    ```

## 範例練習

取得中心頻率的操作
https://www.openprocessing.org/sketch/909131
![](/media/imgur/crrgbOG.gif =500x)

頻譜取得與操作
https://www.openprocessing.org/sketch/909141
![](/media/imgur/50K0ede.gif =500x)

影片的像素操作
https://www.openprocessing.org/sketch/909161
![](/media/imgur/aTR3gOl.gif =500x)

追蹤顏色
https://www.openprocessing.org/sketch/909178

## 內容回顧

### p5 的語法們
- loadPixel()
- createCapture()
- getCentroid()
- getSpectrum()
- textSize()
- textStyle()

## 課後問題

- 製作聲音連動的動感VJ畫面
- 製作你的攝影抽象畫！
- 記錄下聲音的軌跡作畫
- 用你的聲音做遊戲互動

## 作品範例
![](/media/imgur/3AXQYnM.png)
p5.FFT 分析聲音頻率的分量

![](/media/imgur/eSMIBmR.png)
https://paperplanes.world/

https://experiments.withgoogle.com/collection/chrome

![](/media/imgur/qFV5Lwo.png)
https://musiclab.chromeexperiments.com/Song-Maker/

![](/media/imgur/c7DcaxC.jpg)
https://forest-mt.seekrtech.com/

![](/media/imgur/SCif39Q.jpg)
https://jayweeks.com/medusae/

http://wiki.polyfra.me/#
![](/media/imgur/gkZVJG7.jpg)

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有