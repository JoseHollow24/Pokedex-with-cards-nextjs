import i18n from '@/utils/i18n.js'

export default function TrainerCardData( { trainer } ) {
  return (
    <div className="md:col-span-4 md:px-0 px-4 mb-4">
        <div className={`bg-neutral-700 max-w-96 grid mx-auto p-4 text-white rounded`} >
            {/* Descripción */}
            <nav className="flex justify-between mb-6">
                <div>
                    <p className="font-bold text-2xl">{trainer.name}</p>
                    <span>{trainer.supertype} - </span>
                    {
                        trainer.subtypes.map((subtype, index) => (
                        <span key={index}> 
                            {subtype}
                            {index < trainer.subtypes.length - 1 && ', '}
                        </span> 
                    ))}
                </div>
            </nav>
            {/* Reglas */}
            {trainer.rules &&
                <section  className='mb-4'>
                    {i18n.t('cardRule')}:
                    { trainer.rules && 
                        trainer.rules.map((rule, index) => (
                            <p className='text-xs mb-2' key={index}>
                                {rule}
                            </p>
                        ))
                    }
                    <hr />
                </section>
            }
            {/* otra Informacion */}
            <section className='mb-4 grid grid-cols-3'>
                <div>
                    <p className='uppercase text-sm font-bold mb-2'>{i18n.t('cardArtist')}:</p>
                    <span className='text-sm'>{trainer.artist}</span>
                </div>
                <div>
                    <p className='uppercase text-sm font-bold mb-2'>{i18n.t('cardRarity')}:</p>
                    <span className='text-sm'>{trainer.rarity}</span>
                </div>
                <div>
                    <p className='uppercase text-sm font-bold mb-2'>{i18n.t('cardExpansion')}:</p>
                    <span className='text-sm'>{trainer.set.name}</span>
                </div>
            </section>
            {/* Numero y Regulacion */}
            <section className='mb-4 grid grid-cols-3'>
                <div>
                    <p className='uppercase text-sm font-bold mb-2'>{i18n.t('cardNumber')}:</p>
                    <span className='text-sm'>{trainer.number}/{trainer.set.printedTotal}</span>
                </div>
                {trainer.regulationMark &&
                    <div>
                        <p className='uppercase text-sm font-bold mb-2'>{i18n.t('cardRotation')}:</p>
                        <span className='uppercase text-sm bg-slate-800 rounded-full w-5  block text-center'>{trainer.regulationMark}</span>
                    </div>
                }
            </section>
        </div>
    </div>
  )
}
