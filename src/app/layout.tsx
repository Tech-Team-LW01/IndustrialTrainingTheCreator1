import type { Metadata } from "next";
import React from "react";
import localFont from "next/font/local";
import { Roboto } from 'next/font/google';
import "./globals.css";
import Navbar from "@/components/customComponents/Navbar";
import Footer from "@/components/customComponents/Footer";
import Footer2 from "@/components/customComponents/Footer2";
import Footer3 from "@/components/Footer3";
import WhatsAppBot from "@/components/customComponents/Whatsapp/Whatsapp";
const roboto = Roboto({
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  subsets: ['latin'],
  display: 'swap',
})

const khandFont = localFont(
  {
    src: './fonts/Khand-SemiBold.woff',
    weight: '100 900',
  }

)

// https://www.thecreator.one/
export const metadata: Metadata = {
  title: "The Creator",
  description: "Summer Internship Industrial Training Program 2025 | Exclusively for Engineering Students",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${khandFont.className}  bg-black overflow-x-hidden antialiased`}
      >

        <div className="overflow-x-hidden">
        <Navbar/>
        {children}
        <WhatsAppBot/>
        {/* <Footer/> */}
        <Footer3/>
        {/* <Footer2/> */}
        </div>
      </body>
    </html>
  );
}
