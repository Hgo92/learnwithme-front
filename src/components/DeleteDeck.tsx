import { useState } from "react";
import { DeleteDeckModule } from "./modules/DeleteModule";

interface DeleteDeckProps {
    id : number,
    onReloadDecks : () => void
}

export default function DeleteDeck({id, onReloadDecks} : DeleteDeckProps) {
const [confirmId, setConfirmId] = useState<number | null>(null);
 
const handleDeleteDeck = async (id: number) => {
    await DeleteDeckModule(id);
    onReloadDecks();
    setConfirmId(null);
    }
    
return (
        <div className="relative">{confirmId === id ? (
                <div className="absolute top-1/2 right-0 -translate-y-1/2 z-20 flex items-center gap-3 bg-white border border-border rounded-xl shadow-lg px-4 py-3 whitespace-nowrap">
                <span className="text-sm text-ink font-medium">Supprimer ce deck ?</span>
            <button onClick={() => handleDeleteDeck(id)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-white bg-red-deep hover:bg-red-700 transition-colors">Oui</button>
            <button onClick={() => setConfirmId(null)} className="px-3 py-1.5 rounded-lg text-xs font-medium text-ink-soft border border-border bg-transparent hover:bg-cream-dark transition-colors">Non</button>
        
    </div>
) : (
    <button onClick={() => setConfirmId(id)} className="p-1.5 rounded-lg text-ink-muted hover:bg-cream-dark transition-colors bg-transparent border-none text-base">🗑️</button>
)}</div>
    )
}