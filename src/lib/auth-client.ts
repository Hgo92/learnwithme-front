import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://learn-with-me-nest.vercel.app",
  fetchOptions: {
    credentials: "include",
  },
});
