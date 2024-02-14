import { ModeToggle } from "./mode-toggle";

export const Navbar = () => {
  return (
    <div className="w-full h-[40px]  flex justify-end items-center p-2">
      <ModeToggle />
    </div>
  );
};
