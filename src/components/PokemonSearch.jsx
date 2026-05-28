'use client'
import i18n from '@/utils/i18n.js'
import { useState, useEffect, useRef } from "react"

const searchCache = new Map();

export default function PokemonSearch({ onPokemonDataChange, initialQuery = '' }) {
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
        e.preventDefault();
        searchPokemon();
    };

    const searchPokemon = async (nameOverride) => {
        const nameToSearch = (nameOverride ?? pokemonName).trim().toLowerCase();
        if (!nameToSearch) {
            alert(i18n.t('formError'));
            return;
        }

        if (searchCache.has(nameToSearch)) {
            onPokemonDataChange(searchCache.get(nameToSearch));
            return;
        }

        try {
            setLoading(true);

            // Ambas peticiones arrancan en paralelo
            const dexFetch   = fetch(`https://pokeapi.co/api/v2/pokemon/${nameToSearch}`);
            const cardsFetch = fetch(`https://api.pokemontcg.io/v2/cards?q=name:${nameToSearch}&pageSize=250`);

            // Mostramos datos del Pokémon en cuanto PokeAPI responde (más rápido)
            const dexRes = await dexFetch;
            if (!dexRes.ok) throw new Error(i18n.t('apiError'));
            const dexData = await dexRes.json();

            onPokemonDataChange({ dex: dexData, card: null }); // resultado parcial
            setLoading(false);

            // Las cartas llegan cuando la TCG API termina (en paralelo desde el inicio)
            const cardsRes  = await cardsFetch;
            const cardsData = await cardsRes.json();

            const result = { dex: dexData, card: cardsData };
            searchCache.set(nameToSearch, result);
            onPokemonDataChange(result); // resultado completo

        } catch {
            setLoading(false);
            alert(i18n.t('apiError'));
        }
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-3">
            <input
                type="text"
                className="w-full bg-slate-800 border border-slate-600 text-white placeholder-slate-500 font-mono rounded-lg px-4 py-3 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500/30 transition-colors text-sm"
                placeholder="Nombre del Pokémon..."
                value={pokemonName}
                onChange={(e) => setPokemonName(e.target.value)}
            />
            <button
                type="submit"
                disabled={loading}
                className="w-full bg-red-600 text-white font-bold py-2.5 px-4 rounded-lg hover:bg-red-500 active:bg-red-700 transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm uppercase tracking-widest flex items-center justify-center gap-2"
            >
                {loading && (
                    <svg className="animate-spin h-4 w-4 shrink-0" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"/>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z"/>
                    </svg>
                )}
                {loading ? 'Buscando...' : i18n.t('searchPokemon')}
            </button>
        </form>
    );
}
