import type { Card } from "../../lib/interfaces";

interface CorrectionProps {
  currentCard: Card;
  answer: string;
  handleFail: () => void;
  handleSuccess: () => void;
}

export default function Correction({
  currentCard,
  answer,
  handleFail,
  handleSuccess,
}: CorrectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div className="bg-cream rounded-xl border border-border px-5 py-3">
        <p className="text-clear-warm italic font-serif text-xl m-0">
          {currentCard.translation}
        </p>
        {answer && (
          <p className="text-xs text-ink-muted mt-1.5">
            Votre réponse : <em>{answer}</em>
          </p>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={handleFail}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-red-deep hover:opacity-90 transition-opacity"
        >
          ✗ Raté
        </button>
        <button
          onClick={handleSuccess}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium text-white bg-green-deep hover:opacity-90 transition-opacity"
        >
          ✓ Réussi
        </button>
      </div>
    </div>
  );
}
