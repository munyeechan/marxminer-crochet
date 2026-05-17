export default function SuccessPage() {
  return (
    <main className="min-h-screen flex items-center justify-center px-8">

      <div className="bg-white rounded-[40px] p-16 shadow-sm text-center max-w-2xl">

        <div className="text-7xl mb-8">
          🌸
        </div>

        <h1 className="text-5xl leading-tight">
          Payment Successful
        </h1>

        <p className="mt-6 text-lg text-[#7A5C4D] leading-8">
          Thank you for shopping with Marxminer Crochet.
          Your handmade crochet items will be prepared with love and care.
        </p>

        <a
          href="/"
          className="inline-block mt-10 rounded-full bg-[#BFA58A] text-white px-10 py-4 hover:opacity-90 transition"
        >
          Back to Home
        </a>

      </div>

    </main>
  );
}
