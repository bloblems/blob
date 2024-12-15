import type { Metadata } from "next";
import { Analytics } from '@vercel/analytics/next';
import "./globals.css";

export const metadata: Metadata = {
  title: 'Ḃloblems',
  description: 'Morally ambiguous design',
  openGraph: {
    title: 'Ḃloblems',
    description: 'Morally ambiguous design',
    url: 'https://www.bloblems.com/api/og',
    siteName: 'Ḃloblems',
    images: [
      {
        url: 'https://www.bloblems.com/api/og',
        width: 1200,
        height: 630,
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ḃloblems',
    description: 'Morally ambiguous design',
    images: ['https://www.bloblems.com/api/og'],
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
        <Analytics />
      </body>
    </html>
  );
}