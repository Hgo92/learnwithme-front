import { createAuthClient } from "better-auth/react";

export default function RegisterModal(closeModal: { closeModal: void }) {
  async function handleRegister(formData: FormData) {
    const authClient = createAuthClient();
    const email = formData.get("email") as string;
    const password = formData.get("password") as string;
    const name = formData.get("name") as string;

    await authClient.signUp.email({
      name: name,
      email: email,
      password: password,
    });

    closeModal;
  }

  return (
    <div>
      <h1>M'inscrire</h1>
      <form id="registerForm" action={handleRegister}>
        <label htmlFor="name">Pseudo</label>
        <input id="name" name="name" />
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
