"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ResetPasswordPage() {

  const [password, setPassword] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const handleUpdatePassword =
    async () => {

      if (!password) {

        alert("请输入新密码");

        return;

      }

      setLoading(true);

      const { error } =
        await supabase.auth.updateUser({

          password,

        });

      setLoading(false);

      if (error) {

        alert(error.message);

        return;

      }

      alert("密码修改成功 ✨");

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

          重设密码

        </h1>

        <p className="
          text-center
          text-[#8B7267]
          mt-4
        ">

          请输入新的登录密码

        </p>

        <div className="
          mt-10
          space-y-6
        ">

          {/* Password */}
          <input
            type="password"
            placeholder="输入新密码"
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

          {/* Button */}
          <button
            onClick={
              handleUpdatePassword
            }
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
              ? "更新中..."
              : "更新密码"}

          </button>

        </div>

      </div>

    </main>

  );

}