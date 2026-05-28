import React from 'react'
import Image from 'next/image';

export default function AbilityIcon({ability}) {
  const abiltyFormated = ability.replace(/-/g, "").toLowerCase();
  return (
    <>
      <Image 
        src={`/images/${abiltyFormated}.png`}
        alt={ability}
        width="112"
        height="30"
        className="w-28"
      />
    </>
  )
}
