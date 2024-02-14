"use client";

import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { LoginSchema } from "@/schemas";

import { useForm } from "react-hook-form";
import { useState } from "react";

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
import Link from "next/link";

export const LoginForm = () => {
  const [showPassword, setShowPassword] = useState(false);

  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  return (
    <CardWrapper
      headerTitle="Login"
      headerLabel="Crafting secure and delightful login experiences"
      backButtonLabel="Don't have an account? Sign up"
      backButtonHref="/auth/register"
      showSocial
      login
    >
      <Form {...form}>
        <form className="space-y-4" onSubmit={form.handleSubmit(() => {})}>
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => {
              return (
                <FormItem>
                  <FormControl>
                    <Input {...field} placeholder="Email" type="email" />
                  </FormControl>
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

          <Button variant="login">Login</Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
