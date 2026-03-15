###### tags: `互動藝術程式創作入門`

# 章節 11 物件導向與向量 - Class 粒子系統

## 單元介紹

### 目標

- 瞭解為何使用類別(Class)
- 瞭解如何從類別建立一個物件(Object)
- 讓賦予物件行為，設定物件的方法(Methods)
- 藉由向量處理物理模擬
- 讓物件彼此互動

## 課程重點

### 類別(Class) 物件屬性與方法的藍圖
- 為什麼要用類別(Class)來生成物件呢？
    - 可以大量快速建立同類型的物件
    - 把常常針對物件執行的函式綁訂在方法上面，簡化程式碼，例如圖形的`繪製` 與 `更新`
- 建立類型的方法
    ```
    // 建立一個球的原型
    class Ball{
        constructor(args){ //初始化物件的時候會被執行的方法
            this.p = args.p
        }
        move(){ // 每個由 Ball 實例化出來的物件都會有的方法
            this.p.x++
        }
        doSomething(){
            ...
        }
        ...
    }
    ```
- 從類型產生出物件（實例化）
    ```
    // 根據 Ball 的類型產生一個新的物件
    // 這邊 new Ball() 裡面的 {p:{x:50, y:50}} 就是會丟到 constructor(args) 裡面的 args
    // ball 會有 Ball 這個類裡面的屬性與方法
    var ball = new Ball({
        p: {x: 50,y: 50}
    })
    ```
- 把常用的方法設定在類別上
    例如說我們每次都需要在畫面上`繪製(draw)`物件與`更新(update)`物件的狀態的話會長這樣：
    ```
    for(let i=0; i<balls.length;i++){
        let ball = balls[i]
        
        // 繪製 draw() 的部分
        fill(ball.color)
        ellipse(ball.p.x, ball.p.y, ball.r)
        
        // 更新位置 update() 的部分
        ball.p.x += ball.v.x
        ball.p.y += ball.v.y
    }
    ```
    那如果我們直接把 `draw()` 跟 `update()` 寫在 `class Ball{...}` 裡面的話，就可以直接使用 `ball.draw()` 與 `ball.update()` 方法了
    ```
    class Ball{
        constructor(args){
            this.r = args.r
            this.color = args.color
            this.p = args.p
            ...
        }
        draw(){
            push() //加入 push＆pop確保畫布不會亂跑
            fill(this.color)
            ellipse(this.p.x, this.p.y, this.r)
            pop()
        }
        update(){
            this.p.x += this.v.x
            this.p.y += this.v.y
        }
        ...
    }
    
    for(let i=0; i<balls.length;i++){
        let ball = balls[i]
        
        // 繪製 draw() 的部分
        ball.draw()
        
        // 更新位置 update() 的部分
        ball.update()
    }
    ```
    向這樣看起來是不是簡單多了！
- 建立物件要注意的地方與小技巧
    - 一般類別的命名第一個字大寫，像是 `class Ball{...}`
    - 如果 `constructor()` 方法裡面有很多參數的話，可以把這些參數包成物件，讓生成新的物件時比較乾淨，例如：
        ```
        class Ball{
            constructor(args){ //這邊只接收一個 args 物件，而不是分別接收 r, clr, posX, posY...等多個參數
                this.r = args.r
                this.clr = args.clr
                this.posX = args.posX
                this.posY = args.posY
            }
        }
        
        var ball = new Ball( //生成新物件的時候把參數包在一個物件裡面
            {
                r: 50,
                clr: '#525566',
                posX: width/2,
                posY: height/2
            }
        )
        ```
    - 可以使用 `||` 運算符號來設定預設的參數，例如以下的狀況如果沒有接收到 args.r 的話就會使用預設的 50 作為半徑。
        ```
        constructor(args){ 
                    this.r = args.r || 50
                }
        ```
    - 可以善用函式的回傳值，例如把計算距離的函式寫成 `isBallInRange()`，裡面計算了球與滑鼠的距離之後回傳 `true` 或是 `false`，這樣就可以直接用 `ball.isBallInRange()` 來取得需要計算過後得知的狀態。

### Vector p5 內建的向量物件
- 好處：有許多針對向量運算設計好的方法可以直接使用，像是 `set()`、`add()`、`mult()`等
- 在物件內設定向量：
    ```
    ball = {
        p: createVector(50,50),
        v: createVector(1,-1)
    }
    ```
- 生成向量：
    - random2D()：隨機生成平面上任意方向，長度為 1 的向量。
- 向量的運算：
    - add() 向量的加法
    - sub() 向量的減法
    - mult() 向量的乘法
    - limit() 設定向量的上限
    - setMag() 將目前的向量設定成固定的長度
    - copy() 回傳一個複製當前向量

### 鍵盤輸入事件 KeyPressed()/KeyIsPressed()
- 常見的按鍵名稱
    - 空白：" "
    - 左鍵："ArrowLeft"
    - 右鍵："ArrowRight"
    - 上鍵："ArrowUp"
    - 下鍵："ArrowDown"

## 範例練習

[物件生成的病毒們](https://www.openprocessing.org/sketch/904315)
![](https://i.imgur.com/sMWlGL5.gif)


[結合向量與射擊版本的病毒遊戲](https://www.openprocessing.org/sketch/904323)
![](https://i.imgur.com/b4dF8LK.gif)


## 內容回顧

### 小技巧

- 繪製曲線的shape:
     ```
         beginShape()
         for(var i=0;i<30;i++){
             vertex(this.r/2+i, sin(i/5+-frameCount)*100)
         }
         endShape()
     ```
- 多個物件生成時可以使用 randomId，加在繪圖上，讓物件彼此有點隨機性
    ```
    constructor(){
        ...
        this.rId = random(10000)
    }
    ...
    // 繪製時加上隨機的 rId，讓圖形觸手不會同步，看起來更自然
    for(var i=0;i<30;i++){
             vertex(this.r/2+i, sin(i/5+-frameCount+this.rId)*100) 
         }
    ```
- 使用向量計算讓物件接近滑鼠
    ```
    // 將滑鼠的位置設定為向量
    let mouseV = createVector(mouseX, mouseY)
    // 取得滑鼠與物件的位置差距的向量
    let delta = mouseV.sub(this.p).limit(10) 
    this.p.add(delta)
    ```

### p5 的方法們
- [Vector](https://p5js.org/reference/#/p5.Vector): p5 的向量物件
- [createVector()](https://p5js.org/reference/#/p5/createVector)：建立一個 p5 的向量，視傳入的參數數量，生成 1 維、2維、3維向量。
- [Vector.random2D()](https://p5js.org/reference/#/p5.Vector/random2D)：隨機生成平面上任意方向，長度為 1 的 2 維向量。
- 向量的運算：
    - add() 向量的加法
    - sub() 向量的減法
    - mult() 向量的乘法
    - limit() 設定向量的上限長度
    - setMag() 將目前的向量設定成固定的長度
    - copy() 回傳一個複製當前向量
    - lerp() 取得跟另一個向量的混合
    - heading() 取得角度

## 課後練習

- 練習製作船的物件類別(class)
- 製作爆炸的煙火 滑鼠點擊會釋放上去爆炸
- 製作動動水族箱
- 用物件導向操作粒子，結合sin/random製作互動藝術

## 參考範例


![](https://i.imgur.com/hZnHV7X.png)
https://www.marpi.studio/artwork

![](https://i.imgur.com/5w7Otei.png)
https://flappybird.io/

![](https://i.imgur.com/Ni4ghpZ.png)
https://play.google.com/store/apps/details?id=com.lima.doodlejump&hl=en_US

![](https://i.imgur.com/I9jKlIl.png)
https://www.reddit.com/r/Unity3D/comments/a9nc5o/gpu_particle_force_field_tutorial_link_to_full/

![](https://i.imgur.com/5BGMDXz.jpg)
https://www.shoppingdesign.com.tw/post/view/5424?utm_source=facebook_sd&fbclid=IwAR2TQoTbsRJJMG0TyUBfCLgUyfvFngzt597YTcytwRQ0rya2-K-OLIE80NU

![](https://i.imgur.com/KbHrc2j.png)
![](https://i.imgur.com/wGPt3jV.png)

https://natureofcode.com/book/chapter-6-autonomous-agents/

![](https://i.imgur.com/Qh5f7xK.jpg)
http://www.neilmendoza.com/portfolio/swim-clouds/
 
**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有