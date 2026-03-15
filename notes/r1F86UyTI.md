###### tags: `互動藝術程式創作入門`

# 章節 14 - 資料視覺化與API - 將資料轉化成藝術

## 單元介紹

### 目標
- 瞭解常見的資料類型
- 能夠載入外部資料
- 解析資料清理與轉換
- 將資料轉換為色彩、形狀與動態呈現
- 將變數與狀態存在暫存(local storage)中

## 課程重點

### 資料結構與 API
常見的資料形式：JSON 與 CSV
- JSON
    - JSON(JavaScript Object Notation) 是什麼：JSON 是一種像是 JavaScript 物件格式的資料結構，在 JavaScript 中，有許多內建的方式可以直接對 JSON 格式的資料操作，因此在網路應用程式裡面，JSON 是種非常常用的資料格式。
    - JSON 的格式：JSON 的格式與 JavaScript 的物件類似，也可以是一個陣列，一般常見的 JSON 可能會長得像是這樣(ref:[MDN-使用 JSON 資料](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/JSON))
        ```
        {
          "squadName" : "Super hero squad",
          "homeTown" : "Metro City",
          "formed" : 2016,
          "secretBase" : "Super tower",
          "active" : true,
          "members" : [
            {
              "name" : "Molecule Man",
              "age" : 29,
              "secretIdentity" : "Dan Jukes",
              "powers" : [
                "Radiation resistance",
                "Turning tiny",
                "Radiation blast"
              ]
            },
            {
              "name" : "Madame Uppercut",
              "age" : 39,
              "secretIdentity" : "Jane Wilson",
              "powers" : [
                "Million tonne punch",
                "Damage resistance",
                "Superhuman reflexes"
              ]
            },
            {
              "name" : "Eternal Flame",
              "age" : 1000000,
              "secretIdentity" : "Unknown",
              "powers" : [
                "Immortality",
                "Heat Immunity",
                "Inferno",
                "Teleportation",
                "Interdimensional travel"
              ]
            }
          ]
        }
        ```
    - 複製貼到線上編輯器 [JSON Editor Online](https://jsoneditoronline.org/)
    - 延伸閱讀：[MDN-使用 JSON 資料](https://developer.mozilla.org/zh-TW/docs/Learn/JavaScript/Objects/JSON)
    - JSON 的使用，在 p5 裡面有提供專門處理 JSON 的函式，只要使用 `loadJSON()` 讀取檔案之後，就可以用處理物件或是陣列的方式直接操作讀取的資料。
- CSV
    - CSV(Comma-Separated Values) 是什麼：CSV 是單純用文字、逗號（`,`）與換行符號（`\n`）組成的資料格式，可以使用 excel 等文書工具編輯，一般打開之後都是以表格的形式呈現，因為格式簡單、解析容易，被廣泛運用在資料庫、資料表的傳輸上。
    - CSV 的格式：CSV 的第一行通常是欄位，之後的每一行都是一筆資料，欄位之間用`,`分開，一個 CSV 資料長的會像是這樣(ref: [維基百科－逗號分隔值](https://zh.wikipedia.org/wiki/%E9%80%97%E5%8F%B7%E5%88%86%E9%9A%94%E5%80%BC))：
        ```
        Year,Make,Model,Description,Price
        1997,Ford,E350,"ac, abs, moon",3000.00
        1999,Chevy,"Venture ""Extended Edition""","",4900.00
        1999,Chevy,"Venture ""Extended Edition, Very Large""",,5000.00
        1996,Jeep,Grand Cherokee,"MUST SELL!
        air, moon roof, loaded",4799.00
        ```
    - 資料整理
        1. 用文書工具(Number/Excel)整理資料集
        2. 匯出成 CSV 檔案
        3. 使用 [CSVJSON](https://csvjson.com/csv2json) 把 CSV 檔案轉換成 JSON 方便程式讀取使用

### 載入外部資料
- 課程中使用的資料：https://data.gov.tw/dataset/40267
- 在`preload()`裡面使用`loadJSON()`讀取上傳的 JSON 檔，或是讀取某個網址的資料。
    ```
    preload(){
        // 記得把要讀取的 JSON 檔案上傳到 OpenProcessing 的 Files 裡面
        treeData = loadJSON("XXX_data.json") 
    }
    ```
- 把物件轉成陣列：[`Object.values()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_objects/Object/values)，方便後續去遞迴陣列裡面的資料
    ```
    // 原本是物件包著物件
    dataObj = {
        1:{
            keyA: value1A,
            keyB: value1B,
            ...
        },
        2:{
            keyA: value2A,
            keyB: value2B,
            ...
        },
        ...
    }
    
    // 轉換成陣列
    dataArray = Object.values(dataObj)
    [
        {
            keyA: value1A,
            keyB: value1B,
            ...
        },
        {
            keyA: value2A,
            keyB: value2B,
            ...
        }
    ]
    
    ```
### 資料的繪製
- 在印出資料前先標準化：`let h = map(d.value,0,8000,0,height)` // 8000 是所有資料的最大值。
- 增加繪製的樣式
    ```
    drawingContext.shadowColor = color(0,30)
    drawingContxt.shadowOffsetX = 20
    drawingContxt.shadowOffsetY = 20
    ```
- 讓增長的動畫配合 easing function，可以參考：https://easings.net/
    ```
    function easeOutQuart(x){
        return 1 - pow(1 - x, 4);
    }
    
    // map 加上 true 以限制 map 的上限
    animationProgress = easeOutQuart(map(frameCount,0,300,0,1,true))
    rect(0,0,12*animationProgress,h)
    ```

### 結合控制與輸入互動
- 選擇樹種以及設定縮放大小
    1. 新增控制元件與選項
        ```
        let selElement = createSelect()
        selElement.option("針葉樹合計")
        // 如果新增滑桿的作法也類似，使用
        // let sliderElement = createSlider(0.2,1,resultScale, 0.001)
        ```
    2. 綁定更新選項的函式
        ```
        selElement.changed(selectChanged)
        function selectChanged(){
            let selectedType = this.value()
            storeItem("tree_type_select",selectedType)
            print(selectedType)
            useData= []
            for(let d of treeData){
                if (d.dname1==selectedType){
                    useData.push(d)
                    print(d)
                }
            }
        }
        ```
### 陣列操作
- [`filter()`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)：把陣列中所有符合條件的資料，包在一個陣列中回傳
    ```
    useData = treeData.filter(function(d){
        return d.dname1==storedType
    })
    ```
- [`map()`](https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Global_Objects/Array/map)：將陣列中的每筆資料透過某個函式的運算之後，包在一個陣列中回傳
    ```
    const array1 = [1, 4, 9, 16];

    // pass a function to map
    const map1 = array1.map(x => x * 2);

    console.log(map1);
    // expected output: Array [2, 8, 18, 32]
    ```
- [`find()`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) 回傳陣列中符合條件的第一筆資料
    ```
    const array1 = [5, 12, 8, 130, 44];

    const found = array1.find(element => element > 10);

    console.log(found);
    // expected output: 12
    ```

### LocalStorage 儲存資料
- 一種可以把網頁應用程式的資料儲存在瀏覽器的功能
- 一般的儲存型態是字串，使用 p5 的函式可以存取參數、陣列或物件等格式
- 使用`storeItem()`/`getItem()` 存取瀏覽器的 `localStorage`，把資料儲存在用戶的瀏覽器之中
    ```
    // 取得 localStorage 中某個欄位的資料
    let storedType = getItem("tree_type_select") || "相思樹" 
    
    // 把資料儲存到 localStorage 中的某個欄位中（如果欄位不存在就新增欄位）
    storeItem("tree_type_select",selectedType)
    ```
- `removeItem()` 移除某個欄位與資料

## 範例練習
[讀取資料與繪製](https://www.openprocessing.org/sketch/911913)
![](https://i.imgur.com/LnnwUIr.gif)

[增加用戶控制互動](https://www.openprocessing.org/sketch/911120)
![](https://i.imgur.com/S5IqDoB.gif)



## 內容回顧

### 小技巧與心法
- 心法：
    - 數量
    - 顏色
    - 大小
    - 形狀
    - 維度與走向
    - 趨勢
    - 動態
- 呈現手法
    - 拆解介紹未知的事物
    - 將複雜的現象剖析為清楚直覺的視覺呈現
    - 比較並聯繫兩個關聯的資料
    - 將資料對應到不同維度/類型（地點、時間、顏色）
    - 將資料與生活經驗（視覺、動態）關聯
- 使用 `lerpColor()` 取得兩個色票中特定區間比例的顏色
    ```
    let ratio = map(d.value, 0,8000,0,1)
    let stColor = color(19,94,28) // 最淺的顏色
    let edColor = color(216,255,0) // 最深的顏色
    let midColor = lerpColor(stColor, edColor, ratio)
    fill(midColor)
    ```
- 使用`pow()`取資料的 n 次方(n<1)，縮小資料之間的差距（如果資料量大的時候，差距太大會不太容易辨識數量）：`let h = map(pow(d.value,0.9),0,8000,0,-height)`

### p5 的語法們
- [loadJSON()](https://p5js.org/reference/#/p5/loadJSON)：讀取 JSON 格式的資料
- [drawingContext](https://p5js.org/reference/#/p5/drawingContext)：繪製時的樣式，如陰影、模糊等
    ```
    drawingContext.shadowOffsetX = 5;
    drawingContext.shadowOffsetY = -5;
    drawingContext.shadowBlur = 10;
    drawingContext.shadowColor = 'black';
    ```
- [storeItem()](https://p5js.org/reference/#/p5/storeItem)：在瀏覽器的 LocalStorage 儲存資料
- [getItem()](https://p5js.org/reference/#/p5/getItem)：從瀏覽器的 LocalStorage 讀取資料
- [removeItem()](https://p5js.org/reference/#/p5/removeItem)：從 LocalStorage 移除某項資料

- 複習三元運算子：[第三章的講義連結](https://course.creativecoding.in/note/chap/3)

## 課後問題

- 找一個喜歡的資料集，試著用動態、形狀、顏色來視覺化
- 試著將視覺畫的作品做的精緻、輸出海報的設計
- 建立切換跟控制視覺畫參數的控制功能
- 選一種資料做視覺化跟互動
    - 衛星資料視覺化
    - 天氣視覺化

## 作品範例

![](https://i.imgur.com/5Uh5Cqc.png)
https://thoughtbot.com/blog/analyzing-minards-visualization-of-napoleons-1812-march

![](https://i.imgur.com/IS5EMlg.jpg)
http://www.dear-data.com/theproject

![](https://i.imgur.com/rGNXyje.png)
https://visme.co/blog/best-data-visualizations/

![](https://i.imgur.com/78DGwXB.jpg)
https://geoawesomeness.com/ubers-amazing-geospatial-data-viz-tool-joins-the-open-source-community/

![](https://i.imgur.com/5zaq41W.png)
https://www.tapclicks.com/resources/blog/best-data-visualizations/

非數據類型的data viz
![](https://i.imgur.com/sZU0fEA.png)
https://www.washingtonpost.com/graphics/2019/business/immersive-space-suits-history-fashion-and-function/
https://visme.co/blog/best-data-visualizations/

## 參考資料與資料來源
- https://data.gov.tw/
- https://data.taipei/
- https://www.n2yo.com/rest/v1/satellite/positions/25544/41.702/-76.014/0/2/&apiKey=L3FM38-DCLE3N-5RPQYZ-481L
- https://raw.githubusercontent.com/dariusk/corpora/master/data/colors/web_colors.json
- https://github.com/awesomedata/awesome-public-datasets

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有