"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../lib/supabase";

export default function ProductPage() {

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*");

    if (error) {

      console.log(error);

      return;
    }

    if (data) {

      setProducts(data);
    }
  };

  const addToCart = (product: any) => {

    const existingCart = localStorage.getItem("cart");

    let cart = [];

    if (existingCart) {

      cart = JSON.parse(existingCart);
    }

    const existingProduct = cart.find(
      (item: any) => item.id === product.id
    );

    if (existingProduct) {

      const updatedCart = cart.map((item: any) =>

        item.id === product.id
          ? {
              ...item,
              quantity: item.quantity + 1,
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

    alert(`${product.name} 已加入购物车 🛒`);
  };

  return (
    <main className="min-h-screen px-4 md:px-8 py-16">

      {/* Heading */}
      <div className="text-center mb-16">

        <p className="uppercase tracking-[4px] text-[#BFA58A] text-sm">
          Handmade Collection
        </p>

        <h1 className="text-3xl md:text-5xl mt-4">
          商品系列
        </h1>

      </div>

      {/* Empty State */}
      {products.length === 0 && (

        <div className="bg-white rounded-[30px] p-10 shadow-sm text-center">

          <h2 className="text-3xl">
            暂无商品
          </h2>

        </div>

      )}

      {/* Product Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

        {products.map((product) => (

          <div
            key={product.id}
            className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-xl transition"
          >

            {/* Product Image */}
            <a href={`/product/${product.id}`}>

              <img
                src={product.image}
                alt={product.name}
                className="h-[350px] w-full object-cover hover:scale-105 transition duration-300"
              />

            </a>

            {/* Product Info */}
            <div className="p-6">

              <div className="flex justify-end text-2xl mb-4">
                ♡
              </div>

              <h2 className="text-2xl">
                {product.name}
              </h2>

              <p className="mt-2 text-[#7A5C4D]">
                {product.english}
              </p>

              {product.description && (

                <p className="mt-4 text-[#7A5C4D] leading-7">
                  {product.description}
                </p>

              )}

              {/* Add To Cart */}
              <button
                type="button"
                onClick={() => addToCart(product)}
                className="mt-6 w-full rounded-full bg-[#BFA58A] text-white py-4 hover:opacity-90 transition"
              >
                加入购物车
              </button>

            </div>

          </div>

        ))}

      </div>

    </main>
  );
}