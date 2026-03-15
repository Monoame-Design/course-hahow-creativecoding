###### tags: `互動藝術程式創作入門`

# 章節 8 函數與物件互動 - 建構無法預測的小世界

## 單元介紹

### 目標

- 瞭解建構大型互動系統的基礎
- 瞭解如何使用函數打包重複的動作
- 瞭解陣列與物件的基礎
- 能夠結合陣列與物件
- 使用函數操作/更改物件
- 讓物件之間彼此互動

## 課程重點

### function 函數
- 為什麼要用函數：函數可以把需要重複執行的行為打包，在需要使用的時候直接使用函數就不需要再一次一步一步的執行每個步驟了。像是大家熟悉的 `setup()` 與 `draw()` 都是函數喔！其他函數的優點：
    - 解決重複的程式
    - 分拆抽象概念
    - 提高程式可讀性
- 函數的結構
```
function nameOfFunction(param1, param2 ...){ //裡面的參數 params 不是必要
    ...
    // 要重複做的事情，這邊可以使用上面傳入的參數，如 param1,param2... 等
    ...
    return dataToReturn // 要回傳的資料，非必要
}
```
- 函數的命名方式：跟變數一樣，用駝峰式命名。如果是要執行某個行為的話，第一個字會是動詞像是 `drawFlower()`。
- 傳入參數：如果函示在建立的時候可以傳入參數，那在使用的時候傳入當下不同的狀態，例如我要畫多個花，大小都不一樣，那只要改變 `drawFlower(posX, posY, size)` 裡面的 `size` 參數就好。 
    - 預設參數 `drawFlower(posX, posY, size=10){...}` 這樣可以預設 `size` 的大小。
    - 動態的使用參數，在函式內加上 `if` 的判斷，像是 `if(size){scale(size)}`，可以動態決定要不要使用參數。
    - 函數內使用參數：像是在 48:55 傳入參數時，函示外部傳入的變數是 `myFlower` 但是在 function 裡面要用 `flower` 才能取得，因為 `myFlower` 是在函式外部的變數，但是到了函數內都要用定義時的名稱才能使用喔！（這邊暫時不考慮全域變數等狀況）
- 回傳資料：定義函數時可以選擇要不要回傳值，如果回傳的話可以使用 `return 你要回傳的東西`，附帶一提，不論有沒有實際回傳的東西，函數遇到 `return` 就會終止喔！
- 函數的使用：直接用函數名稱 `nameOfFunction(param1, param2 ...)` 就會執行了，如果有回傳值的話也可以賦予到新的變數上面，像是如果函式長這樣：
```
function sayHi(yourName){
    return 'Hi '+ yourName +'!';
}
// 那我們就可以透過變數把這個回傳的問候存起來
let message =  sayHi('John')
print(message) // 會顯示 'Hi John !'
```
- 範例
    - 一般我們執行重複的行為會這樣寫：
    ```
    push()
        ellipse(mouseX, mouseY, 50)
    pop()
    ```
    - 包成函數的話，就會變成這樣：
    ```
    function drawCircle(positionX, positionY, r){
        push()
            ellipse(positionX, positionY, r)
        pop()
    }
    
    // 要使用的時候，可以恣意的填入當下想要的參數，例如：
    drawCircle(mouseX, mouseY, 50)
    ```

### 陣列：一系列形式相同的資料
- 為什麼要用陣列？ 使用陣列我們可以把相同類型的資料儲存起來，在需要用到的時候遍歷裡面的每個元素，也可以動態的增減，讓繪製多個類似圖形的效率大大提高。
- 陣列的結構：`let datas = [數值1,數值2,...]`
- 取值的方法： `datas[0]` //[] 裡面指的是要取第 n 個值，要注意 JavaScript 是從0 開始計數，所以要取第一個項目的話，是`datas[0]`，而不是 `datas[1]` 喔
- 遍歷整個陣列的方式：
    - 用for loop
    ```
    let datas = [d1,d2,d3...]
    (let i =0;i<datas.length;){
        let data =  //第 i 個資料
    }
    ```
    - 用 forEach
    - 用 for of
- 操作陣列裡面的元素
    ```
    let datas = [1,2,3,4,5]
    datas[0] += 1 // 第 1 個元素加一
    print(datas) // [2,2,3,4,5] 第 1 個元素變成 2 了！
    ```
- 陣列的操作：
    - push()：增加一個元素到陣列的最後。
    - pop()：移除掉陣列的最後一個元素。
    - slice(x, n)：從第 x 項移除 n 個元素。


### 物件：有多個屬性的資料
- 結構：
    ```
    let obj = {
        property1: value1,
        property2: value2,
        ...
    }
    ```
    ```
    // 像是
    let flower = {
        x: 300,
        y: 200,
        size: 2,
        color: "#2499f2"
        ...
    }
    ```
- 物件的取值：用`物件名稱.屬性名稱` 就可以拿到資料，像是 `print(flower.size)` // 2
- 物件的修改：直接賦予新的值，或是直接做計算。像是：`flower.y += 1` 或是 `flower.size *= 0.99`
- 物件內部的方法：把繪圖放到花的物件裡面
- this

### 結合物件、陣列與函式
```
    let flowers = [] //先設定一個空的陣列來存放花朵的物件們
    function setup(){
    ...
        for(var i=0;i<100;i++){ // 用 push() 塞入 100 個花的物件
            flowers.push(
                generateRandomFlower(random(width),random(height))
                // 這邊會收到 generateRandomFlower() 函式回傳的花朵物件
            )
        }
    ...
    }
    
    function generateRandomFlower(x,y){
        return {
                    x: x,
                    y: y,
                    r: random(50,120),
                    color: random(colors)
                }
    }
```


### 物件之間的互動
- 用 for loop 遍歷陣列裡面的物件，再使用 dist() 判斷兩個物件的距離。
    ```
    let bee = {
        x = mouseX,
        y = mouseY
    }
    
    for(let i =0; i<flowers.length; i++){
        let flower = flowers[i] //宣告一個變數設定當下這個回圈裡面的花朵，方便接下來計算使用
        if(dist(bee.x,bee.y, flower.x, flower.y) < 100){
            // 開花
        }else{
            // 關花
        }
    }
    
    ```
- 有多個蜜蜂物件也歹就補，做兩層迴圈就ok
    ```
    for(let i =0; i<flowers.length; i++){
        for(let j =0; j<bees.length; j++){
            let flower = flowers[i]
            let bee = bees[j]
            let hasBee = false // 每個花都設定自己的變數，以免被已經經過的蜜蜂影響
            if(dist(bee.x,bee.y, flower.x, flower.y) < 100){
                hasBee = true
            }
            if(hasBee){
                // 開花
            }
        }
    }
    ```


## 範例練習

[函數 Demo 版本](https://www.openprocessing.org/sketch/895520)
![](https://i.imgur.com/C72m1uA.gif)


[物件互動改良版](https://www.openprocessing.org/sketch/895546)
![](https://i.imgur.com/3i5jMVl.gif)

[老師作品版](https://www.openprocessing.org/sketch/894511)
![](https://i.imgur.com/eR7AFF8.png)

[其他參考 - 夾壽司！](https://www.openprocessing.org/sketch/898136)
![](https://i.imgur.com/jgRPFYa.png)


## 內容回顧

小技巧：
1. 在程式開始時就產生很多花
2. 用 lerp 產生漸變的變化（如花朵大小的漸變、蜜蜂飛向滑鼠位置的速度）
    ```
    if(花朵變大的條件){
        lerp(myFlower.size, 2, 0.05) // 趨近於 2 ，變得比較快
    }else{
        lerp(myFlower.size, 0, 0.01) // 趨近於 0，變得比較慢
    }
    ```
3. 加入旋轉會讓花更生動
4. 讓多個蜜蜂生動地跟著滑鼠移動
    ```
    for(let i = 0; i< bees.length; b++){
        let bee = bees[i]
        bee.x = lerp(bee.x, mouseX, random(0.01,0.1))
        bee.y = lerp(bee.y, mouseY, random(0.01,0.1))
    }
    ```

## 課後問題

## 範例觀摩
![](https://i.imgur.com/g8dAyRp.png)
https://www.flickr.com/photos/kmasback/page6
![](https://i.imgur.com/KkM0bIg.jpg)
https://borderless.teamlab.art/

![](https://i.imgur.com/ZKg2gdP.jpg)
https://www.teamlab.art/zh-hant/w/aquarium/
![](https://i.imgur.com/b10vFBL.jpg)
https://www.teamlab.art/zh-hant/w/whatloving/
![](https://i.imgur.com/sC8bN1j.png)
https://www.openprocessing.org/sketch/891619/
![](https://i.imgur.com/Oe2IiSv.png)
https://www.openprocessing.org/sketch/892128
https://www.openprocessing.org/sketch/887969/

**課程素材僅供教學，不提供其他商業用途**
---
Copyright © 2020 Monoame Studio 墨雨設計 版權所有