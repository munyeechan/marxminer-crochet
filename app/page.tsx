// app/page.tsx

"use client";

import Link from "next/link";
import Footer from "@/components/Footer";

import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";

const categories = [
  {
    id: 1,
    name: "包包",
    href: "/bags",
    image: "/bag.jpg",
  },

  {
    id: 2,
    name: "玩偶",
    href: "/plushies",
    image: "/bear.jpg",
  },

  {
    id: 3,
    name: "花束",
    href: "/bouquets",
    image: "/bouquet.jpg",
  },

  {
    id: 4,
    name: "飾品",
    href: "/accessories",
    image: "/keychain.jpg",
  },
];

export default function HomePage() {

  const [user, setUser] = useState<any>(null);

  useEffect(() => {

    supabase.auth.getUser().then(({ data }) => {

      setUser(data.user);

    });

  }, []);

  return (

    <main className="min-h-screen bg-[#F8F4EF] flex flex-col">

      {/* Top Bar */}
      <div className="bg-[#DED0C3] text-center text-sm py-3 text-[#7A5C4D] tracking-wide">
        新加坡本地手作 ｜ 滿 SGD 80 免運費
      </div>

      {/* Navbar */}
      <nav className="
        flex
        items-center
        justify-between
        px-10
        py-6
        border-b
        border-[#E5D8CC]
        bg-[#F8F4EF]
      ">

        {/* Logo */}
        <div>

          <h1 className="text-5xl font-serif text-[#7A5C4D]">
            Marxminer
          </h1>

          <p className="tracking-[6px] text-xs text-[#A18072] mt-2">
            CROCHET
          </p>

        </div>

        {/* Right Nav */}
        <div className="flex items-center gap-8 text-[#5F4639] text-sm">

          <Link href="/">首頁</Link>

          <Link href="/bags">包包</Link>

          <Link href="/plushies">玩偶</Link>

          <Link href="/bouquets">花束</Link>

          <Link href="/accessories">飾品</Link>

          <Link href="/contact">聯絡我們</Link>

          {/* Search */}
          <button className="hover:opacity-70 transition text-lg">
            🔍
          </button>

          {/* Login State */}
          {user ? (

            <div className="flex items-center gap-4">

              <p className="text-[#7A5C4D]">
                Hi, {user.email}
              </p>

              {/* Orders */}
              <Link
                href="/orders"
                className="
                  hover:text-[#B08A78]
                  transition
                "
              >
                我的訂單
              </Link>

              {/* Logout */}
              <button
                onClick={async () => {

                  await supabase.auth.signOut();

                  window.location.href = "/";

                }}
                className="
                  text-[#B08A78]
                  hover:underline
                "
              >
                Logout
              </button>

            </div>

          ) : (

            <>

              <Link
                href="/login"
                className="hover:text-[#B08A78] transition"
              >
                登錄
              </Link>

              <Link
                href="/register"
                className="hover:text-[#B08A78] transition"
              >
                註冊
              </Link>

            </>

          )}

          {/* Cart */}
          <Link
            href="/cart"
            className="hover:opacity-70 transition text-lg"
          >
            🛒
          </Link>

        </div>

      </nav>

      {/* Hero Section */}
      <section className="
        grid
        lg:grid-cols-2
        items-center
        gap-20
        px-10
        lg:px-20
        py-24
      ">

        {/* Left */}
        <div className="max-w-2xl">

          <p className="
            uppercase
            tracking-[6px]
            text-[#B08A78]
            text-sm
            mb-5
          ">
            Handmade With Love
          </p>

          <h1 className="
            text-7xl
            leading-[1.15]
            font-light
            text-[#7A5C4D]
          ">
            Handmade
            <br />
            Crochet
            <br />
            Collection
          </h1>

          <p className="
            mt-8
            text-[#8B6B5A]
            leading-9
            text-lg
            max-w-xl
          ">
            每一件作品都是純手工編織，
            帶著奶油風的溫柔感與療癒感。
            從花束、玩偶到包包，
            為你的生活增添柔軟與溫度。
          </p>

        </div>

        {/* Hero Image */}
        <div>

          <img
            src="/hero.jpg"
            alt="hero"
            className="
              w-full
              rounded-[40px]
              shadow-2xl
              object-cover
            "
          />

        </div>

      </section>

      {/* Featured Collections */}
      <section className="px-10 lg:px-20 py-24">

        <div className="text-center mb-16">

          <p className="
            uppercase
            tracking-[5px]
            text-[#B08A78]
            text-sm
            mb-4
          ">
            Featured Collections
          </p>

          <h2 className="
            text-5xl
            text-[#7A5C4D]
            font-light
          ">
            精選分類
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">

          {categories.map((category) => (

            <Link
              key={category.id}
              href={category.href}
              className="
                group
                bg-white
                rounded-[30px]
                overflow-hidden
                shadow-sm
                hover:shadow-xl
                transition
              "
            >

              {/* Category Image */}
              <img
                src={category.image}
                alt={category.name}
                className="
                  w-full
                  aspect-[4/5]
                  object-cover
                  group-hover:scale-105
                  transition
                  duration-500
                "
              />

              {/* Category Info */}
              <div className="p-6 text-center">

                <h3 className="
                  text-2xl
                  text-[#5F4639]
                ">
                  {category.name}
                </h3>

                <p className="
                  mt-2
                  text-sm
                  text-[#A18072]
                ">
                  查看分類
                </p>

              </div>

            </Link>

          ))}

        </div>

      </section>

      {/* Footer */}
      <Footer />

    </main>

  );

}