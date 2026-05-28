import { api } from "../../lib/api";
import useSnack from "../Snackbar";
import z from "zod";
import { languageList } from "../../assets/languageList";

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
    <div>
      <h2>Générer des cartes automatiquement</h2>
      <form onSubmit={handleClick}>
        <label htmlFor="count">Nombre de cartes</label>
        <input
          name="count"
          required
          type="number"
          min="1"
          max="99"
          step="1"
          placeholder="Le nombre de cartes souhaitées"
        />
        <label htmlFor="language">Langue</label>
        <select name="language" required>
          {languageList.map((language, index) => {
            return (
              <option key={index} value={language}>
                {language}
              </option>
            );
          })}
        </select>
        <label htmlFor="topic">Sujet (optionnel)</label>
        <input name="topic" placeholder="Un sujet particulier ?" />
        <button type="submit">Valider</button>
      </form>
    </div>
  );
}
