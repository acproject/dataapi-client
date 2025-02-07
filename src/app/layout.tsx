
import "./globals.css";
import DashboardWrapper from "./dashboardWrapper";

export default function RootLayout({


  children,
}: Readonly<{
  children: React.ReactNode;
}>) {

  return (
    <html lang="en">
      <body>
        <DashboardWrapper>
          {children}
          </DashboardWrapper>
      </body>
    </html>
  );
}
