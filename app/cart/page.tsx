"use client";

import Link from "next/link";

import { useEffect, useState } from "react";

export default function CartPage() {

  const [cart, setCart] =
    useState<any[]>([]);

  useEffect(() => {

    const loadCart = () => {

      const storedCart =
        localStorage.getItem("cart");

      if (storedCart) {

        setCart(
          JSON.parse(storedCart)
        );

      }

      else {

        setCart([]);

      }

    };

    // First Load
    loadCart();

    // Reload When Return
    window.addEventListener(
      "focus",
      loadCart
    );

    return () => {

      window.removeEventListener(
        "focus",
        loadCart
      );

    };

  }, []);

  // Remove Item
  const removeItem = (
    id: number
  ) => {

    const updatedCart =
      cart.filter(
        (item) => item.id !== id
      );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // Update Quantity
  const updateQuantity = (
    id: number,
    type: "increase" | "decrease"
  ) => {

    const updatedCart =
      cart.map((item) => {

        if (item.id === id) {

          const newQuantity =

            type === "increase"
              ? item.quantity + 1
              : item.quantity - 1;

          return {

            ...item,

            quantity:
              newQuantity < 1
                ? 1
                : newQuantity,

          };

        }

        return item;

      });

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );

  };

  // Total
  const subtotal =
    cart.reduce(

      (acc, item) =>

        acc +
        item.price *
          item.quantity,

      0
    );

  // Shipping
  const shipping =
    subtotal >= 80
      ? 0
      : 20;

  // Final Total
  const finalTotal =
    subtotal + shipping;

  return (

    <main className="
      min-h-screen
      bg-[#F8F4EF]
      px-6
      py-16
    ">

      <div className="
        max-w-6xl
        mx-auto
      ">

        {/* Header */}
        <div className="mb-12">

          <p className="
            uppercase
            tracking-[5px]
            text-[#A18072]
            text-sm
            mb-3
          ">

            Shopping Cart

          </p>

          <h1 className="
            text-5xl
            text-[#4B342B]
          ">

            购物车

          </h1>

        </div>

        {/* Empty */}
        {cart.length === 0 && (

          <div className="
            bg-white
            rounded-[40px]
            p-12
            text-center
            shadow-sm
          ">

            <p className="
              text-2xl
              text-[#7A5C4D]
            ">

              购物车为空 ✨

            </p>

            <Link
              href="/"
              className="
                inline-block
                mt-8
                px-8
                py-4
                rounded-full
                bg-[#D8A6B6]
                text-white
                hover:opacity-90
                transition
              "
            >

              去逛逛

            </Link>

          </div>

        )}

        {/* Cart */}
        {cart.length > 0 && (

          <div className="
            grid
            lg:grid-cols-[1fr_380px]
            gap-10
          ">

            {/* Left */}
            <div className="space-y-6">

              {cart.map((item) => (

                <div
                  key={item.id}
                  className="
                    bg-white
                    rounded-[32px]
                    p-6
                    shadow-sm
                    flex
                    gap-6
                    items-center
                  "
                >

                  {/* Image */}
                  <img
                    src={item.image}
                    alt={item.name}
                    className="
                      w-32
                      h-32
                      rounded-[24px]
                      object-cover
                    "
                  />

                  {/* Info */}
                  <div className="flex-1">

                    <h2 className="
                      text-2xl
                      text-[#4B342B]
                    ">

                      {item.name}

                    </h2>

                    <p className="
                      mt-3
                      text-[#B08976]
                    ">

                      SGD {item.price}

                    </p>

                    {/* Stock Status */}
                    <div className="mt-4">

                      {item.stock_status ===
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

                      {item.stock_status ===
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

                      {item.stock_status ===
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

                    {/* Quantity */}
                    <div className="
                      mt-5
                      flex
                      items-center
                      gap-4
                    ">

                      <button

                        onClick={() =>
                          updateQuantity(
                            item.id,
                            "decrease"
                          )
                        }

                        className="
                          w-10
                          h-10
                          rounded-full
                          border
                          border-[#E5D2C7]
                        "
                      >

                        -

                      </button>

                      <span className="
                        text-[#4B342B]
                      ">

                        {item.quantity}

                      </span>

                      <button

                        onClick={() =>
                          updateQuantity(
                            item.id,
                            "increase"
                          )
                        }

                        className="
                          w-10
                          h-10
                          rounded-full
                          border
                          border-[#E5D2C7]
                        "
                      >

                        +

                      </button>

                    </div>

                  </div>

                  {/* Right */}
                  <div className="
                    text-right
                    flex
                    flex-col
                    items-end
                    gap-6
                  ">

                    <p className="
                      text-2xl
                      text-[#4B342B]
                    ">

                      SGD {
                        (
                          item.price *
                          item.quantity
                        ).toFixed(2)
                      }

                    </p>

                    <button

                      onClick={() =>
                        removeItem(item.id)
                      }

                      className="
                        text-[#C797A8]
                        hover:underline
                      "
                    >

                      删除

                    </button>

                  </div>

                </div>

              ))}

            </div>

            {/* Summary */}
            <div className="
              bg-white
              rounded-[32px]
              p-8
              shadow-sm
              h-fit
            ">

              <h2 className="
                text-3xl
                text-[#4B342B]
                mb-8
              ">

                订单概览

              </h2>

              <div className="
                space-y-5
                text-[#7A5C4D]
              ">

                <div className="
                  flex
                  justify-between
                ">

                  <span>
                    商品小计
                  </span>

                  <span>
                    SGD {subtotal.toFixed(2)}
                  </span>

                </div>

                <div className="
                  flex
                  justify-between
                ">

                  <span>
                    运费
                  </span>

                  <span>

                    {
                      shipping === 0
                        ? "Free"
                        : `SGD ${shipping}`
                    }

                  </span>

                </div>

                <div className="
                  border-t
                  pt-5
                  flex
                  justify-between
                  text-xl
                  text-[#4B342B]
                ">

                  <span>
                    总计
                  </span>

                  <span>
                    SGD {finalTotal.toFixed(2)}
                  </span>

                </div>

              </div>

              {/* Checkout */}
              <button

                onClick={() => {

                  // Sold Out Check
                  const soldOutItems =
                    cart.filter(
                      (item: any) =>
                        item.stock_status ===
                        "sold_out"
                    );

                  if (
                    soldOutItems.length > 0
                  ) {

                    alert(
                      "购物车内有缺货商品"
                    );

                    return;

                  }

                  // Preorder Check
                  const preorderItems =
                    cart.filter(
                      (item: any) =>
                        item.stock_status ===
                        "preorder"
                    );

                  if (
                    preorderItems.length > 0
                  ) {

                    alert(
                      "购物车内包含预定商品，购买后需 7-14 个工作日后寄出 ✨"
                    );

                  }

                  // Go Checkout
                  window.location.href =
                    "/checkout";

                }}

                className="
                  w-full
                  mt-10
                  bg-[#D8A6B6]
                  text-white
                  py-4
                  rounded-full
                  hover:opacity-90
                  transition
                "
              >

                Proceed To Checkout

              </button>

            </div>

          </div>

        )}

      </div>

    </main>

  );

}