import type { Card } from "../../lib/interfaces";

interface CorrectionProps {
  isAnswerGood: boolean;
  currentCard: Card;
  answer: string;
  handleNext: () => void;
  handleBanWord: (id: number) => Promise<void>;
}

export default function Correction({
  isAnswerGood,
  currentCard,
  answer,
  handleNext,
  handleBanWord,
}: CorrectionProps) {
  return (
    <div className="flex flex-col gap-4">
      <div
        className={
          isAnswerGood
            ? "bg-green-400 rounded-xl border border-border px-5 py-3"
            : "bg-red-700 rounded-xl border border-border px-5 py-3"
        }
      >
        <p className="text-clear-warm italic font-serif text-xl m-0">
          {currentCard.translation}
        </p>
        {answer && (
          <p className="text-xs text-ink-soft mt-1.5">
            Votre réponse : <em>{answer}</em>
          </p>
        )}
      </div>
      <div className="flex gap-3">
        <button
          onClick={() => handleBanWord(currentCard.id)}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium text-black bg-cream hover:opacity-90 transition-opacity p-2"
        >
          Je ne veux plus voir ce mot
        </button>
        <button
          onClick={handleNext}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium text-black bg-cream hover:opacity-90 transition-opacity"
        >
          Question suivante
        </button>
      </div>
    </div>
  );
}
