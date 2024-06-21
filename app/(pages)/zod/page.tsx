import { z } from "zod";

const userSchema = z.object({
  id: z.number(),
  name: z.string(),
  email: z.string(),
});

type TUser = z.infer<typeof userSchema>;

const fetchUserData = async (): Promise<unknown> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        id: 1,
        name: "John Doe",
        email: "john.doe@example.com",
      });
    }, 2000);
  });
};

export default async function Page() {
  const data: unknown = await fetchUserData();
  const validatedUser = userSchema.safeParse(data);

  const renderUser = () => {
    if (validatedUser.success) {
      const user: TUser = validatedUser.data;
      return (
        <div>
          <h1>{user.name}</h1>
          <p>{user.email}</p>
        </div>
      );
    } else {
      return (
        <div>
          <h1>Invalid user data!</h1>
          <pre>{JSON.stringify(validatedUser.error, null, 2)}</pre>
        </div>
      );
    }
  };

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      {renderUser()}
    </main>
  );
}
