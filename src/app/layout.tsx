import type { Metadata } from 'next';
import { Outfit, Plus_Jakarta_Sans } from 'next/font/google';
import './globals.css';
import { CartProvider } from '@/frontend/context/CartContext';
import { ClientModals } from '@/frontend/components/ClientModals';

const outfit = Outfit({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-heading',
  display: 'swap',
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Bestie Cares — Science-Backed Skin & Hair Care | Dermatologically Tested',
  description:
    'Bestie Cares provides clinic-grade, science-backed skin and hair care solutions designed for longevity, clarity, and glowing confidence.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${outfit.variable} ${plusJakartaSans.variable}`}>
      <body>
        <CartProvider>
          {children}
          <ClientModals />
        </CartProvider>
      </body>
    </html>
  );
}
