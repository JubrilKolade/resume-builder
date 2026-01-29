import type { Metadata } from "next";
import { Geist, Geist_Mono, Inter, Lato, Open_Sans, Roboto } from "next/font/google";
import "./globals.css";
import { ResumeProvider } from "@/contexts/ResumeContext";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});


const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const roboto = Roboto({ weight: ['400', '500', '700'], subsets: ['latin'], variable: '--font-roboto' });
const openSans = Open_Sans({ subsets: ['latin'], variable: '--font-open-sans' });
const lato = Lato({ weight: ['400', '700'], subsets: ['latin'], variable: '--font-lato' });

export const metadata: Metadata = {
  title: "Resume Builder - Create Professional Resumes",
  description: "Build and customize professional resumes with multiple templates",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${inter.variable} ${roboto.variable} ${openSans.variable} ${lato.variable} antialiased`}
      >
        <ResumeProvider>
          {children}
        </ResumeProvider>
      </body>
    </html>
  );
}
