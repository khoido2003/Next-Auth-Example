import { LoginButton } from "@/components/login-button";
import { Logo } from "@/components/logo";
import { Button } from "@/components/ui/button";
import { poppins } from "@/lib/fonts";
import { cn } from "@/lib/utils";

export default function Home() {
  return (
    <main className="flex flex-col items-center justify-center w-full h-full bg-background transition-all">
      <div className="text-center space-y-6">
        <div className="space-y-2">
          <h1
            className={cn(
              "text-6xl text-foreground font-semibold flex justify-center items-center space-x-5",
              poppins.className
            )}
          >
            <Logo />
            <span>Auth</span>
          </h1>

          <p className="text-xs">Simple authentication service</p>
        </div>

        <LoginButton>
          <Button size="lg">Sign in</Button>
        </LoginButton>
      </div>
    </main>
  );
}
