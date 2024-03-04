import type { Metadata } from "next";
import localFont from '@next/font/local';
import "./globals.css";

const poppins = localFont({
  src: [
    {
      path: '../../public/fonts/Gilroy-SemiBold.ttf',
      weight: '400'
    },
  ],
  variable: '--font-poppins'
})


export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${poppins.variable} font-gilroy`}>
      <body 
        style={{backgroundColor: '#e5e7eb'}}>
        {children}
        </body>
    </html>
  );
}
