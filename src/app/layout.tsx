import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { AudioPlayerProvider } from "@/context/AudioPlayerContext"


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "My workout playlist",
  description: "design by alex030",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>
         <AudioPlayerProvider>
          {children}
        </AudioPlayerProvider>
      </body>
    </html>
  );
}
