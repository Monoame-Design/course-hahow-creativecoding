# DNS 變更清單 - course.creativecoding.in

## 需要變更的 DNS 設定

### 選項 A：使用 CNAME（推薦）

在 DNS 管理介面（Cloudflare/Linode/Domain registrar）新增或修改：

```
Type: CNAME
Name: course (或 course.creativecoding.in)
Target: monoame-design.github.io
TTL: Auto 或 3600
```

### 選項 B：使用 A Records（如果不能用 CNAME）

如果 DNS 提供商不支援 CNAME 到 subdomain，改用 A records：

```
Type: A
Name: course (或 course.creativecoding.in)
Target: 185.199.108.153
TTL: Auto 或 3600

Type: A
Name: course
Target: 185.199.109.153
TTL: Auto 或 3600

Type: A
Name: course
Target: 185.199.110.153
TTL: Auto 或 3600

Type: A
Name: course
Target: 185.199.111.153
TTL: Auto 或 3600
```

## 變更步驟

1. 登入 DNS 管理介面
2. 找到 `creativecoding.in` domain 的 DNS 設定
3. 修改或新增 `course` subdomain 的記錄：
   - 如果已有指向 `139.162.34.246` 的 A record → 改成上面的設定
   - 如果沒有 → 新增上面的設定
4. 儲存變更
5. 等待 DNS propagation（通常 5-30 分鐘，最多 24-48 小時）

## 驗證

DNS 變更生效後，可以用以下指令確認：

```bash
# 檢查 CNAME
dig course.creativecoding.in CNAME

# 檢查 A records
dig course.creativecoding.in A

# 或用 nslookup
nslookup course.creativecoding.in
```

預期結果：
- CNAME 方式：應該看到 `monoame-design.github.io`
- A record 方式：應該看到 GitHub Pages 的 4 個 IP 位址

## 注意事項

- ⚠️ DNS 變更前，建議先等 GitHub Pages 完全設定好並能正常訪問
- ⚠️ 變更後，原本的 Linode server (139.162.34.246) 將無法再透過此域名訪問
- ⚠️ 建議保留 Linode server 資料一段時間，確認 GitHub Pages 完全正常後再刪除
- 📝 GitHub Pages 的 IPs 來源：https://docs.github.com/en/pages/configuring-a-custom-domain-for-your-github-pages-site/managing-a-custom-domain-for-your-github-pages-site

## 目前狀態

- [x] GitHub Actions workflow 已設定並執行中
- [x] CNAME 檔案已建立（course.creativecoding.in）
- [ ] GitHub Actions 執行完成（等待中）
- [ ] GitHub Pages 設定完成（需手動在 repo settings 啟用）
- [ ] DNS 變更（需哲宇手動操作）
- [ ] DNS 生效驗證
