import { createClient } from "@/utils/supabase/server";
import { auth } from "@/auth";
import { User } from "@/types/user";
import { revalidatePath } from "next/cache";

export const getUsers = async () => {
  const supabase = await createClient();
  const { data, error } = await supabase.from("users").select("*");

  if (error) {
    console.error("Error fetching users:", error);
    return [];
  }

  return data || [];
};

export const getCurrentUser = async () => {
  const supabase = await createClient();
  const session = await auth();

  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", session?.user?.email)
    .single();

  if (error) {
    console.error("Error fetching user:", error);
    return null;
  }

  return data || null;
};

export const updateUser = async (user: User) => {
  const supabase = await createClient();
  const session = await auth();

  const { error } = await supabase
    .from("users")
    .update(user)
    .eq("email", session?.user?.email);

  if (error) {
    console.error("Error updating user:", error);
    return null;
  }

  return true;
};

export const handleUpdateUser = async (formData: FormData) => {
  "use server";

  // get avatar from form data
  const avatar = formData.get("profile_picture") as File;
  const supabase = await createClient();

  const user: User = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    username: formData.get("username") as string,
    subtitle: formData.get("subtitle") as string,
    profile_picture: "",
    bio: formData.get("bio") as string,
  };

  // upload avatar to storage
  const { error } = await supabase.storage
    .from("avatars")
    .upload(user.username, avatar, {
      cacheControl: "3600",
      contentType: avatar.type,
      upsert: true,
    });

  if (error) {
    console.error("Error uploading avatar:", error);
    return;
  }

  // get avatar url from storage
  const { data } = supabase.storage.from("avatars").getPublicUrl(user.username);

  if (data?.publicUrl) {
    user.profile_picture = data.publicUrl;
  } else {
    console.error("Error getting public URL for avatar");
    return;
  }

  await updateUser(user);

  revalidatePath("/profile");
};
