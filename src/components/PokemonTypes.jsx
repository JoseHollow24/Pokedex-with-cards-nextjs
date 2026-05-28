import typeColors from './typeColors'

export default function PokemonTypes( { pokemonTypes } ) {
    const typesBg = typeColors

    return (
        <ul className="flex flex-wrap gap-2">
            {pokemonTypes.map((typeItem, index) => (
                <li
                    key={index}
                    className={`${typesBg[typeItem.type.name]} font-bold capitalize rounded-full py-1 px-4 text-white text-sm shadow-md`}
                >
                    {typeItem.type.name}
                </li>
            ))}
        </ul>
    )
}
