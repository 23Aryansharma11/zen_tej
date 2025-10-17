import Architecture from "@/components/architecture";
import HeroSection from "@/components/hero-section";
import TeamSection from "@/components/team-section";
import { Compare } from "@/components/ui/compare";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative  overflow-hidden">
      <HeroSection />
      <TeamSection />
      <Architecture />
    </section>
  );
}
