"use client";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientList from "@/components/ClientList";
import WorkSection from "@/components/WorkSection";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="reveal-wrapper">
        <HeroSection />

        <WorkSection />
      </section>
      <section className="hidden-section">
        <ClientList />
      </section>
    </main>
  );
}
