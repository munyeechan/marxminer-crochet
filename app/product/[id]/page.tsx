"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const [product, setProduct] = useState<any>(null);

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    const { id } = await params;

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {

      setProduct(data);
    }
  };

  const addToCart = () => {

    if (!product) return;

    const existingCart = localStorage.getItem("cart");

    let cart = [];

    if (existingCart) {

      cart = JSON.parse(existingCart);
    }

    cart.push({
      ...product,
      quantity: 1,
    });

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("已加入购物车 🛒");
  };

  if (!product) {

    return (
      <main className="min-h-screen flex items-center justify-center">
        Loading...
      </main>
    );
  }

  return (
    <main className="min-h-screen px-8 py-16">

      <div className="grid md:grid-cols-2 gap-16 items-center">

        <div>

          <img
            src={product.image}
            alt={product.name}
            className="rounded-[40px] shadow-lg"
          />

        </div>

        <div>

          <p className="uppercase tracking-[4px] text-[#BFA58A] text-sm">
            Marxminer Crochet
          </p>

          <h1 className="text-5xl mt-4 leading-tight">
            {product.name}
          </h1>

          <p className="mt-6 text-lg text-[#7A5C4D]">
            {product.english}
          </p>

          {product.description && (

            <p className="mt-6 text-[#7A5C4D] leading-8">
              {product.description}
            </p>

          )}

          <p className="mt-10 text-3xl font-medium">
            {product.price}
          </p>

          <button
            type="button"
            onClick={addToCart}
            className="inline-block mt-10 rounded-full bg-[#BFA58A] text-white px-10 py-4 hover:opacity-90 transition"
          >
            加入购物车 · Add to Cart
          </button>

        </div>

      </div>

    </main>
  );
}