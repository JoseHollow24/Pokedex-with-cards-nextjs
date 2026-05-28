'use client'
import { useRouter } from 'next/navigation'

export default function BackButton({ fallbackHref = '/' }) {
    const router = useRouter()

    const handleBack = () => {
        if (window.history.length > 1) {
            router.back()
        } else {
            router.push(fallbackHref)
        }
    }

    return (
        <button
            onClick={handleBack}
            className="inline-flex items-center gap-2 text-red-200 hover:text-white transition-colors font-mono text-xs uppercase tracking-widest group"
        >
            <span className="group-hover:-translate-x-1 transition-transform inline-block">←</span>
            Volver
        </button>
    )
}
