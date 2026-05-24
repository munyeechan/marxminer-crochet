"use client";

import { useEffect, useState } from "react";

import { supabase } from "../../lib/supabase";

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

            <details
              key={order.id}
              className="
                bg-white
                rounded-[40px]
                p-8
                shadow-sm
              "
            >

              <summary
                className="
                  list-none
                  cursor-pointer
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
                      mt-2
                      text-[#8B7267]
                    ">

                      {order.name}

                    </p>

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

                  {/* Right */}
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

                {/* Hint */}
                <p className="
                  mt-6
                  text-sm
                  text-[#B08A78]
                ">

                  点击查看订单详情 ✨

                </p>

              </summary>

              {/* Details */}
              <div className="
                mt-8
                border-t
                pt-8
                space-y-8
              ">

                {/* Customer Info */}
                <div>

                  <h3 className="
                    text-xl
                    text-[#4B342B]
                    mb-5
                  ">

                    收货资料

                  </h3>

                  <div className="
                    space-y-3
                    text-[#6F5548]
                  ">

                    <p>
                      姓名：
                      {order.name}
                    </p>

                    <p>
                      电话：
                      {order.phone}
                    </p>

                    <p>
                      Email：
                      {order.email}
                    </p>

                    <p>
                      地址：
                      {order.address}
                    </p>

                  </div>

                </div>

                {/* Items */}
                <div>

                  <h3 className="
                    text-xl
                    text-[#4B342B]
                    mb-5
                  ">

                    商品详情

                  </h3>

                  <div className="space-y-5">

                    {order.items?.map(
                      (item: any) => (

                        <div
                          key={item.id}
                          className="
                            flex
                            justify-between
                            items-center
                            gap-4
                          "
                        >

                          <div className="
                            flex
                            items-center
                            gap-4
                          ">

                            <img
                              src={item.image}
                              alt={item.name}
                              className="
                                w-20
                                h-20
                                object-cover
                                rounded-2xl
                              "
                            />

                            <div>

                              <p className="
                                text-[#4B342B]
                              ">

                                {item.name}

                              </p>

                              <p className="
                                text-sm
                                text-[#8B7267]
                                mt-1
                              ">

                                Qty:
                                {item.quantity}

                              </p>

                            </div>

                          </div>

                          <p className="
                            text-[#4B342B]
                          ">

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

                </div>

                {/* Payment Proof */}
                {order.payment_proof && (

                  <div>

                    <h3 className="
                      text-xl
                      text-[#4B342B]
                      mb-5
                    ">

                      付款截图

                    </h3>

                    <a
                      href={order.payment_proof}
                      target="_blank"
                      rel="noopener noreferrer"
                    >

                      <img
                        src={order.payment_proof}
                        alt="Payment Proof"
                        className="
                          w-[250px]
                          rounded-2xl
                          shadow-sm
                          hover:scale-105
                          transition
                          cursor-pointer
                        "
                      />

                    </a>

                  </div>

                )}

              </div>

            </details>

          ))}

        </div>

      </div>

    </main>

  );

}