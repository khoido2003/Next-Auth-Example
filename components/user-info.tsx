import { ExtendedUser } from "@/next-auth";
import { Card, CardContent, CardHeader } from "./ui/card";

import { Badge } from "./ui/badge";
import { FaUsers } from "react-icons/fa";

interface UserInFoProps {
  user?: ExtendedUser;
  label: string;
}

export const UserInfo = ({ user, label }: UserInFoProps) => {
  return (
    <Card className="w-[600px] shadow-md">
      <CardHeader>
        <p className="text-2xl font-semibold text-center flex justify-center items-center gap-2">
          <FaUsers className="w-6 h-6" />
          {label}
        </p>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
          <p className="text-sm font-medium">ID</p>

          <p className="truncate text-xs max-w-[180px] font-mono p-1  rounded-md">
            {user?.id}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
          <p className="text-sm font-medium">Name</p>

          <p className="truncate text-xs max-w-[180px] font-mono p-1  rounded-md">
            {user?.name}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
          <p className="text-sm font-medium">Email</p>

          <p className="truncate text-xs max-w-[180px] font-mono p-1  rounded-md">
            {user?.email}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
          <p className="text-sm font-medium">Role</p>

          <p className="truncate text-xs max-w-[180px] font-mono p-1  rounded-md">
            {user?.role}
          </p>
        </div>

        <div className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm ">
          <p className="text-sm font-medium">Two Factor Authentication</p>

          <Badge
            variant={user?.isTwoFactorEnabled ? "success" : "destructive"}
            className="cursor-pointer"
          >
            {user?.isTwoFactorEnabled ? "ON" : "OFF"}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
};
