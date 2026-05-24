"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { useSearchParams } from "next/navigation";

export default function ProductPage() {

  const [products, setProducts] = useState<any[]>([]);

  const searchParams = useSearchParams();

  const category = searchParams.get("category");

  useEffect(() => {

    fetchProducts();

  }, [category]);

  const fetchProducts = async () => {

    let query = supabase
      .from("products")
      .select("*");

    if (category) {

      query = query.eq("category", category);

    }

    const { data, error } = await query;

    if (error) {

      console.log(error);

      return;

    }

    setProducts(data || []);

  };

  return (

    <main className="bg-[#F8F4EF] min-h-screen">

      <Navbar />

      {/* Heading */}
      <section className="py-20 text-center">

        <p className="uppercase tracking-[4px] text-[#C7A1A8]">
          Crochet Collection
        </p>

        <h1 className="text-5xl mt-5 text-[#4B342B]">

          {category === "bags" && "包包系列"}

          {category === "plushies" && "玩偶系列"}

          {category === "bouquets" && "花束系列"}

          {category === "accessories" && "饰品系列"}

          {!category && "所有商品"}

        </h1>

      </section>

      {/* Products */}
      <section className="pb-24">

        <div className="max-w-7xl mx-auto px-6">

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">

            {products?.map((product) => (

              <a
                key={product.id}
                href={`/product/${product.id}`}
                className="
                  bg-white
                  rounded-[30px]
                  overflow-hidden
                  shadow-sm
                  hover:shadow-xl
                  transition
                  block
                "
              >

                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="
                    h-[300px]
                    w-full
                    object-cover
                  "
                />

                {/* Product Info */}
                <div className="p-6">

                  {/* Chinese Name */}
                  <h2 className="text-2xl text-[#4B342B]">

                    {product.name}

                  </h2>

                  {/* English Name */}
                  <p className="mt-2 text-[#8B7267]">

                    {product.english}

                  </p>

                  {/* Price */}
                  <p className="
                    mt-5
                    text-[#4B342B]
                    text-2xl
                    font-medium
                  ">

                    S${product.price}

                  </p>

                  {/* Discount */}
                  {product.discount > 0 && (

                    <div className="mt-4">

                      <span className="
                        bg-red-100
                        text-red-500
                        px-4
                        py-2
                        rounded-full
                        text-sm
                      ">

                        🔥 {product.discount}% OFF

                      </span>

                    </div>

                  )}

                </div>

              </a>

            ))}

          </div>

        </div>

      </section>

      <Footer />

    </main>

  );

}