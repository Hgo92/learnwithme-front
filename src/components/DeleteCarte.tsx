import { useState } from "react";
import DeleteCarte from "./modules/DeleteModule";

interface DeleteProps {
    id: number,
    onReloadCartes:() => void
}

export default function Delete({id, onReloadCartes} : DeleteProps) {
    const [confirmId, setConfirmId] = useState<number | null>(null);

    const handleDeleteCarte = async (id: number) => {
    await DeleteCarte(id);
    onReloadCartes();
    setConfirmId(null);
    }

    return (
        <div>{confirmId === id ? (
                <div className="absolute inset-0 bg-cream/95 backdrop-blur-sm rounded-2xl flex flex-col items-center justify-center gap-3 p-4 z-10">
                <p className="text-sm text-ink font-medium text-center">Supprimer cette carte ?</p>
             <div className="flex gap-2">
            <button onClick={() => handleDeleteCarte(id)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-soft border border-border bg-transparent hover:bg-cream-dark transition-colors">Oui</button>
            <button onClick={() => setConfirmId(null)} className="bg-gray-200 text-xs px-3 py-1 rounded-lg">Non</button>
        </div>
    </div>
) : (
    <button onClick={() => setConfirmId(id)} className="p-1 text-xs text-ink-muted bg-transparent border-none hover:bg-cream-dark rounded transition-colors">✕</button>
)}</div>
    )
}