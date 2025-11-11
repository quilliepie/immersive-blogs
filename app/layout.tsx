import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';

// * Use Custom Fonts * //
const cabin = localFont({
  src: [
    {
      path: '../public/fonts/Cabin-VariableFont_wdth,wght.ttf',
      style: 'normal',
    },
    {
      path: '../public/fonts/Cabin-Italic-VariableFont_wdth,wght.ttf',
      style: 'italic',
    },
  ],
  variable: '--font-cabin',
  display: 'swap',
});
const yesevaOne = localFont({
  src: '../public/fonts/YesevaOne-Regular.ttf',
  variable: '--font-yeseva-one',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Immersive Blogs',
  description: 'Created by Quilliepie, with love. Happy listening!',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={`${cabin.variable} ${yesevaOne.variable} antialiased`}>
        {children}
      </body>
    </html>
  );
}
