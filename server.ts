// server.ts
import { serve } from "https://deno.land/std@0.224.0/http/server.ts";
import { serveDir } from "https://deno.land/std@0.224.0/http/file_server.ts";

const kv = await Deno.openKv();

function str2ab(str: string): Uint8Array {
  return new TextEncoder().encode(str);
}

function ab2hex(ab: ArrayBuffer): string {
  return Array.from(new Uint8Array(ab))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

async function hashPassword(password: string): Promise<string> {
  const hashBuffer = await crypto.subtle.digest("SHA-256", str2ab(password));
  return ab2hex(hashBuffer);
}

async function apiHandler(req: Request): Promise<Response> {
  const url = new URL(req.url);
  const path = url.pathname;

  if (req.method !== "POST") {
    return new Response("Invalid method", { status: 405 });
  }

  try {
    const { username, password } = await req.json() as {
      username?: string;
      password?: string;
    };

    if (!username || !password) {
      return new Response(
        JSON.stringify({ success: false, message: "用户名和密码不能为空" }),
        { status: 400 },
      );
    }

    // 注册
    if (path === "/api/register") {
      const userKey = ["users", username];
      const existingUser = await kv.get<
        { username: string; hashedPassword: string }
      >(userKey);

      if (existingUser.value) {
        return new Response(
          JSON.stringify({ success: false, message: "用户名已存在" }),
          { status: 409 },
        );
      }

      const hashedPassword = await hashPassword(password);
      await kv.set(userKey, { username, hashedPassword });

      return new Response(
        JSON.stringify({ success: true, message: "注册成功！" }),
        { status: 201 },
      );
    }

    // 登录
    if (path === "/api/login") {
      const userKey = ["users", username];
      const userRecord =
        (await kv.get<{ username: string; hashedPassword: string }>(userKey))
          .value;

      if (!userRecord) {
        return new Response(
          JSON.stringify({ success: false, message: "用户不存在" }),
          { status: 404 },
        );
      }

      const inputHashedPassword = await hashPassword(password);
      if (inputHashedPassword === userRecord.hashedPassword) {
        return new Response(
          JSON.stringify({ success: true, message: "登录成功！" }),
          { status: 200 },
        );
      }
      return new Response(
        JSON.stringify({ success: false, message: "密码错误" }),
        { status: 401 },
      );
    }

    return new Response("Not Found", { status: 404 });
  } catch (_err) {
    return new Response(
      JSON.stringify({ success: false, message: "服务器内部错误" }),
      { status: 500 },
    );
  }
}

async function mainHandler(req: Request): Promise<Response> {
  const url = new URL(req.url);

  if (url.pathname.startsWith("/api/")) {
    return apiHandler(req);
  }

  if (url.pathname === "/") {
    return Response.redirect(
      new URL("/auth/login.html", req.url).toString(),
      302,
    );
  }

  return serveDir(req, { fsRoot: "static" });
}

// ✅ 本地 & Deno Deploy 都能用
if (import.meta.main) {
  console.log("服务器启动中...");
  serve(mainHandler); // ⚠️ 不要传 { port }
}
