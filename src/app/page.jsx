"use client";
import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import ClientList from "@/components/ClientList";

export default function Home() {
  return (
    <main>
      <Header />
      <section className="reveal-wrapper">
        <HeroSection />
      </section>
      <section className="hidden-section">
        <ClientList />
      </section>
    </main>
  );
}
