import "./globals.css";
import Providers from "./providers";
import { Nunito, Poppins, Oswald } from "next/font/google";

const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

export const metadata = {
  title: "CSE Forum - Connect, Learn, and Collaborate",
  description:
    "A platform for ESI students and developers to discuss, share knowledge, and collaborate on technical topics.",
  openGraph: {
    images: [
      {
        url: "https://cse-forum.cse.club/images/illustrations/Code%20typing-sis.png",
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    images: [
      "https://cse-forum.cse.club/images/illustrations/Code%20typing-sis.png",
    ],
  },
};

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={`${nunito.variable} ${poppins.variable} ${oswald.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
