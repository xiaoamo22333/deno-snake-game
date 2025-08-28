const form = document.getElementById("login-form");
const messageEl = document.getElementById("message");

// 自动设置主题
const prefersDark = globalThis.matchMedia &&
  globalThis.matchMedia("(prefers-color-scheme: dark)").matches;
document.body.setAttribute("data-theme", prefersDark ? "dark" : "light");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  messageEl.textContent = "";
  messageEl.className = "";

  const username = form.username.value;
  const password = form.password.value;

  const response = await fetch("/api/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ username, password }),
  });

  const result = await response.json();

  if (result.success) {
    messageEl.textContent = result.message;
    messageEl.classList.add("success");
    // 登录成功后，跳转到游戏页面
    setTimeout(() => {
      globalThis.location.href = "/game/index.html";
    }, 1000);
  } else {
    messageEl.textContent = result.message;
    messageEl.classList.add("error");
  }
});
