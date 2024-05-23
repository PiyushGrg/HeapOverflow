import { Recursive } from "next/font/google";
import type { Metadata } from "next";
import "./globals.css";
import UIProvider from "@/Providers/UIProvider";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "@/Providers/LayoutProvider";
import Theme from "@/Providers/Theme";

const recursive = Recursive({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HeapOverflow",
  description: "Questions and answers for professional and enthusiast programmers",
  icons: "/favicon.ico",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={recursive.className}>
          <UIProvider>
            <Theme>
              <LayoutProvider>
                {children}
              </LayoutProvider>
            </Theme>
          </UIProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
