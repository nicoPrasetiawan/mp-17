import type { Metadata } from 'next';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import './globals.css';
import StoreProvider from './StoreProvider';
import Auth from './Auth';

export const metadata: Metadata = {
  title: 'Eventica',
  description: 'Crafting Unforgettable Experiences',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}
      >
        <StoreProvider>
          <Auth>
            <Header />
            <main
              style={{
                flex: 1,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
              }}
            >
              {children}
            </main>
            <Footer />
          </Auth>
        </StoreProvider>
      </body>
    </html>
  );
}
