'use client'
import Link from 'next/link'
import NavIcon from '/public/images/pokedex.png';
import Image from 'next/image';

export default function Navbar() {
    return (
        <header className="sticky top-0 z-40">
            <nav className="bg-red-700 border-b-4 border-red-900 shadow-xl">
                <div className="container mx-auto px-4 py-3 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-3 group">
                        <div className="bg-white rounded-full p-1.5 shadow-md group-hover:scale-105 transition-transform">
                            <Image
                                src={NavIcon.src}
                                alt='Pokédex'
                                width="28"
                                height="28"
                                className='max-w-7'
                            />
                        </div>
                        <span className="text-white font-black text-xl tracking-widest uppercase hidden sm:block drop-shadow">
                            Pokédex
                        </span>
                    </Link>
                    <div className="flex items-center gap-2">
                        <div className="w-3 h-3 rounded-full bg-blue-400 border-2 border-blue-200 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-yellow-300 border-2 border-yellow-100 shadow-sm"></div>
                        <div className="w-3 h-3 rounded-full bg-green-400 border-2 border-green-200 shadow-sm"></div>
                    </div>
                </div>
            </nav>
        </header>
    )
}
