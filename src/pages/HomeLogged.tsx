import { Link } from "react-router";

export default function HomeLogged() {
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
        <Link
          to="/decks"
          className="px-6 py-3 rounded-xl text-sm font-medium text-inkborder-[1.5px] border-border bg-white hover:-translate-y-0.5 hover:shadow-md transition-all duration-200 shadow-sm"
        >
          Mes decks
        </Link>
        <Link
          to="/play"
          className="px-6 py-3 rounded-xl text-sm font-medium text-white bg-indigo-deep hover:bg-[#6366f1] hover:-translate-y-0.5 transition-all duration-200 shadow-[0_4px_12px_rgba(55,48,163,0.3)]"
        >
          Commencer à jouer
        </Link>
      </div>

      <div className="flex gap-1.5 mt-4 text-ink-muted">
        <p>
          Réalisé par Hugo Monier avec JavaScript (TypeScript - React -
          TailwindCSS) et Express
        </p>
      </div>
    </main>
  );
}
