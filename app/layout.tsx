import "./globals.css";

import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Marxminer Crochet",
  description: "Handmade crochet products",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#F8F4EF] text-[#5F4639] antialiased overflow-x-hidden">

        {/* Cream Background */}
        <div className="fixed inset-0 -z-10 overflow-hidden">

          {/* Top Left Blur */}
          <div className="absolute top-[-120px] left-[-120px] w-[350px] h-[350px] rounded-full bg-[#EFE4DB] blur-3xl opacity-70" />

          {/* Bottom Right Blur */}
          <div className="absolute bottom-[-120px] right-[-120px] w-[350px] h-[350px] rounded-full bg-[#E7D8CC] blur-3xl opacity-70" />

          {/* Center Blur */}
          <div className="absolute top-[40%] left-[35%] w-[250px] h-[250px] rounded-full bg-[#F2E8DF] blur-3xl opacity-50" />

        </div>

        {/* Main Content */}
        <div className="relative z-10 min-h-screen">
          {children}
        </div>

      </body>
    </html>
  );
}