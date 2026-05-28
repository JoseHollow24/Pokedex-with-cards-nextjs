'use client'
import i18n from '@/utils/i18n.js'
import React, { useState, Suspense } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useSearchParams, useRouter } from 'next/navigation';
import PokemonSearch from '@/components/PokemonSearch';

function HomeContent() {
    const [pokemonData, setPokemonData] = useState(null);
    const searchParams = useSearchParams();
    const router = useRouter();
    const initialQuery = searchParams.get('q') || '';

    const handlePokemonData = (data) => {
      setPokemonData(data);
      router.replace(`/?q=${data.dex.name}`, { scroll: false });
    };

    return(
      <main>
          <h1 className="text-center text-3xl mt-10" >{i18n.t('appTitle')}</h1>
          <div className="md:grid md:grid-cols-6 md:max-w-4xl mx-auto my-10 px-4">
            <div className="md:col-span-2">
              <h1 className='text-slate-800 font-bold capitalize text-2xl'>{i18n.t('pokedex')}</h1>
              <PokemonSearch onPokemonDataChange={handlePokemonData} initialQuery={initialQuery} />
            </div>
            {
              pokemonData && (
                <>
                  <div className="md:grid-cols-4 md:col-span-4 md:grid">
                    <div>
                      <p className="text-slate-800 font-bold capitalize text-2xl mb-4">{pokemonData.dex.name}</p>
                      <Link
                        className=' text-sky-400 font-bold text-xl underline  text-center mt-2'
                        href={`/${pokemonData.dex.name}`}
                        >
                            {i18n.t('searchDetails')}
                        </Link>
                    </div>
                    <div className="md:col-span-2 md:col-start-3">
                      <Image 
                        src={pokemonData.dex.sprites.other["official-artwork"].front_default}
                        alt={pokemonData.dex.name}
                        width="288"
                        height="288"
                      />
                    </div>
                  </div>
                </>
              )
            }
              <div>
                </div>
                <div className="md:col-span-6">
                  {
                    pokemonData && (
                      <>
                        <div className="md:col-span-5 grid md:grid-cols-6 grid-cols-4">
                          {
                            pokemonData.card.data.map((card, index) => (
                              <div className="m-1" key={index}>
                                <Link
                                  className=' text-sky-400 font-bold text-xl underline  text-center mt-2'
                                  href={`/cards/${card.id}`}
                                >
                                  <Image 
                                      src={card.images.large} 
                                      alt={card.name}
                                      width="140"
                                      height="196"
                                  />
                                </Link>
                              </div>
                            ))
                          }
                        </div>
                      </>
                    )
                  }
                </div>
          </div>
        </main>
    )
}

export default function Home() {
    return (
        <Suspense>
            <HomeContent />
        </Suspense>
    );
};
