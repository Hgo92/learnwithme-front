import { createAuthClient } from "better-auth/react";

export default function LoginModal({ closeModal }: { closeModal: void }) {
  async function handleLogin(formData: FormData) {
    const authClient = createAuthClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;

    await authClient.signIn.email({
      email: email,
      password: password,
    });

    closeModal;
  }

  return (
    <div>
      <h1>Me connecter</h1>
      <form id="loginForm" action={handleLogin}>
        <label htmlFor="email">Email</label>
        <input id="email" name="email" />
        <label>Mot de passe</label>
        <input type="password" id="password" name="password" />
        <button type="submit"></button>
        <button onClick={() => closeModal}>Annuler</button>
      </form>
    </div>
  );
}
