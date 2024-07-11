import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Header from "@/components/TempHeader";
import { address, contactInfo, socialIcons } from "@/constants";

const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({
  subsets: ["latin"],
  variable: "---font-poppins",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
});

export const metadata: Metadata = {
  title: "code-snippets",
  description: "code snippets by team Hope",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en">
        <body className={`${poppins.className}`}>
          <div>
            <Header address={address} contactInfo={contactInfo} socialIcons={socialIcons}/>
            <Navbar />
          </div>
          {children}
          <div>
            <Footer/>
          </div>
        </body>
      </html>
    </ClerkProvider>
  );
}
