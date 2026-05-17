"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function OrdersPage() {

  const [orders, setOrders] = useState<any[]>([]);

  useEffect(() => {

    fetchOrders();

  }, []);

  const fetchOrders = async () => {

    const {
      data: { user },
    } = await supabase.auth.getUser();

    console.log(user);

    if (!user) {

      window.location.href = "/account/login";

      return;
    }

    const { data, error } = await supabase
      .from("orders")
      .select("*")
      .eq("user_id", user.id)
      .order("created_at", { ascending: false });

    console.log(data);
    console.log(error);

    if (data) {

      setOrders(data);
    }
  };

  return (
    <main className="min-h-screen px-8 py-16">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl mb-12">
          My Orders
        </h1>

        {orders.length === 0 && (

          <p className="text-xl">
            No orders yet.
          </p>

        )}

        <div className="space-y-6">

          {orders.map((order) => (

            <div
              key={order.id}
              className="bg-white rounded-[30px] p-6 shadow-sm"
            >

              <div className="flex items-start gap-6">

                <img
                  src={order.payment_image}
                  alt="Payment"
                  className="w-40 rounded-2xl"
                />

                <div className="flex-1">

                  <h2 className="text-2xl">
                    Order #{order.id}
                  </h2>

                  <p className="mt-2 text-[#7A5C4D]">
                    Amount: {order.amount}
                  </p>

                  <p className="mt-4">

                    Status:

                    <span
                      className={`ml-2 px-3 py-1 rounded-full text-sm text-white ${
                        order.status === "Completed"
                          ? "bg-green-500"
                          : order.status === "Preparing"
                          ? "bg-yellow-500"
                          : "bg-gray-500"
                      }`}
                    >
                      {order.status}
                    </span>

                  </p>

                </div>

              </div>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}