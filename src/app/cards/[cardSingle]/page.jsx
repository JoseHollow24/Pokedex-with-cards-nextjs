import CardInfo from "@/components/CardInfo";

async function loadCard(id) {
    // Endpoint directo — más rápido que ?q=id:
    const res = await fetch(`https://api.pokemontcg.io/v2/cards/${id}`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error(`Error al obtener la carta (${res.status})`);
    const data = await res.json();
    if (!data.data) throw new Error('Carta no encontrada');
    return data.data;
}

// Extrae el nombre base del Pokémon del nombre de la carta TCG
function extractBaseName(cardName) {
    return cardName
        .replace(/\s*&\s*.+/, '')
        .replace(/^M\s+/i, '')
        .replace(/[-\s]?(VMAX|VSTAR|VStar|GX|EX|ex|V\b|Break|BREAK|Prime|Star)\b.*/i, '')
        .trim()
        .toLowerCase();
}

export default async function SingleCardPage({ params, searchParams }) {
    const card = await loadCard(params.cardSingle);

    // Prioridad: ?q= del buscador → nombre base extraído de la carta
    const pokemonQuery = searchParams?.q ?? extractBaseName(card.name);

    return <CardInfo pokemon={card} pokemonQuery={pokemonQuery} />;
}
