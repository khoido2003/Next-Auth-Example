"use client";

import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";
import { signIn } from "next-auth/react";
import { DEFAULT_LOGIN_REDIRECT } from "@/routes";
import { useSearchParams } from "next/navigation";

export const Social = () => {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const onClick = (provider: "google" | "github") => {
    signIn(provider, {
      callbackUrl: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });
  };

  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button className="w-full text-center" size="lg" variant="outline">
        <FcGoogle className="h-5 w-5" />
        <span
          className="ml-3"
          onClick={() => {
            onClick("google");
          }}
        >
          Google
        </span>
      </Button>

      <Button className="w-full text-center" size="lg" variant="outline">
        <FaGithub className="h-5 w-5" />
        <span
          className="ml-3"
          onClick={() => {
            onClick("github");
          }}
        >
          Github
        </span>
      </Button>
    </div>
  );
};
