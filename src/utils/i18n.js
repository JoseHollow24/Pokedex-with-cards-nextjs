import i18next from 'i18next';

i18next.init({
  lng: 'es', // if you're using a language detector, do not define the lng option
  debug: true,
  resources: {
    en: {
        translation: {
          //Navbar
          about: 'About',
          //Principal page
          appTitle: 'Pokedex App',
          pokedex: 'Pokedex',
          searchDetails: 'See details',
          //search Component
          searchPokemon: 'Search Pokemon',
          searching: 'Searching...',
          pokemondex: 'Pokemon Pokedex',
          formError: 'Complette the form',
          apiError: 'Api Call Error',
          //PokemonDetails
          detailsPageTitle: 'Species information',
          pokeName: 'Name',
          pokeType: 'Types',
          //CardsDetails
          cardPageTitle: 'Card information',
          cardAtacks: 'Atacks',
          cardRule: 'Card rules',
          cardweaknesses: 'Weaknesses',
          cardResistance: 'Resistance',
          cardRetreat: 'Retreat',
          cardArtist: 'Artist',
          cardRarity: 'Rarity',
          cardExpansion: 'Expansion',
          cardNumber: 'Number',
          cardRotation: 'Rotation'
        },
      },
      es: {
        translation: {
          //Navbar
          about: 'Acerca de',
          //Principal page
          appTitle: 'Aplicación Pokédex',
          pokedex: 'Pokédex',
          searchDetails: 'Ver detalles',
          //search Component
          searchPokemon: 'Buscar Pokémon',
          searching: 'Buscando...',
          pokemondex: 'Pokédex de Pokémon',
          formError: 'Complete el formulario por favor',
          apiError: 'Error en la llamada del Api',
          //PokemonDetails
          detailsPageTitle: 'Información de la especie',
          pokeName: 'Nombre',
          pokeType: 'Tipos',
          //CardsDetails
          cardPageTitle: 'Información de la carta',
          cardAtacks: 'Ataques',
          cardRule: 'Regla de la carta',
          cardweaknesses: 'Debilidades',
          cardResistance: 'Resistencias',
          cardRetreat: 'Retirada',
          cardArtist: 'Artista',
          cardRarity: 'Rareza',
          cardExpansion: 'Expansión',
          cardNumber: 'Número',
          cardRotation: 'Rotación'
        },
      },
  }
});
// initialized and ready to go!
// i18next is already initialized, because the translation resources where passed via init function
export default i18next;