# 🚀 Quick Start - 只需 3 步完成遷移！

## ✅ 已完成（自動化部分）
- Git repo 設定完成
- GitHub Actions workflow 建立並成功執行
- gh-pages branch 已自動建立
- vue.config.js 和 CNAME 已設定

## 🎯 你需要做的 3 件事

### 1️⃣ 將 Repo 改為 Public（2 分鐘）

1. 前往：https://github.com/Monoame-Design/creative-coding-tw/settings
2. 拉到最下方「Danger Zone」
3. 點擊「Change repository visibility」→「Make public」
4. 輸入：`creative-coding-tw`
5. 確認

**為什麼？** GitHub Pages 免費版只支援 public repo

### 2️⃣ 啟用 GitHub Pages（1 分鐘）

1. 前往：https://github.com/Monoame-Design/creative-coding-tw/settings/pages
2. Source 選：「Deploy from a branch」
3. Branch 選：「gh-pages」+ 「/ (root)」
4. Save
5. 等 1-2 分鐘看到：「Your site is live at...」

### 3️⃣ 變更 DNS（5 分鐘）

在你的 DNS 管理介面（Cloudflare/Linode）：

```
Type: CNAME
Name: course
Target: monoame-design.github.io
```

**或用 A records：**
```
185.199.108.153
185.199.109.153
185.199.110.153
185.199.111.153
```

等 5-30 分鐘 DNS 生效，完成！🎉

---

**詳細資訊見：**
- `MIGRATION-STATUS.md` - 完整狀態報告
- `DNS-CHANGES-REQUIRED.md` - DNS 變更詳細說明
