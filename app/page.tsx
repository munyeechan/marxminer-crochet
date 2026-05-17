export default function HomePage() {
  return (
    <main className="min-h-screen px-8 py-16">

      {/* Hero Section */}
      <section className="grid md:grid-cols-2 items-center gap-12">

        <div>

          <p className="uppercase tracking-[4px] text-[#BFA58A] text-sm">
            Marxminer Crochet
          </p>

          <h1 className="text-6xl leading-tight mt-4">
            用针线编织
            <br />
            温柔的日常
          </h1>

          <p className="mt-6 text-lg text-[#7A5C4D] leading-8">
            探索手工钩针花束、玩偶与包包，
            将温暖与柔软融入生活中的每一个角落。
          </p>

          <div className="flex gap-4 mt-8">

            <a
              href="/product"
              className="rounded-full bg-[#BFA58A] text-white px-8 py-4 hover:opacity-90 transition"
            >
              浏览商品
            </a>

            <a
              href="/cart"
              className="rounded-full border border-[#BFA58A] px-8 py-4 hover:bg-[#BFA58A] hover:text-white transition"
            >
              查看购物车
            </a>

          </div>

        </div>

        <div>

          <img
            src="/hero.jpg"
            alt="Hero"
            className="rounded-[40px] shadow-lg"
          />

        </div>

      </section>

      {/* Featured Section */}
      <section className="mt-32">

        <div className="text-center mb-16">

          <p className="uppercase tracking-[4px] text-[#BFA58A] text-sm">
            Featured Collection
          </p>

          <h2 className="text-5xl mt-4">
            精选系列
          </h2>

        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">

          {/* Flower */}
          <a
            href="/product/flower"
            className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-lg transition block"
          >

            <img
              src="/flower.jpg"
              alt="Flower Bouquet"
              className="h-[350px] w-full object-cover"
            />

            <div className="p-6">

              <h3 className="text-2xl">
                钩针郁金香花束
              </h3>

              <p className="mt-2 text-[#7A5C4D]">
                Handmade crochet tulip bouquet.
              </p>

              <p className="mt-4 text-xl font-medium">
                S$59
              </p>

            </div>

          </a>

          {/* Bear */}
          <a
            href="/product/bear"
            className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-lg transition block"
          >

            <img
              src="/bear.jpg"
              alt="Crochet Bear"
              className="h-[350px] w-full object-cover"
            />

            <div className="p-6">

              <h3 className="text-2xl">
                小熊玩偶
              </h3>

              <p className="mt-2 text-[#7A5C4D]">
                Soft handmade crochet plushie.
              </p>

              <p className="mt-4 text-xl font-medium">
                S$45
              </p>

            </div>

          </a>

          {/* Bag */}
          <a
            href="/product/bag"
            className="bg-white rounded-[30px] overflow-hidden shadow-sm hover:shadow-lg transition block"
          >

            <img
              src="/bag.jpg"
              alt="Crochet Bag"
              className="h-[350px] w-full object-cover"
            />

            <div className="p-6">

              <h3 className="text-2xl">
                雏菊手提包
              </h3>

              <p className="mt-2 text-[#7A5C4D]">
                Handmade crochet flower tote bag.
              </p>

              <p className="mt-4 text-xl font-medium">
                S$69
              </p>

            </div>

          </a>

        </div>

      </section>

    </main>
  );
}