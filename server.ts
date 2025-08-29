// server.ts
import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

async function apiHandler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method !== "POST") {
    return new Response("Invalid method", { status: 405 });
  }

  try {
    const { username, password } = await req.json() as { username?: string; password?: string };

    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "用户名和密码不能为空" }),
        { status: 400 },
      );
    }

    // 临时返回成功响应，不进行实际的用户验证
    if (path === "/api/register") {
      return new Response(
        JSON.stringify({ success: true, message: "注册成功！（测试模式）" }),
        { status: 201 },
      );
    }

    if (path === "/api/login") {
      return new Response(
        JSON.stringify({ success: true, message: "登录成功！（测试模式）" }),
        { status: 200 },
      );
    }

    return new Response("Not Found", { status: 404 });
  } catch (err) {
    console.error("API 处理错误:", err);
    return new Response(
      JSON.stringify({ success: false, message: "服务器内部错误" }),
      { status: 500 },
    );
  }
}

async function mainHandler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  if (url.pathname.startsWith("/api/")) return apiHandler(req);
  if (url.pathname === "/") return Response.redirect(new URL("/auth/login.html", req.url).toString(), 302);
  
  try {
    // 尝试使用 serveDir
    return await serveDir(req, { fsRoot: "static" });
  } catch (error) {
    // 如果在 Deno Deploy 环境中失败，返回 404
    if (error instanceof Error && error.message.includes("not supported")) {
      return new Response("Not Found", { status: 404 });
    }
    throw error;
  }
}

// 导出 handler 函数供 Deno Deploy 使用
export default mainHandler;
