"use client";

import { useState } from "react";
import { supabase } from "../../lib/supabase";
import { CldUploadWidget } from "next-cloudinary";

export default function CheckoutPage() {

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [amount, setAmount] = useState("");

  const [promoCode, setPromoCode] = useState("");
  const [discount, setDiscount] = useState(0);

  const [paymentImage, setPaymentImage] = useState("");

  const subtotal = Number(amount || 0);

  const finalTotal =
    subtotal - subtotal * discount;

  const applyPromo = () => {

    if (promoCode === "WELCOME10") {

      setDiscount(0.1);

      alert("10% OFF 已使用 ✨");
    }

    else if (promoCode === "MARX20") {

      setDiscount(0.2);

      alert("20% OFF 已使用 ✨");
    }

    else {

      alert("优惠码无效");
    }
  };

  const handleCheckout = async () => {

    if (
      !name ||
      !phone ||
      !amount ||
      !paymentImage
    ) {

      alert("请填写完整资料");

      return;
    }

    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { error } = await supabase
      .from("orders")
      .insert([
        {
          customer_name: name,
          phone,
          amount: finalTotal,
          payment_image: paymentImage,
          status: "Pending",
          user_id: user?.id,
        },
      ]);

    if (error) {

      alert(error.message);

      return;
    }

    alert("订单提交成功 ✨");

    localStorage.removeItem("cart");

    window.location.href = "/success";
  };

  return (
    <main className="min-h-screen px-8 py-16">

      <div className="max-w-3xl mx-auto">

        <h1 className="text-5xl mb-12">
          Checkout
        </h1>

        <div className="bg-white rounded-[40px] p-10 shadow-sm space-y-6">

          {/* Name */}
          <input
            type="text"
            placeholder="姓名 Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          />

          {/* Phone */}
          <input
            type="text"
            placeholder="电话号码 Phone"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          />

          {/* Amount */}
          <input
            type="text"
            placeholder="付款金额 Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          />

          {/* Promo Code */}
          <div className="space-y-4">

            <input
              type="text"
              placeholder="Promo Code"
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
            />

            <button
              type="button"
              onClick={applyPromo}
              className="w-full rounded-full bg-black text-white py-4 hover:opacity-90 transition"
            >
              Apply Promo
            </button>

          </div>

          {/* Price Summary */}
          <div className="bg-[#F7F1EA] rounded-[30px] p-6 space-y-4">

            <div className="flex justify-between">

              <span>
                Original Total
              </span>

              <span>
                S${subtotal}
              </span>

            </div>

            <div className="flex justify-between">

              <span>
                Discount
              </span>

              <span>
                {discount * 100}%
              </span>

            </div>

            <div className="border-t border-[#D9C2B0] pt-4 flex justify-between text-2xl">

              <span>
                Final Total
              </span>

              <span>
                S${finalTotal}
              </span>

            </div>

          </div>

          {/* QR */}
          <div className="bg-[#F7F1EA] rounded-[30px] p-6 text-center">

            <h2 className="text-2xl mb-4">
              请扫描 PayNow
            </h2>

            <img
              src="/paynow.jpeg"
              alt="PayNow QR"
              className="w-72 mx-auto rounded-[30px]"
            />

          </div>

          {/* Upload Payment */}
          <CldUploadWidget
            uploadPreset="unsigned_preset"
            onSuccess={(result: any) => {

              setPaymentImage(result.info.secure_url);

            }}
          >

            {({ open }) => {

              return (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full rounded-2xl bg-[#F7F1EA] py-4"
                >
                  上传付款截图
                </button>
              );
            }}

          </CldUploadWidget>

          {/* Preview */}
          {paymentImage && (

            <img
              src={paymentImage}
              alt="Payment"
              className="rounded-[30px]"
            />

          )}

          {/* Submit */}
          <button
            type="button"
            onClick={handleCheckout}
            className="w-full rounded-full bg-[#BFA58A] text-white py-4 hover:opacity-90 transition"
          >
            提交订单
          </button>

        </div>

      </div>

    </main>
  );
}