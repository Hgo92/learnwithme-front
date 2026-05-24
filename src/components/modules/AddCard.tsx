import { useState } from "react";
import { api } from "../../lib/api";
import { useSnackbar } from "notistack";

interface AddProps {
  deckId: number;
  onReload: () => void;
  setIsAddingCard: (value: boolean) => void;
}

export default function AddCard({
  deckId,
  onReload,
  setIsAddingCard,
}: AddProps) {
  const [mot, setMot] = useState("");
  const [trad, setTrad] = useState("");
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleNewCarte = async (mot: string, trad: string, deck_id: number) => {
    await api.createCard({ title: mot, translation: trad, deckId: deck_id });
    setMot("");
    setTrad("");
    onReload();
    setIsAddingCard(false);
    enqueueSnackbar("Carte ajoutée !");
  };

  const inputClass =
    "border-[1.5px] border-border rounded-lg px-3 py-2 text-sm bg-white text-ink placeholder-ink-muted focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20";
  return (
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
        onClick={() => handleNewCarte(mot, trad, deckId)}
        className="px-4 py-2 rounded-lg text-sm font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors"
      >
        Ajouter
      </button>
      <button
        onClick={() => setIsAddingCard(false)}
        className="px-4 py-2 rounded-lg text-sm font-medium text-ink-muted border border-border bg-transparent hover:bg-cream-dark transition-colors"
      >
        Annuler
      </button>
    </div>
  );
}
