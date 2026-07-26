import React from 'react';
import { ArrowRight, Calculator } from 'lucide-react';
import { Link } from '../lib/router';

const Hero: React.FC = () => {
  return (
    <section className="relative min-h-[calc(100vh-3.5rem)] overflow-hidden bg-black text-white">
      <FullBleedBackdrop />

      <div className="absolute right-6 top-8 z-20 rounded-lg border border-white/20 bg-gray-900/40 px-7 py-3 text-sm font-medium text-white shadow-2xl shadow-black/40 backdrop-blur-md md:right-8">
        UI Design
      </div>

      <div className="relative z-10 mx-auto flex min-h-[calc(100vh-3.5rem)] w-full max-w-7xl flex-col justify-center px-6 py-12 md:px-10">
        <div className="mb-16 flex items-start justify-between gap-8 md:mb-20">
          <Link to="/" className="flex h-8 w-8 items-center justify-center text-white">
            <Calculator className="h-5 w-5" />
          </Link>
          <div className="hidden items-center gap-8 text-[12px] font-semibold text-white/90 md:flex">
            <Link to="/" className="border-b border-white pb-0.5">Home</Link>
            <Link to="/category/finance" className="smooth-control hover:text-white">About</Link>
            <Link to="/blog" className="smooth-control hover:text-white">Projects</Link>
            <Link to="/category/maths" className="flex items-center gap-2 rounded-full bg-gray-950 px-5 py-2.5 text-[12px] font-semibold text-white smooth-control hover:bg-black">
              Get in Touch
              <span className="flex h-5 w-5 items-center justify-center rounded-full bg-[#f4510b] text-white">
                <ArrowRight className="h-3 w-3" />
              </span>
            </Link>
          </div>
        </div>

        <div className="grid gap-10 md:grid-cols-[1.05fr_0.95fr] md:items-center">
          <div>
            <p className="mb-5 text-base font-semibold text-white">Hey, I&apos;m a</p>
            <h1 className="max-w-3xl text-6xl font-semibold leading-[0.92] text-white md:text-9xl">
              Calculation
              <span className="block">Manager</span>
            </h1>
          </div>
          <div className="relative max-w-[360px] md:ml-auto md:mr-16">
            <div className="pointer-events-none absolute -left-24 -top-32 hidden h-[390px] w-[250px] rounded-t-full bg-gradient-to-b from-black/50 via-black/35 to-black/70 shadow-2xl shadow-black/50 md:block" />
            <div className="pointer-events-none absolute -left-6 -top-20 hidden h-28 w-28 rounded-full border-[18px] border-orange-950/75 bg-orange-300/15 md:block" />
            <div className="relative">
              <h2 className="text-lg font-semibold leading-6 text-white">Great calculator design should feel invisible.</h2>
              <p className="mt-4 text-sm font-medium leading-7 text-white/80">
                From quick tools to guided results, Calculate Karo helps people reach accurate answers faster.
              </p>
            </div>
          </div>
        </div>

        <div className="mt-16 grid grid-cols-2 gap-7 text-white md:mt-24 md:grid-cols-4">
          <HeroMarker number="#01" label="Finance Tools" to="/category/finance" />
          <HeroMarker number="#02" label="Health Metrics" to="/category/health" />
          <HeroMarker number="#03" label="Maths Studio" to="/category/maths" />
          <HeroMarker number="#04" label="Date Planning" to="/category/age-date" />
        </div>
      </div>

      <div className="absolute bottom-8 left-6 z-10 flex flex-col gap-1 md:left-10">
        <div className="flex gap-1">
          <span className="h-4 w-7 rounded-full bg-orange-500" />
          <span className="h-4 w-4 rounded-full bg-orange-200" />
        </div>
        <div className="flex gap-1">
          <span className="h-4 w-4 rounded-full bg-orange-700" />
          <span className="h-4 w-4 rounded-full bg-orange-300" />
        </div>
        <span className="h-4 w-4 rounded-full bg-orange-500" />
      </div>
    </section>
  );
};

const HeroMarker: React.FC<{ number: string; label: string; to: string }> = ({ number, label, to }) => (
  <Link to={to} className="group min-w-0 smooth-control hover:-translate-y-0.5">
    <div className="text-[11px] font-semibold text-white">
      <span className="text-orange-200">{number.slice(0, 1)}</span>
      {number.slice(1)}
    </div>
    <div className="mt-2 text-[11px] font-semibold text-white/82 group-hover:text-white">{label}</div>
  </Link>
);

const FullBleedBackdrop = () => (
  <div className="pointer-events-none absolute inset-0 overflow-hidden">
    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_34%,rgba(244,81,11,0.45),transparent_27%),linear-gradient(115deg,#050505_0%,#101010_42%,#000_100%)]" />
    <div className="absolute inset-x-0 top-0 h-[54%] bg-gradient-to-br from-[#ff3308] via-[#f4510b] to-[#ff6a00] [clip-path:polygon(0_0,100%_0,100%_64%,0_46%)]" />
    <div className="absolute inset-x-0 bottom-0 h-[58%] bg-gradient-to-br from-[#391003] via-[#f4510b] to-[#150501] [clip-path:polygon(0_18%,100%_34%,100%_100%,0_100%)]" />
    <div className="absolute inset-x-0 top-[43%] h-[28%] bg-black/48 [clip-path:polygon(0_0,100%_22%,100%_100%,0_74%)]" />
    <div className="absolute left-[44%] top-[30%] hidden h-[420px] w-[280px] rounded-t-full bg-gradient-to-b from-black/45 via-black/28 to-black/70 blur-[0.3px] md:block" />
    <div className="absolute left-[50%] top-[34%] hidden h-32 w-32 rounded-full border-[20px] border-orange-950/75 bg-orange-300/12 md:block" />
    <div className="absolute -left-24 bottom-[-18%] h-[360px] w-[820px] -rotate-6 bg-gradient-to-r from-white/12 via-white/5 to-transparent blur-[2px]" />
    <div className="absolute right-[-14%] top-[-12%] h-[460px] w-[260px] -rotate-12 bg-gradient-to-b from-white/18 via-white/5 to-transparent blur-[2px]" />
  </div>
);

export default Hero;
