import { getCurrentUser, handleUpdateUser } from "@/utils/supabase/functions";
import Link from "next/link";

/* eslint-disable @next/next/no-img-element */
export default async function Settings() {
  const user = await getCurrentUser();

  if (!user) {
    return <div>No hay usuario</div>;
  }

  return (
    <main>
      <div className="max-w-[85rem] px-4 py-10 sm:px-6 lg:px-8 lg:py-14 mx-auto">
        <div className="mx-auto max-w-2xl">
          <div className="flex items-center justify-between">
            <h2 className="text-xl text-gray-800 font-bold sm:text-3xl dark:text-white">
              Profile settings
            </h2>
            <Link href="/profile">Volver a tu perfil</Link>
          </div>

          <div className="mt-5 p-4 relative z-10 bg-white border rounded-xl sm:mt-10 md:p-10 dark:bg-neutral-900 dark:border-neutral-700">
            <form action={handleUpdateUser}>
              <div className="flex items-center gap-x-4 mb-4 sm:mb-8">
                <div className="aspect-square w-20 rounded-full overflow-hidden">
                  <img
                    src={user.profile_picture}
                    alt="Avatar"
                    className="size-full object-cover"
                  />
                </div>
                <input
                  type="file"
                  name="profile_picture"
                  className=" py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-indigo-400 text-white hover:bg-indigo-500 focus:outline-none focus:bg-indigo-500 disabled:opacity-50 disabled:pointer-events-none"
                />
              </div>
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="hs-feedback-post-comment-username-1"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Username
                </label>
                <input
                  type="text"
                  id="hs-feedback-post-comment-username-1"
                  name="username"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Username"
                  defaultValue={user.username || ""}
                />
              </div>
              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="hs-feedback-post-comment-name-1"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Full name
                </label>
                <input
                  type="text"
                  id="hs-feedback-post-comment-name-1"
                  name="name"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Full name"
                  defaultValue={user.name || ""}
                />
              </div>

              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="hs-feedback-post-comment-subtitle-1"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Subtitle
                </label>
                <input
                  type="text"
                  id="hs-feedback-post-comment-subtitle-1"
                  name="subtitle"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Developer"
                  defaultValue={user.subtitle || ""}
                />
              </div>

              <div className="mb-4 sm:mb-8">
                <label
                  htmlFor="hs-feedback-post-comment-email-1"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Email address
                </label>
                <input
                  type="email"
                  id="hs-feedback-post-comment-email-1"
                  name="email"
                  className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                  placeholder="Email address"
                  defaultValue={user.email || ""}
                  readOnly={true}
                />
                <span className="text-xs text-red-300/80 dark:text-red-300/80">
                  El email asociado a tu cuenta no puede ser editado.
                </span>
              </div>

              <div>
                <label
                  htmlFor="hs-feedback-post-comment-bio-1"
                  className="block mb-2 text-sm font-medium dark:text-white"
                >
                  Bio
                </label>
                <div className="mt-1">
                  <textarea
                    id="hs-feedback-post-comment-bio-1"
                    name="bio"
                    className="py-3 px-4 block w-full border-gray-200 rounded-lg text-sm focus:border-blue-500 focus:ring-blue-500 disabled:opacity-50 disabled:pointer-events-none dark:bg-neutral-900 dark:border-neutral-700 dark:text-neutral-400 dark:placeholder-neutral-500 dark:focus:ring-neutral-600"
                    placeholder="Biography"
                    defaultValue={user.bio || ""}
                  ></textarea>
                </div>
              </div>

              <div className="mt-6 grid">
                <button
                  type="submit"
                  className="w-full py-3 px-4 inline-flex justify-center items-center gap-x-2 text-sm font-medium rounded-lg border border-transparent bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:bg-blue-700 disabled:opacity-50 disabled:pointer-events-none"
                >
                  Save settings
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
}
