###### tags: `互動藝術程式創作入門`

# 章節 19 - 3D世界與物件 - p5的WebGL應用

## 單元介紹

### 目標

- 瞭解 3D 場景的基礎，包含物體、光源、材質與攝影機等要素
- 能夠為場景建立基礎互動與外部材質
- 能夠導入 3D 模型

## 課程重點

### 3D場景的基礎

- 基礎的要素：物體、光源、材質與攝影機
    ![](/media/imgur/BH4NbuH.png)
    - 基礎幾何形狀
        - 平面 plane()
        - 長方體 box()
        - 球體 sphere()
        - 圓柱體 cylinder()
        - 圓錐體 cone()
        - 圓盤 ellipsoid()
        - 甜甜圈 torus()
        
    
    - 攝影機
        - camera() 一般攝影機
        - perspective() 透視攝影機
        - ortho() 平行攝影機

### 建立一個基礎的 3D 場景

- 建立 WEBGL 畫布 `createCanvas(windowWidth, windowHeight,WEBGL);`
    - 需注意，WEBGL 的繪製原點(0,0)在畫面中心，而不是左上角
- p5 的 3D 物件：https://p5js.org/examples/form-3d-primitives.html
    - 繪製方塊： `box(邊長)`
    - 繪製球體： `sphere(半徑)`
    - 圓錐： `cone(半徑, 高度)`
- 繪製的控制：
    - 位置：使用 push(), pop() 搭配 rotate()
    - fill()：填色
    - stroke()：邊框
    - orbitControl(): 使用滑鼠改變 3D 視角（沒有配置攝影機時可以用）
- degugMode()：顯示座標與網格

### 基礎的材質與光源

- 常見的材質
    - 法線材質 normalMaterial()
    - 環境材質 ambientMaterial()
    - 發光材質 emissiveMaterial()
    - 反光材質 specularMaterial()
    - 貼圖或影片 texture()
- 光源
    - 環境光 ambientLight()
    - 平行光 directionalLight()
    - 點光源 pointLight()
    - 聚光燈 spotLight()

### 物件的基礎互動

- 讓物件大小隨時間變化
- 用滑鼠控制物件大小、顏色、旋轉、位置
    ```
    let dirX = (mouseX / width - 0.5) * 2;
    let dirY = (mouseY / height - 0.5) * 2;
    pointLight(255,0,0,0,0,0)
    directionalLight(250, 250, 250, -dirX, -dirY, -1);
    ```
- 使用noise, sin製作波形效果
    - `translate(cos(i+frameCount/50)*200, sin(i+frameCount/50)*200)`
- camera：可以用滑鼠控制攝影機、光源的角度

### 加入基礎互動與外部材質
- 圖片
    ```
    mat_wood = loadImage("wood.jpeg") // 讀取材質檔案
    ...
    texture(mat_wood) // 使用材質
    ```
- 即時影像
    ```
    capture = createCapture(VIDEO);
    capture.hide();
    ...
    texture(capture)
    ```

### 導入3D模型

- 下載.obj檔案：https://free3d.com/
- 載入模型
    ```
    obj = loadModel("Sting-Sword-lowpoly.obj") //讀取 3D 物件
    ...
    model(obj) // 繪製出 3D 物件
    ```

## 範例練習
![](/media/imgur/xKc9Kfb.png)
https://www.openprocessing.org/sketch/951952
![](/media/imgur/53iTe7E.jpg)
https://www.openprocessing.org/sketch/951712

## 課後練習
 - 練習用3D物件幾何形狀做一個小世界
- 架設光源、物件與場景使用不同材質創作
- 練習做使用3D物件來遊戲

## 參考範例與補充資料
![](/media/imgur/ZhN32Cl.jpg)
https://threejs.org/
![](/media/imgur/9HQ28o2.png)
https://moments.epic.net/#lion
![](/media/imgur/X620dSw.png)
https://www.openprocessing.org/sketch/886850
![](/media/imgur/wEcicvJ.png)
https://www.openprocessing.org/sketch/881611
![](/media/imgur/QfMqbJy.png)
https://www.openprocessing.org/sketch/892128
![](/media/imgur/CANyunj.jpg)
https://www.openprocessing.org/sketch/859999
![](/media/imgur/YwOOoZz.png)
http://madebyevan.com/webgl-water/
![](/media/imgur/Ez1G4AT.jpg)
https://guccidive.gucci.com/

![](/media/imgur/WD3LGMk.png)
https://bruno-simon.com/

![](/media/imgur/V9sIQWt.jpg)
http://www.simonreeves.com/projects/db5/
![](/media/imgur/rA879Vr.png)
http://hands.wtf/
- http://anubis4d.xyz/proyectos/cursos/P5-clase-17.html
- https://0xzx.com/202004281332610723.html
- p5 shader https://itp-xstory.github.io/p5js-shaders/
