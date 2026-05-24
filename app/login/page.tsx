// app/login/page.tsx

"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function LoginPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const handleLogin = async () => {

    const { error } =
      await supabase.auth.signInWithPassword({

        email,
        password,

      });

    if (error) {

      alert(error.message);

      return;

    }

    alert("登录成功 ✨");

    // 登录成功后回首页
    window.location.href = "/";

  };

  return (

    <main className="
      min-h-screen
      bg-[#F8F4EF]
      flex
      items-center
      justify-center
      px-6
    ">

      <div className="
        bg-white
        rounded-[40px]
        p-12
        shadow-sm
        w-full
        max-w-xl
      ">

        {/* Title */}
        <h1 className="
          text-5xl
          text-center
          text-[#4B342B]
          mb-10
        ">

          登录

        </h1>

        <div className="space-y-6">

          {/* Email */}
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              p-4
              bg-[#F7F1EA]
              outline-none
              focus:ring-2
              focus:ring-[#D6BFAF]
            "
          />

          {/* Password */}
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            className="
              w-full
              rounded-2xl
              p-4
              bg-[#F7F1EA]
              outline-none
              focus:ring-2
              focus:ring-[#D6BFAF]
            "
          />

          {/* Login Button */}
          <button
            onClick={handleLogin}
            className="
              w-full
              bg-[#BFA58A]
              text-white
              py-4
              rounded-full
              hover:opacity-90
              transition
            "
          >

            登录

          </button>

          {/* Forgot Password */}
          <div className="text-center">

            <a
              href="/forgot-password"
              className="
                text-[#8B7267]
                hover:text-[#C797A8]
                transition
              "
            >

              忘记密码？

            </a>

          </div>

          {/* Register */}
          <div className="
            text-center
            text-[#8B7267]
          ">

            还没有账号？

            <a
              href="/register"
              className="
                ml-2
                text-[#C797A8]
                hover:underline
              "
            >

              立即注册

            </a>

          </div>

        </div>

      </div>

    </main>

  );

}