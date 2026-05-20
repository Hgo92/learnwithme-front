import { useState } from "react";
import type { Card, Deck } from "../lib/interfaces";

import ChangeDeck from "./modules/ChangeDeck";
import DeleteDeck from "./modules/DeleteDeck";
import Carte from "./Carte";
import AddCard from "./modules/AddCard";

export interface MesDecksProps {
  onReload: () => void;
  deck: Deck;
  cards: Card[];
}

export default function MesDecks({ deck, cards, onReload }: MesDecksProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [isAddingCarte, setIsAddingCard] = useState(false);

  const cartesDeck = cards.filter((c) => c.deckId === deck.id);

  return (
    <div
      key={deck.id}
      className="bg-white rounded-2xl border border-border shadow-sm overflow-hidden"
    >
      {/* Deck header */}
      <div className="flex items-center gap-3 px-6 py-4 bg-cream border-b border-cream-dark">
        <div className="w-2.5 h-2.5 rounded-full bg-indigo-deep shrink-0" />

        {isEditing ? (
          <ChangeDeck
            deck={deck}
            onReload={onReload}
            setIsEditing={setIsEditing}
          />
        ) : (
          <h2 className="font-serif text-2xl text-ink flex-1">{deck.title}</h2>
        )}

        <div className="flex items-center gap-2">
          <span className="text-xs text-ink-muted bg-indigo-pale px-2.5 py-0.5 rounded-full font-medium">
            {cartesDeck.length} carte
            {cartesDeck.length !== 1 ? "s" : ""}
          </span>
          <button
            onClick={() => setIsEditing(true)}
            className="p-1.5 rounded-lg text-ink-muted hover:bg-cream-dark transition-colors bg-transparent border-none text-base"
          >
            ✏️
          </button>
          <DeleteDeck id={deck.id} onReload={onReload} />
        </div>
      </div>

      {/* Cards area */}
      <div className="px-6 py-4">
        {cartesDeck.length > 0 ? (
          <Carte deckId={deck.id} dataCartes={cartesDeck} onReload={onReload} />
        ) : (
          <p className="text-sm text-ink-muted italic py-2">
            Aucune carte dans ce deck.
          </p>
        )}

        {isAddingCarte ? (
          <AddCard
            deckId={deck.id}
            onReload={onReload}
            setIsAddingCard={setIsAddingCard}
          />
        ) : (
          <button
            onClick={() => setIsAddingCard(true)}
            className="mt-3 w-full py-2.5 rounded-xl text-sm text-indigo-deep border-[1.5px] border-dashed border-indigo-pale bg-transparent hover:bg-indigo-pale/40 transition-colors font-medium"
          >
            + Ajouter une carte
          </button>
        )}
      </div>
    </div>
  );
}
