// "use client"; 

// import localFont from "next/font/local";
// import "./globals.css";
// import Navbar from "../components/Navbar/Navbar";
// import Footer from "../components/Footer/Footer";
// import { SessionProvider } from 'next-auth/react';
// import { metadata } from "./metadata";


// const geistSans = localFont({
//   src: "./fonts/GeistVF.woff",
//   variable: "--font-geist-sans",
//   weight: "100 900",
// });
// const geistMono = localFont({
//   src: "./fonts/GeistMonoVF.woff",
//   variable: "--font-geist-mono",
//   weight: "100 900",
// });

// export default function RootLayout({
//   children,
// }: Readonly<{
//   children: React.ReactNode;
// }>) {
//   return (
    
//     <html lang="en">
//       <head>
//         <title>{metadata.title}</title>
//         <meta name="description" content={metadata.description} />
//       </head>
//       <body
//         className={`${geistSans.variable} ${geistMono.variable} antialiased`}
//       >
//         <SessionProvider>
//           <Navbar />
//           {children}
//         </SessionProvider>
//         <Footer />
//       </body>
//     </html>
//   );
// }
"use client";

import localFont from "next/font/local";
import "./globals.css";
import Navbar from "../components/Navbar/Navbar";
import Footer from "../components/Footer/Footer";
import { SessionProvider } from "next-auth/react";
import { metadata } from "./metadata";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Title and Description */}
        <title>{metadata.title}</title>
        <meta name="description" content={metadata.description} />

        {/* Viewport for Mobile */}
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        {/* Open Graph Meta Tags */}
        <meta property="og:title" content={metadata.title} />
        <meta property="og:description" content={metadata.description} />
        <meta property="og:url" content="https://www.hotelsudarshan.com" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="/images/og-image.jpg" />

        {/* Twitter Card Meta Tags */}
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={metadata.title} />
        <meta name="twitter:description" content={metadata.description} />
        <meta name="twitter:image" content="/images/twitter-image.jpg.jpg" />

        {/* Favicon */}
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
        <link rel="manifest" href="/site.webmanifest" />

        {/* Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Hotel",
              name: "Hotel Sudarshan",
              url: "https://www.hotelsudarshan.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "Janaura Road, Lucknow Ayodhya By Pass",
                addressLocality: "Ayodhya",
                addressRegion: " Uttar Pradesh",
                postalCode: "224001",
                addressCountry: "India",
              },
              image: "/images/og-image.jpg",
              priceRange: "₹3500 - ₹5500",
              aggregateRating: {
                "@type": "AggregateRating",
                ratingValue: "4.8",
                reviewCount: "124",
              },
            }),
          }}
        />

        {/* Preload Fonts */}
        <link
          rel="preload"
          href="/fonts/GeistVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/GeistMonoVF.woff"
          as="font"
          type="font/woff"
          crossOrigin="anonymous"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProvider>
          <Navbar />
          {children}
        </SessionProvider>
        <Footer />
      </body>
    </html>
  );
}
