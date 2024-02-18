import { CheckCircledIcon } from "@radix-ui/react-icons";

interface FormSuccessProps {
  message?: string;
}

export const FormSuccess = ({ message }: FormSuccessProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-emerald-700 p-3 rounded-md flex items-center gap-x-2 text-sm text-slate-50">
      <CheckCircledIcon className="h-7 w-7 basis-1/4" />
      <p className="basis-3/4">{message}</p>
    </div>
  );
};
