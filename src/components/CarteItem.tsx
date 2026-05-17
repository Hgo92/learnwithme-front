import { useState } from "react";
import Delete from "./DeleteCarte";
import type { dataCartesProps } from "../App";
import changeCarte from "./modules/ChangeModule";

interface CarteItemProps {
    carte: dataCartesProps;
    onReloadCartes: () => void;
}

export default function CarteItem({ carte, onReloadCartes }: CarteItemProps) {
    const [isEditing, setIsEditing] = useState(false);
    const [newMot, setNewMot] = useState(carte.mot);
    const [newTrad, setNewTrad] = useState(carte.traduction);

    const handleValidateChange = async (mot: string, trad: string, id: number) => {
        await changeCarte(mot, trad, id);
        setIsEditing(false);
        onReloadCartes();
    };

    const inputClass = "w-full border-[1.5px] border-border rounded-lg px-3 py-1.5 text-sm text-center bg-white text-ink placeholder-ink-muted focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20";

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
                <Delete onReloadCartes={onReloadCartes} id={carte.id} />
            </div>

            {isEditing ? (
                <div className="flex flex-col gap-2 mt-5">
                    <input
                        defaultValue={carte.mot}
                        onChange={e => setNewMot(e.target.value)}
                        className={inputClass}
                        autoFocus
                    />
                    <input
                        defaultValue={carte.traduction}
                        onChange={e => setNewTrad(e.target.value)}
                        className={inputClass}
                    />
                    <button
                        onClick={() => handleValidateChange(newMot, newTrad, carte.id)}
                        className="w-full py-1.5 rounded-lg text-xs font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors"
                    >
                        Valider
                    </button>
                </div>
            ) : (
                <div className="mt-4">
                    <p className="font-serif font-semibold text-base text-ink text-center pb-2 mb-2 border-b border-border">
                        {carte.mot}
                    </p>
                    <p className="text-sm text-amber-warm text-center italic">
                        {carte.traduction}
                    </p>
                </div>
            )}
        </div>
    );
}