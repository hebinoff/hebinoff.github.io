# 🚀 部署到 GitHub Pages 详细指南

## 目录
1. [准备工作](#准备工作)
2. [创建 GitHub 仓库](#创建-github-仓库)
3. [上传代码](#上传代码)
4. [启用 GitHub Pages](#启用-github-pages)
5. [配置 Google AdSense](#配置-google-adsense)
6. [验证部署](#验证部署)

---

## 准备工作

### 你需要：
- ✅ GitHub 账户（免费注册）
- ✅ 本项目的所有文件
- ✅ 稳定的网络连接

---

## 创建 GitHub 仓库

### 步骤 1：注册/登录 GitHub
1. 访问 https://github.com
2. 如果没有账户，点击 "Sign up" 注册
3. 如果已有账户，点击 "Sign in" 登录

### 步骤 2：创建新仓库
1. 点击右上角的 **+** 号
2. 选择 **"New repository"**
3. 填写仓库信息：
   ```
   Repository name: game-website
   Description: 免费在线小游戏平台
   Visibility: Public (必须选择公开)
   ☑️ Add a README file
   ```
4. 点击 **"Create repository"**

---

## 上传代码

### 方法 A：使用 Git 命令行（推荐）

#### 步骤 1：安装 Git
如果尚未安装 Git：
- Windows: https://git-scm.com/download/win
- Mac: `brew install git`
- Linux: `sudo apt-get install git`

#### 步骤 2：配置 Git
```bash
git config --global user.name "你的用户名"
git config --global user.email "你的邮箱@example.com"
```

#### 步骤 3：克隆仓库
```bash
# 将 YOUR_USERNAME 替换为你的 GitHub 用户名
git clone https://github.com/YOUR_USERNAME/game-website.git
cd game-website
```

#### 步骤 4：复制项目文件
将本项目所有文件和文件夹复制到 `game-website` 目录

#### 步骤 5：提交并推送
```bash
# 添加所有文件
git add .

# 提交更改
git commit -m "Initial commit: Add game website with Flappy Bird and Snake games"

# 推送到 GitHub
git push origin main
```

### 方法 B：通过 GitHub 网页上传

#### 步骤 1：进入仓库
访问 `https://github.com/YOUR_USERNAME/game-website`

#### 步骤 2：上传文件
1. 点击 **"Add file"** 按钮
2. 选择 **"Upload files"**
3. 将项目文件夹中的所有文件拖拽到上传区域
4. 或者点击 **"choose your files"** 选择文件

#### 步骤 3：提交更改
1. 在 "Commit changes" 部分填写：
   ```
   Add files via upload
   ```
2. 点击 **"Commit changes"**

#### 步骤 4：创建文件夹结构
由于 GitHub 网页上传不能直接创建文件夹，你需要：

1. 点击 **"Add file"** → **"Create new file"**
2. 在文件名中输入文件夹路径：
   ```
   games/flappy-bird/.gitkeep
   ```
3. 点击 **"Commit new file"**
4. 重复为其他文件夹创建 `.gitkeep` 文件
5. 然后分别上传各文件夹内的文件

**注意**：推荐使用 Git 命令行方法，更简单可靠！

---

## 启用 GitHub Pages

### 步骤 1：进入设置
1. 在你的仓库页面，点击顶部的 **"Settings"** 标签

### 步骤 2：找到 Pages 设置
1. 在左侧边栏中，找到并点击 **"Pages"**

### 步骤 3：配置发布源
1. 在 "Source" 部分：
   - Branch: 选择 `main` 或 `master`
   - Folder: 选择 `/(root)`
2. 点击 **"Save"**

### 步骤 4：等待部署
1. GitHub 会自动构建和部署你的网站
2. 这个过程通常需要 1-2 分钟
3. 刷新页面，你会看到：
   ```
   🟢 Your site is published at https://YOUR_USERNAME.github.io/game-website/
   ```

### 步骤 5：访问网站
点击显示的链接，或直接在浏览器中访问：
```
https://YOUR_USERNAME.github.io/game-website/
```

---

## 配置 Google AdSense

### 步骤 1：申请 AdSense 账户

1. 访问 https://www.google.com/adsense
2. 点击 **"开始使用"**
3. 使用你的 Google 账户登录
4. 填写信息：
   ```
   网站 URL: https://YOUR_USERNAME.github.io/game-website/
   内容语言: 中文（简体）
   国家/地区: 中国
   ```
5. 接受条款并提交申请

### 步骤 2：等待审核
- 审核通常需要 1-3 个工作日
- 你会收到电子邮件通知审核结果

### 步骤 3：验证网站所有权

#### 方法 1：HTML 标记验证
1. 在 AdSense 控制台获取验证代码
2. 打开 `index.html`
3. 找到 `<head>` 标签
4. 在 `<head>` 内添加 AdSense 提供的验证代码：
   ```html
   <head>
       <!-- 其他代码... -->
       <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-YOUR_PUBLISHER_ID" crossorigin="anonymous"></script>
       <!-- 其他代码... -->
   </head>
   ```
5. 提交更改并推送到 GitHub
6. 在 AdSense 点击 "验证"

#### 方法 2：ads.txt 文件验证
1. 编辑项目中的 `ads.txt` 文件
2. 将 `pub-XXXXXXXXXXXXXXXX` 替换为你的发布商 ID
3. 提交更改并推送到 GitHub
4. 在 AdSense 中选择 "ads.txt" 验证方法

### 步骤 4：更新广告代码

1. 登录 AdSense 控制台
2. 进入 "广告" → "概览" → "按广告单元"
3. 创建以下广告单元：

#### 创建广告单元：

**顶部横幅广告：**
- 名称: `gamehub_top`
- 广告类型: 展示广告
- 尺寸: 自适应

**侧边栏广告：**
- 名称: `gamehub_sidebar`
- 广告类型: 展示广告
- 尺寸: 自适应

**中部横幅广告：**
- 名称: `gamehub_middle`
- 广告类型: 展示广告
- 尺寸: 自适应

**底部横幅广告：**
- 名称: `gamehub_footer`
- 广告类型: 展示广告
- 尺寸: 自适应

4. 获取每个广告单元的代码
5. 替换项目中的所有占位符：
   - `ca-pub-XXXXXXXXXXXXXXXX` → 你的发布商 ID
   - `data-ad-slot="XXXXXXXXXX"` → 对应的广告单元 ID

### 步骤 5：更新所有 HTML 文件

需要更新的文件：
- `index.html`
- `games/flappy-bird/index.html`
- `games/snake/index.html`
- `privacy.html`
- `terms.html`
- `contact.html`

每个文件中查找并替换：
```html
<!-- 旧代码（占位符） -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-XXXXXXXXXXXXXXXX"
     data-ad-slot="XXXXXXXXXX"
     data-ad-format="horizontal"
     data-full-width-responsive="true"></ins>

<!-- 新代码（使用你的真实ID） -->
<script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-1234567890123456" crossorigin="anonymous"></script>
<ins class="adsbygoogle"
     style="display:block"
     data-ad-client="ca-pub-1234567890123456"
     data-ad-slot="1234567890"
     data-ad-format="horizontal"
     data-full-width-responsive="true"></ins>
```

---

## 验证部署

### 检查清单：

- [ ] 网站可以正常访问
- [ ] 首页显示正常
- [ ] 游戏可以正常玩
- [ ] 响应式设计在手机上正常
- [ ] 广告位显示（可能需要等待 AdSense 审核完成）
- [ ] 隐私政策页面可以访问
- [ ] 使用条款页面可以访问

### 测试设备：
- [ ] 桌面 Chrome 浏览器
- [ ] 桌面 Firefox 浏览器
- [ ] iPhone Safari
- [ ] Android Chrome

### 速度测试：
访问 https://pagespeed.web.dev/ 测试网站性能

---

## 常见问题

### Q: 网站显示 404 错误？
**解决方案：**
1. 确保 GitHub Pages 已启用（Settings → Pages）
2. 检查仓库是否为 Public
3. 确认文件路径正确（注意大小写）
4. 等待 2-3 分钟再刷新

### Q: CSS/JS 文件加载失败？
**解决方案：**
1. 检查文件路径是否正确
2. 使用浏览器开发者工具（F12）查看错误
3. 确保文件名大小写匹配

### Q: 广告不显示？
**可能原因：**
1. AdSense 账户仍在审核中
2. 广告代码配置错误
3. 浏览器广告拦截器
4. 网站内容不足

**解决方案：**
1. 检查 AdSense 账户状态
2. 确认代码中的发布商ID和广告单元ID正确
3. 禁用广告拦截器测试
4. 添加更多内容后再申请

### Q: 游戏运行卡顿？
**解决方案：**
1. 优化游戏代码（减少每帧计算）
2. 使用 `requestAnimationFrame`
3. 降低画布分辨率
4. 检查浏览器控制台错误

---

## 后续维护

### 添加新游戏：
1. 创建新的游戏文件夹
2. 编写游戏代码
3. 添加到首页
4. 更新 sitemap.xml
5. 提交到 GitHub

### 更新内容：
```bash
git add .
git commit -m "Add new game: Game Name"
git push origin main
```

### 监控流量：
1. 在 AdSense 查看收入报告
2. 使用 Google Analytics 跟踪访问数据
3. 在 Search Console 查看搜索表现

---

## 恭喜！🎉

你现在拥有了一个完整的游戏网站！记得：
- 📱 分享到社交媒体获取流量
- 🎮 定期添加新游戏保持用户粘性
- 📈 分析数据优化广告位置
- 🔄 持续更新内容提高搜索排名

祝你的游戏网站大获成功！💰
