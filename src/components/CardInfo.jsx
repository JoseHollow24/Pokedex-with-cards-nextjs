import Image from 'next/image';
import PokeCardData from './PokeCardData';
import TrainerCardData from './TrainerCardData';

export default function CardInfo( { pokemon } ) {
  return (
    <>
        <div className="md:grid md:grid-cols-6 md:max-w-4xl mx-auto mt-10">
            <div className="md:col-span-2 md:px-0 px-4 mb-4">
                <Image 
                    src={pokemon.images.large} 
                    alt={pokemon.name}
                    width="298"
                    height="400"
                />
            </div>
              {pokemon.supertype == 'Pokémon' ? 
                <PokeCardData pokemon={pokemon}/>
              :
                <TrainerCardData trainer={pokemon}/>
              }
        </div>
    </>
  )
}

