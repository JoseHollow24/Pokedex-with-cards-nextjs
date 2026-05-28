import i18n from '@/utils/i18n.js'
import typeColors from './typeColors'

export default function PokemonTypes( { pokemonTypes } ) {
    const typesBg = typeColors

    return (
        <>   
            <p className="text-slate-800 font-bold">{i18n.t('pokeType')}</p>
            <ul className="flex">
                {
                    pokemonTypes.map((typeItem, index) => (
                        <li className={`${typesBg[typeItem.type.name]} font-bold capitalize mr-4 rounded-2xl py-2 px-4 text-white`} key={index}>
                            <p>{typeItem.type.name}</p>
                        </li>
                    ))
                }
            </ul>
        </>
    )
}
