"use client";

import { useEffect, useState } from "react";

import Link from "next/link";

import { supabase } from "@/lib/supabase";

export default function AdminProductsPage() {

  const [products, setProducts] =
    useState<any[]>([]);

  const [loading, setLoading] =
    useState(false);

  // NEW
  const [
    selectedCategory,
    setSelectedCategory
  ] = useState("all");

  // Form States
  const [name, setName] =
    useState("");

  const [englishName, setEnglishName] =
    useState("");

  const [price, setPrice] =
    useState("");

  const [category, setCategory] =
    useState("");

  const [description, setDescription] =
    useState("");

  const [discount, setDiscount] =
    useState("");

  const [image, setImage] =
    useState("");

  const [stockStatus, setStockStatus] =
    useState("in_stock");

  useEffect(() => {

    fetchProducts();

  }, []);

  // Fetch Products
  const fetchProducts = async () => {

    const { data, error } =
      await supabase
        .from("products")
        .select("*")
        .order("id", {
          ascending: false,
        });

    if (error) {

      console.log(error);

      return;

    }

    setProducts(data || []);

  };

  // Add Product
  const addProduct = async () => {

    if (
      !name ||
      !price ||
      !category ||
      !image
    ) {

      alert("请填写完整商品资料");

      return;

    }

    setLoading(true);

    const { error } =
      await supabase
        .from("products")
        .insert([

          {

            name,

            english_name:
              englishName,

            price,

            category,

            description,

            discount,

            image,

            stock_status:
              stockStatus,

          },

        ]);

    setLoading(false);

    if (error) {

      console.log(error);

      alert("添加商品失败");

      return;

    }

    alert("商品添加成功 ✨");

    // Reset
    setName("");

    setEnglishName("");

    setPrice("");

    setCategory("");

    setDescription("");

    setDiscount("");

    setImage("");

    setStockStatus(
      "in_stock"
    );

    fetchProducts();

  };

  // Delete Product
  const deleteProduct =
    async (id: number) => {

      const confirmDelete =
        confirm(
          "确定删除此商品？"
        );

      if (!confirmDelete)
        return;

      const { error } =
        await supabase
          .from("products")
          .delete()
          .eq("id", id);

      if (error) {

        console.log(error);

        alert("删除失败");

        return;

      }

      fetchProducts();

    };

  return (

    <main className="
      min-h-screen
      bg-[#F8F4EF]
      px-6
      py-16
    ">

      <div className="
        max-w-6xl
        mx-auto
      ">

        {/* Header */}
        <div className="
          flex
          justify-between
          items-center
          mb-12
        ">

          <h1 className="
            text-5xl
            text-[#4B342B]
          ">

            商品管理

          </h1>

          <Link
            href="/admin"
            className="
              border
              border-[#B08976]
              px-5
              py-2
              rounded-full
              text-[#7A5C4D]
            "
          >

            返回 Dashboard

          </Link>

        </div>

        {/* Add Product */}
        <div className="
          bg-white
          rounded-[40px]
          p-8
          shadow-sm
        ">

          <h2 className="
            text-2xl
            text-[#4B342B]
            mb-6
          ">

            添加商品

          </h2>

          <div className="
            space-y-4
          ">

            {/* Chinese Name */}
            <input
              type="text"
              placeholder="商品中文名称"
              value={name}
              onChange={(e) =>
                setName(
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

            {/* English Name */}
            <input
              type="text"
              placeholder="English Name"
              value={englishName}
              onChange={(e) =>
                setEnglishName(
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

            {/* Price */}
            <input
              type="number"
              placeholder="价格 Price"
              value={price}
              onChange={(e) =>
                setPrice(
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

            {/* Category */}
            <select
              value={category}
              onChange={(e) =>
                setCategory(
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
            >

              <option value="">
                选择分类
              </option>

              <option value="bags">
                钩针包包
              </option>

              <option value="bouquets">
                花束
              </option>

              <option value="plushies">
                钩针玩偶
              </option>

              <option value="accessories">
                饰品
              </option>

            </select>

            {/* Description */}
            <textarea
              placeholder="商品描述 Description"
              value={description}
              onChange={(e) =>
                setDescription(
                  e.target.value
                )
              }
              rows={4}
              className="
                w-full
                rounded-2xl
                p-4
                bg-[#F7F1EA]
                outline-none
              "
            />

            {/* Stock Status */}
            <select
              value={stockStatus}
              onChange={(e) =>
                setStockStatus(
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
            >

              <option value="in_stock">
                有库存
              </option>

              <option value="preorder">
                预定商品
              </option>

              <option value="sold_out">
                缺货
              </option>

            </select>

            {/* Discount */}
            <input
              type="number"
              placeholder="Discount %"
              value={discount}
              onChange={(e) =>
                setDiscount(
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

            {/* Image */}
            <input
              type="text"
              placeholder="商品图片 URL"
              value={image}
              onChange={(e) =>
                setImage(
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

            {/* Submit */}
            <button
              onClick={addProduct}
              disabled={loading}
              className="
                w-full
                bg-[#B89B7A]
                text-white
                py-4
                rounded-full
                hover:opacity-90
                transition
              "
            >

              {
                loading
                  ? "添加中..."
                  : "添加商品"
              }

            </button>

          </div>

        </div>

        {/* Product List */}
        <div className="mt-14">

          <h2 className="
            text-3xl
            text-[#4B342B]
            mb-8
          ">

            商品列表

          </h2>

          {/* Category Tabs */}
          <div className="
            flex
            gap-4
            mb-8
            flex-wrap
          ">

            {[
              "all",
              "bouquets",
              "plushies",
              "accessories",
              "bags",
            ].map((tab) => (

              <button

                key={tab}

                onClick={() =>
                  setSelectedCategory(tab)
                }

                className={`
                  px-6
                  py-3
                  rounded-full
                  transition

                  ${
                    selectedCategory ===
                    tab

                      ? `
                        bg-[#D8A6B6]
                        text-white
                      `

                      : `
                        bg-white
                        text-[#7A5C4D]
                      `
                  }
                `}
              >

                {
                  tab === "all"
                    ? "全部"

                  : tab === "bouquets"
                    ? "花束"

                  : tab === "plushies"
                    ? "钩针玩偶"

                  : tab === "accessories"
                    ? "饰品"

                  : "钩针包包"
                }

              </button>

            ))}

          </div>

          {/* Products */}
          <div className="
            space-y-6
          ">

            {products

              .filter((product) =>

                selectedCategory ===
                "all"

                  ? true

                  : product.category ===
                    selectedCategory
              )

              .map((product) => (

                <div
                  key={product.id}
                  className="
                    bg-white
                    rounded-[32px]
                    p-5
                    shadow-sm
                    flex
                    justify-between
                    items-center
                  "
                >

                  {/* Left */}
                  <div className="
                    flex
                    items-center
                    gap-5
                  ">

                    <img
                      src={product.image}
                      alt={product.name}
                      className="
                        w-24
                        h-24
                        rounded-[24px]
                        object-cover
                      "
                    />

                    <div>

                      <h3 className="
                        text-2xl
                        text-[#4B342B]
                      ">

                        {product.name}

                      </h3>

                      <p className="
                        text-[#8B7267]
                        mt-1
                      ">

                        {
                          product.english_name
                        }

                      </p>

                      <p className="
                        mt-2
                        text-[#B08976]
                      ">

                        SGD {product.price}

                      </p>

                      {/* Stock Status */}
                      <div className="mt-2">

                        {product.stock_status ===
                          "in_stock" && (

                          <span className="
                            text-green-600
                            text-sm
                          ">

                            ● 有库存

                          </span>

                        )}

                        {product.stock_status ===
                          "preorder" && (

                          <span className="
                            text-orange-500
                            text-sm
                          ">

                            ● 预定商品

                          </span>

                        )}

                        {product.stock_status ===
                          "sold_out" && (

                          <span className="
                            text-red-500
                            text-sm
                          ">

                            ● 缺货

                          </span>

                        )}

                      </div>

                    </div>

                  </div>

                  {/* Right */}
                  <div className="
                    flex
                    gap-4
                  ">

                    <button
                      className="
                        bg-black
                        text-white
                        px-5
                        py-2
                        rounded-full
                      "
                    >

                      编辑

                    </button>

                    <button

                      onClick={() =>
                        deleteProduct(
                          product.id
                        )
                      }

                      className="
                        bg-red-500
                        text-white
                        px-5
                        py-2
                        rounded-full
                      "
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