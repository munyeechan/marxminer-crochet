export default function Footer() {

  return (

    <footer className="bg-[#F4ECE6] mt-24">

      <div className="
        max-w-7xl
        mx-auto
        px-6
        py-20
        grid
        grid-cols-1
        md:grid-cols-4
        gap-14
      ">

        {/* Brand */}
        <div>

          <h2 className="
            text-4xl
            text-[#8A665A]
            font-serif
          ">
            Marxminer
          </h2>

          <p className="
            mt-6
            text-[#8D776B]
            leading-9
          ">

            每一针都藏着温柔与热爱。

            <br />

            希望把幸福感传递给你。

          </p>

        </div>

        {/* Shopping */}
        <div>

          <h3 className="
            text-2xl
            text-[#5A4034]
            mb-6
          ">
            购物指南
          </h3>

          <ul className="
            space-y-4
            text-[#8D776B]
          ">

            <li>

              <a
                href="/product"
                className="
                  hover:text-[#C797A8]
                  transition
                "
              >
                所有商品
              </a>

            </li>

            <li>

              <a
                href="/shipping"
                className="
                  hover:text-[#C797A8]
                  transition
                "
              >
                配送方式
              </a>

            </li>

            <li>

              <a
                href="/payment"
                className="
                  hover:text-[#C797A8]
                  transition
                "
              >
                付款方式
              </a>

            </li>

          </ul>

        </div>

        {/* About */}
        <div>

          <h3 className="
            text-2xl
            text-[#5A4034]
            mb-6
          ">
            关于我们
          </h3>

          <ul className="
            space-y-4
            text-[#8D776B]
          ">

            <li>

              <a
                href="/about"
                className="
                  hover:text-[#C797A8]
                  transition
                "
              >
                品牌故事
              </a>

            </li>

            <li>

              <a
                href="/contact"
                className="
                  hover:text-[#C797A8]
                  transition
                "
              >
                联系我们
              </a>

            </li>

            <li>

              <a
                href="/custom"
                className="
                  hover:text-[#C797A8]
                  transition
                "
              >
                定制服务
              </a>

            </li>

          </ul>

        </div>

        {/* Contact */}
        <div>

          <h3 className="
            text-2xl
            text-[#5A4034]
            mb-6
          ">
            联系方式
          </h3>

          <div className="
            space-y-5
            text-[#8D776B]
          ">

            <p>
              Carousell：
              MarxminerCrochet
            </p>

            <p>
              WhatsApp：
              +65 8847 3621
            </p>

            <p>
              Email：
              marxminercrochet@gmail.com
            </p>

          </div>

        </div>

      </div>

      {/* Bottom */}
      <div className="
        border-t
        border-[#E7D9CF]
        py-6
        text-center
        text-[#9C8578]
        text-sm
      ">

        © 2026 Marxminer Crochet.
        All rights reserved.

      </div>

    </footer>

  );

}