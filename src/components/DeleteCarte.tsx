import { useState } from "react";
import { api } from "../lib/api";

interface DeleteProps {
  id: number;
  onReload: () => void;
}

export default function Delete({ id, onReload }: DeleteProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleDeleteCarte = async (id: number) => {
    await api.deleteCard(id);
    onReload();
    setIsOpen(false);
  };

  return (
    <div>
      {isOpen ? (
        <div className="absolute inset-0 bg-cream/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3 p-4 z-10">
          <p className="text-sm text-ink font-medium text-center">
            Supprimer cette carte ?
          </p>
          <div className="flex gap-2">
            <button
              onClick={() => handleDeleteCarte(id)}
              className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-soft border border-border bg-transparent hover:bg-cream-dark transition-colors"
            >
              Oui
            </button>
            <button
              onClick={() => setIsOpen(false)}
              className="bg-gray-200 text-xs px-3 py-1 rounded-lg"
            >
              Annuler
            </button>
          </div>
        </div>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="p-1 text-xs text-ink-muted bg-transparent border-none hover:bg-cream-dark rounded transition-colors"
        >
          ✕
        </button>
      )}
    </div>
  );
}
