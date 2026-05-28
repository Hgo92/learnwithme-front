import { useState } from "react";
import { api } from "../../lib/api";
import useSnack from "../Snackbar";

interface AddProps {
  setIsVisible: React.Dispatch<React.SetStateAction<boolean>>;
  onReload: () => void;
}

export default function AddDeck({ setIsVisible, onReload }: AddProps) {
  const [name, setName] = useState("");
  const snackbar = useSnack();

  const newDeck = async (name: string) => {
    if (!name.trim()) {
      snackbar("Veuillez entrer un nom");
      return;
    }

    try {
      await api.createDeck({ title: name });
      setName("");
      setIsVisible(false);
      onReload();
      snackbar("Deck créé !");
    } catch (error) {
      snackbar("Erreur lors de la création du deck");
    }
  };
  return (
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
  );
}
