import { useState } from "react";
import { useNavigate } from "react-router";
import LoginModal from "../components/authentication/LoginModal";
import RegisterModal from "../components/authentication/RegisterModal";
import { useSnackbar } from "notistack";

import { authClient } from "../lib/auth-client";

export default function Home() {
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleInvit = async () => {
    const { error } = await authClient.signIn.email({
      email: "hugo@example.com",
      password: "mdpInvit",
    });
    if (error) {
      console.error("Erreur de connexion :", error.message);
      return;
    }
    enqueueSnackbar("Connexion réussie en tant qu'invité(e) !");
    navigate("/home");
  };

  const [loginModal, setLoginModal] = useState(false);
  const [registerModal, setRegisterModal] = useState(false);

  const handleRegister = () => {
    setRegisterModal(false);
    enqueueSnackbar("Inscription réussie, bienvenue sur Learn With Me !");
    setTimeout(() => {
      closeSnackbar();
    }, 5000);
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center gap-8 text-center px-6 bg-cream">
      <div className="w-10 h-0.5 bg-indigo-deep rounded-full" />

      <div className="flex flex-col gap-4 max-w-md">
        <h1 className="font-serif text-6xl font-bold tracking-tight text-ink leading-tight">
          Learn
          <br />
          <span className="text-indigo-deep">With Me</span>
        </h1>
        <p className="text-ink-muted text-lg font-light leading-relaxed">
          Votre gestionnaire de cartes-mémoires
          <br />
          pour réviser votre vocabulaire
        </p>
      </div>

      <div className="flex gap-3 flex-wrap justify-center">
        {loginModal ? (
          <LoginModal closeModal={() => setLoginModal(false)} />
        ) : (
          <button
            onClick={() => setLoginModal(true)}
            className="px-6 py-3 rounded-xl text-sm font-medium text-ink border-[1.5px] border-border bg-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 shadow-sm"
          >
            Me connecter
          </button>
        )}
        {registerModal ? (
          <RegisterModal
            closeModal={() => handleRegister()}
            cancelModal={() => setRegisterModal(false)}
          />
        ) : (
          <button
            onClick={() => setRegisterModal(true)}
            className="px-6 py-3 rounded-xl text-sm font-medium text-ink border-[1.5px] border-border bg-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 shadow-sm"
          >
            M'inscrire
          </button>
        )}
        <button
          onClick={() => handleInvit()}
          className="px-6 py-3 rounded-xl text-sm font-medium text-ink border-[1.5px] border-border bg-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 shadow-sm"
        >
          Tester comme invité
        </button>
      </div>
    </main>
  );
}
