export default function LoadingOverlay() {
    return (
        <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-black/60">
            <div className="w-24 h-24 animate-spin">
                <div className="relative w-full h-full rounded-full border-[5px] border-gray-900 overflow-hidden">
                    <div className="absolute top-0 left-0 right-0 h-1/2 bg-red-500" />
                    <div className="absolute bottom-0 left-0 right-0 h-1/2 bg-white" />
                    <div className="absolute top-1/2 left-0 right-0 h-[5px] bg-gray-900 -translate-y-1/2" />
                    <div className="absolute top-1/2 left-1/2 w-7 h-7 bg-white rounded-full border-[5px] border-gray-900 -translate-x-1/2 -translate-y-1/2 z-10" />
                </div>
            </div>
            <p className="text-white text-xl mt-6 font-bold tracking-wide">
                Cargando
                <span className="inline-flex">
                    <span className="animate-bounce" style={{ animationDelay: '0ms' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '150ms' }}>.</span>
                    <span className="animate-bounce" style={{ animationDelay: '300ms' }}>.</span>
                </span>
            </p>
        </div>
    );
}
