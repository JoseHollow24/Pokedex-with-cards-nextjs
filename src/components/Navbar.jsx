'use client'
import Link from 'next/link'
import NavIcon from '/public/images/pokedex.png';
import Image from 'next/image';

export default function Navbar() {
      
    return (
        <header>
            <nav className="border-b bg-red-400 border-b-zinc-600 px-5 py-2">
                <div className="container m-auto flex justify-between">
                    <h1 className="text-3xl">
                        <Link href="/">
                            <Image 
                                src={NavIcon.src}
                                alt='/'
                                width="32"
                                height="32"
                                className='max-w-8'
                            />
                        </Link>
                    </h1>
                    <ul className='flex gap-2 items-center text-white font-bold'>
                        <li className='list-none'>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    )
}