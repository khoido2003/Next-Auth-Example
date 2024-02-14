import { Button } from "@/components/ui/button";
import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

export const Social = () => {
  return (
    <div className="flex items-center justify-center w-full gap-x-2">
      <Button className="w-full text-center" size="lg" variant="outline">
        <FcGoogle className="h-5 w-5" />
        <span className="ml-3">Google</span>
      </Button>

      <Button className="w-full text-center" size="lg" variant="outline">
        <FaGithub className="h-5 w-5" />
        <span className="ml-3">Github</span>
      </Button>
    </div>
  );
};
