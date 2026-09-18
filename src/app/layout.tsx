import type { Metadata } from "next";
import Link from "next/link";
import { Geist, Geist_Mono, Playfair_Display } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const display = Playfair_Display({
  variable: "--font-display",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: {
    default: "Mercedes-Benz Through Time",
    template: "%s · Mercedes-Benz Through Time",
  },
  description:
    "Every era of Mercedes-Benz, from the 1886 Patent-Motorwagen to today's electric EQ cars.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} ${display.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <header className="sticky top-0 z-40 border-b border-line bg-background/80 backdrop-blur">
          <nav className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-2.5 font-semibold tracking-tight">
              <Mark className="size-7" />
              <span className="hidden sm:inline">Mercedes-Benz Through Time</span>
            </Link>
            <div className="flex gap-1 text-sm">
              <Link href="/" className="rounded-full px-3 py-1.5 hover:bg-surface">
                Models
              </Link>
              <Link href="/timeline" className="rounded-full px-3 py-1.5 hover:bg-surface">
                Timeline
              </Link>
            </div>
          </nav>
        </header>
        <main className="flex-1">{children}</main>
        <footer className="border-t border-line px-4 py-8 text-center text-xs text-muted sm:px-6">
          <p>
            A non-commercial fan project. Not affiliated with Mercedes-Benz Group AG.
          </p>
          <p className="mt-1">
            Photos and descriptions come from Wikipedia and Wikimedia Commons under
            their respective free licenses. Each photo is credited on its model page.
          </p>
        </footer>
      </body>
    </html>
  );
}

/** Neutral "through time" mark: a dial with a sweeping hand. */
function Mark({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 32" className={className} aria-hidden>
      <circle cx="16" cy="16" r="13" fill="none" stroke="currentColor" strokeWidth="2" />
      <path d="M16 16 L16 7 M16 16 L22 19" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
      <circle cx="16" cy="16" r="2" fill="var(--accent)" />
    </svg>
  );
}
