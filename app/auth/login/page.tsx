import { Metadata } from "next";
import { LoginForm } from "./_components/login-form";

export const metadata: Metadata = {
  title: "Login",
  description: "Login to access our application",
};

const Login = () => {
  return (
    <div className="h-full flex justify-center items-center">
      <LoginForm />
    </div>
  );
};

export default Login;
