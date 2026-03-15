###### tags: `互動藝術程式創作入門`

# 章節 10 網頁元素(DOM) - 取得文字、數值和其他輸入

## 單元介紹

### 目標

- 瞭解如何使用網頁元素與使用者互動
- 能夠取得文字、選項跟輸入的資料
- 瞭解如何擺放跟佈局網頁元素
- 能夠綁定網頁元素事件


## 課程重點

### DOM（Document Object Model, 文件物件模型）超快速介紹
- DOM 是什麼？
    - DOM 是一個樹狀的文件結構，藉由一層一層包覆的結構把網頁的內容架構起來。如果你在 Chrome 瀏覽器中點擊右鍵，選擇`檢查`的話，就會靠看到很多個用 `<>...</>` 包覆起來的資料，他們分別都是一個 DOM 元素，也是網頁的組成基礎喔 🐜。
    ![Document Object Model](/media/imgur/7dntYLV.png)
- DOM 可以幹嘛？
    - 除了最基礎的呈現資訊外， HTML 內建的 DOM 元件也包含了許多我們會與使用者互動的元素，如輸入框、選單、表單等，此外如果是網頁工程師，也很常會對 DOM 元素進行更改，以達到資訊更新、動畫呈現的目的。

### [p5 的 DOM 元件](https://p5js.org/reference/#group-DOM)
- 像是文字輸入框、滑桿、下拉選單、顏色選取器之類的元件，都是 html（網頁的架構語言）內建的元素，p5 進一步幫我們把這些元件包裝好，讓我們可以快速的使用他們來跟使用者互動。
- 如何使用 p5 的 DOM 元件？
    - 創建一個新的 dom 元件，並綁訂在一個變數上，方便之後的操作：`inputElement = createInput("Hello")`
    - 設定元件的位置：`inputElement.position(50,50)`
    - 取得元件的內容/數值：`let txt = inputElement.value()`
    - 設定樣式：`inputElement.style('width','80px')`
    - 綁定事件（像是滑鼠點擊、輸入之類的事件，例如：
        - `buttonElement.mousePressed(要執行的函數名稱)`
        - `inputElement.input(要執行的函數名稱)`
        - `selectElement.changed(要執行的函數名稱)`


### CSS 超級入門
- 什麼是 CSS?
    - 是一種設定網頁樣式的網頁樣式語言，用來設定網頁上的內容要怎麼呈現。像是文字的字形、大小、粗細、圖片的大小與位置，以及 CSS 動畫等。
    - 一般網頁的設定方式：直接針對 DOM 元件來設定
        ```
            // <p></p> p 元件是網頁中常用的段落元件
            // 如果我們對內建的 p 樣式不滿意
            // 我們可以透過下面的 css 來修改他：
            p { //最前面是要修改的項目，刮號內是要設定的細節
                color: 'gray'; //設定顏色
                font-size: 24px; //設定大小
                font-weight: bold; //設定粗細
            }
        ```
    - 參考：
        - [MDN 的 CSS 基礎](https://developer.mozilla.org/zh-TW/docs/Learn/Getting_started_with_the_web/CSS_basics)
        - [The CSS Zen Garden](http://www.csszengarden.com/)：有許多只透過修改 CSS 的樣式就讓網站有完全不同的風格的範例。
- 直接設定 p5 DOM 元件的 CSS 樣式
    - 使用 `element.style(樣式項目, 數值)`
    - 常用的修改項目
        - font-size
        - border-color
        - border-width
        - background-color
        - color

## 範例練習
[DOM 操作練習](https://www.openprocessing.org/sketch/901354)
![](/media/imgur/1v5orco.gif)


[彈彈文字與圖片變化](https://www.openprocessing.org/sketch/901354)
![](/media/imgur/NTTGkGm.gif)

## 內容回顧

### 小技巧與心法
- 結合 input 作為 fill() 裡面的參數，動態改變顏色樣式
    ```javascript=
    let clr = inputElement.value()
    fill(clr)
    ```
- 設定 0-1 之間來回的數值：使用 sin：sin((frameCount/20 + o/10)+1)/2
- 彈跳的重力感覺：在每一次彈跳更新的時候的時候設定 `vx *= 0.999` 
- 從字串設定一個陣列的色票：`"ff0000-ff8200-ffc100-ffeaae".split("-").map(tx=>"#"+tx)`
- mac 表情符號快捷鍵：`Control–Command–空白鍵` 😁

### p5 語法們

- text：在畫面上創造文字物件。
- textWidth：取得文字在畫面上的寬度
- DOM 元件們
    - createInput()
        - 清空 input: `this.value('')`
    - createSlider()
    - createButton()
    - createColorPicker()
    - createRadio()
    - createSelect()
        - element.option()
    - createImg()
        - element.attribute("src", "fish.png")
- 通用的屬性與事件綁定
    - element.value()
    - element.size()
    - element.style()
    - element.attr()
    - element.input(函式名稱)
    - element.change(函式名稱)

## 課後問題

## 補充

12:30左右 加上() 代表執行 function
MDN css
44:00 this
1:01 右鍵->檢查水母

## 案例參考
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