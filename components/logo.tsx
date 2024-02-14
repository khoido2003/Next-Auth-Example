import { useTheme } from "next-themes";
import Image from "next/image";

export const Logo = () => {
  return (
    <div className="relative">
      <Image
        className=" transition-all rotate-0 dark:-rotate-90 scale-100 dark:scale-0"
        src="/logo-light.svg"
        alt="Logo"
        width={80}
        height={80}
      />

      <Image
        className="absolute top-0 transition-all rotate-90 dark:rotate-0 scale-0 dark:scale-100"
        src="/logo-dark.svg"
        alt="Logo"
        width={80}
        height={80}
      />
    </div>
  );
};
