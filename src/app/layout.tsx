import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://example.com"),
  title: {
    default: "Limson • Software Engineer",
    template: "%s • Limson",
  },
  description:
    "Interactive portfolio of Limson, a software engineer. Projects, skills, and experience with modern animations.",
  openGraph: {
    title: "Limson • Software Engineer",
    description:
      "Interactive portfolio of Limson, a software engineer. Projects, skills, and experience with modern animations.",
    url: "https://example.com",
    siteName: "Limson Portfolio",
    images: [
      {
        url: "/og.png",
        width: 1200,
        height: 630,
        alt: "Limson Portfolio",
      },
    ],
    locale: "en_US",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark scroll-smooth">
      <body
        className={`${inter.variable} ${poppins.variable} bg-[#0a0a0a] text-zinc-100 antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
