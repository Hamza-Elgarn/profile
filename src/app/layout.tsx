import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Hamza Elgarn | Creative Developer",
  description: "Creative Developer specializing in Python, C, and premium UI/UX. Building digital experiences that blend beautiful design with robust engineering.",
  keywords: ["Creative Developer", "Python", "C", "UI/UX", "Portfolio", "Hamza Elgarn"],
  authors: [{ name: "Hamza Elgarn" }],
  openGraph: {
    title: "Hamza Elgarn | Creative Developer",
    description: "Creative Developer specializing in Python, C, and premium UI/UX.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className={`${inter.variable} antialiased bg-black text-white`}>
        {children}
      </body>
    </html>
  );
}
