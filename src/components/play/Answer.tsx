import type { Card } from "../../lib/interfaces";

interface AnswerProps {
  currentCard: Card;
  answer: string;
  setAnswer: React.Dispatch<React.SetStateAction<string>>;
  setIsWordVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setIsAnswerGood: React.Dispatch<React.SetStateAction<boolean>>;
}

const inputClass =
  "w-full border-[1.5px] border-border rounded-lg px-3 py-2 text-sm text-center bg-white text-ink placeholder-ink-muted focus:outline-none focus:border-[#6366f1] focus:ring-2 focus:ring-[#6366f1]/20";

export default function Answer({
  currentCard,
  answer,
  setIsAnswerGood,
  setAnswer,
  setIsWordVisible,
}: AnswerProps) {
  const handleAnswer = () => {
    setIsWordVisible(true);
    answer.trim().toLowerCase() == currentCard.translation.trim().toLowerCase()
      ? setIsAnswerGood(true)
      : setIsAnswerGood(false);
  };

  return (
    <div className="flex flex-col gap-3">
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        onKeyDown={(e) => e.key === "Enter" && handleAnswer()}
        placeholder="Votre réponse..."
        autoFocus
        className={inputClass}
      />
      {}
      <div className="flex gap-2">
        <button
          onClick={() => handleAnswer()}
          className="flex-2 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors"
        >
          Valider
        </button>
        <button
          onClick={() => {
            setIsWordVisible(true);
            setIsAnswerGood(false);
          }}
          className="flex-1 py-2.5 rounded-xl text-sm font-medium text-ink-muted border border-border bg-transparent hover:bg-cream-dark transition-colors"
        >
          Je ne sais pas
        </button>
      </div>
    </div>
  );
}
