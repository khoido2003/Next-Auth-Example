"use client";

import Link from "next/link";
import { Button } from "./ui/button";

interface BackButtonProps {
  href: string;
  label: string;
}

export const BackButton = ({ href, label }: BackButtonProps) => {
  return (
    <span>
      <Link className="active-link" href={href}>
        {label}
      </Link>
    </span>
  );
};
