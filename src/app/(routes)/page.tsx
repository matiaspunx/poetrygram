import { auth } from "@/auth";
import SignIn from "@/components/sign-in";
import SignOut from "@/components/sign-out";
import { User } from "@/types/user";
import { getUsers } from "@/utils/supabase/functions";
import Link from "next/link";

export default async function Home() {
  const users: User[] = await getUsers();
  const session = await auth();
  return (
    <>
      <div className="bg-wg-primary">
        <h1 className="text-4xl font-bold text-white">Poetrygram</h1>

        {(session && (
          <div>
            Hola, <Link href="/profile">{session?.user?.name}</Link> |{" "}
            <SignOut />
          </div>
        )) || <SignIn />}
      </div>
      <div>
        <h2>Users</h2>
        {users.map((user) => (
          <div key={user.id}>
            {user.name} | {user.email}
          </div>
        ))}
      </div>
    </>
  );
}
