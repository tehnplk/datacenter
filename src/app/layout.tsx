import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Sidebar from "@/components/Sidebar";
import UserMenu from "@/components/UserMenu";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Phitsanulok Health Data Center",
  description: "ศูนย์ข้อมูลด้านการแพทย์และสุขภาพ จังหวัดพิษณุโลก",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <div className="flex h-screen overflow-hidden">
          <Sidebar />
          <div className="relative flex-1 overflow-y-auto">
            <div className="absolute right-4 top-4 z-30">
              <UserMenu />
            </div>
            <div className="md:pl-0 pl-0">
              {children}
            </div>
          </div>
        </div>
      </body>
    </html>
  );
}
