import { getCurrentUser } from "@/app/lib/session";
import React from "react";

export default async function Header() {
  const user = await getCurrentUser();
  return (
    <header>
      <div className="bg-lime-300 w-full">
        Calling getCurrentUser in header
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
    </header>
  );
}
