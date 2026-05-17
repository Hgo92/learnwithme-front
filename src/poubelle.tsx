// // App.tsx

// const [dataDecks, setDataDecks] = useState<dataDecksProps[]>([]);
// const [dataCartes, setDataCartes] = useState<dataCartesProps[]>([]);

// async function getDecks() {
//   const url = `https://learn-with-me-back.vercel.app/decks`;
//   const response = await fetch(url);
//   const data = await response.json();
//   setDataDecks(data);
// }

// const reloadDecks = async () => {
//   await getDecks();
// };

// useEffect(() => {
//   getDecks();
// }, []);

// async function getCartes() {
//   const url = `https://learn-with-me-back.vercel.app/cartes`;
//   const response = await fetch(url);
//   const data = await response.json();
//   setDataCartes(data);
// }

// useEffect(() => {
//   getCartes();
// }, []);

// const reloadCartes = async () => {
//   await getCartes();
// };
