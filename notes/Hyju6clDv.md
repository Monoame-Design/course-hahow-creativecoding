###### tags: `互動藝術程式創作入門`

# 章節 18 - 物理模擬 - 讓物件自然的落下碰撞 (使用Matter.js)

## 單元介紹

### 目標
物理模擬引擎 Matter.js介紹
建立物理模擬的環境 / 繪製幾何形狀
控制固定物件 isStatic
添加限制 constraint / Mouse
偵測碰撞事件 collision

## 課程重點

### Matter.js 使用
- 引用 Matter.js 函式庫
    ```
    var s = document.createElement("script");
    s.type = "text/javascript";
    s.src = "https://cdnjs.cloudflare.com/ajax/libs/matter-js/0.14.2/matter.min.js"
    document.head.appendChild(s);
    ```
![](https://i.imgur.com/90Mi5rW.png)
- 核心概念
    - Engine 模擬引擎
    - Bodies 物體與相關函數
        - 有速度、位置、角度、外型等屬性
        - `Bodies.rectangle`(x,y,寬,高,[其他參數])：建立方塊
        - `color`：設定顏色
        - `isStatic`：是否為固定物件
    - World 整體環境
        - 包含所有物體
    - Constraint 限制條件 (距離 彈性...等)
- 建立基礎環境
    ```
    function setup(){
        // 引用 Engine, Bodies 與 World
        let Engine = Matter.Engine
        let Bodies = Matter.Bodies
        let World = Matter.World

        // 建立方塊物件
        let boxA = Bodies.rectangle(400,200,80,80)
        
        // 建立地板，並設定 isStatic 為 true，讓他固定不動
        let ground = Bodies.rectangle(width/2,height+30,width,60,{
		isStatic: true
	})
        
        // 將物件加入到物理引擎內
        World.add(engine.world, boxA)
        World.add(engine.world, ground)

        // 初始化物理引擎
        engine = Engine.create()
    }
    
    function draw(){
        // 繪製出物件
        
        begineShape()
        for(let vert of boxA.vertices){
            vertex(vert.x, vert.y)
        }
        endShape()
        
        // 繪製出地板
        begineShape()
        for(let vert of ground.vertices){
            vertex(vert.x, vert.y)
        }
        endShape()
    }
    ```
- 將常用的建立方塊包裝成函式
    ```
    function generateNewBox(){
        let {Engine,Bodies,World,Constraint} = Matter
        let sz = random([10,20,40,60])
        let boxA = Bodies.polygon(
            random(width),random(height/3),4,sz)
        boxA.color = random(colors)
        boxA.sz = sz
        boxA.char = random("ABC".split(""))
        boxes.push(boxA)

        var constraint = Constraint.create({
            pointA: {x: width/2,y: 50},
            bodyB: boxA,
            length: random(50,width/2),
            stiffness: 0.01,
            damping: 0.05
        })

        constraints.push(constraint)
        World.add(engine.world,constraint)

        World.add(engine.world,boxA)
    }
    ```
- 增加限制（constraints）
    - 增加內建的 [MouseConstraint](https://brm.io/matter-js/docs/classes/MouseConstraint.html)
    ```
    // 將 Matter 的 Mouse 物件建立在 canvas 的 element 上
    var mouse = Mouse.create(canvas.elt)
	mouseConstraint = MouseConstraint.create(engine,{
		mouse: mouse
	})
	World.add(engine.world,mouseConstraint)
    ```
    - 建立其他的 Constrants
    ```
        var constraint = Constraint.create({
            pointA: {x: width/2,y: 50},
            bodyB: boxA,
            length: random(50,width/2),
            stiffness: 0.01, //彈性
            damping: 0.05 // 阻尼
        })

        constraints.push(constraint)
        World.add(engine.world,constraint)
    ```
- 直接設定物件的狀態
    - Body.setVelocity(物件,參數)
    - Body.setPosition(物件,參數)
    - Body.setStatic(物件,參數)

- 綁定事件（Events）
    ```
    Events.on(engine,'collisionStart',function(event){
		for(let pair of event.pairs){
			// console.log(pair)
			// clickSound.play()
		}
	})
    ```



## 範例練習

## 內容回顧

## 課後問題

## 案例觀摩
https://particulatejs.org/
https://github.com/CodingTrain/p5-matter
https://www.openprocessing.org/sketch/903498
https://www.openprocessing.org/sketch/905319

![](https://i.imgur.com/LWwQfyQ.png)
https://cuppetellimendoza.com/nervous-structure-field/
![](https://i.imgur.com/wyvw1Kn.png)
https://www.mentalfloss.com/article/81204/interactive-wall-google-made-thousands-arcade-buttons
![](https://i.imgur.com/K1jjWpJ.png)
https://www.youtube.com/watch?v=eazEgy_uA9E
![](https://i.imgur.com/IxSCSYA.png)
https://www.pinterest.com/pin/383157880792234697/
![](https://i.imgur.com/2x5w8Gr.png)
https://www.openprocessing.org/sketch/903498
![](https://i.imgur.com/p5PNOy7.png)
https://www.openprocessing.org/sketch/905319
![](https://i.imgur.com/iL7Toe2.png)
https://www.instagram.com/jerson.latorre/