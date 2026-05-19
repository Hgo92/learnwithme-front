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

  createCard: async (
    newCard: Pick<Card, "title" | "translation" | "deckId">,
  ): Promise<Card> => {
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

  updateDeck: async (title: string, id: number): Promise<Deck> => {
    const res = await fetch(`${apiURL}/decks/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ title: title }),
    });
    if (!res.ok) throw new Error("Erreur lors de la modification du deck");
    return res.json();
  },

  updateCard: async (
    newCard: Pick<Card, "title" | "translation" | "deckId">,
    id: number,
  ): Promise<Card> => {
    const res = await fetch(`${apiURL}/cards/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(newCard),
    });
    if (!res.ok) throw new Error("Erreur lors de la modification de la carte");
    return res.json();
  },
};
