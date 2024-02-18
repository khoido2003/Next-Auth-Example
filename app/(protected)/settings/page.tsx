"use client";

import { logout } from "@/actions/logout";
import { useSession } from "next-auth/react";
import { cookies } from "next/headers";
import { useEffect } from "react";

const SettingsPage = () => {
  const session = useSession();
  const data = session.data?.user;

  // const cookiesStore = cookies();
  // const theme = cookiesStore.get("");

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
