"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../lib/supabase";

export default function PromotionsPage() {

  const [code, setCode] = useState("");
  const [discount, setDiscount] = useState("");

  const [promotions, setPromotions] = useState<any[]>([]);

  useEffect(() => {

    fetchPromotions();

  }, []);

  const fetchPromotions = async () => {

    const { data } = await supabase
      .from("promotions")
      .select("*")
      .order("id", { ascending: false });

    if (data) {

      setPromotions(data);
    }
  };

  const handleAdd = async () => {

    if (!code || !discount) {

      alert("请填写完整资料");

      return;
    }

    const { error } = await supabase
      .from("promotions")
      .insert([
        {
          code,
          discount,
          active: true,
        },
      ]);

    if (error) {

      alert(error.message);

      return;
    }

    alert("优惠码添加成功 ✨");

    setCode("");
    setDiscount("");

    fetchPromotions();
  };

  const handleDelete = async (id: number) => {

    await supabase
      .from("promotions")
      .delete()
      .eq("id", id);

    fetchPromotions();
  };

  return (
    <main className="min-h-screen px-8 py-16">

      <div className="max-w-4xl mx-auto">

        <div className="flex items-center justify-between mb-12">

          <h1 className="text-5xl">
            Promotion 管理
          </h1>

          <a
            href="/admin"
            className="rounded-full border border-[#BFA58A] px-6 py-2"
          >
            返回 Dashboard
          </a>

        </div>

        {/* Add Promotion */}
        <div className="bg-white rounded-[40px] p-10 shadow-sm space-y-6">

          <input
            type="text"
            placeholder="Promo Code"
            value={code}
            onChange={(e) => setCode(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          />

          <input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          />

          <button
            type="button"
            onClick={handleAdd}
            className="w-full rounded-full bg-[#BFA58A] text-white py-4"
          >
            添加优惠码
          </button>

        </div>

        {/* Promotion List */}
        <div className="mt-16 space-y-6">

          {promotions.map((promo) => (

            <div
              key={promo.id}
              className="bg-white rounded-[30px] p-6 shadow-sm flex items-center justify-between"
            >

              <div>

                <h2 className="text-2xl">
                  {promo.code}
                </h2>

                <p className="mt-2 text-[#7A5C4D]">
                  {promo.discount}% OFF
                </p>

              </div>

              <button
                type="button"
                onClick={() => handleDelete(promo.id)}
                className="rounded-full bg-red-500 text-white px-6 py-3"
              >
                删除
              </button>

            </div>

          ))}

        </div>

      </div>

    </main>
  );
}