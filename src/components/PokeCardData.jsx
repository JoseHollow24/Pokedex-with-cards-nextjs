import i18n from '@/utils/i18n.js'
import cardColors from './cardColors'
import TypesIcons from './TypesIcons'
import AbilityIcon from './AbilityIcon'

function Section({ title, children }) {
    return (
        <div className="bg-slate-800/50 rounded-xl p-4 border border-slate-700">
            <h4 className="text-slate-400 text-xs font-mono uppercase tracking-widest mb-3">{title}</h4>
            {children}
        </div>
    )
}

export default function PokeCardData( { pokemon } ) {
    const typesBg = cardColors;

    return (
        <div className="space-y-4">

            {/* Name + HP + Types */}
            <div className={`${typesBg[pokemon.types[0]]} rounded-2xl p-5 shadow-lg`}>
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-white/70 text-xs font-mono uppercase tracking-widest">
                            {pokemon.supertype}
                            {pokemon.subtypes.map((s, i) => (
                                <span key={i}> — {s}</span>
                            ))}
                        </p>
                        <p className="text-white font-black text-2xl mt-0.5">{pokemon.name}</p>
                    </div>
                    <div className="flex items-center gap-2 shrink-0">
                        <span className="text-white font-bold text-sm">HP {pokemon.hp}</span>
                        {pokemon.types.map((type, index) => (
                            <TypesIcons key={index} type={type} />
                        ))}
                    </div>
                </div>
            </div>

            {/* Abilities */}
            {pokemon.abilities && (
                <Section title="Habilidades">
                    {pokemon.abilities.map((ability, index) => (
                        <div key={index} className="mb-3 last:mb-0">
                            <div className="flex items-center gap-2 mb-1">
                                <AbilityIcon ability={ability.type} />
                                <p className="text-white font-bold">{ability.name}</p>
                            </div>
                            <p className="text-slate-300 text-sm leading-relaxed">{ability.text}</p>
                        </div>
                    ))}
                </Section>
            )}

            {/* Attacks */}
            {pokemon.attacks?.length > 0 && (
                <Section title={i18n.t('cardAtacks')}>
                    {pokemon.attacks.map((attack, index) => (
                        <div key={index} className="mb-4 last:mb-0 pb-4 last:pb-0 border-b border-slate-700 last:border-0">
                            <div className="flex justify-between items-center mb-1">
                                <div className="flex items-center gap-1.5">
                                    {attack.cost?.map((cost, i) => (
                                        <TypesIcons key={i} type={cost} />
                                    ))}
                                    <span className="text-white font-bold ml-1">{attack.name}</span>
                                </div>
                                <span className="text-white font-black text-xl">{attack.damage}</span>
                            </div>
                            {attack.text && (
                                <p className="text-slate-400 text-sm leading-relaxed">{attack.text}</p>
                            )}
                        </div>
                    ))}
                </Section>
            )}

            {/* Rules */}
            {pokemon.rules && (
                <Section title={i18n.t('cardRule')}>
                    {pokemon.rules.map((rule, index) => (
                        <p key={index} className="text-slate-300 text-xs leading-relaxed mb-2 last:mb-0">
                            {rule}
                        </p>
                    ))}
                </Section>
            )}

            {/* Weaknesses / Resistances / Retreat */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                    <p className="text-slate-400 text-xs font-mono uppercase tracking-wide mb-2">{i18n.t('cardweaknesses')}</p>
                    {pokemon.weaknesses
                        ? pokemon.weaknesses.map((w, i) => (
                            <span key={i} className="flex items-center gap-1">
                                <TypesIcons type={w.type} />
                                <span className="text-white text-sm font-bold">{w.value}</span>
                            </span>
                        ))
                        : <span className="text-slate-500 text-sm">N/A</span>
                    }
                </div>
                <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                    <p className="text-slate-400 text-xs font-mono uppercase tracking-wide mb-2">{i18n.t('cardResistance')}</p>
                    {pokemon.resistances
                        ? pokemon.resistances.map((r, i) => (
                            <span key={i} className="flex items-center gap-1">
                                <TypesIcons type={r.type} />
                                <span className="text-white text-sm font-bold">{r.value}</span>
                            </span>
                        ))
                        : <span className="text-slate-500 text-sm">N/A</span>
                    }
                </div>
                <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                    <p className="text-slate-400 text-xs font-mono uppercase tracking-wide mb-2">{i18n.t('cardRetreat')}</p>
                    {pokemon.retreatCost
                        ? <span className="flex flex-wrap gap-0.5">
                            {pokemon.retreatCost.map((cost, i) => (
                                <TypesIcons key={i} type={cost} />
                            ))}
                        </span>
                        : <span className="text-slate-500 text-sm">N/A</span>
                    }
                </div>
            </div>

            {/* Meta Info */}
            <div className="grid grid-cols-3 gap-3">
                <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                    <p className="text-slate-400 text-xs font-mono uppercase tracking-wide mb-1">{i18n.t('cardArtist')}</p>
                    <span className="text-white text-sm">{pokemon.artist}</span>
                </div>
                <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                    <p className="text-slate-400 text-xs font-mono uppercase tracking-wide mb-1">{i18n.t('cardRarity')}</p>
                    <span className="text-white text-sm">{pokemon.rarity}</span>
                </div>
                {pokemon.regulationMark && (
                    <div className="bg-slate-800/50 rounded-xl p-3 border border-slate-700">
                        <p className="text-slate-400 text-xs font-mono uppercase tracking-wide mb-1">{i18n.t('cardRotation')}</p>
                        <span className="inline-flex w-7 h-7 items-center justify-center bg-slate-900 rounded-full text-white text-sm font-bold uppercase border border-slate-600">
                            {pokemon.regulationMark}
                        </span>
                    </div>
                )}
            </div>
        </div>
    )
}
