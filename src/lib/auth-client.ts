import { createAuthClient } from "better-auth/react";
export const authClient = createAuthClient({
  baseURL: "https://learn-with-me-nest-production.up.railway.app/",
  fetchOptions: {
    credentials: "include",
  },
});
