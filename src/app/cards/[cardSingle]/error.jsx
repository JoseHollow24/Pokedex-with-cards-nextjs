'use client'
import { useEffect } from 'react'
import BackButton from '@/components/BackButton'

export default function CardError({ error, reset }) {
    useEffect(() => {
        console.error(error)
    }, [error])

    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4">
            <div className="screen-panel rounded-2xl border border-red-900 p-8 max-w-md w-full text-center">
                <div className="text-red-500 text-6xl mb-4 select-none">!</div>
                <h2 className="text-white font-black text-xl mb-2">Error al cargar carta</h2>
                <p className="text-slate-400 text-sm font-mono mb-6">{error?.message ?? 'Carta no encontrada'}</p>
                <div className="flex gap-3 justify-center">
                    <button
                        onClick={reset}
                        className="bg-red-600 text-white font-bold py-2 px-4 rounded-lg text-sm hover:bg-red-500 transition-colors"
                    >
                        Reintentar
                    </button>
                    <BackButton />
                </div>
            </div>
        </div>
    )
}
