// app/checkout/page.tsx

"use client";

import { useEffect, useState } from "react";

import Footer from "@/components/Footer";

import { supabase } from "@/lib/supabase";

export default function CheckoutPage() {

  const [cart, setCart] =
    useState<any[]>([]);

  // Form States
  const [name, setName] =
    useState("");

  const [phone, setPhone] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [address, setAddress] =
    useState("");

  // QR
  const [paynowQr, setPaynowQr] =
    useState("");

  // Screenshot Upload
  const [paymentImage, setPaymentImage] =
    useState<File | null>(null);

  const [preview, setPreview] =
    useState("");

  // Load Cart + Settings
  useEffect(() => {

    const fetchData =
      async () => {

        // Cart
        const storedCart =
          localStorage.getItem("cart");

        if (storedCart) {

          setCart(
            JSON.parse(storedCart)
          );

        }

        // Settings
        const { data } =
          await supabase
            .from("settings")
            .select("paynow_qr")
            .eq("id", 1)
            .single();

        if (data?.paynow_qr) {

          setPaynowQr(
            data.paynow_qr
          );

        }

      };

    fetchData();

  }, []);

  // Subtotal
  const subtotal =
    cart.reduce(

      (sum, item) =>

        sum +
        (
          Number(item.price) *
          item.quantity
        ),

      0

    );

  // Shipping Fee
  const deliveryFee =
    subtotal >= 80 ? 0 : 20;

  // Final Total
  const finalTotal =
    subtotal + deliveryFee;

  // Upload Screenshot
  const handleImageUpload = (
    e: React.ChangeEvent<HTMLInputElement>
  ) => {

    const file =
      e.target.files?.[0];

    if (!file) return;

    setPaymentImage(file);

    setPreview(
      URL.createObjectURL(file)
    );

  };

  // Submit Order
  const handleCheckout =
    async () => {

      if (!paymentImage) {

        alert("请上传付款截图 ✨");

        return;

      }

      // Get Login User
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (!user) {

        alert("请先登录");

        window.location.href =
          "/login";

        return;

      }

      // Upload Screenshot
      const fileName =
        `${Date.now()}-${paymentImage.name}`;

      const { error: uploadError } =
        await supabase.storage
          .from("payments")
          .upload(
            fileName,
            paymentImage
          );

      if (uploadError) {

        console.log(uploadError);

        alert("图片上传失败");

        return;

      }

      // Public URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("payments")
        .getPublicUrl(fileName);

      // Insert Order
      const { error } =
        await supabase
          .from("orders")
          .insert([

            {

              name,

              phone,

              email: user.email,

              address,

              items: cart,

              total: finalTotal,

              payment_proof:
                publicUrl,

              status: "处理中",

            },

          ]);

      if (error) {

        console.log(error);

        alert(JSON.stringify(error));

        return;

      }

      alert("订单提交成功 ✨");

      localStorage.removeItem("cart");

      window.location.href =
        "/orders";

  };

  return (

    <main className="
      min-h-screen
      bg-[#F8F4EF]
      px-6
      py-16
    ">

      <div className="
        max-w-7xl
        mx-auto
      ">

        {/* Title */}
        <div className="mb-16">

          <p className="
            uppercase
            tracking-[5px]
            text-[#A18072]
            text-sm
            mb-3
          ">

            Checkout

          </p>

          <h1 className="
            text-5xl
            text-[#4B342B]
          ">

            订单结账

          </h1>

        </div>

        <div className="
          grid
          lg:grid-cols-3
          gap-12
        ">

          {/* Left */}
          <div className="
            lg:col-span-2
            bg-white
            rounded-[35px]
            p-10
            shadow-sm
          ">

            <h2 className="
              text-3xl
              text-[#4B342B]
              mb-10
            ">

              收货资料

            </h2>

            <div className="
              grid
              md:grid-cols-2
              gap-6
            ">

              <input
                type="text"
                placeholder="姓名"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className="
                  bg-[#F7F1EA]
                  rounded-2xl
                  p-5
                  outline-none
                "
              />

              <input
                type="text"
                placeholder="电话号码"
                value={phone}
                onChange={(e) =>
                  setPhone(e.target.value)
                }
                className="
                  bg-[#F7F1EA]
                  rounded-2xl
                  p-5
                  outline-none
                "
              />

              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                  md:col-span-2
                  bg-[#F7F1EA]
                  rounded-2xl
                  p-5
                  outline-none
                "
              />

              <input
                type="text"
                placeholder="收货地址"
                value={address}
                onChange={(e) =>
                  setAddress(e.target.value)
                }
                className="
                  md:col-span-2
                  bg-[#F7F1EA]
                  rounded-2xl
                  p-5
                  outline-none
                "
              />

            </div>

            {/* Notice */}
            <div className="
              mt-16
              bg-[#FDF8F5]
              border
              border-[#EFE1D8]
              rounded-[30px]
              p-8
            ">

              <h3 className="
                text-2xl
                text-[#4B342B]
                mb-5
              ">

                注意事项

              </h3>

              <div className="
                text-[#8B7267]
                leading-9
                text-lg
              ">

                <p>
                  注意：产品多为预定产品，
                  请下单前联系客服咨询。
                </p>

                <p className="mt-4">
                  预定后 7-14 天内发货 ✨
                </p>

              </div>

            </div>

          </div>

          {/* Right */}
          <div>

            <div className="
              bg-white
              rounded-[35px]
              p-10
              shadow-sm
              sticky
              top-10
            ">

              <h2 className="
                text-3xl
                text-[#4B342B]
                mb-10
              ">

                订单总览

              </h2>

              {/* Products */}
              <div className="space-y-5">

                {cart.map((item) => (

                  <div
                    key={item.id}
                    className="
                      flex
                      justify-between
                      text-[#8B7267]
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

                ))}

              </div>

              {/* Divider */}
              <div className="
                h-[1px]
                bg-[#E7DDD5]
                my-8
              "></div>

              {/* Subtotal */}
              <div className="
                flex
                justify-between
                text-[#8B7267]
                mb-4
              ">

                <p>小计</p>

                <p>
                  S${subtotal.toFixed(2)}
                </p>

              </div>

              {/* Shipping */}
              <div className="
                flex
                justify-between
                text-[#8B7267]
                mb-4
              ">

                <p>运费</p>

                <p>

                  {deliveryFee === 0
                    ? "免费"
                    : `S$${deliveryFee}`}

                </p>

              </div>

              {/* Total */}
              <div className="
                flex
                justify-between
                text-2xl
                text-[#4B342B]
                border-t
                pt-6
                mt-6
              ">

                <p>Total</p>

                <p>
                  S${finalTotal.toFixed(2)}
                </p>

              </div>

              {/* PayNow */}
              <div className="
                mt-10
                bg-[#FDF8F5]
                rounded-[30px]
                p-8
                border
                border-[#EFE1D8]
              ">

                <h3 className="
                  text-2xl
                  text-[#4B342B]
                  mb-6
                ">

                  PayNow 付款

                </h3>

                <img
                  src={
                    paynowQr ||
                    "/paynow.png"
                  }
                  alt="PayNow QR"
                  className="
                    w-full
                    rounded-2xl
                    shadow-sm
                  "
                />

                <div className="
                  mt-6
                  space-y-3
                  text-[#8B7267]
                  leading-8
                ">

                  <p>
                    收款名称：
                    Marxminer Crochet
                  </p>

                  <p>
                    PayNow：
                    +65 8847 3621
                  </p>

                  <p>
                    请付款后上传截图 ✨
                  </p>

                </div>

              </div>

              {/* Upload Screenshot */}
              <div className="mt-8">

                <label
                  className="
                    block
                    mb-4
                    text-[#4B342B]
                    text-lg
                  "
                >

                  上传付款截图

                </label>

                <input
                  type="file"
                  accept="image/*,.pdf,.heic,.doc,.docx"
                  onChange={handleImageUpload}
                  className="
                    w-full
                    bg-[#F7F1EA]
                    rounded-2xl
                    p-4
                    text-[#8B7267]
                  "
                />

                {/* Preview */}
                {preview && (

                  <img
                    src={preview}
                    alt="preview"
                    className="
                      mt-6
                      rounded-2xl
                      shadow-sm
                    "
                  />

                )}

              </div>

              {/* Submit */}
              <button

                type="button"

                onClick={handleCheckout}

                className="
                  mt-10
                  w-full
                  bg-[#D8A6B6]
                  text-white
                  py-5
                  rounded-full
                  text-xl
                  hover:opacity-90
                  transition
                "
              >

                提交订单

              </button>

            </div>

          </div>

        </div>

      </div>

      <Footer />

    </main>

  );

}