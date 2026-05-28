'use client'
import Image from 'next/image'
import { useState } from 'react'

export default function CardImageViewer({ src, name, number, printedTotal }) {
    const [isZoomed, setIsZoomed] = useState(false)

    return (
        <>
            {/* Zoom Modal */}
            {isZoomed && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 backdrop-blur-md cursor-zoom-out p-4"
                    onClick={() => setIsZoomed(false)}
                >
                    <div
                        className="relative w-[460px] max-w-[88vw]"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute -top-3 -right-3 z-10 w-8 h-8 rounded-full bg-slate-800 border border-slate-600 text-slate-300 hover:text-white hover:bg-slate-700 flex items-center justify-center text-xs font-bold transition-colors shadow-lg"
                            onClick={() => setIsZoomed(false)}
                        >
                            ✕
                        </button>
                        <Image
                            src={src}
                            alt={name}
                            width="734"
                            height="1024"
                            className="rounded-2xl shadow-2xl w-full h-auto max-h-[82vh] object-contain"
                            priority
                        />
                    </div>
                </div>
            )}

            {/* Card Preview Panel */}
            <div
                className="screen-panel rounded-2xl border border-slate-700 p-4 w-full flex flex-col items-center gap-3 relative cursor-zoom-in group"
                onClick={() => setIsZoomed(true)}
            >
                <div className="absolute top-2 left-2 w-4 h-4 border-l-2 border-t-2 border-slate-600"></div>
                <div className="absolute top-2 right-2 w-4 h-4 border-r-2 border-t-2 border-slate-600"></div>
                <div className="absolute bottom-2 left-2 w-4 h-4 border-l-2 border-b-2 border-slate-600"></div>
                <div className="absolute bottom-2 right-2 w-4 h-4 border-r-2 border-b-2 border-slate-600"></div>

                <Image
                    src={src}
                    alt={name}
                    width="280"
                    height="390"
                    className="rounded-xl shadow-2xl group-hover:scale-[1.03] transition-transform duration-300 w-full h-auto"
                />

                <div className="flex items-center gap-1.5 text-slate-500 text-xs font-mono opacity-70 group-hover:opacity-100 group-hover:text-slate-300 transition-all">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <circle cx="11" cy="11" r="8"/><path d="m21 21-4.35-4.35"/>
                    </svg>
                    Click para ampliar
                </div>

                <p className="text-slate-600 text-xs font-mono">
                    {number} / {printedTotal}
                </p>
            </div>
        </>
    )
}
