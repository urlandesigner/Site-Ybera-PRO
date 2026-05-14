import { Suspense } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import {
  HeaderProfileSubheader,
  HeaderProfileSubheaderFallback,
} from "@/components/layout/HeaderProfileSubheader";
import { AppPreview } from "@/components/sections/AppPreview";
import { AudienceTabs } from "@/components/sections/AudienceTabs";
import { ParallaxControlOverlap } from "@/components/sections/ParallaxControlOverlap";
import { EcosystemStrip } from "@/components/sections/EcosystemStrip";
import { FAQ } from "@/components/sections/FAQ";
import { FinalCTA } from "@/components/sections/FinalCTA";
import { Hero } from "@/components/sections/Hero";
import { Metrics } from "@/components/sections/Metrics";
import { Opportunity } from "@/components/sections/Opportunity";
import { Products } from "@/components/sections/Products";
import { StoreProof } from "@/components/sections/StoreProof";
import { Testimonials } from "@/components/sections/Testimonials";
import { Tools } from "@/components/sections/Tools";

export default function Home() {
  return (
    <div className="relative min-h-screen bg-canvas text-ink-strong">
      <Header />
      <main>
        <Hero />
        <EcosystemStrip />
        <AudienceTabs />
        <Suspense fallback={null}>
          <ParallaxControlOverlap />
        </Suspense>
        <Suspense fallback={<HeaderProfileSubheaderFallback />}>
          <HeaderProfileSubheader />
        </Suspense>
        <Suspense fallback={null}>
          <Opportunity />
        </Suspense>
        <Suspense fallback={null}>
          <Tools />
        </Suspense>
        <Suspense fallback={null}>
          <AppPreview />
        </Suspense>
        <Metrics />
        <Products />
        <StoreProof />
        <Suspense fallback={null}>
          <Testimonials />
        </Suspense>
        <Suspense fallback={null}>
          <FinalCTA />
        </Suspense>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
