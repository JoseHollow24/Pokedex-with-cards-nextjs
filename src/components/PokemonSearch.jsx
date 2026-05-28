'use client'
import i18n from '@/utils/i18n.js'
import { useState, useEffect, useRef } from "react"
import LoadingOverlay from '@/components/LoadingOverlay'

const searchCache = new Map();

export default function CardSearch( { onPokemonDataChange, initialQuery = '' } ) {
    const [pokemonName, setPokemonName] = useState(initialQuery);
    const [loading, setLoading] = useState(false);
    const autoSearched = useRef(false);

    useEffect(() => {
        if (initialQuery && !autoSearched.current) {
            autoSearched.current = true;
            searchPokemon(initialQuery);
        }
    }, [initialQuery]);

    const handleSubmit = (e) => {
        e.preventDefault()
        searchPokemon()
    }

    const searchPokemon = async (nameOverride) => {
        const nameToSearch = (nameOverride ?? pokemonName).trim().toLowerCase();
        if (!nameToSearch) {
            alert(`${i18n.t('formError')}`);
            return;
        }

        if (searchCache.has(nameToSearch)) {
            onPokemonDataChange(searchCache.get(nameToSearch));
            return;
        }

        try {
            setLoading(true);
            const [pokedexResponse, cardDexResponse] = await Promise.all([
                fetch(`https://pokeapi.co/api/v2/pokemon/${nameToSearch}`),
                fetch(`https://api.pokemontcg.io/v2/cards?q=name:${nameToSearch}&pageSize=24`)
            ]);
            const [dexData, cardsData] = await Promise.all([
                pokedexResponse.json(),
                cardDexResponse.json()
            ]);

            const result = { dex: dexData, card: cardsData };
            searchCache.set(nameToSearch, result);
            onPokemonDataChange(result);
        } catch (error) {
            alert(`${i18n.t('apiError')}`, error);
        } finally {
            setLoading(false);
        }
    }


    return (
        <>
        {loading && <LoadingOverlay />}
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
                    disabled={loading}
                    className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 active:bg-blue-800 mx-auto disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    {i18n.t('searchPokemon')}
                </button>
            </form>
        </div>
        </>
    )
}
