import { useState } from "react";
import { api } from "../../lib/api";
import type { Card } from "../../lib/interfaces";
import { useSnackbar } from "notistack";

interface ChangeCardProps {
  card: Card;
  onReload: () => void;
  setIsEditing: (value: boolean) => void;
  deckId: number;
}

export default function ChangeCard({
  card,
  deckId,
  onReload,
  setIsEditing,
}: ChangeCardProps) {
  const [newMot, setNewMot] = useState(card.title);
  const [newTrad, setNewTrad] = useState(card.translation);
  const [archived, setArchived] = useState(card.isArchived);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleValidateChange = async (
    mot: string,
    trad: string,
    archived: boolean,
    id: number,
  ) => {
    const newCard = {
      title: mot,
      translation: trad,
      isArchived: archived,
      deckId: deckId,
    };
    api.updateCard(newCard, id);
    onReload();
    setIsEditing(false);
    enqueueSnackbar("Carte modifiée !");
    setTimeout(() => {
      closeSnackbar();
    }, 4000);
  };

  const inputClass =
    "w-full border-[1.5px] border-border rounded-lg px-3 py-1.5 text-sm text-center bg-white text-ink placeholder-ink-muted focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20";
  return (
    <div className="flex flex-col gap-2 mt-5">
      <input
        defaultValue={card.title}
        onChange={(e) => setNewMot(e.target.value)}
        className={inputClass}
        autoFocus
      />
      <input
        defaultValue={card.translation}
        onChange={(e) => setNewTrad(e.target.value)}
        className={inputClass}
      />
      <div className="flex flex-row gap-2 align-middle justify-center">
        <label>Carte archivée ?</label>
        <input
          type="checkbox"
          checked={archived}
          onChange={() => setArchived(!archived)}
        />
      </div>
      <button
        onClick={() => handleValidateChange(newMot, newTrad, archived, card.id)}
        className="w-full py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors"
      >
        Valider
      </button>
    </div>
  );
}
