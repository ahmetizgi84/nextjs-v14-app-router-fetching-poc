"use server";

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
