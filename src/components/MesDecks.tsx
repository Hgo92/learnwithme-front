import { useEffect, useState } from "react";
import type { Card, Deck } from "../lib/interfaces";
import { api } from "../lib/api";
import ChangeDeck from "./modules/ChangeDeck";
import DeleteDeck from "./DeleteDeck";
import Carte from "./Carte";

export interface MesDecksProps {
  onReload: () => void;
  deck: Deck;
  cards: Card[];
}

export default function MesDecks({ deck, cards, onReload }: MesDecksProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [addingCarteDeckId, setAddingCarteDeckId] = useState<number | null>(
    null,
  );

  const [mot, setMot] = useState("");
  const [trad, setTrad] = useState("");

  const handleNewCarte = async (mot: string, trad: string, deck_id: number) => {
    // await api.createCard({});
    setAddingCarteDeckId(null);
    setMot("");
    setTrad("");
    onReload();
  };

  const cartesDeck = cards.filter((c) => c.deckId === deck.id);

  const isAddingCarte = addingCarteDeckId === deck.id;

  const inputClass =
    "border-[1.5px] border-border rounded-lg px-3 py-2 text-sm bg-white text-ink placeholder-ink-muted focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20";
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
          <DeleteDeck id={deck.id} onReloadDecks={onReload} />
        </div>
      </div>

      {/* Cards area */}
      <div className="px-6 py-4">
        {cartesDeck.length > 0 ? (
          <Carte dataCartes={cartesDeck} onReloadCartes={onReload} />
        ) : (
          <p className="text-sm text-ink-muted italic py-2">
            Aucune carte dans ce deck.
          </p>
        )}

        {isAddingCarte ? (
          <div className="flex gap-3 items-center flex-wrap mt-3 p-4 bg-cream rounded-xl border-[1.5px] border-dashed border-border">
            <input
              onChange={(e) => setMot(e.target.value)}
              placeholder="Le mot"
              autoFocus
              className={`${inputClass} flex-1 min-w-32`}
            />
            <input
              onChange={(e) => setTrad(e.target.value)}
              placeholder="Sa traduction"
              className={`${inputClass} flex-1 min-w-32`}
            />
            <button
              onClick={() => handleNewCarte(mot, trad, deck.id)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors"
            >
              Ajouter
            </button>
            <button
              onClick={() => setAddingCarteDeckId(null)}
              className="px-4 py-2 rounded-lg text-sm font-medium text-ink-muted border border-border bg-transparent hover:bg-cream-dark transition-colors"
            >
              Annuler
            </button>
          </div>
        ) : (
          <button
            onClick={() => setAddingCarteDeckId(deck.id)}
            className="mt-3 w-full py-2.5 rounded-xl text-sm text-indigo-deep border-[1.5px] border-dashed border-indigo-pale bg-transparent hover:bg-indigo-pale/40 transition-colors font-medium"
          >
            + Ajouter une carte
          </button>
        )}
      </div>
    </div>
  );
}
