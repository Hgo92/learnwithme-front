import { api } from "../../lib/api";
import useSnack from "../Snackbar";
import z from "zod";

interface GenerateProps {
  existingCards: string;
  onReload: () => void;
  deckId: number;
  isModalOpen: (value: boolean) => void;
}

export default function GenerateCard({
  existingCards,
  deckId,
  onReload,
  isModalOpen,
}: GenerateProps) {
  const schema = z.object({
    count: z.coerce.number(),
    language: z.string().trim(),
    topic: z.string().trim().optional(),
  });

  const snackbar = useSnack();

  const handleClick = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const count = (form.elements.namedItem("count") as HTMLInputElement).value;
    const language = (form.elements.namedItem("language") as HTMLInputElement)
      .value;
    const topic = (form.elements.namedItem("topic") as HTMLInputElement).value;

    const validatePrompt = schema.safeParse({
      count: count,
      language: language,
      topic: topic,
    });
    if (!validatePrompt.success) {
      snackbar("Il y a eu une erreur lors de la génération des cartes !");
    } else {
      const { error: generateError } = await api.generateCard({
        ...validatePrompt.data,
        deckId: deckId,
        existingCards: existingCards,
      });
      if (generateError) {
        snackbar("Il y a eu une erreur lors de la génération des cartes !");
      }
      snackbar("Les cartes ont été générées !");
      onReload();
      isModalOpen(false);
    }
  };

  return (
    <div className="mt-3 w-full rounded-xl border border-border bg-cream p-5">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-2 h-2 rounded-full bg-indigo-deep shrink-0" />
        <h2 className="font-serif text-lg text-ink">
          Générer des cartes automatiquement
        </h2>
      </div>

      <form className="flex flex-col gap-4" onSubmit={handleClick}>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="count"
            className="text-xs text-ink-muted tracking-widest uppercase"
          >
            Nombre de cartes
          </label>
          <input
            name="count"
            required
            type="number"
            min="1"
            max="99"
            step="1"
            placeholder="Le nombre de cartes souhaitées"
            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-indigo-pale"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            htmlFor="language"
            className="text-xs text-ink-muted tracking-widest uppercase"
          >
            Langue
          </label>
          <input
            name="language"
            required
            placeholder="Ex : Anglais, Espagnol…"
            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-indigo-pale"
          />
        </div>
        <div className="flex flex-col gap-1">
          <label
            className="text-xs text-ink-muted tracking-widest uppercase"
            htmlFor="topic"
          >
            Sujet <span className="normal-case">(optionnel)</span>
          </label>
          <input
            className="w-full px-3 py-2 rounded-lg border border-border bg-white text-sm text-ink placeholder:text-ink-muted focus:outline-none focus:ring-2 focus:ring-indigo-pale"
            name="topic"
            placeholder="Un sujet particulier ?"
          />
        </div>
        <div className="flex gap-2 pt-1">
          <button
            type="button"
            onClick={() => isModalOpen(false)}
            className="flex-1 py-2 rounded-lg text-sm font-medium text-ink-soft border border-border bg-white hover:bg-cream-dark transition-colors"
          >
            Annuler
          </button>
          <button
            type="submit"
            className="flex-1 py-2 rounded-lg text-sm font-medium text-cream bg-ink hover:bg-ink-soft transition-colors"
          >
            Générer
          </button>
        </div>
      </form>
    </div>
  );
}
