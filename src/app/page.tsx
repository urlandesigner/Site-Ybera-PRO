import { Suspense } from "react";

import { Footer } from "@/components/layout/Footer";
import { Header } from "@/components/layout/Header";
import { AppPreview } from "@/components/sections/AppPreview";
import { AudienceTabs } from "@/components/sections/AudienceTabs";
import { Benefits } from "@/components/sections/Benefits";
import { ControlPanel } from "@/components/sections/ControlPanel";
import { Ecosystem } from "@/components/sections/Ecosystem";
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
        <ControlPanel />
        <Opportunity />
        <Benefits />
        <Tools />
        <Ecosystem />
        <AppPreview />
        <Metrics />
        <Products />
        <StoreProof />
        <Testimonials />
        <Suspense fallback={null}>
          <FinalCTA />
        </Suspense>
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
