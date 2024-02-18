import { ExclamationTriangleIcon } from "@radix-ui/react-icons";

interface FormErrorProps {
  message?: string;
}

export const FormError = ({ message }: FormErrorProps) => {
  if (!message) {
    return null;
  }

  return (
    <div className="bg-destructive p-3 rounded-md flex items-center gap-x-2 text-sm text-slate-50">
      <ExclamationTriangleIcon className="h-7 w-7 basis-1/4" />
      <p className="basis-3/4">{message}</p>
    </div>
  );
};
