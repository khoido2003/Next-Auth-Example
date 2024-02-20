import { Metadata } from "next";
import { NewVerificationForm } from "./_components/new-verification-form";

export const metadata: Metadata = {
  title: "Verify your account",
  description: "Email verification page",
};

const NewVerificationPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <NewVerificationForm />
    </div>
  );
};

export default NewVerificationPage;
