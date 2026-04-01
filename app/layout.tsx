import type { Metadata } from "next";
import "./globals.css";
import Link from "next/link";
import Script from "next/script";

export const metadata: Metadata = {
  title: "H-1B Layoff Navigator — Grace Period Calculator & Options Guide",
  description:
    "Calculate your exact H-1B grace period deadline, see all visa options ranked by eligibility, and get document checklists for each path. Free, informational, not legal advice.",
  keywords:
    "H1B grace period calculator, H1B layoff options, H1B transfer documents, H4 change of status, H1B visa options after layoff",
  openGraph: {
    title: "H-1B Layoff Navigator",
    description:
      "Know your deadline. Know your options. Free H-1B grace period calculator.",
    type: "website",
  },
};

function Navbar() {
  return (
    <nav className="border-b border-gray-100 bg-white sticky top-0 z-10">
      <div className="max-w-4xl mx-auto px-4 py-3 flex items-center justify-between">
        <Link href="/" className="font-bold text-gray-900 hover:text-blue-600 transition-colors">
          H-1B Navigator
        </Link>
        <div className="flex items-center gap-4 text-sm">
          <Link href="/" className="text-gray-600 hover:text-gray-900">
            Calculator
          </Link>
          <Link href="/about/" className="text-gray-600 hover:text-gray-900">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
}

function Footer() {
  return (
    <footer className="mt-auto border-t border-gray-100 bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <p className="text-xs text-gray-500 max-w-2xl mx-auto">
          <strong>Not legal advice.</strong> This tool is for informational
          purposes only. Immigration law is complex and fact-specific. Always
          consult a qualified immigration attorney before making decisions about
          your visa status.
        </p>
        <div className="mt-4 flex justify-center gap-6 text-xs text-gray-400">
          <Link href="/about/" className="hover:text-gray-600">
            About & Disclaimer
          </Link>
          <a
            href="https://www.uscis.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            USCIS.gov
          </a>
          <a
            href="https://i94.cbp.dhs.gov"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-gray-600"
          >
            Check your I-94
          </a>
        </div>
      </div>
    </footer>
  );
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full">
      <body className="min-h-full flex flex-col antialiased bg-white text-gray-900">
        {process.env.NEXT_PUBLIC_GA_ID && (
          <>
            <Script
              src={`https://www.googletagmanager.com/gtag/js?id=${process.env.NEXT_PUBLIC_GA_ID}`}
              strategy="afterInteractive"
            />
            <Script
              id="ga-init"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  window.dataLayer = window.dataLayer || [];
                  function gtag(){dataLayer.push(arguments);}
                  gtag('js', new Date());
                  gtag('config', '${process.env.NEXT_PUBLIC_GA_ID}');
                `,
              }}
            />
          </>
        )}
        {process.env.NEXT_PUBLIC_ADSENSE_ID && (
          <Script
            src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_ADSENSE_ID}`}
            strategy="afterInteractive"
            crossOrigin="anonymous"
          />
        )}
        <Navbar />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
