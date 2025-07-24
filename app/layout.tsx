import type { Metadata } from "next";
import { Poppins } from 'next/font/google';
import "./globals.css";
import PageLoader from "@/components/pageLoader";
import BackgroundEffects from "@/components/backgroundEffects";
import InteractiveStarfield from "@/components/interactiveStarfield"; // Import the starfield

const poppins = Poppins({ subsets: ['latin'], weight: ['400', '600', '800'] });

export const metadata = {
  title: 'Ashish Kumar | Creative Video Editor & Designer',
  description: 'Portfolio of Ashish Kumar — Generated 10M+ Views. Worked with 100+ influencers and agencies.'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-black text-white`}>
        <BackgroundEffects />
        <InteractiveStarfield /> 
        <PageLoader />
        {children}
      </body>
    </html>
  );
}
