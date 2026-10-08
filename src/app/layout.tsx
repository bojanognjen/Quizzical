import type { Metadata } from "next";
import "./globals.css";
import "./app.css";

export const metadata: Metadata = {
  title: "Quizzical app",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}