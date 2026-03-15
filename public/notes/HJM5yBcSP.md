###### tags: `互動藝術程式創作入門`

# 章節 17 文本分析 - 了解文字藝術

## 單元介紹

### 目標

- 認識圖像詩、Typogram
- 將文字與意象做連結
- 了解如何使用 rita.js 做將分析詞性（英文為主）
- 了解文字轉語音

## 課程重點

### Rita.js
- [Rita 使用範例](https://www.openprocessing.org/sketch/565415)
- 拆解字串：RiString()
- 取得詞性 pos()（Part of Speech）
    - nn: 名詞
    - jj: 形容詞
    - vbz: 動詞
    - dt: 定冠詞
    - in: 介系詞
    - 其他可參考常見的[詞性標注代號](http://blog.pulipuli.info/2017/11/fasttag-identify-part-of-speech-in.html)
- 取得隨機詞性的文字：lexicon.randomWord(詞性)
- 操作範例
```
let sentence = `The quick brown fox jumps over the lazy dog.`
result = new RiString(sentence);
print(result.words()) 拆解單字
// ["The", "quick", "brown", "fox", "jumps", "over", "the", "lazy", "dog", "."]
print(result.pos()) 取得詞性
//["dt", "jj", "jj", "nn", "vbz", "in", "dt", "jj", "nn", ".", "dt", "jj", "jj", "nn", "vbz", "in", "dt", "jj", "nn", "."]

```

### p5.speech
- 建立 p5.speech 物件： `new p5.Speech();` 
- 唸出特定詞彙： `foo.speak("狐狸")`

## 範例練習
[Raining](https://www.openprocessing.org/sketch/945385)
![](/media/imgur/jNOKhoI.gif)

[Test Rita js](https://www.openprocessing.org/sketch/945381)
![](/media/imgur/lkCaQRe.gif)

## 內容回顧

### 小技巧與心法
- 常見手法
    - 結合文字意涵影響文字的排列
    - 利用文字本身的形狀作延伸
    - 利用文字的意涵去延伸
    - 結合動態呈現
- 利用文字的意涵轉換成視覺
    - 文字 -> 顏色
    - 文字 -> 詞性
    - 文字 -> 聲音
    - 文字 -> 動態
- 製作動態詩視覺化

### p5 的語法們

- createSpan / createP

## 課後練習
- 找一首詩發想對應的動態互動
- 練習切割英文文章 根據詞性做不同動態或視覺效果
- 將文字分析結合物理模擬

## 作品範例

- 案例觀摩
    - [Visual poetry/Concrete poem(Pinterest)](https://gr.pinterest.com/dikotsona/visual-poetry/)
    - 作家 陳黎圖像詩
        - [陳黎圖象詩選](http://faculty.ndhu.edu.tw/~chenli/visualpoems.htm)
        - [戰爭交響曲](http://www.ljjh.tc.edu.tw/teach/chinese/long_road/__15.html)
        - [跟文字玩遊戲—圖像詩探討](https://www.shs.edu.tw/works/essay/2013/03/2013031812522218.pdf)
-  [Color Poems](https://discoverpoetry.com/poems/color-poems/)

## 補充資料
- [中文斷詞](http://blog.pulipuli.info/2017/03/jieba-js-online-chinese-analyzer-jieba.html)
- [中研院 斷詞系統](http://ckipsvr.iis.sinica.edu.tw/)
- [彙整中文與英文的詞性標註代號：結巴斷詞器與FastTag / Identify the Part of Speech in Chinese and English](http://blog.pulipuli.info/2017/11/fasttag-identify-part-of-speech-in.html)
- [Introduction to RiTaJS](https://creative-coding.decontextualize.com/intro-to-ritajs/)
- [p5.speech](https://idmnyu.github.io/p5.js-speech/)
- [自然語言處理 (NLP)](https://research.sinica.edu.tw/nlp-natural-language-processing-chinese-knowledge-information/)