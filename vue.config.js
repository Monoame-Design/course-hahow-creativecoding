module.exports = {
  // 使用 custom domain，所以 publicPath 保持根路徑
  publicPath: '/',
  
  // 確保生產環境的 source map 不會太大
  productionSourceMap: false,
  
  // 確保 build 輸出到 dist/
  outputDir: 'dist'
}
