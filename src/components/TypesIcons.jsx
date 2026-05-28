import React from 'react'
import Image from 'next/image';

export default function TypesIcons({type}) {
  const typeFormated = type.toLowerCase();
  return (
    <>
      <Image
        src={`/images/${typeFormated}.png`}
        alt={type}
        width="24" height="24"
        className="w-6 border-2 border-slate-400 rounded-full"
      />
    </>
  )
}
