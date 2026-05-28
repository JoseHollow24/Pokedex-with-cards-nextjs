import Navbar from "@/components/Navbar";
import { Inter } from "next/font/google";
import i18n from '@/utils/i18n.js'
import '../styles/globals.css'

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Pokedex",
  description: "Next Js Pokedex Projectp",
};

export default function RootLayout({ children }) {
  return (
    <html lang={i18n.language}>
      <body className={inter.className}>
        <Navbar/>
        {children}
      </body>
    </html>
  );
}
