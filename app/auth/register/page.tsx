import { Metadata } from "next";
import { RegisterForm } from "./_components/register-form";

export const metadata: Metadata = {
  title: "Create your account",
  description: "Start your journey",
};
const RegisterPage = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <RegisterForm />
    </div>
  );
};

export default RegisterPage;
