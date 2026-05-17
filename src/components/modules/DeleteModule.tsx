export default async function deleteCarte(carteId : number) {
    const url = 'https://learn-with-me-back.vercel.app/deletecarte';
    const response = await fetch(url, {
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: carteId
        })
    })
    const deleteCarte = await response.json();
    return deleteCarte;
}

export async function DeleteDeckModule(deckId: number) {
    try {
    const url = 'https://learn-with-me-back.vercel.app/deletedeck';
    const response = await fetch(url, {
        method : 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: deckId
        })
    })
    const deleteDesk = await response.json();
    return deleteDesk;
    } catch (error) {
        console.error("Erreur suppression desk :", error);
    }
}
