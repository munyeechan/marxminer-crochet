"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function RegisterPage() {

  const [email, setEmail] =
    useState("");

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleRegister = async () => {

    if (!email || !password) {

      alert("请输入完整资料");

      return;

    }

    setLoading(true);

    const { error } =
      await supabase.auth.signUp({

        email,
        password,

      });

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    alert("注册成功 ✨");

    window.location.href =
      "/login";

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

        <h1 className="
          text-5xl
          text-center
          text-[#4B342B]
        ">

          注册

        </h1>

        <div className="
          mt-10
          space-y-6
        ">

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
            "
          />

          {/* Register Button */}
          <button
            onClick={handleRegister}
            disabled={loading}
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

            {loading
              ? "注册中..."
              : "注册"}

          </button>

          {/* Login */}
          <div className="
            text-center
            text-[#8B7267]
          ">

            已经有账号？

            <a
              href="/login"
              className="
                ml-2
                text-[#C797A8]
                hover:underline
              "
            >

              立即登录

            </a>

          </div>

        </div>

      </div>

    </main>

  );

}