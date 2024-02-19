"use client";

import * as z from "zod";

import { CardWrapper } from "@/components/card-wrapper";
import { ResetSchema } from "@/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { FormError } from "@/components/formError";
import { FormSuccess } from "@/components/formSuccess";
import { Button } from "@/components/ui/button";

export const ResetForm = () => {
  const [isPendingm, startTransition] = useTransition();
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const form = useForm<z.infer<typeof ResetSchema>>({
    resolver: zodResolver(ResetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = (values: z.infer<typeof ResetSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {});
  };

  return (
    <CardWrapper
      headerTitle="Reset Password"
      backButtonHref="/"
      backButtonLabel="Back to login"
      headerLabel="Regain Access to Your Account"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="space-y-4">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="khoido@email.com"
                      disabled={false}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
          </div>

          <FormError message={error} />
          <FormSuccess message={success} />
          <Button type="submit" className="w-full" disabled={false}>
            {" "}
            Send reset email
          </Button>
        </form>
      </Form>
    </CardWrapper>
  );
};
