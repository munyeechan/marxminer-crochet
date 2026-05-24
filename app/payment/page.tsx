export default function PaymentPage() {

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

        <h1 className="
          text-5xl
          text-[#4B342B]
          mb-12
          text-center
        ">

          付款方式

        </h1>

        <div className="
          bg-white
          rounded-[40px]
          p-10
          shadow-sm
          space-y-10
        ">

          {/* PayNow */}
          <div>

            <h2 className="
              text-3xl
              text-[#4B342B]
              mb-4
            ">

              PayNow

            </h2>

            <p className="
              text-[#8B7267]
              leading-8
            ">

              支持新加坡 PayNow 转账付款。

              <br />

              下单后请上传付款截图。

            </p>

          </div>

          {/* Bank Transfer */}
          <div>

            <h2 className="
              text-3xl
              text-[#4B342B]
              mb-4
            ">

              银行转账

            </h2>

            <p className="
              text-[#8B7267]
              leading-8
            ">

              可联系 WhatsApp 获取银行账号资料。

            </p>

          </div>

          {/* Contact */}
          <div>

            <h2 className="
              text-3xl
              text-[#4B342B]
              mb-4
            ">

              联系付款

            </h2>

            <p className="
              text-[#8B7267]
              leading-8
            ">

              WhatsApp：

              <a
                href="https://wa.me/6588473621"
                target="_blank"
                className="
                  text-[#BFA58A]
                  ml-2
                "
              >

                +65 8847 3621

              </a>

            </p>

          </div>

        </div>

      </div>

    </main>

  );

}