import './globals.css';
import { Inter } from 'next/font/google';
import Navigation from 'ui/navbar';
import Providers from './providers';

import { Toaster } from 'ui/toaster';
const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata = {
  title: 'Memories Hiring Exercise',
  description: 'Memories hiring exercise'
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <Providers>
      <html lang="en" className={inter.variable}>
        <body>
          <Navigation />
          {children}
          <Toaster />
        </body>
      </html>
    </Providers>
  );
}
