"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Copy, Globe, Grid3X3, Layers, LayoutTemplate, Wifi } from "lucide-react";

import { Card } from "@/components/glass-operating-system/Card";
import { ScrambleText } from "@/components/glass-operating-system/ScrambleText";
import { TimeDisplay } from "@/components/glass-operating-system/TimeDisplay";

export default function GlassOperatingSystem() {
  return (
    <main className="min-h-screen bg-black p-4 font-sans text-white selection:bg-white/20 selection:text-white md:p-8">
      <div
        className="pointer-events-none fixed inset-0 z-0 opacity-[0.04]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.65' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />

      <div className="relative z-10 mx-auto flex h-full max-w-7xl flex-col gap-4">
        <div className="grid grid-cols-1 gap-4 md:h-[120px] md:grid-cols-4">
          <Card containerClassName="md:col-span-2 rounded-3xl" className="flex flex-col justify-center">
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <div className="mb-2 flex items-center gap-2">
                <div className="h-2 w-2 animate-pulse rounded-full bg-emerald-500 shadow-[0_0_10px_#10b981]" />
                <span className="text-xs font-medium uppercase tracking-wider text-emerald-500">System Online</span>
              </div>
              <h1 className="text-3xl font-medium tracking-tight text-white">
                <span className="text-neutral-500">The</span> Portfolio.
              </h1>
            </motion.div>
          </Card>

          <Card containerClassName="md:col-span-1 rounded-3xl" className="flex flex-col items-center justify-center">
            <TimeDisplay />
            <span className="mt-1 text-[10px] uppercase text-neutral-600">Local Time</span>
          </Card>

          <Card
            containerClassName="md:col-span-1 rounded-3xl border-none bg-neutral-100 text-black"
            className="flex flex-col items-start justify-center"
          >
            <div className="flex w-full items-center justify-between">
              <span className="font-semibold tracking-tight">Available</span>
              <Wifi className="h-4 w-4" />
            </div>
            <div className="mt-1 text-xs text-neutral-500">Accepting new contracts for 2025.</div>
          </Card>
        </div>

        <div className="grid grid-cols-1 gap-4 md:h-[500px] md:grid-cols-3">
          <Card containerClassName="md:col-span-2 rounded-3xl" className="flex flex-col justify-between">
            <div className="flex items-start justify-between">
              <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10">
                <Grid3X3 className="h-5 w-5 text-neutral-400" />
              </div>
              <div className="rounded-full border border-white/10 px-3 py-1 text-xs text-neutral-400">v2.0.4</div>
            </div>

            <div className="space-y-6">
              <h2 className="text-4xl font-light leading-[0.9] tracking-tighter md:text-6xl">
                We build digital <br />
                <span className="italic text-neutral-500">cathedrals</span> out of <br />
                lines of code.
              </h2>
              <p className="max-w-md text-sm leading-relaxed text-neutral-400">
                Moving beyond the static web. We specialize in high-performance interfaces, fluid interactions, and
                design systems that scale across the void.
              </p>
            </div>

            <div className="flex gap-4 border-t border-white/5 pt-4">
              <button
                type="button"
                className="group flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <span className="border-b border-transparent transition-all group-hover:border-white">View Projects</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="group flex items-center gap-2 text-sm text-neutral-400 transition-colors hover:text-white"
              >
                <span className="border-b border-transparent transition-all group-hover:border-white">Contact</span>
                <Copy className="h-4 w-4" />
              </button>
            </div>
          </Card>

          <div className="flex h-full flex-col gap-4">
            <Card containerClassName="flex-1 rounded-3xl" className="flex flex-col justify-between">
              <Layers className="h-6 w-6 text-neutral-400" />
              <div>
                <h3 className="text-lg font-medium">Services</h3>
                <ul className="mt-4 space-y-2 text-sm text-neutral-400">
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Design Systems</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>WebGL Experiences</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </li>
                  <li className="flex justify-between border-b border-white/5 pb-2">
                    <span>Next.js Engineering</span>
                    <ArrowUpRight className="h-3 w-3" />
                  </li>
                </ul>
              </div>
            </Card>

            <Card
              containerClassName="h-1/3 rounded-3xl bg-gradient-to-br from-indigo-500/10 to-purple-500/10"
              className="flex items-center justify-center"
            >
              <div className="text-center">
                <ScrambleText text="FUTURE_READY" className="text-lg font-bold tracking-widest" />
                <p className="mt-1 font-mono text-[10px] text-neutral-400">OPTIMIZED FOR 2125</p>
              </div>
            </Card>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-4 md:h-[300px] md:grid-cols-4">
          <Card containerClassName="md:col-span-1 rounded-3xl" className="group relative min-h-[200px] md:min-h-0">
            <div className="absolute inset-0 bg-neutral-800 opacity-50 transition-opacity group-hover:opacity-30" />
            <div className="absolute inset-0 flex items-center justify-center">
              <Globe className="h-12 w-12 stroke-1 text-neutral-700 transition-transform duration-500 group-hover:scale-110 sm:h-16 sm:w-16 md:h-20 md:w-20" />
            </div>
            <div className="absolute bottom-4 left-4 md:bottom-6 md:left-6">
              <p className="text-[10px] uppercase tracking-widest text-neutral-500 sm:text-xs">Region</p>
              <p className="text-xs font-medium sm:text-sm">Global</p>
            </div>
          </Card>

          <Card containerClassName="md:col-span-3 rounded-3xl bg-neutral-900" className="flex flex-col items-center justify-center text-center">
            <div className="relative z-10">
              <LayoutTemplate className="mx-auto mb-4 h-12 w-12 text-neutral-600" />
              <h3 className="text-2xl font-light tracking-tight">
                <span className="font-serif italic text-neutral-500">&quot;Simplicity</span> is the ultimate <br />
                sophistication.&quot;
              </h3>
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black"
              >
                Start Collaborating
              </motion.button>
            </div>
            <div className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:24px_24px] opacity-20 [mask-image:radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
          </Card>
        </div>
      </div>
    </main>
  );
}
