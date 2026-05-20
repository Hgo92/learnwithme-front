import { useState } from "react";
import Delete from "./modules/DeleteCarte";

import type { Card } from "../lib/interfaces";
import ChangeCard from "./modules/ChangeCard";

interface CarteItemProps {
  card: Card;
  onReload: () => void;
  deckId: number;
}

export default function CarteItem({ deckId, card, onReload }: CarteItemProps) {
  const [isEditing, setIsEditing] = useState(false);

  return (
    <div className="relative w-48 rounded-2xl border border-border bg-cream p-4 shadow-sm flex flex-col gap-2 hover:shadow-md transition-shadow duration-200">
      {/* Action buttons */}
      <div className="absolute top-2 right-2 flex gap-1">
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="p-1 text-xs text-ink-muted bg-transparent border-none hover:bg-cream-dark rounded transition-colors"
        >
          ✏️
        </button>
        <Delete onReload={onReload} id={card.id} />
      </div>

      {isEditing ? (
        <ChangeCard
          card={card}
          deckId={deckId}
          onReload={onReload}
          setIsEditing={setIsEditing}
        />
      ) : (
        <div className="mt-4">
          <p className="font-serif font-semibold text-base text-ink text-center pb-2 mb-2 border-b border-border">
            {card.title}
          </p>
          <p className="text-sm text-amber-warm text-center italic">
            {card.translation}
          </p>
        </div>
      )}
    </div>
  );
}
