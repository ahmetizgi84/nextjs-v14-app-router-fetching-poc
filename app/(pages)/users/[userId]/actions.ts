"use server";

import { revalidatePath } from "next/cache";
import { updateUser } from "../_data-access/user";

export async function updateNameAction(
  prevState: { userId: string },
  formData: FormData
) {
  // sleep one second - fake delay
  await new Promise((resolve) => setTimeout(resolve, 1000));

  const userId = prevState.userId;
  const newName = formData.get("name") as string;

  await updateUser(userId, newName);
  revalidatePath(`/users/${userId}`);

  return {
    userId,
    name: "",
    message: "success",
  };
}
