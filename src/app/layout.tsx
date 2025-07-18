import type { Metadata } from "next";
import { Inter, Manrope } from "next/font/google";
import { Header } from "@/components/header";

import "./globals.css";
import { MenuLink } from "@/components/header/Header";
import { Footer } from "@/components/footer";
import { JoinDialog } from "@/components/join_dialog";
import PlausibleProvider from "next-plausible";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin-ext"],
})

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin-ext"],
})

export const metadata: Metadata = {
  title: "TUM Blockchain Club",
  description: "The largest student-led blockchain club in Germany.",
  keywords: ["TUM", "Blockchain"],
};

const menuLinks : MenuLink[] = [
  {
    name: "About",
    url: "/about",
    buttonType: "secondary"
  },
  {
    name: "Membership",
    url: "/membership",
    buttonType: "secondary"
  },
  {
    name: "Industry",
    url: "https://industry.tum-blockchain.com",
    buttonType: "secondary",
    target: "_blank"
  },
  {
    name: "Conference",
    url: "https://conference.tum-blockchain.com",
    buttonType: "secondary",
    target: "_blank"
  },
  {
    name: "Join Us",
    url: "/about",
    buttonType: "primary"
  }
]

const applicationDeadline = new Date(2025, 4, 17, 22, 59, 59);

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-mode="dark" className={`${manrope.variable} ${inter.variable} antialiased bg-background overflow-x-hidden max-w-screen`}>
      <body>
        <PlausibleProvider domain="tum-blockchain.com" trackOutboundLinks={true} customDomain={"https://plausible.rbg.tum-blockchain.com"} selfHosted={true}>
          <Header menuLinks={menuLinks} logo="/tbc-wordmark.png"/>
          <main className="text-foreground pb-24">
            {children}
          </main>
          <Footer/>
          
          <JoinDialog 
            joinUrl="/membership" 
            deadline={applicationDeadline}
          />
        </PlausibleProvider>
      </body>
    </html>
  );
}
