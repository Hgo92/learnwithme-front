import * as z from "zod";

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Nom trop court"),
  email: z.email("Veuillez mettre un email valable"),
  password: z.string().min(6, "Mot de passe trop court"),
});
