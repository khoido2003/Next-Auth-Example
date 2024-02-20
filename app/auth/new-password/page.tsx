import { Metadata } from "next";
import { NewPasswordForm } from "./_components/new-password-form";

export const metadata: Metadata = {
  title: "New Password",
  description: "Reset your password here",
};

const NewPasswordPage = () => {
  return (
    <div className="h-full w-full flex items-center justify-center">
      <NewPasswordForm />
    </div>
  );
};

export default NewPasswordPage;
