import type { Metadata, Viewport } from "next";
import { Lato, Poppins } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";

const lato = Lato({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-lato",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "FijiHindi - Learn Fiji Hindi",
  description:
    "Learn Fiji Hindi phrases from your aunty. No pressure, just chai and conversation.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "FijiHindi",
  },
  icons: {
    icon: "/icon-192.png",
    apple: "/apple-touch-icon.png",
  },
};

export const viewport: Viewport = {
  themeColor: "#4ECDC4",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${lato.variable} ${poppins.variable} font-sans antialiased bg-coconut`}
      >
        <AuthProvider>{children}</AuthProvider>
      </body>
    </html>
  );
}
