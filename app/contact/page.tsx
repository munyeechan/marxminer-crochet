export default function ContactPage() {

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

            Contact

          </p>

          <h1 className="
            text-6xl
            mt-6
            text-[#4B342B]
          ">

            联系我们

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
            text-xl
          ">

            <p>

              欢迎通过以下方式联系我们 ✨

            </p>

            {/* WhatsApp */}
            <div>

              <h2 className="
                text-2xl
                text-[#4B342B]
              ">

                WhatsApp

              </h2>

              <a
                href="https://wa.me/6588473621"
                target="_blank"
                className="
                  inline-block
                  mt-4
                  bg-[#D8A6B6]
                  text-white
                  px-8
                  py-4
                  rounded-full
                  hover:scale-105
                  transition
                "
              >

                WhatsApp 联系我们

              </a>

            </div>

            {/* Instagram */}
            <div>

              <h2 className="
                text-2xl
                text-[#4B342B]
              ">

                Instagram

              </h2>

              <p className="mt-4">

                @marxminer.crochet

              </p>

            </div>
{/* Carousell */}
<div>

  <h2 className="
    text-2xl
    text-[#4B342B]
  ">

    Carousell

  </h2>

  <a
    href="https://www.carousell.sg/u/marxminercrochet/"
    target="_blank"
    className="
      inline-block
      mt-4
      bg-[#D8A6B6]
      text-white
      px-8
      py-4
      rounded-full
      hover:scale-105
      transition
    "
  >

    前往 Carousell

  </a>

</div>

            {/* Email */}
            <div>

              <h2 className="
                text-2xl
                text-[#4B342B]
              ">

                Email

              </h2>

              <p className="mt-4">

                marxminercrochet@gmail.com

              </p>

            </div>

          </div>

        </div>

      </div>

    </main>

  );

}