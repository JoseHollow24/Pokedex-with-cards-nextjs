import PokemonInfo from "@/components/PokemonInfo";

async function loadPokemon(id) {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${id}`, {
        next: { revalidate: 3600 }
    });
    if (!res.ok) throw new Error(`Pokémon no encontrado (${res.status})`);
    return res.json();
}

export default async function SinglePokemonPage({ params }) {
    const pokemon = await loadPokemon(params.pokemonSingle);
    return <PokemonInfo pokemon={pokemon} />;
}
