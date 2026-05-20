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
import Game from "../components/play/Game";

export default function Play() {
  const [decks, setDecks] = useState<Deck[]>([]);
  const [cards, setCards] = useState<Card[]>([]);
  const [selectCards, setSelectCards] = useState<Card[]>([]);
  const [deckId, setDeckId] = useState<number | null>(null);
  const [isStarted, setIsStarted] = useState(false);

  useEffect(() => {
    Promise.all([api.getDecks(), api.getCards()]).then(
      ([fetchedDecks, fetchedCards]) => {
        setDecks(fetchedDecks);
        setCards(fetchedCards);

        if (fetchedDecks.length > 0) {
          const firstDeckId = fetchedDecks[0].id;
          setDeckId(firstDeckId);
          setSelectCards(fetchedCards.filter((c) => c.deckId === firstDeckId));
        }
      },
    );
  }, []);

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement, HTMLSelectElement>,
  ) => {
    const newId = parseInt(e.target.value);
    setDeckId(newId);
    const filteredCards = cards.filter((c) => c.deckId === newId);
    setSelectCards(filteredCards);
  };

  return (
    <main className="min-h-screen bg-cream pt-20 flex flex-col items-center px-4">
      <Navbar />

      {isStarted ? (
        <Game cards={selectCards} setIsStarted={setIsStarted} />
      ) : (
        <div className="bg-white rounded-2xl border border-border shadow-md p-10 flex flex-col gap-6 max-w-sm w-full text-center">
          <div>
            <h1 className="font-serif text-3xl text-ink mb-2">Réviser</h1>
            <p className="text-ink-muted text-sm">
              Choisissez un deck pour commencer
            </p>
          </div>
          <select
            onChange={(e) => handleSelect(e)}
            className="border-[1.5px] border-border rounded-lg px-3 py-2 text-sm bg-white text-ink focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20"
          >
            <option value="" selected disabled>
              Choisissez un deck
            </option>
            {decks.map((deck) => (
              <option key={deck.id} value={deck.id}>
                {deck.title}
              </option>
            ))}
          </select>
          <button
            onClick={() => setIsStarted(true)}
            className="py-3 rounded-xl text-base font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors shadow-[0_4px_12px_rgba(55,48,163,0.25)]"
          >
            C'est parti !
          </button>
        </div>
      )}
    </main>
  );
}
