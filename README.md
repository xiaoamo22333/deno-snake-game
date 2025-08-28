# Deno 本地部署：贪吃蛇小游戏(第二版)

技术栈的:deno + deno deploy + deno VK

你就用吧，一用一个不吱声😘

## 🗂️文件结构

/deno-snake-game ├── server.ts # 主服务器文件 (核心逻辑) ├── /static #
存放所有前端静态文件 │ ├── /auth # 存放认证相关页面 │ │ ├── auth.css │ │ ├──
login.html │ │ ├── login.js │ │ ├── register.html │ │ └── register.js │ ├──
/game # 存放游戏页面 │ │ ├── index.html │ │ ├── script.js │ │ └── style.css │
└── /assets # 存放图片资源

## ▶️ 运行步骤

```markdown
1. 安装 Deno（已安装可跳过）：https://deno.com
2. 在终端进入项目根目录：`cd snake-deno`
3. 启动本地服务器： deno task start
4. 浏览器打开：`http://localhost:8000`

也可使用任务： deno task dev
```

---

## ❓常见问题

- **端口冲突**：若 8000 被占用，改用 `DENO_DEPLOYMENT_ID` 环境变量或在
  `serveDir` 外自定义 `Deno.serve({ port: 5173 }, ...)`。
- **白屏/404**：确认目录结构是否与上方一致，以及 `server.ts` 是否在项目根目录。

# 祝你玩得开心！🐍
