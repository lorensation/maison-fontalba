import { Playfair_Display, Inter } from 'next/font/google';

export const display = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-display',
});

export const text = Inter({
  subsets: ['latin'],
  variable: '--font-text',
});
