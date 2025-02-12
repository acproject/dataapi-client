
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";
import { Inter } from "next/font/google";
import type { Metadata } from "next";

const inter = Inter({ subsets: ["latin"] });

export const metadata:Metadata = {
  title: "Data API Editor",
  description: "Data API Editor",
};
export default function RootLayout({


  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body className={inter.className}>
        <DashboardWrapper>
          {children}
          </DashboardWrapper>
      </body>
    </html>
  );
}
