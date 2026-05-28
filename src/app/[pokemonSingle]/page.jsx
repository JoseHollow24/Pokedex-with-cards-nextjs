import i18n from '@/utils/i18n.js'
import PokemonInfo from "@/components/PokemonInfo";

async function loadPokemon(id) {
    const res = await fetch (`https://pokeapi.co/api/v2/pokemon/${id}?language=es`);
    const data = await res.json();
    return data;
}

export default async function SinglePokemonPage( { params }) {

   const singlePokemon = await loadPokemon(params.pokemonSingle);

    return(
        <>
            <div className="container m-auto pt-16">
                <h1 className="text-center text-3xl" >{i18n.t('detailsPageTitle')}</h1>
                <PokemonInfo pokemon={singlePokemon}/>
            </div>
        </>
    )
}