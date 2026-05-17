export default async function addCarte(mot : string, traduction : string , deck_id : number) {
    const url = `https://learn-with-me-back.vercel.app/addcarte`;
    const response = await fetch(url, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            mot: mot,
            traduction: traduction,
            deck_id: deck_id
        })
    })
    const addCarte = await response.json();
    return addCarte;
}

export async function addDeck(name : string) {
    const url = 'https://learn-with-me-back.vercel.app/adddeck';
    const response = await fetch(url, {
        method : 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            name: name
        })
    })
    const addDeck = await response.json();
    return addDeck;
}