import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "CER Bridge | Platformă SaaS pentru comunități de energie",
  description:
    "Demo vizual pentru administrarea comunităților de energie din România.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ro">
      <body className="font-sans antialiased">{children}</body>
    </html>
  );
}
