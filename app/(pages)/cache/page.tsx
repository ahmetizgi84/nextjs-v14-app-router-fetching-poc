import { getCurrentUser } from "@/app/lib/session";
import React from "react";
import CodeEditor from "./_components/code-editor";

export default async function CachePage() {
  const user = await getCurrentUser();
  return (
    <main>
      Cache mechanism page
      <div className="w-full bg-amber-300">
        Calling getCurrentUser in page
        <pre>{JSON.stringify(user, null, 2)}</pre>
      </div>
      <div className="mt-4 p-12 flex items-center gap-6">
        <CodeEditor value={withoutCache} />
        <CodeEditor value={withCache} />
      </div>
    </main>
  );
}

const withoutCache = `/*
We can need user session in every individual component. To get the user we should call 'getCurrentUser()' function. Every component call
the function independently thats to say everyime the function get called db connection will be established to get the current user. This
can cause performance issue. To make more performant we can use 'cache' from 'react After the first component reached the db (doesnt
matter which one is) other components will used the cached data instead of reaching db individually. Every individual user has own
cached data. do not confuse cache and unstable_cache (from next/cache) unstable_cache caching for all requests (users)
*/

"use server";

export const getCurrentUser = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("getCurrentUser");

  const session = await validateRequest();

  if (!session.user) {
    return undefined;
  }

  return session.user;
};

const validateRequest = async () => {
  const session = {
    user: {
      name: "Ahmet",
    },
  };

  return session;
};
`;

const withCache = `"use server";

import { cache } from "react";

export const getCurrentUser = cache(async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("getCurrentUser");

  const session = await validateRequest();

  if (!session.user) {
    return undefined;
  }

  return session.user;
});

const validateRequest = async () => {
  const session = {
    user: {
      name: "Ahmet",
    },
  };

  return session;
};
`;
