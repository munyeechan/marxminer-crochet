export default function Hero() {
  return (
    <section className="bg-[#F8F3EF]">
      
      <div className="max-w-7xl mx-auto px-6 py-16 grid md:grid-cols-2 gap-12 items-center">

        {/* Left */}
        <div>

          <div className="inline-block border border-[#E6CAD2] rounded-full px-6 py-2 text-[#C797A8] mb-8">
            纯手工・用心制作
          </div>

          <h1 className="text-5xl md:text-7xl leading-tight font-bold text-[#4B342B]">
            用针线编织
            <br />
            温柔的日常
          </h1>

          <p className="mt-8 text-[#8B7267] text-xl leading-10">
            Handmade with love,
            <br />
            made for you.
          </p>

          <div className="mt-10 flex flex-wrap items-center gap-5">

  {/* Button 1 */}
  <a
    href="/product"
    className="bg-[#D8A6B6] text-white px-10 py-5 rounded-full text-xl shadow-lg hover:scale-105 transition"
  >
    探索我们的作品
  </a>

  {/* Button 2 */}
  <a
    href="https://wa.me/60123456789"
    target="_blank"
    className="bg-white border border-[#E8D0D2] px-10 py-5 rounded-full text-xl hover:bg-[#FFF7F8] transition"
  >
    我要定制
  </a>

  {/* Button 3 */}
  <a
    href="https://www.carousell.sg/"
    target="_blank"
    className="bg-white border border-[#E8D0D2] px-10 py-5 rounded-full text-xl hover:bg-[#FFF7F8] transition whitespace-nowrap"
  >
    Carousell 店铺
  </a>

</div>

        </div>

        {/* Right */}
        <div>

          <img
            src="/hero.jpg"
            className="rounded-[40px] h-[650px] w-full object-cover shadow-xl"
          />

        </div>

      </div>

      {/* Bottom Info */}
      <div className="border-t border-[#EFE4DD] bg-white">

        <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-10 py-10 px-6 text-center">

          <div>
            <h3 className="text-[#8B5E4A] text-2xl">
              新加坡本地手作
            </h3>

            <p className="mt-2 text-[#8D7A70]">
              Handmade in Singapore
            </p>
          </div>

          <div>
            <h3 className="text-[#8B5E4A] text-2xl">
              满 $80 新币免运费
            </h3>

            <p className="mt-2 text-[#8D7A70]">
              Free Shipping over $80
            </p>
          </div>

          <div>
            <h3 className="text-[#8B5E4A] text-2xl">
              用心包装
            </h3>

            <p className="mt-2 text-[#8D7A70]">
              Carefully Packaged
            </p>
          </div>

        </div>

      </div>

    </section>
  );
}