import React from "react";
import { getUser } from "../_data-access/user";
import CodeEditor from "../../cache/_components/code-editor";
import Form from "./form";

interface Props {
  params: {
    userId: string;
  };
}

export default async function UsersPage({ params }: Props) {
  const user = await getUser(params.userId);

  return (
    <main>
      <div className="flex flex-col items-center justify-between p-24">
        <p className="mb-12">UsersPage User: {user.name}</p>
        <Form userId={user.id} />
      </div>
      <div className="mt-4 p-12 flex gap-6">
        <CodeEditor value={simpleValue} height="1400px" />
        <CodeEditor value={withAction} height="1400px" />
        <CodeEditor value={upgradedAction} height="2000px" />
      </div>
    </main>
  );
}

const simpleValue = `// Simple server action and revalidatePath

// _data-access/user.ts

type User = {
  id: string;
  name: string;
};

(global as any).user = {
  id: "50",
  name: "John Doe",
} as User;

export async function getUser(userId: string) {
  return global.user as User;
}

export async function updateUser(userId: string, name: string) {
  (global.user as User).name = name;
}


// ---------------------
// users/[userId]/page.tsx

import React from "react";
import { getUser, updateUser } from "../_data-access/user";
import { revalidatePath } from "next/cache";
import CodeEditor from "../../cache/_components/code-editor";

interface Props {
  params: {
    userId: string;
  };
}

export default async function UsersPage({ params }: Props) {
  const user = await getUser(params.userId);

  return (
    <main>
      <div className="flex flex-col items-center justify-between p-24">
        <p className="mb-12">UsersPage User: {user.name}</p>
        <form
          action={async (formData: FormData) => {
            "use server";

            const newName = formData.get("name") as string;
            await updateUser(user.id, newName);
            revalidatePath('users/dollar{user.id}');
          }}
        >
          <input
            type="text"
            name="name"
            className="text-black border border-gray-400 h-10"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-3 px-4 rounded-md">
            Submit
          </button>
        </form>
      </div>
      <div className="mt-4 p-12 flex items-center gap-6">
        <CodeEditor value={simpleValue} />
      </div>
    </main>
  );
}`;

const withAction = `// Extracted server action and binded with revalidatePath

// users/[userId]/actions.ts

"use server";

import { revalidatePath } from "next/cache";
import { updateUser } from "../_data-access/user";

export async function updateNameAction(userId: string, formData: FormData) {
  const newName = formData.get("name") as string;

  await updateUser(userId, newName);
  revalidatePath('/users/dollar{userId}');
}


//---------------------
//users/[userId]/page.tsx

import React from "react";
import { getUser, updateUser } from "../_data-access/user";
import { revalidatePath } from "next/cache";
import CodeEditor from "../../cache/_components/code-editor";

interface Props {
  params: {
    userId: string;
  };
}

export default async function UsersPage({ params }: Props) {
  const user = await getUser(params.userId);

  return (
    <main>
      <div className="flex flex-col items-center justify-between p-24">
        <p className="mb-12">UsersPage User: {user.name}</p>
        <form action={updateNameAction.bind(null, user.id)}>
          <input
            type="text"
            name="name"
            className="text-black border border-gray-400 h-10"
          />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 ml-3 px-4 rounded-md">
            Submit
          </button>
        </form>
      </div>
      <div className="mt-4 p-12 flex items-center gap-6">
        <CodeEditor value={simpleValue} />
      </div>
    </main>
  );
}`;

const upgradedAction = `// Extracted server action, revalidatePath using useFormState and useFormStatus 
// users/[userId]/actions.ts

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
  revalidatePath('/users/dollar{userId}');

  return {
    userId,
    name: "",
    message: "success",
  };
}

//-----------------------------------------------
// users/[userId]/form.tsx

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

// -------------------------------------------------------------------------------
//users/[userId]/page.tsx

import React from "react";
import { getUser } from "../_data-access/user";
import CodeEditor from "../../cache/_components/code-editor";
import Form from "./form";

interface Props {
  params: {
    userId: string;
  };
}

export default async function UsersPage({ params }: Props) {
  const user = await getUser(params.userId);

  return (
    <main>
      <div className="flex flex-col items-center justify-between p-24">
        <p className="mb-12">UsersPage User: {user.name}</p>
        <Form userId={user.id} />
      </div>
      <div className="mt-4 p-12 flex gap-6">
        <CodeEditor value={simpleValue} height="1400px" />
        <CodeEditor value={withAction} height="1400px" />
        <CodeEditor value={withAction} height="1400px" />
      </div>
    </main>
  );
}

`;
