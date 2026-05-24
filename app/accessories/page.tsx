// app/accessories/page.tsx

"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import Footer from "@/components/Footer";

export default function AccessoriesPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "accessories");

    if (error) {

      console.log(error);

      return;

    }

    setProducts(data || []);

  };

  return (

    <main className="
      min-h-screen
      bg-[#F8F4EF]
      flex
      flex-col
    ">

      {/* Header */}
      <section className="
        px-10
        pt-20
        pb-10
      ">

        <p className="
          uppercase
          tracking-[5px]
          text-[#A18072]
          text-sm
          mb-3
        ">
          Collection
        </p>

        <h1 className="
          text-5xl
          text-[#7A5C4D]
          font-light
        ">
          飾品系列
        </h1>

      </section>

      {/* Products */}
      <section className="
        grid
        grid-cols-1
        md:grid-cols-3
        gap-10
        px-10
        pb-24
        flex-1
      ">

        {products.map((product) => (

          <div
            key={product.id}
            className="
              bg-white
              rounded-[28px]
              overflow-hidden
              shadow-sm
              hover:shadow-xl
              transition
              duration-300
              hover:-translate-y-2
            "
          >

            {/* Product Link */}
            <Link href={`/product/${product.id}`}>

              <img
                src={product.image}
                alt={product.name}
                className="
                  w-full
                  h-[420px]
                  object-cover
                  hover:scale-105
                  transition
                  duration-500
                "
              />

            </Link>

            {/* Info */}
            <div className="p-6">

              <Link href={`/product/${product.id}`}>

                <h2 className="
                  text-2xl
                  text-[#5F4639]
                  hover:text-[#C797A8]
                  transition
                ">
                  {product.name}
                </h2>

              </Link>

              <p className="
                mt-3
                text-[#A18072]
                font-medium
                text-lg
              ">
                SGD {product.price}
              </p>

              <p className="
                mt-4
                text-[#8B6B5A]
                leading-7
              ">
                {product.description}
              </p>

              {/* Buttons */}
              <div className="
                mt-6
                flex
                gap-4
              ">

                {/* Detail */}
                <Link
                  href={`/product/${product.id}`}
                  className="
                    flex-1
                    border
                    border-[#D8C2B5]
                    text-center
                    py-3
                    rounded-full
                    text-[#7A5C4D]
                    hover:bg-[#F3E8DF]
                    transition
                  "
                >
                  查看詳情
                </Link>

                {/* Add Cart */}
                <button

                  onClick={() => {

                    const existingCart =
                      localStorage.getItem("cart");

                    let cart = [];

                    if (existingCart) {

                      cart = JSON.parse(existingCart);

                    }

                    const existingProduct =
                      cart.find(
                        (item: any) =>
                          item.id === product.id
                      );

                    if (existingProduct) {

                      const updatedCart =
                        cart.map(
                          (item: any) =>

                            item.id === product.id
                              ? {
                                  ...item,
                                  quantity:
                                    item.quantity + 1,
                                }
                              : item
                        );

                      localStorage.setItem(
                        "cart",
                        JSON.stringify(updatedCart)
                      );

                    }

                    else {

                      cart.push({

                        ...product,

                        quantity: 1,

                      });

                      localStorage.setItem(
                        "cart",
                        JSON.stringify(cart)
                      );

                    }

                    alert("已加入购物车 🛒");

                  }}

                  className="
                    flex-1
                    bg-[#D8A6B6]
                    text-white
                    py-3
                    rounded-full
                    hover:opacity-90
                    transition
                  "
                >

                  加入購物車

                </button>

              </div>

            </div>

          </div>

        ))}

      </section>

      <Footer />

    </main>

  );

}