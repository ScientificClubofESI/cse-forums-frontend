"use client";
import "./globals.css";
import { GoogleOAuthProvider } from "@react-oauth/google";

export default function RootLayout({ children }) {
  return (
    <html lang="en" data-arp="">
      <head>
        {/* Basic Meta Tags */}
        <title>CSE Forum - Connect, Learn, and Collaborate</title>
        <meta
          name="description"
          content="A platform for ESI students and developers to discuss, share knowledge, and collaborate on technical topics."
        />

        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://cse-forum.cse.club/" />
        <meta
          property="og:title"
          content="CSE Forum - Connect, Learn, and Collaborate"
        />
        <meta
          property="og:description"
          content="A platform for ESI students and developers to discuss, share knowledge, and collaborate on technical topics."
        />
        <meta
          property="og:image"
          content="https://cse-forum.cse.club/images/landing/about_image1.png"
        />

        {/* Twitter */}
        <meta property="twitter:card" content="summary_large_image" />
        <meta property="twitter:url" content="https://cse-forum.cse.club/" />
        <meta
          property="twitter:title"
          content="CSE Forum - Connect, Learn, and Collaborate"
        />
        <meta
          property="twitter:description"
          content="A platform for ESI students and developers to discuss, share knowledge, and collaborate on technical topics."
        />
        <meta
          property="twitter:image"
          content="https://cse-forum.cse.club/images/landing/about_image1.png"
        />

        {/* Fonts */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Nunito:ital,wght@0,200..1000;1,200..1000&family=Oswald:wght@200..700&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body>
        <GoogleOAuthProvider
          clientId={process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}
        >
          {children}
        </GoogleOAuthProvider>
      </body>
    </html>
  );
}
