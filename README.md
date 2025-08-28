# Deno 本地部署：贪吃蛇小游戏(第二版)

技术栈的:deno + deno deploy + deno VK

你就用吧，一用一个不吱声😘

## 🗂️文件结构

# DENO-SNAKE-GAME

## 项目结构

```
DENO-SNAKE-GAME
├── static
│   ├── auth
│   │   ├── assets
│   │   │   └── favicon.ico
│   │   ├── auth.css
│   │   ├── login.html
│   │   ├── js
│   │   │   └── login.js
│   │   ├── register.html
│   │   └── js
│   │       └── register.js
│   └── game
│       ├── assets
│       │   └── favicon.ico
│       ├── index.html
│       ├── js
│       │   └── script.js
│       └── style.css
├── .gitignore
├── deno.json
├── deno.lock
├── README.md
└── server.ts
```

---

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
