import * as t from "io-ts";
import { PathReporter } from "io-ts/lib/PathReporter";

const User = t.type({
  id: t.number,
  name: t.string,
  email: t.string,
});
type TUser = t.TypeOf<typeof User>;

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
  const data = await fetchUserData();
  const result = User.decode(data);

  const renderUser = () => {
    if (result._tag === "Right") {
      const user: TUser = result.right;
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
          <pre>{PathReporter.report(result)}</pre>
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
