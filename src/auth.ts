import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { createClient } from "@/utils/supabase/server";

export const { handlers, signIn, signOut, auth } = NextAuth({
  providers: [Google],
  callbacks: {
    async signIn({ user, account, profile }) {
      const supabase = await createClient();
      console.log("signIn", user, account, profile);
      if (account?.provider === "google") {
        const googleId = profile?.id;
        const email = profile?.email;
        const name = profile?.name;
        const profilePicture = profile?.picture;

        // Verificar si el usuario ya existe
        const { data: existingUser, error } = await supabase
          .from("users")
          .select("*")
          .or(`google_id.eq.${googleId},email.eq.${email}`)
          .maybeSingle(); // Cambiado a maybeSingle()

        if (error) {
          console.error("Error fetching user:", error);
          return false;
        }

        if (existingUser) {
          // Actualizar el usuario existente
          const { error: updateError } = await supabase
            .from("users")
            .update({ name, profile_picture: profilePicture })
            .eq("id", existingUser.id);

          if (updateError) {
            console.error("Error updating user:", updateError);
            return false;
          }
        } else {
          // Crear un nuevo usuario
          const { error: insertError } = await supabase.from("users").insert([
            {
              google_id: googleId,
              name,
              email,
              username: name,
              profile_picture: profilePicture,
            },
          ]);

          if (insertError) {
            console.error("Error inserting user:", insertError);
            return false;
          }
        }
      }
      return true;
    },
  },
});
