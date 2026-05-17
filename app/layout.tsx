"use client";

import "./globals.css";
import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {

  const [userEmail, setUserEmail] = useState("");

  useEffect(() => {

    getUser();

  }, []);

  const getUser = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (user?.email) {

      setUserEmail(user.email);
    }
  };

  return (
    <html lang="en">

      <body className="bg-[#F7F1EA] text-[#5C4033]">

        {/* Navbar */}
        <nav className="flex items-center justify-between px-8 py-6 border-b border-[#E5D5C5] bg-[#F7F1EA] sticky top-0 z-50">

          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-semibold tracking-wide"
          >
            Marxminer Crochet
          </a>

          {/* Mobile Menu */}
          <button className="md:hidden text-3xl">
            ☰
          </button>

          {/* Desktop Navigation */}
          <div className="hidden md:flex gap-6 text-sm items-center">

            <a href="/">
              首页
            </a>

            <a href="/product">
              商品
            </a>

            <a href="/cart">
              购物车
            </a>

            <a href="/checkout">
              Checkout
            </a>

            {userEmail ? (

              <>

                <span>
                  Hi, {userEmail.split("@")[0]}
                </span>

                <a href="/account/orders">
                  My Orders
                </a>

                <button
                  type="button"
                  onClick={async () => {

                    await supabase.auth.signOut();

                    window.location.href = "/";
                  }}
                >
                  Logout
                </button>

              </>

            ) : (

              <>

                <a href="/account/login">
                  Login
                </a>

                <a href="/account/register">
                  Register
                </a>

              </>

            )}

          </div>

          {/* Language Switcher */}
          <div className="hidden md:flex gap-3 text-sm">

            <a
              href="/"
              className="hover:underline"
            >
              中文
            </a>

            <a
              href="/en"
              className="hover:underline"
            >
              EN
            </a>

            <a
              href="/ms"
              className="hover:underline"
            >
              BM
            </a>

          </div>

        </nav>

        {/* Main Content */}
        {children}

        {/* Footer */}
        <footer className="bg-[#EFE6DD] px-8 py-16 mt-20">

          <div className="grid md:grid-cols-3 gap-10">

            {/* Brand */}
            <div>

              <h3 className="text-2xl mb-4">
                Marxminer Crochet
              </h3>

              <p className="text-[#7A5C4D] leading-7">
                Handmade crochet creations crafted with warmth,
                softness and love.
              </p>

            </div>

            {/* Navigation */}
            <div>

              <h4 className="text-xl mb-4">
                导航
              </h4>

              <ul className="space-y-2 text-[#7A5C4D]">

                <li>
                  <a href="/">首页</a>
                </li>

                <li>
                  <a href="/product">商品</a>
                </li>

                <li>
                  <a href="/cart">购物车</a>
                </li>

                <li>
                  <a href="/checkout">Checkout</a>
                </li>

                {userEmail ? (

                  <>

                    <li>
                      <a href="/account/orders">
                        My Orders
                      </a>
                    </li>

                    <li>

                      <button
                        type="button"
                        onClick={async () => {

                          await supabase.auth.signOut();

                          window.location.href = "/";
                        }}
                      >
                        Logout
                      </button>

                    </li>

                  </>

                ) : (

                  <>

                    <li>
                      <a href="/account/login">
                        Login
                      </a>
                    </li>

                    <li>
                      <a href="/account/register">
                        Register
                      </a>
                    </li>

                  </>

                )}

              </ul>

            </div>

            {/* Contact */}
            <div>

              <h4 className="text-xl mb-4">
                联系我们
              </h4>

              <p className="text-[#7A5C4D]">
                Instagram: @marxminer.crochet
              </p>

              <p className="text-[#7A5C4D] mt-2">
                Singapore
              </p>

            </div>

          </div>

          <div className="border-t border-[#D9C2B0] mt-12 pt-6 text-center text-sm text-[#7A5C4D]">
            © 2026 Marxminer Crochet. All rights reserved.
          </div>

        </footer>

      </body>

    </html>
  );
}