"use client";

import { useEffect, useState } from "react";

import { supabase } from "@/lib/supabase";

export default function SettingsPage() {

  const [whatsapp, setWhatsapp] =
    useState("");

  const [email, setEmail] =
    useState("");

  const [instagram, setInstagram] =
    useState("");

  const [carousell, setCarousell] =
    useState("");

  const [paynowQr, setPaynowQr] =
    useState("");

  // Fetch settings
  useEffect(() => {

    fetchSettings();

  }, []);

  // Fetch Settings
  const fetchSettings =
    async () => {

      const { data, error } =
        await supabase
          .from("settings")
          .select("*")
          .eq("id", 1)
          .single();

      if (error) {

        console.log(error);

        return;

      }

      if (data) {

        setWhatsapp(
          data.whatsapp || ""
        );

        setEmail(
          data.email || ""
        );

        setInstagram(
          data.instagram || ""
        );

        setCarousell(
          data.carousell || ""
        );

        setPaynowQr(
          data.paynow_qr || ""
        );

      }

  };

  // Upload QR
  const handleImageUpload =
    async (
      e: React.ChangeEvent<HTMLInputElement>
    ) => {

      const file =
        e.target.files?.[0];

      if (!file) return;

      const fileName =
        `paynow-${Date.now()}`;

      // Upload to Supabase Storage
      const { error } =
        await supabase.storage
          .from("payment-qr")
          .upload(
            fileName,
            file,
            {
              upsert: true,
            }
          );

      if (error) {

        console.log(error);

        alert("上传失败");

        return;

      }

      // Get Public URL
      const {
        data: { publicUrl },
      } = supabase.storage
        .from("payment-qr")
        .getPublicUrl(fileName);

      setPaynowQr(publicUrl);

  };

  // Save Settings
  const handleSave =
    async () => {

      try {

        const { error } =
          await supabase
            .from("settings")
            .update({

              whatsapp,

              email,

              instagram,

              carousell,

              paynow_qr:
                paynowQr,

            })
            .eq("id", 1);

        if (error) {

          console.log(error);

          alert("保存失败");

          return;

        }

        alert("设置保存成功 ✨");

        fetchSettings();

      } catch (err) {

        console.log(err);

        alert("发生错误");

      }

  };

  return (

    <main className="
      min-h-screen
      bg-[#F8F4EF]
      px-6
      py-20
    ">

      <div className="
        max-w-4xl
        mx-auto
      ">

        {/* Heading */}
        <div className="mb-12">

          <p className="
            uppercase
            tracking-[4px]
            text-[#C7A1A8]
          ">

            Admin

          </p>

          <h1 className="
            text-5xl
            mt-4
            text-[#4B342B]
          ">

            网站设置

          </h1>

        </div>

        {/* Card */}
        <div className="
          bg-white
          rounded-[40px]
          p-10
          shadow-sm
          space-y-8
        ">

          {/* WhatsApp */}
          <div>

            <p className="
              mb-3
              text-[#7A5C4D]
            ">

              WhatsApp

            </p>

            <input
              type="text"
              value={whatsapp}
              onChange={(e) =>
                setWhatsapp(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                p-4
                bg-[#F7F1EA]
                outline-none
              "
            />

          </div>

          {/* Email */}
          <div>

            <p className="
              mb-3
              text-[#7A5C4D]
            ">

              Email

            </p>

            <input
              type="text"
              value={email}
              onChange={(e) =>
                setEmail(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                p-4
                bg-[#F7F1EA]
                outline-none
              "
            />

          </div>

          {/* Instagram */}
          <div>

            <p className="
              mb-3
              text-[#7A5C4D]
            ">

              Instagram

            </p>

            <input
              type="text"
              value={instagram}
              onChange={(e) =>
                setInstagram(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                p-4
                bg-[#F7F1EA]
                outline-none
              "
            />

          </div>

          {/* Carousell */}
          <div>

            <p className="
              mb-3
              text-[#7A5C4D]
            ">

              Carousell

            </p>

            <input
              type="text"
              value={carousell}
              onChange={(e) =>
                setCarousell(
                  e.target.value
                )
              }
              className="
                w-full
                rounded-2xl
                p-4
                bg-[#F7F1EA]
                outline-none
              "
            />

          </div>

          {/* Upload QR */}
          <div>

            <p className="
              mb-4
              text-[#7A5C4D]
            ">

              上传付款二维码

            </p>

            <input
              type="file"
              accept="image/*"
              onChange={
                handleImageUpload
              }
              className="
                w-full
                rounded-2xl
                p-4
                bg-[#F7F1EA]
                outline-none
              "
            />

          </div>

          {/* QR Preview */}
          {paynowQr && (

            <div>

              <p className="
                mb-4
                text-[#7A5C4D]
              ">

                二维码预览

              </p>

              <img
                src={paynowQr}
                alt="PayNow QR"
                className="
                  w-72
                  rounded-3xl
                  border
                  object-cover
                "
              />

            </div>

          )}

          {/* Save Button */}
          <button

            onClick={handleSave}

            className="
              w-full
              bg-[#D8A6B6]
              text-white
              py-5
              rounded-full
              hover:opacity-90
              transition
            "
          >

            保存设置

          </button>

        </div>

      </div>

    </main>

  );

}