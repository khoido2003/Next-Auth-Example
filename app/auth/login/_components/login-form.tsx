"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { CardWrapper } from "@/components/card-wrapper";
import { Button } from "@/components/ui/button";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import { login } from "@/actions/login";
import { toast } from "sonner";
import { useSearchParams } from "next/navigation";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [showTwoFactor, setShowTwoFactor] = useState<
    string | undefined | boolean
  >("");
  const searchParams = useSearchParams();

  const callbackUrl = searchParams.get("callbackUrl");

  // Just in case we don't allow user to login with the same email from oauth if they have already register an account with credentials

  // const searchParams = useSearchParams();
  // const [error, setError] = useState<string | null>(null);
  // const err = searchParams.get("error");
  // useEffect(() => {
  //   setError(err);
  // }, [err]);

  // if (error === "OAuthAccountNotLinked") {
  //   toast.error("Another account already exists with the same email address!");
  // }

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    startTransition(() => {
      login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            toast.error(`Error: ${data.error}`);
          }

          if (data?.success) {
            form.reset();
            toast.success(`Success: ${data.success}`);
          }

          // Add two factor authentication
          if (data?.twoFactor) {
            setShowTwoFactor(true);
            toast.success(
              "Two Factor Authentication Token sent to your email!"
            );
          }
        })
        .catch((error) => {
          toast.error(`Error: Something went wrong`);
        });
    });
  };

  return (
    <CardWrapper
      headerTitle="Login To Auth"
      headerLabel="Crafting secure and delightful login experiences"
      backButtonLabel="Don't have an account? Sign up"
      backButtonHref="/auth/register"
      showSocial
      login
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          {showTwoFactor && (
            <FormField
              control={form.control}
              name="code"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Two Factor Code</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="123456"
                      disabled={isPending}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          )}

          {!showTwoFactor && (
            <>
              {" "}
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <Input
                          {...field}
                          placeholder="Email"
                          type="email"
                          disabled={isPending}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="password"
                render={({ field }) => {
                  return (
                    <FormItem>
                      <FormControl>
                        <div className="relative">
                          <Input
                            {...field}
                            placeholder="Password"
                            type={showPassword ? "text" : "password"}
                            disabled={isPending}
                          />

                          <span
                            className="absolute top-2 right-3 cursor-pointer"
                            onClick={() => {
                              setShowPassword((v) => !v);
                            }}
                          >
                            {showPassword ? (
                              <EyeOpenIcon className="w-[1.2rem] h-[1.2rem]" />
                            ) : (
                              <EyeClosedIcon className="w-[1.2rem] h-[1.2rem]" />
                            )}
                          </span>
                        </div>
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  );
                }}
              />
            </>
          )}

          <div className="pt-4">
            <Button disabled={isPending} type="submit" variant="login">
              {showTwoFactor ? "Confirm" : "Login"}
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
