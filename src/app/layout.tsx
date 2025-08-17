import type { Metadata } from "next";
import { CustomProvider } from "@/components/CustomProvider/CustomProvider";
import "./globals.css";

export const metadata: Metadata = {
  title: "Saloon App",
  description: "A project for showcase skills",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <CustomProvider>{children}</CustomProvider>
      </body>
    </html>
  );
}
