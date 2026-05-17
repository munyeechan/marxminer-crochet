"use client";

import { useState, useEffect } from "react";
import { supabase } from "../../../lib/supabase";
import { CldUploadWidget } from "next-cloudinary";

export default function ProductsPage() {

  const [name, setName] = useState("");
  const [english, setEnglish] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [description, setDescription] = useState("");
  const [discount, setDiscount] = useState("");
  const [image, setImage] = useState("");

  const [products, setProducts] = useState<any[]>([]);

  useEffect(() => {

    fetchProducts();

  }, []);

  const fetchProducts = async () => {

    const { data, error } = await supabase
      .from("products")
      .select("*")
      .order("id", { ascending: false });

    if (error) {

      console.log(error);

      return;
    }

    if (data) {

      setProducts(data);
    }
  };

  const handleSubmit = async () => {

    if (
      !name ||
      !english ||
      !price ||
      !category ||
      !description ||
      !image
    ) {

      alert("请填写完整商品资料");

      return;
    }

    const { error } = await supabase
      .from("products")
      .insert([
        {
          name,
          english,
          price,
          category,
          description,
          image,
          discount,
        },
      ]);

    if (error) {

      alert(error.message);

      return;
    }

    alert("商品添加成功 ✨");

    fetchProducts();

    setName("");
    setEnglish("");
    setPrice("");
    setCategory("");
    setDescription("");
    setDiscount("");
    setImage("");
  };

  const handleDelete = async (id: number) => {

    const confirmed = confirm("确定删除商品？");

    if (!confirmed) return;

    const { error } = await supabase
      .from("products")
      .delete()
      .eq("id", id);

    if (error) {

      alert(error.message);

      return;
    }

    fetchProducts();
  };

  return (
    <main className="min-h-screen px-8 py-16">

      <div className="max-w-5xl mx-auto">

        <div className="flex items-center justify-between mb-12">

          <h1 className="text-5xl">
            商品管理
          </h1>

          <a
            href="/admin"
            className="rounded-full border border-[#BFA58A] px-6 py-2"
          >
            返回 Dashboard
          </a>

        </div>

        {/* Add Product */}
        <div className="bg-white rounded-[40px] p-10 shadow-sm space-y-6">

          <input
            type="text"
            placeholder="商品中文名称"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          />

          <input
            type="text"
            placeholder="English Name"
            value={english}
            onChange={(e) => setEnglish(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          />

          <input
            type="text"
            placeholder="价格 Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          />

          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
          >

            <option value="">
              选择分类
            </option>

            <option value="bouquet">
              花束
            </option>

            <option value="plushie">
              玩偶
            </option>

            <option value="bag">
              包包
            </option>

            <option value="accessories">
              饰品
            </option>

          </select>

          <textarea
            placeholder="商品描述 Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none min-h-[140px]"
          />

          <input
            type="number"
            placeholder="Discount %"
            value={discount}
            onChange={(e) => setDiscount(e.target.value)}
            className="w-full rounded-2xl p-4 bg-[#F7F1EA] outline-none"
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
                  上传商品图片
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
            onClick={handleSubmit}
            className="w-full rounded-full bg-[#BFA58A] text-white py-4"
          >
            添加商品
          </button>

        </div>

        {/* Product List */}
        <div className="mt-16">

          <h2 className="text-3xl mb-8">
            商品列表
          </h2>

          <div className="space-y-6">

            {products.map((product) => (

              <div
                key={product.id}
                className="bg-white rounded-[30px] p-6 shadow-sm flex items-center gap-6"
              >

                <img
                  src={product.image}
                  alt={product.name}
                  className="w-28 h-28 object-cover rounded-2xl"
                />

                <div className="flex-1">

                  <h3 className="text-2xl">
                    {product.name}
                  </h3>

                  <p className="mt-2 text-[#7A5C4D]">
                    {product.english}
                  </p>

                  <p className="mt-4 text-xl font-medium">
                    S${product.price}
                  </p>

                  {product.discount > 0 && (

                    <p className="mt-2 text-red-500">
                      🔥 {product.discount}% OFF
                    </p>

                  )}

                </div>

                <div className="flex gap-4">

                  <a
                    href={`/admin/products/${product.id}`}
                    className="rounded-full bg-black text-white px-6 py-3 hover:opacity-90 transition"
                  >
                    编辑
                  </a>

                  <button
                    type="button"
                    onClick={() => handleDelete(product.id)}
                    className="rounded-full bg-red-500 text-white px-6 py-3 hover:opacity-90 transition"
                  >
                    删除
                  </button>

                </div>

              </div>

            ))}

          </div>

        </div>

      </div>

    </main>
  );
}