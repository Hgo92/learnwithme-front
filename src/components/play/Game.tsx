import { useState } from "react";
import type { Card } from "../../lib/interfaces";
import Correction from "./Correction";
import Answer from "./Answer";
import { api } from "../../lib/api";

interface GameProps {
  cards: Card[];
  setIsStarted: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Game({ cards, setIsStarted }: GameProps) {
  const [isWordVisible, setIsWordVisible] = useState(false);
  const [randomIndex, setRandomIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [cartesRestantes, setCartesRestantes] = useState<Card[]>(cards);
  const [score, setScore] = useState(0);
  const [cartesJouees, setCartesJouees] = useState(0);
  const [lastResult, setLastResult] = useState<"success" | "fail" | null>(null);
  const [isAnswerGood, setIsAnswerGood] = useState(false);

  const nextCard = (cartesRestantes: Card[]) => {
    setRandomIndex(Math.floor(Math.random() * cartesRestantes.length));
    setIsWordVisible(false);
    setAnswer("");
    setLastResult(null);
  };

  const handleStart = () => {
    setCartesRestantes(cards);
    setScore(0);
    setCartesJouees(0);
    setRandomIndex(0);
    setLastResult(null);
  };
  const handleSuccess = () => {
    setCartesJouees((j) => j + 1);
    setLastResult("success");
    setScore((s) => s + 1);
    const newCartes = cartesRestantes.filter((_, i) => i !== randomIndex);
    setCartesRestantes(newCartes);
    nextCard(newCartes);
  };

  const handleFail = () => {
    setCartesJouees((j) => j + 1);
    setLastResult("fail");
    nextCard(cartesRestantes);
  };

  const handleNext = () => {
    isAnswerGood ? handleSuccess() : handleFail();
  };

  const handleBanWord = async (id: number) => {
    await api.archivedCard(id);
    isAnswerGood ? handleSuccess() : handleFail();
  };

  const currentCard = cartesRestantes[randomIndex];

  const cardBorderClass =
    lastResult === "success"
      ? "border-green-deep"
      : lastResult === "fail"
        ? "border-red-deep"
        : "border-border";

  return currentCard ? (
    <div className="w-full max-w-md flex flex-col gap-5">
      <div className="flex justify-between text-xs text-ink-muted">
        <span>
          {cartesRestantes.length} carte
          {cartesRestantes.length > 1 ? "s" : ""} restante
          {cartesRestantes.length > 1 ? "s" : ""}
        </span>
        {cartesJouees > 0 && (
          <span className="text-indigo-deep font-medium">
            Score : {score}/{cartesJouees}
          </span>
        )}
      </div>

      <div
        className={`bg-white rounded-2xl border-2 ${cardBorderClass} shadow-md p-8 flex flex-col gap-5 text-center transition-colors duration-300`}
      >
        <div>
          <p className="text-xs text-ink-muted uppercase tracking-widest mb-2">
            Traduisez
          </p>
          <h2 className="font-serif text-4xl text-ink">{currentCard.title}</h2>
        </div>

        {isWordVisible ? (
          <Correction
            isAnswerGood={isAnswerGood}
            currentCard={currentCard}
            answer={answer}
            handleNext={handleNext}
            handleBanWord={handleBanWord}
          />
        ) : (
          <Answer
            setIsAnswerGood={setIsAnswerGood}
            currentCard={currentCard}
            answer={answer}
            setAnswer={setAnswer}
            setIsWordVisible={setIsWordVisible}
          />
        )}
      </div>
    </div>
  ) : (
    <div className="flex flex-col items-center gap-6 text-center max-w-sm">
      <div className="w-16 h-16 rounded-full bg-indigo-pale flex items-center justify-center text-3xl">
        🎉
      </div>
      <div>
        <h2 className="font-serif text-3xl text-ink mb-2">Terminé !</h2>
        <p className="text-ink-muted">
          Score final :{" "}
          <span className="text-indigo-deep font-semibold">
            {score}/{cartesJouees}
          </span>
        </p>
      </div>
      <div className="flex gap-3 flex-wrap justify-center">
        <button
          onClick={handleStart}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-white bg-indigo-deep hover:bg-[#6366f1] transition-colors"
        >
          Rejouer ce deck
        </button>
        <button
          onClick={() => setIsStarted(false)}
          className="px-5 py-2.5 rounded-xl text-sm font-medium text-ink-soft border border-border bg-transparent hover:bg-cream-dark transition-colors"
        >
          Changer de deck
        </button>
      </div>
    </div>
  );
}
