import MesDecks from "../components/MesDecks";
import type { Card, Deck } from "../lib/interfaces";
import { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { api } from "../lib/api";

export default function Decks() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [isDecksLoading, setIsDecksLoading] = useState(true);
  const [cards, setCards] = useState<Card[]>([]);

  const fetchDecksAndCards = () => {
    setIsDecksLoading(true);
    api
      .getDecks()
      .then(setDecks)
      .finally(() => setIsDecksLoading(false));

    api.getCards().then(setCards);
  };

  useEffect(() => {
    fetchDecksAndCards();
  }, []);

  function onReload() {
    fetchDecksAndCards();
  }

  const [isVisible, setIsVisible] = useState(false);
  const [name, setName] = useState("");

  const newDeck = async (name: string) => {
    if (!name.trim()) return;

    await api.createDeck({ title: name });
    setName("");
    setIsVisible(false);
    onReload();
  };

  return (
    <main className="pt-20 bg-cream min-h-screen">
      <Navbar />
      <div className="flex flex-col gap-8">
        <div className="flex items-center justify-between flex-wrap gap-4 pb-6 border-b border-border">
          <div className="text-left">
            <p className="text-xs text-ink-muted tracking-widest uppercase mb-1">
              Collection
            </p>
            <h1 className="font-serif text-4xl text-ink">Mes decks</h1>
          </div>

          <div className="flex gap-3 items-center flex-wrap">
            {isVisible && (
              <div className="flex gap-2 items-center">
                <input
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && newDeck(name)}
                  placeholder="Nom du deck"
                  autoFocus
                  className="border-[1.5px] border-border rounded-lg px-3 py-2 text-sm bg-white text-ink placeholder-ink-muted focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20 w-48"
                />
                <button
                  onClick={() => newDeck(name)}
                  className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors"
                >
                  Valider
                </button>
              </div>
            )}
            <button
              onClick={() => setIsVisible(!isVisible)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                isVisible
                  ? "bg-cream-dark text-ink-soft border border-border"
                  : "bg-ink text-cream hover:bg-ink-soft"
              }`}
            >
              {isVisible ? "✕ Annuler" : "+ Nouveau deck"}
            </button>
          </div>
        </div>

        {isDecksLoading && (
          <div className="flex flex-col gap-4 max-w-md">
            <p className="text-ink-muted text-lg font-light leading-relaxed">
              En cours de chargement
            </p>
          </div>
        )}

        {decks?.length === 0 && (
          <div className="flex flex-col gap-4 max-w-md">
            <p className="text-ink-muted text-lg font-light leading-relaxed">
              Vous n'avez pas de decks pour l'instant !
            </p>
          </div>
        )}

        <div className="flex flex-col gap-6">
          {decks
            .sort((a, b) => a.id - b.id)
            .map((deck, index) => {
              return (
                <MesDecks
                  deck={deck}
                  cards={cards}
                  onReload={onReload}
                  index={index}
                />
              );
            })}
        </div>
      </div>
    </main>
  );
}
