import i18n from '@/utils/i18n.js'

function DataCell({ label, value }) {
    return (
        <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
            <p className="text-slate-400 text-xs font-mono uppercase tracking-wide mb-1">{label}</p>
            <span className="text-white text-sm">{value}</span>
        </div>
    )
}

export default function TrainerCardData( { trainer } ) {
    return (
        <div className="space-y-4">

            {/* Name + Type */}
            <div className="bg-neutral-700 rounded-2xl p-5 shadow-lg border border-neutral-600">
                <p className="text-neutral-400 text-xs font-mono uppercase tracking-widest mb-1">
                    {trainer.supertype}
                    {trainer.subtypes.map((s, i) => (
                        <span key={i}> — {s}</span>
                    ))}
                </p>
                <p className="text-white font-black text-2xl">{trainer.name}</p>
            </div>

            {/* Rules */}
            {trainer.rules && (
                <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
                    <h4 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-3">
                        {i18n.t('cardRule')}
                    </h4>
                    {trainer.rules.map((rule, index) => (
                        <p key={index} className="text-slate-300 text-sm leading-relaxed mb-2 last:mb-0">
                            {rule}
                        </p>
                    ))}
                </div>
            )}

            {/* Meta Info */}
            <div className="grid grid-cols-3 gap-3">
                <DataCell label={i18n.t('cardArtist')}    value={trainer.artist} />
                <DataCell label={i18n.t('cardRarity')}    value={trainer.rarity} />
                <DataCell label={i18n.t('cardExpansion')} value={trainer.set.name} />
            </div>

            {/* Number + Regulation */}
            <div className="grid grid-cols-3 gap-3">
                <DataCell
                    label={i18n.t('cardNumber')}
                    value={`${trainer.number} / ${trainer.set.printedTotal}`}
                />
                {trainer.regulationMark && (
                    <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                        <p className="text-slate-400 text-xs font-mono uppercase tracking-wide mb-1">
                            {i18n.t('cardRotation')}
                        </p>
                        <span className="inline-flex w-7 h-7 items-center justify-center bg-slate-900 rounded-full text-white text-sm font-bold uppercase border border-slate-600">
                            {trainer.regulationMark}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
