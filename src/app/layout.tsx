import type { Metadata } from "next";
import "./globals.css";
import UIProvider from "@/Providers/UIProvider";
import { ClerkProvider } from "@clerk/nextjs";
import LayoutProvider from "@/Providers/LayoutProvider";

export const metadata: Metadata = {
  title: "HeapOverflow",
  description: "Questions and answers for professional and enthusiast programmers",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <UIProvider>
            <LayoutProvider>
              {children}
            </LayoutProvider>
          </UIProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
