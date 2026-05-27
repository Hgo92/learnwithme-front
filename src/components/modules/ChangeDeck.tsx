import { useState } from "react";
import type { Deck } from "../../lib/interfaces";
import { api } from "../../lib/api";
import useSnack from "../Snackbar";

interface DeckProps {
  deck: Deck;
  onReload: () => void;
  setIsEditing: (value: boolean) => void;
}

export default function ChangeDeck({
  deck,
  onReload,
  setIsEditing,
}: DeckProps) {
  const [newName, setNewName] = useState(deck.title);
  const snackbar = useSnack();

  const handleValidateChange = async (newName: string, id: number) => {
    await api.updateDeck(newName, id);
    setNewName("");
    onReload();
    setIsEditing(false);
    snackbar("Deck modifié !");
  };

  const inputClass =
    "border-[1.5px] border-border rounded-lg px-3 py-2 text-sm bg-white text-ink placeholder-ink-muted focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20";

  return (
    <div className="flex gap-2 items-center flex-1">
      <input
        defaultValue={deck.title}
        onChange={(e) => setNewName(e.target.value)}
        onKeyDown={(e) =>
          e.key === "Enter" && handleValidateChange(newName, deck.id)
        }
        autoFocus
        className={`${inputClass} max-w-xs`}
      />
      <button
        onClick={() => handleValidateChange(newName, deck.id)}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors"
      >
        Valider
      </button>
      <button
        onClick={() => setIsEditing(false)}
        className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-muted border border-border bg-transparent hover:bg-cream-dark transition-colors"
      >
        Annuler
      </button>
    </div>
  );
}
