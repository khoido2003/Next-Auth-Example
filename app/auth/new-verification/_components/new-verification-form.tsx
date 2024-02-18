"use client";

import { ClimbingBoxLoader } from "react-spinners";
import { newVerification } from "@/actions/new-verification";
import { CardWrapper } from "@/components/card-wrapper";
import { FormError } from "@/components/formError";
import { FormSuccess } from "@/components/formSuccess";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";

export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  // Submit the verification token to the database
  const onSubmit = useCallback(() => {
    if (success || error) return;
    if (!token) {
      setError(
        "Missing token! Please request a new verification email by login again."
      );
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong. Please try again.");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <CardWrapper
      headerTitle="Confirming Your Verification"
      headerLabel="Your account is almost ready!"
      backButtonHref="/auth/login"
      backButtonLabel="Back to login"
    >
      <div className="flex items-center w-full justify-center">
        {!success && !error && <ClimbingBoxLoader color="white" />}

        <FormSuccess message={success} />
        {!success && <FormError message={error} />}
      </div>
    </CardWrapper>
  );
};
