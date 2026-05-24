"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ForgotPasswordPage() {

  const [email, setEmail] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleReset = async () => {

    if (!email) {

      alert("请输入 Email");

      return;

    }

    setLoading(true);

    const { error } =
      await supabase.auth.resetPasswordForEmail(

        email,

        {

          redirectTo:
            "http://localhost:3000/reset-password",

        }

      );

    setLoading(false);

    if (error) {

      alert(error.message);

      return;

    }

    alert(
      "密码重设邮件已发送 ✨"
    );

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

          忘记密码

        </h1>

        <p className="
          text-center
          text-[#8B7267]
          mt-6
          leading-8
        ">

          输入你的 Email，
          我们会发送密码重设链接给你。

        </p>

        <div className="
          mt-10
          space-y-6
        ">

          {/* Email */}
          <input
            type="email"
            placeholder="输入 Email"
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

          {/* Button */}
          <button
            onClick={handleReset}
            disabled={loading}
            className="
              w-full
              bg-[#BFA58A]
              text-white
              py-4
              rounded-full
              hover:opacity-90
              transition
              disabled:opacity-50
            "
          >

            {loading
              ? "发送中..."
              : "发送重设邮件"}

          </button>

          {/* Back */}
          <div className="text-center">

            <a
              href="/login"
              className="
                text-[#8B7267]
                hover:text-[#C797A8]
                transition
              "
            >

              返回登录

            </a>

          </div>

        </div>

      </div>

    </main>

  );

}