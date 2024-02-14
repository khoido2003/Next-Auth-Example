import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import { Header } from "./header";
import { Social } from "@/app/auth/login/_components/social";
import { BackButton } from "./back-btn";
import Link from "next/link";

interface CardWrapperProps {
  children: React.ReactNode;
  headerTitle: string;
  headerLabel: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
  login?: boolean;
}

export const CardWrapper = ({
  children,
  backButtonHref,
  backButtonLabel,
  headerTitle,
  headerLabel,
  showSocial,
  login,
}: CardWrapperProps) => {
  return (
    <Card className="w-[400px] shadow-md space-y-4">
      <CardHeader>
        <Header title={headerTitle} label={headerLabel} />
      </CardHeader>
      <CardContent>{children}</CardContent>

      {showSocial && (
        <CardFooter className="p-3">
          <div className="w-full">
            <p className="w-full text-muted-foreground text-xs  authorize mb-4">
              Or authorize with
            </p>
            <Social />
          </div>
        </CardFooter>
      )}
      <CardFooter className="flex-col items-start  ">
        {login && (
          <span className="">
            <Link className="active-link" href="/auth/reset">
              Forgot password?
            </Link>
          </span>
        )}
        <BackButton href={backButtonHref} label={backButtonLabel} />
      </CardFooter>
    </Card>
  );
};
