"use client";

import React, { useRef } from "react";
import { useFormState, useFormStatus } from "react-dom";
import { updateNameAction } from "./actions";

export default function Form({ userId }: { userId: string }) {
  const formRef = useRef<HTMLFormElement>(null);
  const [state, action] = useFormState(updateNameAction, {
    userId: userId,
    name: "",
    message: "",
  });

  if (state.message == "success") formRef.current?.reset();

  return (
    <form ref={formRef} action={action}>
      <input
        type="text"
        name="name"
        className="text-black border border-gray-400 h-10"
      />

      <SubmitButton />
    </form>
  );
}

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <button
      disabled={pending}
      className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-3 px-4 rounded-md"
    >
      {pending ? "Saving..." : "Save"}
    </button>
  );
}
