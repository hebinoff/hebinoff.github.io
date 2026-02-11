# 🎮 GameHub - 免费在线小游戏平台

一个基于 GitHub Pages 托管的免费 HTML5 小游戏网站，集成 Google AdSense 广告变现。

## 📁 项目结构

```
game-website/
├── index.html              # 网站首页
├── css/
│   └── style.css          # 全局样式
├── js/
│   └── main.js            # 主页交互脚本
├── games/
│   ├── flappy-bird/       # 飞翔的小鸟游戏
│   │   ├── index.html
│   │   └── game.js
│   └── snake/             # 贪吃蛇游戏
│       ├── index.html
│       └── game.js
├── assets/                # 静态资源（图片、图标等）
├── privacy.html          # 隐私政策页面
├── terms.html            # 使用条款页面
├── contact.html          # 联系页面
├── robots.txt            # 搜索引擎爬虫配置
├── sitemap.xml           # 网站地图
├── ads.txt               # Google AdSense 验证文件
└── README.md             # 本文件
```

## 🚀 快速开始

### 1. 创建 GitHub 仓库

1. 登录 [GitHub](https://github.com)
2. 点击右上角 "+" → "New repository"
3. 仓库名称：`game-website`（可以自定义）
4. 选择 "Public"（公开）
5. ✅ 勾选 "Add a README file"
6. 点击 "Create repository"

### 2. 上传网站文件

#### 方法 A：通过 Git 命令行（推荐）

```bash
# 克隆仓库到本地
git clone https://github.com/YOUR_USERNAME/game-website.git
cd game-website

# 将所有项目文件复制到此目录
# 然后提交并推送
git add .
git commit -m "Initial commit: Add game website"
git push origin main
```

#### 方法 B：通过 GitHub 网页上传

1. 进入你的仓库页面
2. 点击 "Add file" → "Upload files"
3. 拖拽所有项目文件到上传区域
4. 填写提交信息："Initial commit"
5. 点击 "Commit changes"

### 3. 启用 GitHub Pages

1. 进入仓库的 **Settings**（设置）
2. 左侧菜单选择 **Pages**
3. 在 "Source" 部分：
   - Branch: 选择 `main`
   - Folder: 选择 `/(root)`
4. 点击 **Save**
5. 等待 1-2 分钟，你的站点将在以下地址上线：
   ```
   https://YOUR_USERNAME.github.io/game-website/
   ```

## 💰 Google AdSense 集成指南

### 步骤 1：申请 AdSense 账户

1. 访问 [Google AdSense](https://www.google.com/adsense)
2. 点击 "开始使用"
3. 使用 Google 账户登录
4. 填写网站信息：
   - 网站 URL：`https://YOUR_USERNAME.github.io/game-website/`
   - 内容语言：中文
5. 提交申请并等待审核（通常 1-3 天）

### 步骤 2：验证网站所有权

AdSense 提供多种验证方式：

#### 方法 1：HTML 标记（推荐）

1. 在 AdSense 控制台获取验证代码
2. 打开 `index.html`
3. 将代码添加到 `<head>` 标签内
4. 提交更改并等待验证

#### 方法 2：ads.txt 文件

本项目的 `ads.txt` 文件已创建，只需替换其中的 `pub-XXXXXXXXXXXXXXXX` 为你自己的发布商 ID。

### 步骤 3：配置广告位

1. 登录 [AdSense 控制台](https://adsense.google.com)
2. 进入 "广告" → "概览"
3. 点击 "按广告单元"
4. 创建以下广告单元：

#### 顶部横幅广告 (728x90)
- 名称：`gamehub_top_banner`
- 类型：展示广告
- 尺寸：自适应

#### 侧边栏广告 (300x600)
- 名称：`gamehub_sidebar`
- 类型：展示广告
- 尺寸：自适应

#### 中部横幅广告 (728x90)
- 名称：`gamehub_middle_banner`
- 类型：展示广告
- 尺寸：自适应

#### 底部横幅广告 (728x90)
- 名称：`gamehub_footer_banner`
- 类型：展示广告
- 尺寸：自适应

### 步骤 4：更新广告代码

1. 获取每个广告单元的代码
2. 替换所有 HTML 文件中的占位符：
   - 将 `ca-pub-XXXXXXXXXXXXXXXX` 替换为你的发布商 ID
   - 将 `data-ad-slot="XXXXXXXXXX"` 替换为对应的广告单元 ID

## 🎮 添加新游戏

### 1. 创建游戏目录

```bash
mkdir games/your-game-name
touch games/your-game-name/index.html
touch games/your-game-name/game.js
```

### 2. 游戏页面模板

复制现有游戏的 `index.html`，修改：
- 游戏标题
- 游戏描述
- 游戏脚本路径

### 3. 编写游戏逻辑

在 `game.js` 中实现游戏：

```javascript
// 游戏配置
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// 游戏状态
let gameState = 'menu';
let score = 0;

// 游戏主循环
function gameLoop() {
    if (gameState !== 'playing') return;
    
    update();
    draw();
    
    requestAnimationFrame(gameLoop);
}

function update() {
    // 更新游戏逻辑
}

function draw() {
    // 绘制游戏画面
}
```

### 4. 添加到首页

在 `index.html` 的游戏网格中添加：

```html
<article class="game-card">
    <a href="games/your-game-name/index.html" class="game-link">
        <div class="game-thumbnail">
            <div class="game-icon">🎮</div>
        </div>
        <div class="game-info">
            <h3>游戏名称</h3>
            <p>游戏描述...</p>
            <div class="game-meta">
                <span class="game-category">类型</span>
                <span class="game-plays">👁 0 次游玩</span>
            </div>
        </div>
    </a>
</article>
```

### 5. 更新网站地图

编辑 `sitemap.xml`，添加新游戏页面：

```xml
<url>
    <loc>https://YOUR_USERNAME.github.io/game-website/games/your-game-name/index.html</loc>
    <lastmod>2024-01-01</lastmod>
    <changefreq>monthly</changefreq>
    <priority>0.8</priority>
</url>
```

## 📈 SEO 优化建议

### 1. 关键词研究

目标关键词：
- 免费在线游戏
- HTML5小游戏
- 无需下载的游戏
- 休闲小游戏
- 在线玩游戏

### 2. 元标签优化

每个页面都应包含：
- 独特的 `<title>`（50-60字符）
- 描述性的 `<meta name="description">`（150-160字符）
- 相关的 `<meta name="keywords">`

### 3. 结构化数据

已添加 Schema.org VideoGame 标记，帮助搜索引擎理解游戏内容。

### 4. 提交到搜索引擎

#### Google Search Console:
1. 访问 [Google Search Console](https://search.google.com/search-console)
2. 添加属性 → 输入你的网站 URL
3. 验证所有权（通过 HTML 标记）
4. 提交 `sitemap.xml`

#### Bing Webmaster Tools:
1. 访问 [Bing Webmaster](https://www.bing.com/webmasters)
2. 添加网站
3. 验证并提交 sitemap

## 📊 收入预估

| 流量级别 | 日PV | 月收入预估 |
|---------|------|-----------|
| 起步 | 1,000 | $10-$30 |
| 成长 | 5,000 | $80-$200 |
| 稳定 | 20,000 | $400-$1,000 |
| 优秀 | 100,000 | $2,000-$5,000 |

**注意**：实际收入取决于多种因素，包括：
- 用户地理位置
- 广告点击率 (CTR)
- 每千次展示收入 (RPM)
- 网站内容质量
- 用户参与度

## 🔧 常见问题

### Q: 网站打不开？
- 确保 GitHub Pages 已启用
- 检查仓库是否为 Public
- 确认文件路径正确（区分大小写）

### Q: 广告不显示？
- AdSense 审核通常需要 1-3 天
- 检查广告代码是否正确插入
- 确认 `ads.txt` 文件配置正确
- 某些广告拦截器会阻止广告显示

### Q: 如何加速网站？
- 优化图片大小（使用 TinyPNG）
- 启用 GitHub Pages 的 CDN（自动启用）
- 压缩 CSS 和 JavaScript 文件

### Q: 移动端显示不正常？
- 已添加响应式设计
- 在 `css/style.css` 中检查 `@media` 查询
- 使用 Chrome DevTools 测试不同设备

## 🛡️ 合规提醒

### 内容要求
- ✅ 原创或合法授权的游戏内容
- ✅ 适当的广告展示（不影响用户体验）
- ✅ 清晰的隐私政策和使用条款
- ❌ 禁止：侵权内容、恶意软件、成人内容

### AdSense 政策
- 不要点击自己的广告
- 不要使用激励措施鼓励点击
- 确保网站有足够的内容（至少 10-20 个页面）
- 保持网站活跃更新

## 📝 更新日志

### v1.0.0 (2024-01-01)
- ✨ 初始版本发布
- 🎮 添加飞翔的小鸟游戏
- 🎮 添加贪吃蛇游戏
- 💰 集成 Google AdSense 广告位
- 📱 响应式设计支持
- 🔍 SEO 优化

## 🤝 贡献

欢迎提交 Issue 和 Pull Request！

## 📄 许可证

本项目采用 MIT 许可证 - 详见 [LICENSE](LICENSE) 文件

---

**Made with ❤️ by GameHub Team**

祝你游戏愉快，赚得盆满钵满！🎮💰
