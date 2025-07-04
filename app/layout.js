import { Inter, Noto_Sans_Arabic } from "next/font/google";
import "@fortawesome/fontawesome-svg-core/styles.css"; 
import { config } from "@fortawesome/fontawesome-svg-core";
import "bootstrap/dist/css/bootstrap.min.css";
import "./globals.css";
import Navebar from "./Navebar/page.jsx";

const inter = Inter({ subsets: ["latin"] });
const notoSansArabic = Noto_Sans_Arabic({ 
  subsets: ["arabic"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-noto-sans-arabic"
});

config.autoAddCss = false;

export const metadata = {
  title: "Quran Web - القرآن الكريم | Islamic Digital Platform",
  description: "A comprehensive Islamic digital platform featuring Quran recitations, prayer times, Islamic radio stations, and Quranic tafsir. Built with modern web technologies for the Muslim community.",
  keywords: "Quran, Islamic, Prayer Times, Tafsir, Islamic Radio, Muslim, Arabic, Recitation",
  authors: [{ name: "Quran Web Team" }],
  creator: "Quran Web",
  publisher: "Quran Web",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL('https://quran-web-app.vercel.app'),
  openGraph: {
    title: "Quran Web - القرآن الكريم",
    description: "A comprehensive Islamic digital platform featuring Quran recitations, prayer times, Islamic radio stations, and Quranic tafsir.",
    url: 'https://quran-web-app.vercel.app',
    siteName: 'Quran Web',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Quran Web - Islamic Digital Platform',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Quran Web - القرآن الكريم',
    description: 'A comprehensive Islamic digital platform featuring Quran recitations, prayer times, Islamic radio stations, and Quranic tafsir.',
    images: ['/og-image.jpg'],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: 'your-google-verification-code',
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={notoSansArabic.variable}>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f5132" />
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
      </head>
      <body className={`${inter.className} ${notoSansArabic.variable}`}>
        <Navebar />
        <main className="min-h-screen">
          {children}
        </main>
      </body>
    </html>
  );
}
