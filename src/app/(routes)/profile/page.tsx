/* eslint-disable @next/next/no-img-element */
import PostGrid from "@/components/PostGrid";
import { CheckIcon, ChevronLeft, Settings } from "lucide-react";
import Link from "next/link";
import { getCurrentUser } from "@/utils/supabase/functions";

export default async function Profile() {
  const user = await getCurrentUser();
  console.log("user", user);
  if (!user) {
    return <div>No hay usuario</div>;
  }
  return (
    <main>
      <header className="flex justify-between items-center">
        <button>
          <ChevronLeft />
        </button>
        <h1 className="font-bold text-xl flex items-center gap-2">
          {user.username}{" "}
          <span className="inline-flex items-center justify-center p-1 size-5 rounded-full bg-blue-500 text-white">
            <CheckIcon />
          </span>
        </h1>
        <Link href={"/settings"}>
          <Settings />
        </Link>
      </header>
      <section className="flex flex-col gap-8 items-center my-4">
        <div className="size-44 rounded-full bg-gradient-to-tr from-red-500 to-blue-500 flex justify-center items-center">
          <div className="flex items-center border-8 border-background justify-center size-40 rounded-full aspect-square overflow-hidden">
            <img
              className="size-40 aspect-square object-cover"
              src={user.profile_picture}
              alt="avatar"
            />
          </div>
        </div>
      </section>
      <section className="container max-w-2xl mx-auto flex flex-col gap-2 items-center">
        <h2 className="font-bold text-2xl">{user.name}</h2>
        <h3 className="font-semibold text-gray-500 text-xl">{user.subtitle}</h3>
        <p className="text-lg text-balance text-center">{user.bio}</p>
      </section>

      <nav className="flex max-w-3xl mx-auto gap-4 items-center justify-center py-4 border-t border-gray-600 border-b my-4">
        <Link href="/" className="font-bold">
          Posts
        </Link>
        <Link href="/highlights">Highlights</Link>
        <Link href="/bookmarks">Bookmarks</Link>
      </nav>

      <PostGrid />
    </main>
  );
}
