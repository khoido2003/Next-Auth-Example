"use client";

import * as z from "zod";

import { CardWrapper } from "@/components/card-wrapper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { NewPasswordSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { newPassword } from "@/actions/new-password";
import { FormSuccess } from "@/components/formSuccess";
import { FormError } from "@/components/formError";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";

export const NewPasswordForm = () => {
  let timeout: any;
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [showPassword, setShowPassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
      passwordConfirm: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);

        timeout = setTimeout(() => {
          router.push("/login");
        }, 1500);
      });
    });
  };

  useEffect(() => {
    if (timeout) {
      clearTimeout(timeout);
    }
  }, [timeout]);

  return (
    <CardWrapper
      headerLabel="Enter your new password"
      headerTitle="New Password"
      backButtonLabel="Back to login"
      backButtonHref="/auth/login"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password</FormLabel>
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
                  </FormItem>
                );
              }}
            />

            <FormField
              control={form.control}
              name="passwordConfirm"
              render={({ field }) => {
                return (
                  <FormItem>
                    <FormLabel>Password Confirm</FormLabel>
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
                  </FormItem>
                );
              }}
            />
          </div>
          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={isPending}>
            Reset Password
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
