export default function ShippingPage() {

  return (

    <main className="
      min-h-screen
      bg-[#F8F4EF]
      px-6
      py-24
    ">

      <div className="
        max-w-5xl
        mx-auto
      ">

        {/* Heading */}
        <div className="text-center">

          <p className="
            uppercase
            tracking-[4px]
            text-[#C7A1A8]
          ">

            Shipping

          </p>

          <h1 className="
            text-6xl
            mt-6
            text-[#4B342B]
          ">

            配送方式

          </h1>

        </div>

        {/* Content */}
        <div className="
          mt-20
          bg-white
          rounded-[40px]
          p-12
          shadow-sm
        ">

          <div className="
            space-y-10
            text-[#6F5B52]
            leading-[2.2]
            text-xl
          ">

            <p>

              🇸🇬 新加坡本地配送

            </p>

            <p>

              满 SGD $80
              可享免费配送。

            </p>

            <p>

              一般订单会在
              3 - 7 天内寄出。

            </p>

            <p>

              定制商品可能需要
              更长制作时间。

            </p>

            <p>

              下单后可通过 WhatsApp
              联系确认配送安排。

            </p>

          </div>

        </div>

      </div>

    </main>

  );

}