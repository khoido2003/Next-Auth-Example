import type { Metadata } from "next";
import "./globals.css";

import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbas";

export const metadata: Metadata = {
  title: "Welcome to Auth",
  description: "Start your journey here",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/logo-dark.svg" sizes="any" />
      </head>
      <body className={cn("bg-background", inter.className)}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
          <Navbar />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
