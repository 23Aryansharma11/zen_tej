import Architecture from "@/components/architecture";
import HeroSection from "@/components/hero-section";
import InfoSection from "@/components/info-section";
import TeamSection from "@/components/team-section";
import Link from "next/link";

export default function Home() {
  return (
    <section className="relative  overflow-hidden">
      <HeroSection />
      <TeamSection />
      <Architecture />
      <InfoSection />
    </section>
  );
}
