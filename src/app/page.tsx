import Link from "next/link";
import { ArrowUpRight, ScanLine, Glasses } from "lucide-react";
import Catalogue from "@/components/Catalogue";
import MenuScanner from "@/components/MenuScanner";

export default function Home() {
  return <div className="space-y-16 sm:space-y-20">
    <section className="grid items-center gap-10 py-6 lg:grid-cols-2 lg:py-12">
      <div>
        <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[.2em] text-blue-600"><span className="h-1.5 w-1.5 rounded-full bg-blue-600" /> A little closer to your next meal</p>
        <h1 className="mt-6 max-w-xl text-5xl font-medium leading-[1.08] tracking-[-.055em] text-slate-900 sm:text-7xl">Good taste.<br />A better view.</h1>
        <p className="mt-6 max-w-md text-lg leading-8 text-slate-500">Meet your meal before it meets your table. Explore dishes in 3D, get a feel for the portion, and find your favorite.</p>
        <div className="mt-8 flex flex-wrap items-center gap-5"><a href="#menu" className="flex items-center gap-3 rounded-full bg-blue-600 px-6 py-3.5 text-sm font-semibold text-white hover:bg-blue-700">Explore the menu <ArrowUpRight size={17} /></a><a href="#scan" className="flex items-center gap-2 text-sm font-medium text-slate-700"><ScanLine size={17} /> Scan your menu</a></div>
        <Link href="/glasses" className="mt-9 inline-flex items-center gap-2 text-xs text-slate-500"><Glasses size={17} /> A new perspective. Explore glasses view →</Link>
      </div>
      <div className="relative">
        <div className="overflow-hidden rounded-[2rem] bg-[#e9edf0]">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="https://images.unsplash.com/photo-1569718212165-3a8278d5f624?auto=format&fit=crop&w=1100&q=85" alt="A bowl of ramen, ready to explore" className="aspect-[5/4] w-full object-cover" />
        </div>
        <Link href="/dish/ramen" className="absolute bottom-5 left-5 right-5 flex items-center justify-between rounded-2xl bg-white/95 px-5 py-4 shadow-sm backdrop-blur"><div><p className="text-[10px] font-semibold uppercase tracking-widest text-blue-600">On the table</p><p className="mt-1 font-medium text-slate-900">Tonkotsu Ramen <span className="ml-2 text-sm text-slate-500">$18</span></p></div><span className="flex h-10 w-10 items-center justify-center rounded-full bg-blue-50 text-blue-600"><ArrowUpRight size={20} /></span></Link>
      </div>
    </section>
    <div id="menu" className="scroll-mt-24 border-t border-slate-200 pt-10"><Catalogue /></div>
    <div id="scan" className="scroll-mt-24"><MenuScanner /></div>
    <section className="flex flex-wrap items-center justify-between gap-6 border-t border-slate-200 py-8"><div><p className="text-xs uppercase tracking-widest text-blue-600">Room for one more?</p><h2 className="mt-2 text-2xl font-medium tracking-tight">Find the right fit for your appetite.</h2></div><Link href="/compare?a=ramen&b=pizza" className="rounded-full border border-slate-300 px-6 py-3 text-sm font-medium text-slate-700 hover:border-blue-500">Compare portions ↗</Link></section>
  </div>;
}
