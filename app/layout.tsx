import './globals.css';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import { ThemeProvider } from '@/components/ThemeProvider';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Fatjma | Traditional Moroccan Leather Bookbinding & Craftsmanship',
  description: 'Experience authentic Moroccan leather craftsmanship with our handmade custom leather book binding services. Traditional techniques from Fez, shipped worldwide.',
  keywords: 'Moroccan leather, book binding, handcrafted leather, Fez tanneries, custom leather journals, traditional craftsmanship',
  openGraph: {
    title: 'Fatjma | Traditional Moroccan Leather Bookbinding',
    description: 'Authentic handmade Moroccan leather book binding using traditional techniques from Fez.',
    images: [
      {
        url: 'https://pub-2963cf54bb984b01b71c64f2fe8b4602.r2.dev/fatjma/Fatjma.png',
        width: 1200,
        height: 630,
        alt: 'Fatjma Moroccan Leather',
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="light"
          enableSystem
        >
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}