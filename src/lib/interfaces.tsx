export type Deck = {
  id: number;
  title: string;
  cards?: Card[];
  userId: string;
  updatedAt: Date;
  createdAt: Date;
};

export type Card = {
  id: number;
  title: string;
  translation: string;
  deckId: number;
  userId: string;
};
