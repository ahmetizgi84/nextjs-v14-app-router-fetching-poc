type User = {
  id: string;
  name: string;
};

(global as any).user = {
  id: "50",
  name: "John Doe",
} as User;

export async function getUser(userId: string) {
  //@ts-expect-error
  return global.user as User;
}

export async function updateUser(userId: string, name: string) {
  //@ts-expect-error
  (global.user as User).name = name;
}
