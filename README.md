# 读书乐园 📚

空空和妙妙的中文阅读学习网站。

## 部署步骤

### 1. 上传到 GitHub
1. 在 GitHub 新建一个仓库（比如 `chinese-reading`）
2. 把这个文件夹里的所有文件上传进去

### 2. 连接 Netlify
1. 登录 netlify.com
2. 点 "Add new site" → "Import an existing project"
3. 选 GitHub，找到你的仓库
4. Build settings 全部留空（不需要填）
5. 点 Deploy！

### 3. 部署完成
- 网站会有一个 `.netlify.app` 的网址
- 数据自动保存在 Netlify Blobs，不会丢失

---

## 更新文章

每次让 Claude 生成新文章后，只需要修改 `public/index.html` 里的这一段：

```javascript
const ARTICLE = {
  user: "kongkong",   // 或 "miaomiao"
  title: "文章标题",
  body: `文章内容...`
};
```

改完推到 GitHub，Netlify 自动重新部署（约1分钟）。

生字数据存在服务器里，更新文章不会丢失生字记录。
