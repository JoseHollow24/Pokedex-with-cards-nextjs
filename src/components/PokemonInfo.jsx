'use client'
import i18n from '@/utils/i18n.js'
import { useState } from "react"
import PokemonTypes from "./PokemonTypes";
import Image from 'next/image';

export default function PokemonInfo( { pokemon } ) {
    const [isShiny, setIsShiny] = useState(false);
    const handleClick = () => {
        setIsShiny(!isShiny);
    };

     //
    const homeArtD = pokemon.sprites.other.home.front_default
    const homeArtS = pokemon.sprites.other.home.front_shiny

    
    //normal sprites
    const spriteFrontD = pokemon.sprites.front_default
    const spriteBackD = pokemon.sprites.back_default
    const shodownFrontD = pokemon.sprites.other.showdown.front_default
    const shodownBackD = pokemon.sprites.other.showdown.back_default

    //shiny sprites
    const spriteFrontS = pokemon.sprites.front_shiny
    const spriteBackS = pokemon.sprites.back_shiny
    const shodownFrontS = pokemon.sprites.other.showdown.front_shiny
    const shodownBackS = pokemon.sprites.other.showdown.back_shiny

    
    return (
        <>
            <div className="md:grid md:grid-cols-6 md:max-w-4xl mx-auto mt-10">
                <div className="md:col-span-3">
                    <div className="max-w-80 grid mx-auto">
                    <p className="text-slate-800 font-bold">
                        {i18n.t('pokeName')} <span className="text-red-400 font-bold capitalize">{pokemon.name}</span>
                    </p>
                    <p className="text-slate-800 font-bold">
                        Nº: <span className="text-red-400 font-bold">{pokemon.order}</span>
                    </p>
                    <PokemonTypes pokemonTypes={pokemon.types}/>
                    <div className="my-2">
                        { isShiny ? 
                            <>
                                <div className="bg-blue-300 flex rounded-sm items-center justify-around mt-4 p-4 h-48">
                                    <Image src={spriteFrontS} alt={pokemon.name} width="96" height="96" className="w-auto" />
                                    {spriteBackS &&  (<Image src={spriteBackS} alt={pokemon.name} width="96" height="96" className="w-auto" />)}
                                </div>
                                { shodownBackS && (
                                    <div className="bg-blue-400 flex rounded-sm items-center justify-around mt-4 p-4 h-48">
                                        <Image src={shodownBackS} alt={pokemon.name} width="98" height="98" className="w-auto" /> 
                                        <Image src={shodownFrontS} alt={pokemon.name} width="98" height="98" className="w-auto" />
                                    </div>
                                )}
                            </>
                            : 
                            <>  
                                <div className="bg-blue-300 flex rounded-sm items-center justify-around mt-4 p-4 h-48">
                                    <Image src={spriteFrontD} alt={pokemon.name} width="96" height="96" className="w-auto" />
                                    {spriteBackD &&  (<Image src={spriteBackD} alt={pokemon.name} width="96" height="96" className="w-auto" />)}
                                </div>
                                {shodownBackD && (
                                    <div className="bg-blue-400 flex rounded-sm items-center justify-around mt-4 p-4 h-48">
                                        <Image src={shodownBackD} alt={pokemon.name} width="98" height="98" className="w-auto" /> 
                                        <Image src={shodownFrontD} alt={pokemon.name} width="98" height="98" className="w-auto" />
                                    </div>
                                )}
                            </>
                        }
                    </div>
                    <button 
                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600 active:bg-blue-800 mx-auto" 
                        onClick={handleClick}
                    >
                        Color { isShiny ? 'Normal' : 'Shiny' }
                    </button>
                    </div>
                </div>
                <div className="md:col-span-3">
                        { isShiny ? 
                            <div className="block">
                                <Image src={homeArtS} alt={pokemon.name} width="448" height="448" className="mx-auto" />
                            </div>
                        : 
                            <div className="block">
                                <Image src={homeArtD} alt={pokemon.name} width="448" height="448" className="mx-auto" />
                            </div>
                        }
                </div>
                
            </div>
        </>
    )
}
