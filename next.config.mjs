/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        loader: 'default',
        domains: ['images.pokemontcg.io', 'raw.githubusercontent.com'], // Agrega el dominio de tu host aquí
      },
};
export default nextConfig;
