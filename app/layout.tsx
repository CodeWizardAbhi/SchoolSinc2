import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "SchoolSync ERP",
  description: "Enterprise High School ERP System",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100">
        {children}
      </body>
    </html>
  );
}
