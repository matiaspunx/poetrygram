export type User = {
  id?: string;
  name: string;
  email: string;
  username: string;
  subtitle: string;
  bio: string;
  profile_picture?: string | URL;
  google_id?: string;
};
