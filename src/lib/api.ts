import type { Card, Deck } from "../lib/interfaces";

export const api = {
  getDecks: async (): Promise<Deck[]> => {
    const res = await fetch("http://localhost:3000/decks", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des decks");
    return res.json();
  },

  getCards: async (): Promise<Card[]> => {
    const res = await fetch("http://localhost:3000/cards", {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des cartes");
    return res.json();
  },
};
