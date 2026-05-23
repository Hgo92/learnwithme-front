import type { Card } from "../lib/interfaces";
import CarteItem from "./CarteItem";

export interface CartesProps {
  dataCartes: Card[];
  onReload: () => void;
  deckId: number;
}

export default function Carte({ deckId, dataCartes, onReload }: CartesProps) {
  return (
    <div className="flex flex-row flex-wrap gap-3 py-1">
      {dataCartes
        .sort(
          (a, b) =>
            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
        )
        .map((card) => (
          <CarteItem
            key={card.id}
            deckId={deckId}
            card={card}
            onReload={onReload}
          />
        ))}
    </div>
  );
}
