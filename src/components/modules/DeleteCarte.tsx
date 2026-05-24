import { useState } from "react";
import { api } from "../../lib/api";
import { useSnackbar } from "notistack";

interface DeleteProps {
  id: number;
  onReload: () => void;
}

export default function Delete({ id, onReload }: DeleteProps) {
  const [isOpen, setIsOpen] = useState(false);
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  const handleDeleteCarte = async (id: number) => {
    await api.deleteCard(id);
    onReload();
    setIsOpen(false);
    enqueueSnackbar("Carte supprimée !");
  };

  return (
    <div>
      {isOpen ? (
        <div className="absolute bg-white border border-border backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3 p-4 z-10">
          <span className="text-sm text-ink font-medium text-center">
            Supprimer cette carte ?
          </span>
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
