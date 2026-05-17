"use client";

import { useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function RegisterPage() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async () => {

    if (!email || !password) {

      alert("请填写完整资料");

      return;
    }

    const { error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {

      alert(error.message);

      return;
    }

    alert("注册成功 ✨");

    window.location.href = "/account/login";
  };

  return (
    <main className="min-h-screen flex items-center justify-center px-8">

      <div className="bg-white rounded-[40px] p-12 shadow-sm w-full max-w-md">

        <h1 className="text-4xl text-center mb-10">
          Create Account
        </h1>

        <div className="space-y-6">

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          />

          <button
            type="button"
            onClick={handleRegister}
            className="w-full rounded-full bg-[#BFA58A] text-white py-4 hover:opacity-90 transition"
          >
            注册
          </button>

          <a
            href="/account/login"
            className="block text-center text-[#7A5C4D]"
          >
            已有账号？登录
          </a>

        </div>

      </div>

    </main>
  );
}