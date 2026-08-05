import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { ThemeProvider } from '@/lib/theme';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import ArogyaBot from '@/components/ArogyaBot';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Arogya-Purvottar | Smart Health Surveillance & Outbreak Early Warning System',
  description: 'AI & GIS Powered Community Health Platform for Water-Borne Diseases in Rural Northeast India. Ministry of Development of North Eastern Region (MDoNER). SIH 2025 Problem Code SIH25001.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.className} bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 min-h-screen flex flex-col antialiased transition-colors duration-200`}>
        <ThemeProvider>
          <Navbar />
          <main className="flex-1 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
            {children}
          </main>
          <Footer />
          <ArogyaBot />
        </ThemeProvider>
      </body>
    </html>
  );
}
