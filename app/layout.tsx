import type { Metadata } from "next";
import localFont from "next/font/local";
import { ToastProvider } from "./components/toast/ToastProvider";
import "./globals.css";

const primaryTypeface = localFont({
  src: './PPFraktionMono-Bold.woff2',
  variable: '--font-primary',
});

export const metadata: Metadata = {
  title: "andrey's homepage 💙",
  description: "a small collection of my projects, links, and thoughts. mostly this is just self expression \\o/",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${primaryTypeface.variable} antialiased`}
      >
        <ToastProvider>
          {children}
        </ToastProvider>
      </body>
    </html>
  );
}
