"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

import Footer from "@/components/Footer";

export default function BouquetsPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .eq("category", "bouquets");

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

      <section className="
        text-center
        px-6
        pt-24
        pb-16
      ">

        <p className="
          uppercase
          tracking-[6px]
          text-[#B89B8A]
          text-sm
          mb-4
        ">
          Collection
        </p>

        <h1 className="
          text-6xl
          text-[#6B4F43]
          font-light
          tracking-wide
        ">
          鈎針花束系列
        </h1>

      </section>

      <section className="
        max-w-7xl
        mx-auto
        w-full
        px-6
        pb-28
        flex-1
      ">

        <div className="
          grid
          grid-cols-1
          sm:grid-cols-2
          lg:grid-cols-3
          gap-12
          justify-items-center
        ">

          {products.map((product) => (

            <div
              key={product.id}
              className="
                w-full
                max-w-[380px]
                bg-[#FFFDFB]
                rounded-[32px]
                overflow-hidden
                shadow-sm
                hover:shadow-[0_10px_30px_rgba(0,0,0,0.06)]
                transition
                duration-300
                hover:-translate-y-2
              "
            >

              <Link href={`/product/${product.id}`}>

                <div className="overflow-hidden">

                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                      w-full
                      aspect-[4/5]
                      object-cover
                      hover:scale-105
                      transition
                      duration-700
                    "
                  />

                </div>

              </Link>

              <div className="
                p-6
                text-center
              ">

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
                  text-[#B08976]
                  font-medium
                  text-lg
                ">

                  SGD {product.price}

                </p>

              </div>

            </div>

          ))}

        </div>

      </section>

      <Footer />

    </main>

  );

}