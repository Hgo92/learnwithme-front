// Choses à faire :
// - Changer la couleur de la carte si bonne réponse (via un useState changé dans handleSuccess/Fail ?)
// - Choisir le nombre de cartes qu'on veut dans le jeu (ex : deck de 50 cartes, interrogé sur 10)
// - Gestion de la réussite sur une carte (plus on réussit une carte, moins elle a de chance de revenir)
// - Timer pour répondre
//  - Heuristique
// - Check distance LEvenshtein
// - Intégration IA (aisdk => recherche express)
// - Table user ID/Name

import type { Deck, Card } from "../lib/interfaces";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { api } from "../lib/api";

export default function Play() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Card[]>([]);

  useEffect(() => {
    api.getDecks().then(setDecks);

    api.getCards().then(setCards);
  }, []);

  const [deckId, setDeckId] = useState(decks[0]?.id ?? 0);
  const [isStarted, setIsStarted] = useState(false);
  const [isWordVisible, setIsWordVisible] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [cartesRestantes, setCartesRestantes] = useState<Card[]>([]);
  const [score, setScore] = useState(0);
  const [cartesJouees, setCartesJouees] = useState(0);
  const [lastResult, setLastResult] = useState<"success" | "fail" | null>(null);

  const nextCard = (cartesRestantes: Card[]) => {
    setRandomIndex(Math.floor(Math.random() * cartesRestantes.length));
    setIsWordVisible(false);
    setAnswer("");
    setLastResult(null);
  };

  const handleStart = () => {
    const cartesDeck = cards.filter((c) => c.deckId === deckId);
    setCartesRestantes(cartesDeck);
    setScore(0);
    setCartesJouees(0);
    setRandomIndex(0);
    setIsStarted(true);
    setLastResult(null);
  };

  const handleSuccess = () => {
    setCartesJouees((j) => j + 1);
    setLastResult("success");
    setScore((s) => s + 1);
    const newCartes = cartesRestantes.filter((_, i) => i !== randomIndex);
    setCartesRestantes(newCartes);
    nextCard(newCartes);
  };

  const handleFail = () => {
    setCartesJouees((j) => j + 1);
    setLastResult("fail");
    nextCard(cartesRestantes);
  };

  const carteCourante = cartesRestantes[randomIndex];

  const cardBorderClass =
    lastResult === "success"
      ? "border-green-deep"
      : lastResult === "fail"
        ? "border-red-deep"
        : "border-border";

  const inputClass =
    "w-full border-[1.5px] border-border rounded-lg px-3 py-2 text-sm text-center bg-white text-ink placeholder-ink-muted focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20";

  return (
    <main className="min-h-screen bg-cream pt-20 flex flex-col items-center px-4">
      <Navbar />

      {isStarted ? (
        carteCourante ? (
          <div className="w-full max-w-md flex flex-col gap-5">
            <div className="flex justify-between text-xs text-ink-muted">
              <span>
                {cartesRestantes.length} carte
                {cartesRestantes.length > 1 ? "s" : ""} restante
                {cartesRestantes.length > 1 ? "s" : ""}
              </span>
              {cartesJouees > 0 && (
                <span className="text-indigo-deep font-medium">
                  Score : {score}/{cartesJouees}
                </span>
              )}
            </div>

            <div
              className={`bg-white rounded-2xl border-2 ${cardBorderClass} shadow-md p-8 flex flex-col gap-5 text-center transition-colors duration-300`}
            >
              <div>
                <p className="text-xs text-ink-muted uppercase tracking-widest mb-2">
                  Traduisez
                </p>
                <h2 className="font-serif text-4xl text-ink">
                  {carteCourante.title}
                </h2>
              </div>

              {isWordVisible ? (
                <div className="flex flex-col gap-4">
                  <div className="bg-cream rounded-xl border border-border px-5 py-3">
                    <p className="text-clear-warm italic font-serif text-xl m-0">
                      {carteCourante.translation}
                    </p>
                    {answer && (
                      <p className="text-xs text-ink-muted mt-1.5">
                        Votre réponse : <em>{answer}</em>
                      </p>
                    )}
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={handleFail}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-deep hover:opacity-90 transition-opacity"
                    >
                      ✗ Raté
                    </button>
                    <button
                      onClick={handleSuccess}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-green-deep hover:opacity-90 transition-opacity"
                    >
                      ✓ Réussi
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <input
                    value={answer}
                    onChange={(e) => setAnswer(e.target.value)}
                    onKeyDown={(e) =>
                      e.key === "Enter" && setIsWordVisible(true)
                    }
                    placeholder="Votre réponse..."
                    autoFocus
                    className={inputClass}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => setIsWordVisible(true)}
                      className="flex-2 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors"
                    >
                      Valider
                    </button>
                    <button
                      onClick={() => setIsWordVisible(true)}
                      className="flex-1 py-2.5 rounded-xl text-sm font-medium text-ink-muted border border-border bg-transparent hover:bg-cream-dark transition-colors"
                    >
                      Je ne sais pas
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center gap-6 text-center max-w-sm">
            <div className="w-16 h-16 rounded-full bg-indigo-pale flex items-center justify-center text-3xl">
              🎉
            </div>
            <div>
              <h2 className="font-serif text-3xl text-ink mb-2">Terminé !</h2>
              <p className="text-ink-muted">
                Score final :{" "}
                <span className="text-indigo-deep font-semibold">
                  {score}/{cartesJouees}
                </span>
              </p>
            </div>
            <div className="flex gap-3 flex-wrap justify-center">
              <button
                onClick={handleStart}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors"
              >
                Rejouer ce deck
              </button>
              <button
                onClick={() => setIsStarted(false)}
                className="px-5 py-2.5 rounded-xl text-sm font-medium text-ink-soft border border-border bg-transparent hover:bg-cream-dark transition-colors"
              >
                Changer de deck
              </button>
            </div>
          </div>
        )
      ) : (
        <div className="bg-white rounded-2xl border border-border shadow-md p-10 flex flex-col gap-6 max-w-sm w-full text-center">
          <div>
            <h1 className="font-serif text-3xl text-ink mb-2">Réviser</h1>
            <p className="text-ink-muted text-sm">
              Choisissez un deck pour commencer
            </p>
          </div>
          <select
            onChange={(e) => setDeckId(parseInt(e.target.value))}
            className="border-[1.5px] border-border rounded-lg px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20"
          >
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.title}
              </option>
            ))}
          </select>
          <button
            onClick={handleStart}
            className="py-3 rounded-xl text-base font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors shadow-[0_4px_12px_rgba(55,48,163,0.25)]"
          >
            C'est parti !
          </button>
        </div>
      )}
    </main>
  );
}
