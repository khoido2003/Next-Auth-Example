"use client";

import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";
import { useTheme } from "next-themes";
import Image from "next/image";

interface HeaderProps {
  title: string;
  label: string;
}

export const Header = ({ title, label }: HeaderProps) => {
  const { theme } = useTheme();
  return (
    <div className="w-full flex flex-col gap-y-4">
      {theme === "light" ? (
        <Image src="/logo-light.svg" alt="Logo" width={25} height={25} />
      ) : (
        <Image src="/logo-dark.svg" alt="Logo" width={25} height={25} />
      )}

      <div className="gap-y-1 flex flex-col">
        <h1 className={cn("text-xl font-semibold")}>{title} to Auth</h1>
        <p className="text-muted-foreground text-xs">{label}</p>
      </div>
    </div>
  );
};
