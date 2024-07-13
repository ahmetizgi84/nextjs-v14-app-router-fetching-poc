import React from "react";
import Header from "./_components/header";
import { getCurrentUser } from "@/app/lib/session";

interface Props {
  children: React.ReactNode;
}

export default async function Layout({ children }: Props) {
  const user = await getCurrentUser();

  return (
    <div className="px-4">
      <div className="bg-fuchsia-300 w-full">
        Calling getCurrentUser in layout
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <Header />
      {children}
    </div>
  );
}
