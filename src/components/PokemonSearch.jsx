'use client'
import i18n from '@/utils/i18n.js'
import { useState } from "react"

export default function CardSearch( { onPokemonDataChange } ) {
    const [pokemonName, setPokemonName] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault()
        searchPokemon()
    }

    const searchPokemon = async () => {
        if (pokemonName.trim() !== '') {
            try {
                const lowerCasePokemonName = pokemonName.toLowerCase();
                // Realiza la primera llamada a la API
                const pokedexResponse = await fetch (`https://pokeapi.co/api/v2/pokemon/${lowerCasePokemonName}`);
                const dexData = await pokedexResponse.json();

                // Realiza la segunda llamada a la API
                const cardDexResponse = await fetch (`https://api.pokemontcg.io/v2/cards?q=name:${lowerCasePokemonName}`);
                const cardsData = await cardDexResponse.json();
                
                onPokemonDataChange({dex: dexData, card: cardsData});
              } catch (error) {
                alert(`${i18n.t('apiError')}`, error);
              }
        }else (
            alert(`${i18n.t('formError')}`)
        )
    }


    return (
        <>
        <div>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text"
                    className="block border border-slate-400 border-rounded px-4 py-2 mb-2"
                    placeholder="Ingresa el pokémon"
                    value={pokemonName}
                    onChange={(e) => setPokemonName(e.target.value)}
                />
                <button 
                    type="submit"
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 active:bg-blue-800 mx-auto" 
                >
                    {i18n.t('searchPokemon')}
                </button>
            </form>
        </div>
        </>
    )
}
