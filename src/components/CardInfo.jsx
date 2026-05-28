import Image from 'next/image'
import CardImageViewer from './CardImageViewer'
import BackButton from './BackButton'
import PokeCardData from './PokeCardData'
import TrainerCardData from './TrainerCardData'

export default function CardInfo({ pokemon, pokemonQuery }) {
    const releaseYear = pokemon.set.releaseDate?.split('/')[0] ?? '—'
    const fallbackHref = `/?q=${encodeURIComponent(pokemonQuery ?? '')}`

    return (
        <div className="min-h-screen bg-slate-950 pb-12">
            <div className="container mx-auto px-4 max-w-5xl">

                {/* Header */}
                <div className="bg-red-700 border-b-4 border-red-900 rounded-b-2xl px-6 pt-4 pb-5 mb-8 shadow-xl">
                    <BackButton fallbackHref={fallbackHref} />
                    <div className="mt-3">
                        <p className="text-red-300 text-xs font-mono uppercase tracking-widest mb-1">
                            {pokemon.supertype} — {pokemon.set.name}
                        </p>
                        <h1 className="text-white font-black text-3xl capitalize">
                            {pokemon.name}
                        </h1>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-5 gap-6 items-start">

                    {/* Left column: card image + expansion */}
                    <div className="md:col-span-2 flex flex-col gap-4">

                        <CardImageViewer
                            src={pokemon.images.large}
                            name={pokemon.name}
                            number={pokemon.number}
                            printedTotal={pokemon.set.printedTotal}
                        />

                        {/* Expansion Info */}
                        <div className="screen-panel rounded-2xl border border-slate-700 p-4 w-full">
                            <h3 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-3">
                                Expansión
                            </h3>

                            {pokemon.set.images?.logo && (
                                <div className="bg-slate-800/60 rounded-xl p-4 flex items-center justify-center mb-3">
                                    <Image
                                        src={pokemon.set.images.logo}
                                        alt={pokemon.set.name}
                                        width="220"
                                        height="70"
                                        className="max-h-14 w-auto object-contain"
                                    />
                                </div>
                            )}

                            <div className="grid grid-cols-2 gap-2">
                                <div className="bg-slate-800/60 rounded-xl p-3">
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wide mb-0.5">Nombre</p>
                                    <p className="text-white text-xs font-medium leading-tight">{pokemon.set.name}</p>
                                </div>
                                <div className="bg-slate-800/60 rounded-xl p-3">
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wide mb-0.5">Año</p>
                                    <p className="text-white font-bold text-lg leading-tight">{releaseYear}</p>
                                </div>
                                <div className="bg-slate-800/60 rounded-xl p-3">
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wide mb-0.5">Serie</p>
                                    <p className="text-white text-xs leading-tight">{pokemon.set.series}</p>
                                </div>
                                <div className="bg-slate-800/60 rounded-xl p-3 flex flex-col gap-1">
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wide">Símbolo</p>
                                    {pokemon.set.images?.symbol
                                        ? <Image
                                            src={pokemon.set.images.symbol}
                                            alt="símbolo del set"
                                            width="32"
                                            height="32"
                                            className="w-8 h-8 object-contain"
                                          />
                                        : <span className="text-slate-600 text-xs">—</span>
                                    }
                                </div>
                                <div className="bg-slate-800/60 rounded-xl p-3 col-span-2">
                                    <p className="text-slate-500 text-xs font-mono uppercase tracking-wide mb-0.5">Total de cartas</p>
                                    <p className="text-white text-sm">
                                        <span className="font-bold">{pokemon.set.printedTotal}</span>
                                        <span className="text-slate-400"> impresas</span>
                                        {pokemon.set.total && pokemon.set.total !== pokemon.set.printedTotal && (
                                            <span className="text-slate-500"> / {pokemon.set.total} totales</span>
                                        )}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right column: card data */}
                    <div className="md:col-span-3">
                        {pokemon.supertype === 'Pokémon'
                            ? <PokeCardData pokemon={pokemon} />
                            : <TrainerCardData trainer={pokemon} />
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}
