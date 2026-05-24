"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function OrdersPage() {

  const [orders, setOrders] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(true);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    // Get Login User
    const {
      data: { user },
    } = await supabase.auth.getUser();

    // Not Login
    if (!user) {

      window.location.href =
        "/login";

      return;

    }

    // Fetch Orders
    const { data, error } =
      await supabase
        .from("orders")
        .select("*")
        .eq(
          "email",
          user.email
        )
        .order("id", {

          ascending: false,

        });

    if (error) {

      console.log(error);

      return;

    }

    setOrders(data || []);

    setLoading(false);

  };

  // Loading
  if (loading) {

    return (

      <main className="
        min-h-screen
        flex
        items-center
        justify-center
        bg-[#F8F4EF]
      ">

        <p className="
          text-[#8B7267]
          text-xl
        ">

          Loading...

        </p>

      </main>

    );

  }

  return (

    <main className="
      min-h-screen
      bg-[#F8F4EF]
      px-6
      py-16
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        {/* Title */}
        <div className="mb-12">

          <p className="
            uppercase
            tracking-[5px]
            text-[#A18072]
            text-sm
            mb-3
          ">
            My Orders
          </p>

          <h1 className="
            text-5xl
            text-[#4B342B]
          ">

            我的订单

          </h1>

        </div>

        {/* Empty */}
        {orders.length === 0 && (

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

              暂无订单 ✨

            </p>

          </div>

        )}

        {/* Orders */}
        <div className="space-y-8">

          {orders.map((order) => (

            <div
              key={order.id}
              className="
                bg-white
                rounded-[40px]
                p-8
                shadow-sm
              "
            >

              {/* Top */}
              <div className="
                flex
                justify-between
                items-center
                flex-wrap
                gap-4
              ">

                <div>

                  <h2 className="
                    text-2xl
                    text-[#4B342B]
                  ">

                    Order #{order.id}

                  </h2>

                  <p className="
                    mt-3
                    text-[#8B7267]
                  ">

                    {order.name}

                  </p>

                  {/* Time */}
                  {order.created_at && (

                    <p className="
                      mt-2
                      text-sm
                      text-[#B08A78]
                    ">

                      {
                        new Date(
                          order.created_at
                        ).toLocaleString()
                      }

                    </p>

                  )}

                </div>

                {/* Price */}
                <div className="text-right">

                  <p className="
                    text-2xl
                    text-[#4B342B]
                  ">

                    S${order.total}

                  </p>

                  <p className="
                    mt-2
                    text-sm
                    text-[#8B7267]
                  ">

                    {order.status || "处理中"}

                  </p>

                </div>

              </div>

              {/* Items */}
              <div className="
                mt-8
                border-t
                pt-6
                space-y-4
              ">

                {order.items?.map(
                  (item: any) => (

                    <div
                      key={item.id}
                      className="
                        flex
                        justify-between
                        text-[#6F5548]
                      "
                    >

                      <p>

                        {item.name}
                        ×
                        {item.quantity}

                      </p>

                      <p>

                        S$
                        {(
                          Number(item.price) *
                          item.quantity
                        ).toFixed(2)}

                      </p>

                    </div>

                  )
                )}

              </div>

              {/* Payment Proof */}

  {order.payment_proof && (

  <div className="
    mt-8
    border-t
    pt-6
  ">

    <p className="
      text-[#8B7267]
      mb-4
    ">

      付款截图

    </p>

    {

      /\.(jpg|jpeg|png|gif|webp)$/i.test(
        order.payment_proof
      ) ? (

        <a
          href={order.payment_proof}
          target="_blank"
          rel="noopener noreferrer"
        >

          <img
            src={order.payment_proof}
            alt="Payment Proof"
            className="
              w-[220px]
              rounded-2xl
              shadow-sm
              object-cover
              cursor-pointer
              hover:scale-105
              transition
            "
          />

        </a>

      ) : (

        <a
          href={order.payment_proof}
          target="_blank"
          rel="noopener noreferrer"
          className="
            inline-block
            px-6
            py-3
            rounded-full
            bg-[#D8A6B6]
            text-white
            hover:opacity-90
            transition
          "
        >

          查看付款文件

        </a>

      )

    }

  </div>

)}

            </div>

          ))}

        </div>

      </div>

    </main>

  );

}