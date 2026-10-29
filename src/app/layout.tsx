import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import "./globals.css";

const geistSans = Geist({ variable: "--font-geist-sans", subsets: ["latin"] });
const geistMono = Geist_Mono({ variable: "--font-geist-mono", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "HoloMenu — See What You'll Actually Get",
  description: "Don't imagine your order. Experience it before it arrives. Real customer photos reconstructed into interactive 3D with an honesty score.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}>
      <body className="min-h-full bg-zinc-950 text-zinc-50">
        <header className="sticky top-0 z-20 border-b border-zinc-800/80 bg-zinc-950/90 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-amber-400 text-sm font-black text-zinc-950">H</span>
              <span className="leading-tight">
                <span className="block font-bold tracking-tight">HoloMenu</span>
                <span className="hidden text-[11px] text-zinc-500 sm:block">See what you&apos;ll actually get</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link href="/" className="rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white">Scan</Link>
              <Link href="/compare?a=ramen&b=pizza" className="rounded-lg px-3 py-2 text-zinc-300 hover:bg-zinc-800 hover:text-white">Compare</Link>
              <Link href="/glasses" className="rounded-lg bg-zinc-800 px-3 py-2 font-medium text-amber-300 hover:bg-zinc-700">Glasses view</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</main>
        <footer className="border-t border-zinc-800 py-6">
          <p className="mx-auto max-w-6xl px-4 text-xs leading-5 text-zinc-500 sm:px-6">
            HoloMenu — Meta Global AI Developer Hackathon (Indie track). Built with Muse Spark + SAM 3.1 via Meta Model API, GPU reconstruction on Modal, browser spatial rendering via model-viewer. 3D previews are reconstructions from real photos, scored for honesty — not promo renders.
          </p>
        </footer>
      </body>
    </html>
  );
}
