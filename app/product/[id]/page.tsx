"use client";

import { useEffect, useState } from "react";

import { useParams } from "next/navigation";

import { supabase } from "@/lib/supabase";

export default function ProductDetailPage() {

  const params = useParams();

  const [product, setProduct] =
    useState<any>(null);

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .eq("id", params.id)
        .single();

    if (error) {

      console.log(error);

      return;

    }

    setProduct(data);

  };

  const addToCart = () => {

    const cart =
      JSON.parse(
        localStorage.getItem("cart") || "[]"
      );

    const existing =
      cart.find(
        (item: any) =>
          item.id === product.id
      );

    if (existing) {

      existing.quantity += 1;

    } else {

      cart.push({

        ...product,
        quantity: 1,

      });

    }

    localStorage.setItem(
      "cart",
      JSON.stringify(cart)
    );

    alert("已加入购物车 ✨");

  };

  if (!product) {

    return (

      <main className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#F8F4EF]
      ">

        Loading...

      </main>

    );

  }

  return (

    <main className="
      min-h-screen
      bg-[#F8F4EF]
      px-6
      py-20
    ">

      <div className="
        max-w-6xl
        mx-auto
        grid
        md:grid-cols-2
        gap-16
        items-start
      ">

        {/* Image */}
        <div className="
          rounded-[32px]
          overflow-hidden
          shadow-sm
          bg-white
        ">

          <img
            src={product.image}
            alt={product.name}
            className="
              w-full
              aspect-[4/5]
              object-cover
            "
          />

        </div>

        {/* Info */}
        <div>

          {/* Tag */}
          <div className="
            inline-block
            px-4
            py-2
            rounded-full
            border
            border-[#E5CFC2]
            text-[#B08976]
            text-sm
            mb-5
          ">

            Handmade Crochet

          </div>

          {/* Name */}
          <h1 className="
            text-5xl
            text-[#4B342B]
            font-light
          ">

            {product.name}

          </h1>

          {/* Subtitle */}
          <p className="
            mt-4
            text-[#8B7267]
            text-lg
          ">

            {product.subtitle ||
              "Handmade crochet collection"}

          </p>

          {/* Price */}
          <p className="
            mt-6
            text-3xl
            text-[#D09AA9]
            font-medium
          ">

            SGD {product.price}

          </p>

          {/* Stock Status */}
          <div className="mt-5">

            {product.stock_status ===
              "in_stock" && (

              <div className="
                inline-flex
                items-center
                gap-2
                bg-[#EEF7EE]
                text-[#5F8B62]
                px-4
                py-2
                rounded-full
                text-sm
              ">

                <span className="
                  w-2
                  h-2
                  bg-[#7BC47F]
                  rounded-full
                "></span>

                有库存

              </div>

            )}

            {product.stock_status ===
              "preorder" && (

              <div className="
                inline-flex
                items-center
                gap-2
                bg-[#FFF4E8]
                text-[#C28B4E]
                px-4
                py-2
                rounded-full
                text-sm
              ">

                <span className="
                  w-2
                  h-2
                  bg-[#F2B36D]
                  rounded-full
                "></span>

                预定商品

              </div>

            )}

            {product.stock_status ===
              "sold_out" && (

              <div className="
                inline-flex
                items-center
                gap-2
                bg-[#F9ECEC]
                text-[#B46A6A]
                px-4
                py-2
                rounded-full
                text-sm
              ">

                <span className="
                  w-2
                  h-2
                  bg-[#E07C7C]
                  rounded-full
                "></span>

                缺货

              </div>

            )}

          </div>

          {/* Divider */}
          <div className="
            mt-8
            border-t
            border-[#E8D8CE]
          "></div>

          {/* Description */}
          <div className="
            mt-8
            text-[#7A5C4D]
            leading-8
            space-y-5
          ">

            <p>

              {product.description}

            </p>

            <p>

              每件作品皆为纯手工制作，
              使用柔软毛线慢慢钩织完成。

            </p>

            <p>

              可接受颜色定制、
              花束搭配、
              玩偶款式调整等客制服务。

            </p>

          </div>

          {/* Buttons */}
          <div className="
            mt-10
            flex
            flex-wrap
            gap-4
          ">

            {/* WhatsApp */}
            <a
              href="https://wa.me/6588473621"
              target="_blank"
              className="
                px-8
                py-4
                rounded-full
                bg-[#D8A6B6]
                text-white
                hover:opacity-90
                transition
              "
            >

              WhatsApp 询问

            </a>

            {/* Add To Cart */}
            <button

              onClick={() => {

                if (
                  product.stock_status ===
                  "sold_out"
                ) {

                  alert("商品缺货");

                  return;

                }

                if (
  product.stock_status ===
  "preorder"
) {

  alert(
    "此商品为预定商品，购买后需 7-14 个工作日后寄出 ✨"
  );

}

addToCart();

              }}

              disabled={
                product.stock_status ===
                "sold_out"
              }

              className={`
                px-8
                py-4
                rounded-full
                border
                transition
                duration-300

                ${
                  product.stock_status ===
                  "sold_out"

                    ? `
                      bg-gray-300
                      border-gray-300
                      cursor-not-allowed
                      text-white
                    `

                    : `
                      border-[#D8A6B6]
                      text-[#7A5C4D]
                      hover:bg-[#F3E8DF]
                    `
                }
              `}
            >

              {
                product.stock_status ===
                "sold_out"

                  ? "商品缺货"

                  : "加入购物车"
              }

            </button>

          </div>

          {/* Feature Cards */}
          <div className="
            mt-12
            grid
            grid-cols-2
            gap-4
          ">

            <div className="
              bg-white
              rounded-[24px]
              p-5
              shadow-sm
            ">

              <h3 className="
                text-[#4B342B]
                mb-2
              ">

                用心制作

              </h3>

              <p className="
                text-sm
                text-[#8B7267]
                leading-6
              ">

                每件作品皆为手工钩织，
                充满温柔与细节。

              </p>

            </div>

            <div className="
              bg-white
              rounded-[24px]
              p-5
              shadow-sm
            ">

              <h3 className="
                text-[#4B342B]
                mb-2
              ">

                可定制

              </h3>

              <p className="
                text-sm
                text-[#8B7267]
                leading-6
              ">

                支持颜色与款式调整，
                打造专属作品。

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}