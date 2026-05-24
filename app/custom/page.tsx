export default function CustomPage() {

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

            Custom Order

          </p>

          <h1 className="
            text-6xl
            mt-6
            text-[#4B342B]
          ">

            定制服务

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

              我们提供各种钩针定制服务 ✨

            </p>

            <p>

              包括：

            </p>

            <ul className="
              list-disc
              pl-8
              space-y-4
            ">

              <li>
                定制花束
              </li>

              <li>
                定制玩偶
              </li>

              <li>
                定制包包
              </li>

              <li>
                名字刺绣
              </li>

              <li>
                情侣礼物
              </li>

              <li>
                毕业礼物
              </li>

            </ul>

            <p>

              欢迎通过 WhatsApp
              联系我们讨论您的定制需求。

            </p>

            {/* WhatsApp Button */}
            <a
              href="https://wa.me/6588473621"
              target="_blank"
              className="
                inline-block
                mt-8
                bg-[#D8A6B6]
                text-white
                px-10
                py-5
                rounded-full
                hover:scale-105
                transition
              "
            >

              WhatsApp 联系我们

            </a>

          </div>

        </div>

      </div>

    </main>

  );

}