"use client";

import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";

const SettingsPage = () => {
  const session = useSession();
  const data = session.data?.user;

  return (
    <div>
      <span>Hello</span>
      <span> {JSON.stringify(data)}</span>
      <button
        onClick={() => {
          logout();
        }}
      >
        Signout
      </button>
    </div>
  );
};

export default SettingsPage;
