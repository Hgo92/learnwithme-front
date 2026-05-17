import type { dataCartesProps } from "../App";
import CarteItem from "./CarteItem";

export interface CartesProps {
    dataCartes: dataCartesProps[];
    onReloadCartes: () => void;
}

export default function Carte({ dataCartes, onReloadCartes }: CartesProps) {
    return (
        <div className="flex flex-row flex-wrap gap-3 py-1">
            {dataCartes.map((carte) => (
                <CarteItem key={carte.id} carte={carte} onReloadCartes={onReloadCartes} />
            ))}
        </div>
    );
}