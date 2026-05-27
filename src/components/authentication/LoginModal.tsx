import { useState } from "react";
import { authClient } from "../../lib/auth-client";
import useSnack from "../Snackbar";

export default function LoginModal({ closeModal }: { closeModal: () => void }) {
  const [error, setError] = useState<string | null>(null);
  const snackbar = useSnack();

  async function handleLogin(e: React.SubmitEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem("email") as HTMLInputElement).value;
    const password = (form.elements.namedItem("password") as HTMLInputElement)
      .value;

    const { error: authError } = await authClient.signIn.email({
      email,
      password,
    });

    if (authError) {
      setError("Il y a eu un problème, vérifiez vos identifiants !");
      snackbar("Erreur lors de la connexion ! 🥺");
      return;
    }

    (snackbar("Connexion réussie ! Bon retour sur Learn With Me !"),
      closeModal());
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-ink/30 backdrop-blur-sm px-4">
      <div className="bg-cream w-full max-w-sm rounded-2xl border border-border shadow-lg p-8 flex flex-col gap-6">
        <div className="flex flex-col gap-1">
          <div className="w-6 h-0.5 bg-indigo-deep rounded-full mb-3" />
          <h2 className="font-serif text-3xl font-bold text-ink">
            Me connecter
          </h2>
        </div>
        <form
          id="loginForm"
          onSubmit={handleLogin}
          className="flex flex-col gap-4"
        >
          <div className="flex flex-col gap-1.5">
            <label
              htmlFor="email"
              className="text-xs font-medium text-ink-muted uppercase tracking-wider"
            >
              Email
            </label>
            <input
              id="email"
              name="email"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-ink text-sm placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-indigo-deep/30 focus:border-indigo-deep transition-all"
              placeholder="votre@email.com"
            />
          </div>
          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-medium text-ink-muted uppercase tracking-wider">
              Mot de passe
            </label>
            <input
              type="password"
              id="password"
              name="password"
              placeholder="Votre mot de passe"
              required
              className="w-full px-4 py-2.5 rounded-xl border border-border bg-white text-ink text-sm placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-indigo-deep/30 focus:border-indigo-deep transition-all"
            />
          </div>
          {error && (
            <p className="text-red-deep text-sm text-center">{error}</p>
          )}
          <div className="flex gap-2 pt-1">
            <button
              type="button"
              onClick={closeModal}
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-ink-muted border border-border bg-white hover:bg-cream-dark transition-all duration-200"
            >
              Annuler
            </button>
            <button
              type="submit"
              className="flex-1 px-4 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-deep hover:bg-indigo-deep/90 hover:-translate-y-0.5 hover:shadow-md disabled:opacity-50 transition-all duration-200"
            >
              Se connecter
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
