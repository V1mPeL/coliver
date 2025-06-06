import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google';
import '@/app/globals.css';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Toaster } from 'react-hot-toast';

const openSans = Open_Sans({
  variable: '--font-open-sans',
  subsets: ['latin'],
  weight: ['400', '600', '700'],
});

export const metadata: Metadata = {
  title: 'CoLiver',
  description: 'A platform for co-living and community sharing',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body
        className={`${openSans.variable} antialiased bg-neutrals-white flex flex-col min-h-screen`}
      >
        <Navbar />
        <main className='flex-grow'>{children}</main>
        <Footer />
        <Toaster position='top-center' toastOptions={{ duration: 15000 }} />
      </body>
    </html>
  );
}
