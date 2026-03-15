# 互動藝術程式創作入門 — 課程筆記

> **Hahow 課程：** [互動藝術程式創作入門](https://hahow.in/cr/creative-coding-1)  
> **線上筆記：** [course.creativecoding.in](https://course.creativecoding.in)

## 簡介

本站為 Hahow 「互動藝術程式創作入門」課程的線上筆記網站，使用 p5.js 教學互動藝術程式設計。

**講師：** 墨雨設計 吳哲宇  
**課程管理：** 墨雨設計 鄭安凱

## 課程章節

| # | 章節 | 主題 |
|---|------|------|
| 1-4 | 基礎繪製與色彩 | Creative Coding 入門、p5.js 開發、基礎圖形、變數與資料 |
| 5-7 | 創作生成式藝術 | 條件迴圈與互動、色彩、進階繪圖 |
| 8-11 | 互動系統與模擬 | 函數與物件、韻律與噪聲、DOM、Class 粒子系統 |
| 12-14 | 進階影音互動 | 影像聲音整合、即時串流、資料視覺化與 API |
| 15-16 | 後續應用 | 發表作品、後續路線（OF/Unreal/Unity/TD） |
| 17-19 | 加碼章節 | 文本分析 (Rita.js)、物理模擬 (Matter.js)、3D (WebGL) |

## 技術架構

- **Framework:** Vue 2 + Vue Router + Vuex
- **Build:** Vue CLI (Webpack)
- **筆記格式:** Markdown（靜態檔案，位於 `public/notes/`）
- **程式碼高亮:** highlight.js
- **部署:** GitHub Pages（push master → GitHub Actions 自動 build + deploy）

## 開發

```bash
# 安裝依賴
npm install --legacy-peer-deps

# 本地開發
npm run serve

# 建置
npm run build
```

## 部署

Push 到 `master` 會自動觸發 GitHub Actions，build 後部署到 GitHub Pages。

Custom domain `course.creativecoding.in` 透過 GoDaddy DNS CNAME 指向 `monoame-design.github.io`。

## 授權

© Monoame Interactive 墨雨互動設計
