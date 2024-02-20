import { Metadata } from "next";
import { ResetForm } from "./_components/reset-form";

export const metadata: Metadata = {
  title: "Request to reset password",
  description: "Reset email",
};

const ResetPage = () => {
  return (
    <div className="flex justify-center items-center h-full w-full">
      <ResetForm />
    </div>
  );
};

export default ResetPage;
