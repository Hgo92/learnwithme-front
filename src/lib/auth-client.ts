import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://learn-with-me-nest.onrender.com",
  fetchOptions: {
    credentials: "include",
  },
});
