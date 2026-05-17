"use client";

export default function AdminPage() {

  return (
    <main className="min-h-screen px-8 py-16">

      <div className="max-w-5xl mx-auto">

        <h1 className="text-5xl mb-12">
          Admin Dashboard
        </h1>

        <div className="grid md:grid-cols-2 gap-8">

          {/* Products */}
          <a
            href="/admin/products"
            className="bg-white rounded-[40px] p-10 shadow-sm hover:scale-[1.02] transition block"
          >

            <h2 className="text-3xl mb-4">
              商品管理
            </h2>

            <p className="text-[#7A5C4D]">
              添加、删除、管理商品
            </p>

          </a>

          {/* Orders */}
          <a
            href="/admin/orders"
            className="bg-white rounded-[40px] p-10 shadow-sm hover:scale-[1.02] transition block"
          >

            <h2 className="text-3xl mb-4">
              订单管理
            </h2>

            <p className="text-[#7A5C4D]">
              查看订单、付款截图、订单状态
            </p>

          </a>

          {/* Promotions */}
          <a
            href="/admin/promotions"
            className="bg-white rounded-[40px] p-10 shadow-sm hover:scale-[1.02] transition block"
          >

            <h2 className="text-3xl mb-4">
              Promotions
            </h2>

            <p className="text-[#7A5C4D]">
              管理优惠码、折扣活动、Promo Code
            </p>

          </a>

        </div>

      </div>

    </main>
  );
}