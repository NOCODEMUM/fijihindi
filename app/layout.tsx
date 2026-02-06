import type { Metadata, Viewport } from "next";
import { Poppins, Merriweather, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AuthProvider } from "./contexts/AuthContext";
import { ConversationProvider } from "./contexts/ConversationContext";
import FeedbackButton from "./components/FeedbackButton";

// Poppins - for headings
const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

// Merriweather - for Fiji Hindi phrases
const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-merriweather",
  display: "swap",
});

// Inter - for body/descriptions
const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-inter",
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
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-DXG14V7SQ8"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-DXG14V7SQ8');
          `}
        </Script>
      </head>
      <body
        className={`${poppins.variable} ${merriweather.variable} ${inter.variable} font-sans antialiased bg-coconut`}
      >
        <AuthProvider>
          <ConversationProvider>
            {children}
            <FeedbackButton />
          </ConversationProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
