'use client'
import i18n from '@/utils/i18n.js'
import React, { useState, useRef, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import PokemonSearch from '@/components/PokemonSearch';

const CARDS_PER_PAGE = 18;

function getPageNumbers(current, total) {
    if (total <= 7) return Array.from({ length: total }, (_, i) => i + 1);
    if (current <= 4) return [1, 2, 3, 4, 5, '…', total];
    if (current >= total - 3) return [1, '…', total - 4, total - 3, total - 2, total - 1, total];
    return [1, '…', current - 1, current, current + 1, '…', total];
}

function CardsPagination({ current, total, onChange }) {
    if (total <= 1) return null;
    const pages = getPageNumbers(current, total);
    return (
        <div className="flex items-center justify-center gap-1.5 mt-8">
            <button
                onClick={() => onChange(current - 1)}
                disabled={current === 1}
                className="px-3 py-2 rounded-lg font-mono text-sm bg-slate-800 text-slate-400 border border-slate-700 hover:border-red-600 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >←</button>

            {pages.map((page, i) =>
                page === '…'
                    ? <span key={`e${i}`} className="px-2 text-slate-600 font-mono text-sm select-none">…</span>
                    : <button
                        key={page}
                        onClick={() => onChange(page)}
                        className={`w-9 h-9 rounded-lg font-mono text-sm border transition-colors ${
                            page === current
                                ? 'bg-red-600 text-white border-red-500 font-bold'
                                : 'bg-slate-800 text-slate-400 border-slate-700 hover:border-red-600 hover:text-white'
                        }`}
                    >{page}</button>
            )}

            <button
                onClick={() => onChange(current + 1)}
                disabled={current === total}
                className="px-3 py-2 rounded-lg font-mono text-sm bg-slate-800 text-slate-400 border border-slate-700 hover:border-red-600 hover:text-white transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
            >→</button>
        </div>
    );
}

function CardsSkeleton() {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
            {Array.from({ length: 18 }).map((_, i) => (
                <div
                    key={i}
                    className="rounded-xl bg-slate-800 animate-pulse"
                    style={{ aspectRatio: '2.5 / 3.5' }}
                />
            ))}
        </div>
    );
}

function HomeContent() {
    const [pokemonData, setPokemonData] = useState(null);
    const [currentPage, setCurrentPage] = useState(1);
    const lastPokemonName = useRef('');

    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get('q') || '';

    const handlePokemonData = (data) => {
        setPokemonData(data);

        // Solo actualizar URL y resetear página cuando es un Pokémon diferente
        if (data.dex.name !== lastPokemonName.current) {
            lastPokemonName.current = data.dex.name;
            setCurrentPage(1);
            router.replace(`/?q=${data.dex.name}`, { scroll: false });
            // Prefetch de la página de detalle para que cargue instantáneo
            router.prefetch(`/${data.dex.name}`);
        }
    };

    // card === null → cartas aún cargando; card.data → listas
    const cardsLoading = pokemonData !== null && pokemonData.card === null;
    const allCards     = pokemonData?.card?.data ?? [];
    const totalPages   = Math.ceil(allCards.length / CARDS_PER_PAGE);
    const visibleCards = allCards.slice(
        (currentPage - 1) * CARDS_PER_PAGE,
        currentPage * CARDS_PER_PAGE
    );

    const handlePageChange = (page) => {
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    return (
        <main className="min-h-screen bg-slate-950">
            <div className="container mx-auto px-4 py-8 max-w-5xl">

                {/* Pokédex Device Shell */}
                <div className="bg-red-700 rounded-3xl shadow-2xl border-4 border-red-900 pokedex-glow overflow-hidden">

                    {/* Top Strip */}
                    <div className="flex items-center gap-3 px-6 py-4 border-b-4 border-red-900 bg-red-800">
                        <div className="w-10 h-10 rounded-full bg-blue-400 border-4 border-white shadow-lg shadow-blue-500/40 flex items-center justify-center">
                            <div className="w-4 h-4 rounded-full bg-blue-200 opacity-60"></div>
                        </div>
                        <div className="flex gap-2 ml-2">
                            <div className="w-4 h-4 rounded-full bg-red-400 border-2 border-red-300 shadow-sm"></div>
                            <div className="w-4 h-4 rounded-full bg-yellow-300 border-2 border-yellow-100 shadow-sm"></div>
                            <div className="w-4 h-4 rounded-full bg-green-400 border-2 border-green-200 shadow-sm"></div>
                        </div>
                        <span className="ml-auto text-red-200 text-xs font-mono uppercase tracking-widest opacity-70">POKÉDEX v2</span>
                    </div>

                    {/* Device Body */}
                    <div className="p-5">
                        <div className="grid grid-cols-1 md:grid-cols-5 gap-4">

                            {/* Left Panel - Search */}
                            <div className="md:col-span-2 flex flex-col gap-4">
                                <div className="screen-panel rounded-2xl p-5 border border-slate-700 flex-1">
                                    <div className="flex items-center gap-2 mb-4">
                                        <div className="w-2.5 h-2.5 rounded-full bg-green-400 shadow-sm shadow-green-400/60 animate-pulse"></div>
                                        <span className="text-slate-400 text-xs font-mono uppercase tracking-widest">
                                            {i18n.t('pokedex')} Search
                                        </span>
                                    </div>

                                    <PokemonSearch
                                        onPokemonDataChange={handlePokemonData}
                                        initialQuery={initialQuery}
                                    />

                                    {pokemonData && (
                                        <div className="mt-5 pt-4 border-t border-slate-700">
                                            <p className="text-slate-500 text-xs font-mono uppercase tracking-widest mb-2">
                                                Entrada encontrada
                                            </p>
                                            <p className="text-white font-black capitalize text-2xl leading-tight">
                                                {pokemonData.dex.name}
                                            </p>
                                            <p className="text-red-400 font-mono text-sm mb-3">
                                                #{String(pokemonData.dex.id).padStart(3, '0')}
                                            </p>
                                            <Link
                                                className="inline-flex items-center gap-2 bg-red-600 text-white font-bold text-xs py-2 px-4 rounded-lg hover:bg-red-500 transition-colors uppercase tracking-wide"
                                                href={`/${pokemonData.dex.name}`}
                                            >
                                                {i18n.t('searchDetails')} →
                                            </Link>
                                        </div>
                                    )}

                                    {!pokemonData && (
                                        <div className="mt-6 text-center py-4">
                                            <div className="text-slate-700 text-5xl mb-2 select-none">?</div>
                                            <p className="text-slate-600 text-xs font-mono uppercase tracking-wider">Sin datos</p>
                                        </div>
                                    )}
                                </div>
                            </div>

                            {/* Right Panel - Pokemon Display */}
                            <div className="md:col-span-3">
                                <div className="screen-panel rounded-2xl border border-slate-700 min-h-72 h-full flex items-center justify-center relative overflow-hidden">
                                    {pokemonData ? (
                                        <div className="flex items-center justify-center p-6 w-full h-full">
                                            <Image
                                                src={pokemonData.dex.sprites.other["official-artwork"].front_default}
                                                alt={pokemonData.dex.name}
                                                width="300"
                                                height="300"
                                                className="drop-shadow-2xl"
                                                priority
                                            />
                                        </div>
                                    ) : (
                                        <div className="text-center p-8 select-none">
                                            <div className="text-slate-800 text-9xl font-black mb-2">?</div>
                                            <p className="text-slate-700 font-mono text-xs uppercase tracking-widest">No data</p>
                                        </div>
                                    )}
                                    <div className="absolute top-3 left-3 w-5 h-5 border-l-2 border-t-2 border-slate-600 rounded-tl"></div>
                                    <div className="absolute top-3 right-3 w-5 h-5 border-r-2 border-t-2 border-slate-600 rounded-tr"></div>
                                    <div className="absolute bottom-3 left-3 w-5 h-5 border-l-2 border-b-2 border-slate-600 rounded-bl"></div>
                                    <div className="absolute bottom-3 right-3 w-5 h-5 border-r-2 border-b-2 border-slate-600 rounded-br"></div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Cards Section */}
                {pokemonData && (
                    <div className="mt-10">
                        <div className="flex items-center gap-4 mb-6">
                            <div className="h-px flex-1 bg-slate-800"></div>
                            <div className="flex items-center gap-2">
                                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                                <span className="text-slate-400 font-mono text-xs uppercase tracking-widest">
                                    {cardsLoading
                                        ? 'Cargando cartas...'
                                        : `Cartas TCG — ${allCards.length} resultados`}
                                </span>
                                <div className="w-2 h-2 rounded-full bg-red-600"></div>
                            </div>
                            <div className="h-px flex-1 bg-slate-800"></div>
                        </div>

                        {cardsLoading ? (
                            <CardsSkeleton />
                        ) : allCards.length > 0 ? (
                            <>
                                {totalPages > 1 && (
                                    <p className="text-slate-600 text-xs font-mono text-center mb-4">
                                        Página {currentPage} de {totalPages} — mostrando {visibleCards.length} de {allCards.length}
                                    </p>
                                )}

                                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-6 gap-3">
                                    {visibleCards.map((card, index) => (
                                        <Link
                                            key={card.id}
                                            href={`/cards/${card.id}?q=${encodeURIComponent(pokemonData.dex.name)}`}
                                            className="block card-hover"
                                        >
                                            <div className="rounded-xl overflow-hidden border border-slate-800 hover:border-red-700 transition-colors">
                                                <Image
                                                    src={card.images.large}
                                                    alt={card.name}
                                                    width="140"
                                                    height="196"
                                                    sizes="(max-width: 640px) 33vw, (max-width: 768px) 25vw, 16vw"
                                                    className="w-full h-auto block"
                                                    priority={index < 6}
                                                />
                                            </div>
                                        </Link>
                                    ))}
                                </div>

                                <CardsPagination
                                    current={currentPage}
                                    total={totalPages}
                                    onChange={handlePageChange}
                                />
                            </>
                        ) : null}
                    </div>
                )}
            </div>
        </main>
    );
}

export default function Home() {
    return (
        <Suspense>
            <HomeContent />
        </Suspense>
    );
}
