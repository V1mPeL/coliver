import type { Metadata } from 'next';
import { Open_Sans } from 'next/font/google'; // Імпортуємо Open Sans
import './globals.css';
import Navbar from '@/components/Navbar';

// Налаштування шрифта Open Sans
const openSans = Open_Sans({
  variable: '--font-open-sans', // Змінна для використання у CSS
  subsets: ['latin'], // Підмножина символів
  weight: ['400', '600', '700'], // Вказуємо ваги шрифта (можна додати інші, наприклад, 300, 600 тощо)
});

export const metadata: Metadata = {
  title: 'CoLiver', // Змінено назву на назву вашого сайту
  description: 'A platform for co-living and community sharing', // Оновлено опис
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${openSans.variable} antialiased`}>
        <Navbar />
        <main>{children}</main>
      </body>
    </html>
  );
}
