"use client";

import { useEffect, useState } from "react";
import { supabase } from "../lib/supabase";

export default function Navbar() {

  const [cartCount, setCartCount] =
    useState(0);

  const [searchOpen, setSearchOpen] =
    useState(false);

  const [search, setSearch] =
    useState("");

  const [products, setProducts] =
    useState<any[]>([]);

  const [user, setUser] =
    useState<any>(null);

  const filteredProducts =
    products.filter((product) =>

      product.name
        ?.toLowerCase()
        .includes(search.toLowerCase())

    );

  useEffect(() => {

    checkUser();

    fetchProducts();

    const cart =
      localStorage.getItem("cart");

    if (cart) {

      const parsedCart =
        JSON.parse(cart);

      const totalQuantity =
        parsedCart.reduce(
          (total: number, item: any) =>
            total + item.quantity,
          0
        );

      setCartCount(totalQuantity);

    }

  }, []);

  const checkUser = async () => {

    const {

      data: { user },

    } = await supabase.auth.getUser();

    if (user) {

      setUser(user);

    }

  };

  const fetchProducts = async () => {

    const { data } =
      await supabase
        .from("products")
        .select("*");

    if (data) {

      setProducts(data);

    }

  };

  return (

    <nav className="
      bg-white
      border-b
      border-[#EFE7E2]
      relative
    ">

      {/* Top Bar */}
      <div className="
        bg-[#EFE3DD]
        text-center
        text-sm
        py-3
        text-[#7A5C4D]
      ">

        新加坡本地手作 ｜ 满 $80 新币免运费

      </div>

      {/* Main Navbar */}
      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-5
        flex
        items-center
        justify-between
      ">

        {/* Logo */}
        <a
          href="/"
          className="text-[#8A5B4A]"
        >

          <h1 className="
            text-4xl
            font-serif
          ">
            Marxminer
          </h1>

          <p className="
            tracking-[5px]
            text-sm
            mt-1
          ">
            CROCHET
          </p>

        </a>

        {/* Desktop Menu */}
        <div className="
          hidden
          md:flex
          gap-10
          text-[#4B342B]
        ">

          <a
            href="/"
            className="
              hover:text-[#C797A8]
              transition
            "
          >
            首页
          </a>

          <a
            href="/product"
            className="
              hover:text-[#C797A8]
              transition
            "
          >
            所有商品
          </a>

          <a
            href="/product?category=bags"
            className="
              hover:text-[#C797A8]
              transition
            "
          >
            包包
          </a>

          <a
            href="/product?category=plushies"
            className="
              hover:text-[#C797A8]
              transition
            "
          >
            玩偶
          </a>

          <a
            href="/product?category=bouquets"
            className="
              hover:text-[#C797A8]
              transition
            "
          >
            花束
          </a>

          <a
            href="/product?category=accessories"
            className="
              hover:text-[#C797A8]
              transition
            "
          >
            饰品
          </a>

          <a
            href="/contact"
            className="
              hover:text-[#C797A8]
              transition
            "
          >
            联系我们
          </a>

        </div>

        {/* Right Side */}
        <div className="
          flex
          items-center
          gap-6
          text-xl
          text-[#6F5B52]
        ">

          {/* Search */}
          <button
            onClick={() =>
              setSearchOpen(!searchOpen)
            }
            className="
              hover:scale-110
              transition
            "
          >
            🔍
          </button>

          {/* Wishlist */}
          <a
            href="https://wa.me/6588473621"
            target="_blank"
            className="
              hover:scale-110
              transition
            "
          >
            ♡
          </a>

          {/* User */}
          {user ? (

            <>

              <a
                href="/orders"
                className="
                  text-base
                  hover:text-[#C797A8]
                  transition
                "
              >

                我的订单

              </a>

              <span className="
                text-base
                text-[#4B342B]
              ">

                Hi,
                {user.email?.split("@")[0]}

              </span>

              <button
                onClick={async () => {

                  await supabase
                    .auth
                    .signOut();

                  window.location.reload();

                }}
                className="
                  text-base
                  hover:text-[#C797A8]
                  transition
                "
              >

                Logout

              </button>

            </>

          ) : (

            <>

              <a
                href="/login"
                className="
                  text-base
                  hover:text-[#C797A8]
                  transition
                "
              >

                登录

              </a>

              <a
                href="/register"
                className="
                  text-base
                  hover:text-[#C797A8]
                  transition
                "
              >

                注册

              </a>

            </>

          )}

          {/* Cart */}
          <a
            href="/cart"
            className="
              relative
              text-2xl
            "
          >

            🛒

            {cartCount > 0 && (

              <span
                className="
                  absolute
                  -top-2
                  -right-3
                  bg-[#D8A6B6]
                  text-white
                  text-xs
                  w-6
                  h-6
                  rounded-full
                  flex
                  items-center
                  justify-center
                "
              >

                {cartCount}

              </span>

            )}

          </a>

        </div>

      </div>

      {/* Search Popup */}
      {searchOpen && (

        <div className="
          absolute
          top-full
          left-0
          w-full
          bg-white
          border-t
          border-[#EFE7E2]
          shadow-xl
          z-50
        ">

          <div className="
            max-w-4xl
            mx-auto
            p-8
          ">

            {/* Search Input */}
            <input
              type="text"
              placeholder="搜索商品..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
                w-full
                border
                border-[#E8DDD6]
                rounded-full
                px-6
                py-4
                outline-none
                text-lg
              "
            />

            {/* Results */}
            <div className="
              mt-8
              space-y-4
            ">

              {filteredProducts.map(
                (product) => (

                <a
                  key={product.id}
                  href={`/product/${product.id}`}
                  className="
                    flex
                    items-center
                    gap-5
                    p-4
                    rounded-[25px]
                    hover:bg-[#F8F4EF]
                    transition
                  "
                >

                  <img
                    src={product.image}
                    className="
                      w-20
                      h-20
                      rounded-[20px]
                      object-cover
                    "
                  />

                  <div>

                    <h3 className="
                      text-[#4B342B]
                      text-xl
                    ">

                      {product.name}

                    </h3>

                    <p className="
                      text-[#8B7267]
                      mt-1
                    ">

                      {product.english}

                    </p>

                  </div>

                </a>

              ))}

            </div>

          </div>

        </div>

      )}

    </nav>

  );

}