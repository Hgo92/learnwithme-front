import type { Card, Deck } from "../lib/interfaces";

const apiURL = "http://localhost:3000";

export const api = {
  getDecks: async (): Promise<Deck[]> => {
    const res = await fetch(`${apiURL}/decks`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des decks");
    return res.json();
  },

  getCards: async (): Promise<Card[]> => {
    const res = await fetch(`${apiURL}/cards`, {
      credentials: "include",
    });
    if (!res.ok) throw new Error("Erreur lors de la récupération des cartes");
    return res.json();
  },

  createDeck: async (newDeck: Pick<Deck, "title">): Promise<Deck> => {
    const res = await fetch(`${apiURL}/decks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newDeck),
    });
    if (!res.ok) throw new Error("Erreur lors de la création du deck");
    return res.json();
  },

  createCard: async (newCard: Omit<Card, "id">): Promise<Card> => {
    const res = await fetch(`${apiURL}/cards`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newCard),
    });
    if (!res.ok) throw new Error("Erreur lors de la création de la carte");
    return res.json();
  },
};
