"use client";

import { useEffect, useState } from "react";
import { supabase } from "../../../../lib/supabase";
import { CldUploadWidget } from "next-cloudinary";

export default function EditProductPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {

  const [name, setName] = useState("");
  const [english, setEnglish] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState("");

  useEffect(() => {

    fetchProduct();

  }, []);

  const fetchProduct = async () => {

    const { id } = await params;

    const { data } = await supabase
      .from("products")
      .select("*")
      .eq("id", id)
      .single();

    if (data) {

      setName(data.name);
      setEnglish(data.english);
      setPrice(data.price);
      setCategory(data.category);
      setDescription(data.description);
      setDiscount(data.discount);
      setImage(data.image);
    }
  };

  const handleUpdate = async () => {

    const { id } = await params;

    const { error } = await supabase
      .from("products")
      .update({
        name,
        english,
        price,
        category,
        description,
        discount,
        image,
      })
      .eq("id", id);

    if (error) {

      alert(error.message);

      return;
    }

    alert("商品更新成功 ✨");

    window.location.href = "/admin/products";
  };

  return (
    <main className="min-h-screen px-8 py-16">

      <div className="max-w-4xl mx-auto">

        <h1 className="text-5xl mb-12">
          编辑商品
        </h1>

        <div className="bg-white rounded-[40px] p-10 shadow-sm space-y-6">

          <input
            type="text"
            placeholder="商品中文名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA]"
          />

          <input
            type="text"
            placeholder="English Name"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA]"
          />

          <input
            type="text"
            placeholder="价格"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA]"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] min-h-[140px]"
          />

          <input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA]"
          />

          <CldUploadWidget
            uploadPreset="unsigned_preset"
            onSuccess={(result: any) => {

              setImage(result.info.secure_url);

            }}
          >

            {({ open }) => {

              return (
                <button
                  type="button"
                  onClick={() => open()}
                  className="w-full rounded-2xl bg-[#F7F1EA] py-4"
                >
                  更换商品图片
                </button>
              );
            }}

          </CldUploadWidget>

          {image && (

            <img
              src={image}
              alt="Preview"
              className="rounded-[30px]"
            />

          )}

          <button
            type="button"
            onClick={handleUpdate}
            className="w-full rounded-full bg-[#BFA58A] text-white py-4"
          >
            保存修改
          </button>

        </div>

      </div>

    </main>
  );
}