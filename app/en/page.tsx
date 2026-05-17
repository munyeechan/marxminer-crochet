export default function EnglishPage() {
  return (
    <main className="min-h-screen px-8 py-16">

      <section className="grid md:grid-cols-2 items-center gap-12">

        <div>

          <h1 className="text-6xl leading-tight">
            Handmade Softness
            <br />
            For Everyday Life
          </h1>

          <p className="mt-6 text-lg text-[#7A5C4D]">
            Discover handmade crochet bouquets, plushies and bags crafted with warmth and love.
          </p>
          <p className="mt-6 text-lg text-[#7A5C4D]">
  Discover handmade crochet bouquets, plushies and bags crafted with warmth and love.
</p>

<div className="flex gap-4 mt-8">

  <a
    href="/product"
    className="rounded-full bg-[#BFA58A] text-white px-8 py-4 hover:opacity-90 transition"
  >
    Shop Now
  </a>

  <a
    href="/cart"
    className="rounded-full border border-[#BFA58A] px-8 py-4 hover:bg-[#BFA58A] hover:text-white transition"
  >
    View Cart
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

    </main>
  );
}