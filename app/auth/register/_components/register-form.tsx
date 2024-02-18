"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { RegisterSchema } from "@/schemas";

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

import { register } from "@/actions/register";
import { toast } from "sonner";

/////////////////////////////////////////////

export const RegisterForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      email: "",
      password: "",
      passwordConfirm: "",
      name: "",
    },
  });

  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    startTransition(() => {
      register(values).then((data) => {
        data.error && toast.error(`Error: ${data.error}`);
        data.success && toast.success(`Success: ${data.success}`);
      });
    });

    values.password = "";
    values.passwordConfirm = "";
  };

  return (
    <CardWrapper
      headerTitle="Sign Up To Auth"
      headerLabel="Crafting secure and delightful login experiences"
      backButtonLabel="Already have an account?"
      backButtonHref="/auth/login"
      showSocial
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(onSubmit)}>
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input
                      {...field}
                      disabled={isPending}
                      placeholder="Name"
                      type="text"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              );
            }}
          />

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

          <FormField
            control={form.control}
            name="passwordConfirm"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <div className="relative">
                      <Input
                        {...field}
                        placeholder="Repeat Password"
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

          <div className="pt-4">
            <Button type="submit" disabled={isPending} variant="login">
              Create an account
            </Button>
          </div>
        </form>
      </Form>
    </CardWrapper>
  );
};
