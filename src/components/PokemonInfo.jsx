'use client'
import i18n from '@/utils/i18n.js'
import { useState } from "react"
import PokemonTypes from "./PokemonTypes";
import BackButton from "./BackButton";
import Image from 'next/image';

const STAT_COLORS = {
    'hp':              'bg-green-500',
    'attack':          'bg-red-500',
    'defense':         'bg-blue-500',
    'special-attack':  'bg-purple-500',
    'special-defense': 'bg-cyan-400',
    'speed':           'bg-yellow-400',
};

const STAT_LABELS = {
    'hp':              'HP',
    'attack':          'ATK',
    'defense':         'DEF',
    'special-attack':  'SP.ATK',
    'special-defense': 'SP.DEF',
    'speed':           'VEL',
};

// Colores oficiales de cada versión y su generación
const GAME_VERSIONS = {
    'red':              { label: 'Red',            color: '#C92932', gen: 'I'    },
    'blue':             { label: 'Blue',           color: '#1C57B0', gen: 'I'    },
    'yellow':           { label: 'Yellow',         color: '#C8A300', gen: 'I'    },
    'gold':             { label: 'Gold',           color: '#B8860B', gen: 'II'   },
    'silver':           { label: 'Silver',         color: '#607D8B', gen: 'II'   },
    'crystal':          { label: 'Crystal',        color: '#0891B2', gen: 'II'   },
    'ruby':             { label: 'Ruby',           color: '#A61C00', gen: 'III'  },
    'sapphire':         { label: 'Sapphire',       color: '#1E3A8A', gen: 'III'  },
    'firered':          { label: 'FireRed',        color: '#C2410C', gen: 'III'  },
    'leafgreen':        { label: 'LeafGreen',      color: '#166534', gen: 'III'  },
    'emerald':          { label: 'Emerald',        color: '#047857', gen: 'III'  },
    'diamond':          { label: 'Diamond',        color: '#0369A1', gen: 'IV'   },
    'pearl':            { label: 'Pearl',          color: '#9D174D', gen: 'IV'   },
    'platinum':         { label: 'Platinum',       color: '#475569', gen: 'IV'   },
    'heartgold':        { label: 'HeartGold',      color: '#B45309', gen: 'IV'   },
    'soulsilver':       { label: 'SoulSilver',     color: '#64748B', gen: 'IV'   },
    'black':            { label: 'Black',          color: '#1C1917', gen: 'V'    },
    'white':            { label: 'White',          color: '#78716C', gen: 'V'    },
    'black-2':          { label: 'Black 2',        color: '#292524', gen: 'V'    },
    'white-2':          { label: 'White 2',        color: '#A8A29E', gen: 'V'    },
    'x':                { label: 'X',              color: '#1D4ED8', gen: 'VI'   },
    'y':                { label: 'Y',              color: '#B91C1C', gen: 'VI'   },
    'omega-ruby':       { label: 'Omega Ruby',     color: '#9A3412', gen: 'VI'   },
    'alpha-sapphire':   { label: 'Alpha Sapphire', color: '#1E40AF', gen: 'VI'   },
    'sun':              { label: 'Sun',            color: '#B45309', gen: 'VII'  },
    'moon':             { label: 'Moon',           color: '#1E3A8A', gen: 'VII'  },
    'ultra-sun':        { label: 'Ultra Sun',      color: '#92400E', gen: 'VII'  },
    'ultra-moon':       { label: 'Ultra Moon',     color: '#1E3799', gen: 'VII'  },
    'lets-go-pikachu':  { label: "Let's Go Pikachu", color: '#CA8A04', gen: 'VII' },
    'lets-go-eevee':    { label: "Let's Go Eevee",   color: '#92400E', gen: 'VII' },
    'sword':            { label: 'Sword',          color: '#0369A1', gen: 'VIII' },
    'shield':           { label: 'Shield',         color: '#9F1239', gen: 'VIII' },
    'the-isle-of-armor':{ label: 'Isle of Armor',  color: '#0369A1', gen: 'VIII' },
    'the-crown-tundra': { label: 'Crown Tundra',   color: '#334155', gen: 'VIII' },
    'brilliant-diamond':{ label: 'Brill. Diamond', color: '#075985', gen: 'VIII' },
    'shining-pearl':    { label: 'Shining Pearl',  color: '#831843', gen: 'VIII' },
    'legends-arceus':   { label: 'Legends: Arceus',color: '#1E3A8A', gen: 'VIII' },
    'scarlet':          { label: 'Scarlet',        color: '#991B1B', gen: 'IX'   },
    'violet':           { label: 'Violet',         color: '#5B21B6', gen: 'IX'   },
};

const GEN_ORDER = ['I', 'II', 'III', 'IV', 'V', 'VI', 'VII', 'VIII', 'IX'];

function GameBadge({ version }) {
    const data = GAME_VERSIONS[version];
    if (!data) return null;
    return (
        <span
            className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold text-white shadow-sm select-none"
            style={{ backgroundColor: data.color }}
        >
            {data.label}
        </span>
    );
}

function GamesSection({ gameIndices }) {
    if (!gameIndices?.length) return null;

    const versionNames = gameIndices.map(gi => gi.version.name);

    // Agrupar por generación en orden cronológico
    const byGen = GEN_ORDER.reduce((acc, gen) => {
        const games = versionNames.filter(v => GAME_VERSIONS[v]?.gen === gen);
        if (games.length) acc.push({ gen, games });
        return acc;
    }, []);

    // Versiones desconocidas al final
    const unknown = versionNames.filter(v => !GAME_VERSIONS[v]);

    if (!byGen.length && !unknown.length) return null;

    return (
        <div className="screen-panel rounded-2xl border border-slate-700 p-5 mt-5">
            <h3 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">
                Aparece en
            </h3>
            <div className="flex flex-col gap-3">
                {byGen.map(({ gen, games }) => (
                    <div key={gen} className="flex items-start gap-3">
                        <span className="text-slate-600 text-xs font-mono pt-1 w-8 shrink-0 text-right">
                            {gen}
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                            {games.map(v => <GameBadge key={v} version={v} />)}
                        </div>
                    </div>
                ))}
                {unknown.length > 0 && (
                    <div className="flex items-start gap-3">
                        <span className="text-slate-600 text-xs font-mono pt-1 w-8 shrink-0 text-right">—</span>
                        <div className="flex flex-wrap gap-1.5">
                            {unknown.map(v => (
                                <span key={v} className="inline-flex items-center px-2.5 py-1 rounded-md text-xs font-bold text-white bg-slate-600">
                                    {v}
                                </span>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default function PokemonInfo( { pokemon } ) {
    const [isShiny, setIsShiny] = useState(false);

    const homeArtD = pokemon.sprites.other?.home?.front_default ?? null;
    const homeArtS = pokemon.sprites.other?.home?.front_shiny  ?? null;

    const spriteFrontD = pokemon.sprites.front_default ?? null;
    const spriteBackD  = pokemon.sprites.back_default  ?? null;
    const showFrontD   = pokemon.sprites.other?.showdown?.front_default ?? null;
    const showBackD    = pokemon.sprites.other?.showdown?.back_default  ?? null;

    const spriteFrontS = pokemon.sprites.front_shiny ?? null;
    const spriteBackS  = pokemon.sprites.back_shiny  ?? null;
    const showFrontS   = pokemon.sprites.other?.showdown?.front_shiny ?? null;
    const showBackS    = pokemon.sprites.other?.showdown?.back_shiny  ?? null;

    const officialArt = pokemon.sprites.other?.['official-artwork']?.front_default ?? null;

    const currentArt   = (isShiny ? homeArtS   : homeArtD)   ?? officialArt ?? spriteFrontD;
    const currentFront = isShiny ? spriteFrontS : spriteFrontD;
    const currentBack  = isShiny ? spriteBackS  : spriteBackD;
    const currentShowF = isShiny ? showFrontS   : showFrontD;
    const currentShowB = isShiny ? showBackS    : showBackD;

    return (
        <div className="min-h-screen bg-slate-950 pb-12">
            <div className="container mx-auto px-4 max-w-4xl">

                {/* Header Banner */}
                <div className="bg-red-700 border-b-4 border-red-900 rounded-b-2xl px-6 pt-4 pb-5 mb-6 shadow-xl">
                    <BackButton fallbackHref={`/?q=${encodeURIComponent(pokemon.name)}`} />
                    <div className="mt-3 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
                        <div>
                            <p className="text-red-300 text-xs font-mono uppercase tracking-widest mb-1">
                                #{String(pokemon.order).padStart(3, '0')}
                            </p>
                            <h1 className="text-white font-black text-4xl capitalize drop-shadow">
                                {pokemon.name}
                            </h1>
                        </div>
                        <PokemonTypes pokemonTypes={pokemon.types} />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                    {/* Left Column: Images */}
                    <div className="flex flex-col gap-4">

                        {/* Main Artwork */}
                        <div className="screen-panel rounded-2xl border border-slate-700 p-5 relative overflow-hidden flex items-center justify-center min-h-72">
                            <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-slate-600"></div>
                            <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-slate-600"></div>
                            <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-slate-600"></div>
                            <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-slate-600"></div>
                            {currentArt
                                ? <Image
                                    src={currentArt}
                                    alt={pokemon.name}
                                    width="300"
                                    height="300"
                                    className="drop-shadow-2xl"
                                  />
                                : <div className="w-48 h-48 flex items-center justify-center text-slate-700 text-6xl select-none">?</div>
                            }
                        </div>

                        {/* Sprites Strip */}
                        <div className="screen-panel rounded-xl border border-slate-700 p-4">
                            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-3 text-center">
                                Sprites
                            </p>
                            <div className="flex items-center justify-around">
                                {currentFront && <Image src={currentFront} alt={pokemon.name} width="64" height="64" className="w-auto" />}
                                {currentBack  && <Image src={currentBack}  alt={pokemon.name} width="64" height="64" className="w-auto" />}
                                {currentShowF && <Image src={currentShowF} alt={pokemon.name} width="64" height="64" className="w-auto" />}
                                {currentShowB && <Image src={currentShowB} alt={pokemon.name} width="64" height="64" className="w-auto" />}
                            </div>
                        </div>

                        {/* Shiny Toggle */}
                        <button
                            onClick={() => setIsShiny(!isShiny)}
                            className={`w-full py-3 rounded-xl font-bold text-sm uppercase tracking-widest transition-all border ${
                                isShiny
                                    ? 'bg-yellow-400 text-slate-900 border-yellow-300 shadow-lg shadow-yellow-400/20'
                                    : 'bg-slate-900 text-slate-400 border-slate-700 hover:border-yellow-500 hover:text-yellow-400'
                            }`}
                        >
                            {isShiny ? '✦ Shiny Activo' : '✧ Ver Shiny'}
                        </button>
                    </div>

                    {/* Right Column: Stats & Data */}
                    <div className="flex flex-col gap-4">

                        {/* Base Stats */}
                        <div className="screen-panel rounded-2xl border border-slate-700 p-5">
                            <h3 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">
                                Estadísticas Base
                            </h3>
                            <div className="space-y-3">
                                {pokemon.stats.map((stat, index) => (
                                    <div key={index}>
                                        <div className="flex justify-between items-center mb-1">
                                            <span className="text-slate-400 text-xs font-mono">
                                                {STAT_LABELS[stat.stat.name] ?? stat.stat.name}
                                            </span>
                                            <span className="text-white font-bold text-sm tabular-nums w-8 text-right">
                                                {stat.base_stat}
                                            </span>
                                        </div>
                                        <div className="h-2 bg-slate-800 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${STAT_COLORS[stat.stat.name] ?? 'bg-slate-500'}`}
                                                style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Physical Data */}
                        <div className="screen-panel rounded-2xl border border-slate-700 p-5">
                            <h3 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-4">
                                Datos Físicos
                            </h3>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-slate-800/60 rounded-xl p-3">
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wide mb-1">Altura</p>
                                    <p className="text-white font-bold text-xl">{(pokemon.height / 10).toFixed(1)} <span className="text-slate-400 text-sm font-normal">m</span></p>
                                </div>
                                <div className="bg-slate-800/60 rounded-xl p-3">
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wide mb-1">Peso</p>
                                    <p className="text-white font-bold text-xl">{(pokemon.weight / 10).toFixed(1)} <span className="text-slate-400 text-sm font-normal">kg</span></p>
                                </div>
                                <div className="bg-slate-800/60 rounded-xl p-3">
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wide mb-1">Exp. Base</p>
                                    <p className="text-white font-bold text-xl">{pokemon.base_experience ?? '—'}</p>
                                </div>
                                <div className="bg-slate-800/60 rounded-xl p-3">
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wide mb-1">Nº Pokédex</p>
                                    <p className="text-red-400 font-bold text-xl font-mono">#{String(pokemon.order).padStart(3, '0')}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Full-width: Games Section */}
                <GamesSection gameIndices={pokemon.game_indices} />

            </div>
        </div>
    )
}
