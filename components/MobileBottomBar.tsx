export default function MobileBottomBar() {

  return (

    <div
      className="
        fixed
        bottom-0
        left-0
        right-0
        bg-white
        border-t
        border-[#E8DDD6]
        md:hidden
        z-50
      "
    >

      <div className="grid grid-cols-4 py-3 text-center text-[#6F5B52]">

        {/* 首页 */}
        <a
          href="/"
          className="flex flex-col items-center text-sm"
        >

          <span className="text-2xl">
            🏠
          </span>

          首页

        </a>

        {/* 分类 */}
        <a
          href="/product"
          className="flex flex-col items-center text-sm"
        >

          <span className="text-2xl">
            🧶
          </span>

          分类

        </a>

        {/* 购物车 */}
        <a
          href="/cart"
          className="flex flex-col items-center text-sm"
        >

          <span className="text-2xl">
            🛒
          </span>

          购物车

        </a>

        {/* 联系 */}
        <a
          href="https://wa.me/60123456789"
          target="_blank"
          className="flex flex-col items-center text-sm"
        >

          <span className="text-2xl">
            💬
          </span>

          联系

        </a>

      </div>

    </div>

  );
}