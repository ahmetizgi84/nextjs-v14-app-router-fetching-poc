import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Menu from './components/Menu';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
   title: 'Next.js App Router Fetching PoC',
};

export default function RootLayout({
   children,
}: {
   children: React.ReactNode;
}) {
   return (
      <html lang='en'>
         <body suppressHydrationWarning={true} className={inter.className}>
            <Menu /> {children}
         </body>
      </html>
   );
}
