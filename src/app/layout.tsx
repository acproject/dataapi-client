import "./globals.css";
import { Inter } from "next/font/google";
import type { Metadata } from "next";
import { headers } from "next/headers";

const inter = Inter({ subsets: ["latin"] });

const locales = {
  zh: {
    title: "数据 API 编辑器",
    description: "数据 API 编辑器 - 您的数据管理解决方案",
  },
  en: {
    title: "Data API Editor",
    description: "Data API Editor - Your Data Management Solution",
  },
};

export async function generateMetadata(): Promise<Metadata> {
  const headersList = headers();
  const lang = (await headersList).get("accept-language")?.split(",")[0].split("-")[0] || "en";
  const { title, description } = locales[lang as keyof typeof locales] || locales.en;

  return {
    title,
    description,
    // 补充OpenGraph协议字段提升SEO兼容性
    openGraph: {
      title,
      description,
    },
  };
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const lang = (await headers()).get("accept-language")?.split(",")[0].split("-")[0] || "en";
  return (
    <html lang={lang}>
      <body className={inter.className}>{children}</body>
    </html>
  );
}