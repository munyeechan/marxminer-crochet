"use client";

import { useEffect, useState } from "react";

export default function CartPage() {

  const [cart, setCart] = useState<any[]>([]);

  useEffect(() => {

    const savedCart = localStorage.getItem("cart");

    if (savedCart) {

      setCart(JSON.parse(savedCart));
    }

  }, []);

  const handleRemove = (id: number) => {

    const updatedCart = cart.filter(
      (item: any) => item.id !== id
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const increaseQuantity = (id: number) => {

    const updatedCart = cart.map((item) =>

      item.id === id
        ? {
            ...item,
            quantity: item.quantity + 1,
          }
        : item
    );

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const decreaseQuantity = (id: number) => {

    const updatedCart = cart
      .map((item) =>

        item.id === id
          ? {
              ...item,
              quantity: item.quantity - 1,
            }
          : item
      )
      .filter((item) => item.quantity > 0);

    setCart(updatedCart);

    localStorage.setItem(
      "cart",
      JSON.stringify(updatedCart)
    );
  };

  const subtotal = cart.reduce(
    (total, item) =>
      total +
      Number(item.price.replace("S$", "")) *
      item.quantity,
    0
  );

  const shipping = cart.length > 0 ? 5 : 0;

  const total = subtotal + shipping;

  return (
    <main className="min-h-screen px-8 py-16">

      <h1 className="text-5xl mb-12">
        购物车 · Cart
      </h1>

      <div className="grid md:grid-cols-3 gap-10">

        {/* Cart Items */}
        <div className="md:col-span-2 space-y-6">

          {cart.length === 0 && (

            <div className="bg-white rounded-[30px] p-10 shadow-sm">

              <h2 className="text-2xl">
                购物车是空的 🛒
              </h2>

            </div>

          )}

          {cart.map((item) => (

            <div
              key={item.id}
              className="bg-white rounded-[30px] p-6 flex gap-6 items-center shadow-sm"
            >

              <img
                src={item.image}
                alt={item.name}
                className="w-32 h-32 object-cover rounded-2xl"
              />

              <div className="flex-1">

                <h2 className="text-2xl">
                  {item.name}
                </h2>

                <p className="mt-2 text-[#7A5C4D]">
                  {item.english}
                </p>

                <p className="mt-4 text-xl font-medium">
                  {item.price}
                </p>

                {/* Quantity */}
                <div className="flex items-center gap-4 mt-4">

                  <button
                    type="button"
                    onClick={() => decreaseQuantity(item.id)}
                    className="w-10 h-10 rounded-full bg-[#EFE6DD]"
                  >
                    -
                  </button>

                  <span className="text-xl">
                    {item.quantity}
                  </span>

                  <button
                    type="button"
                    onClick={() => increaseQuantity(item.id)}
                    className="w-10 h-10 rounded-full bg-[#EFE6DD]"
                  >
                    +
                  </button>

                </div>

                {/* Remove */}
                <button
                  type="button"
                  onClick={() => handleRemove(item.id)}
                  className="mt-4 rounded-full bg-red-500 text-white px-5 py-2 hover:opacity-90 transition"
                >
                  删除商品
                </button>

              </div>

            </div>

          ))}

        </div>

        {/* Summary */}
        <div className="bg-white rounded-[30px] p-8 shadow-sm h-fit">

          <h2 className="text-3xl mb-8">
            订单摘要
          </h2>

          <div className="flex justify-between mb-4">
            <span>商品小计</span>
            <span>S${subtotal}</span>
          </div>

          <div className="flex justify-between mb-4">
            <span>运费</span>
            <span>S${shipping}</span>
          </div>

          <div className="border-t border-[#E5D5C5] my-6"></div>

          <div className="flex justify-between text-2xl font-medium">
            <span>总计</span>
            <span>S${total}</span>
          </div>

          <a
            href="/checkout"
            className="block w-full mt-8 rounded-full bg-[#BFA58A] text-white py-4 hover:opacity-90 transition text-center"
          >
            Checkout · 结账
          </a>

        </div>

      </div>

    </main>
  );
}