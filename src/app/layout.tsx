import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";


export const metadata: Metadata = {
  title: "HoloMenu — See What You'll Actually Get",
  description: "Don't imagine your order. Experience it before it arrives. Real customer photos reconstructed into interactive 3D with an honesty score.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full bg-[#faf9f6] text-slate-900">
        <header className="sticky top-0 z-20 border-b border-slate-200 bg-[#faf9f6]/95 backdrop-blur">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-5 sm:px-6">
            <Link href="/" className="flex items-center gap-2">
              <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 text-sm font-medium text-white">H</span>
              <span className="leading-tight">
                <span className="block font-bold tracking-tight">HoloMenu</span>
                <span className="hidden text-[11px] text-slate-500 sm:block">See what you&apos;ll actually get</span>
              </span>
            </Link>
            <nav className="flex items-center gap-1 text-sm">
              <Link href="/" className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-blue-600">Menu</Link>
              <Link href="/compare?a=ramen&b=pizza" className="rounded-lg px-3 py-2 text-slate-600 hover:bg-slate-100 hover:text-blue-600">Compare</Link>
              <Link href="/glasses" className="rounded-lg bg-blue-50 px-3 py-2 font-medium text-blue-600 hover:bg-blue-100">Glasses view</Link>
            </nav>
          </div>
        </header>
        <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-6 sm:px-6 sm:py-10">{children}</main>
        <footer className="border-t border-slate-200 py-6">
          <p className="mx-auto max-w-6xl px-4 text-xs leading-5 text-slate-500 sm:px-6">
            HoloMenu — Meta Global AI Developer Hackathon (Indie track). Demo previews use stylized 3D assets and curated sample evidence. Live AI features require configured services. Confirm portions, ingredients, and allergens with the restaurant.
          </p>
        </footer>
      </body>
    </html>
  );
}
