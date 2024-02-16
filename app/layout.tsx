import type { Metadata } from "next";
import "./globals.css";

import { inter } from "@/lib/fonts";
import { cn } from "@/lib/utils";

import { ThemeProvider } from "@/components/theme-provider";
import { Navbar } from "@/components/navbas";
import { Toaster } from "@/components/ui/sonner";
import { auth } from "@/auth";
import { SessionProvider } from "next-auth/react";

export const metadata: Metadata = {
  title: "Welcome to Auth",
  description: "Start your journey here",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  return (
    <SessionProvider session={session}>
      <html lang="en">
        <head>
          <link rel="icon" href="/logo-dark.svg" sizes="any" />
        </head>
        <body className={cn("bg-background", inter.className)}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            <Navbar />
            {children}

            <Toaster position="top-center" />
          </ThemeProvider>
        </body>
      </html>
    </SessionProvider>
  );
}
