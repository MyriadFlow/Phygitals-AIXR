import HeroSection from "./components/Hero";
import FeaturesSection from "./components/Features";
import HowItWorksSection from "./components/HowItWorks";
import AvatarShowcase from "./components/AvatarShowcase";
import CallToActionSection from "./components/CallToAction";

export default function Home() {
  return (
    <div className="flex flex-col">
      <HeroSection />
      <section id="features">
        <FeaturesSection />
      </section>
      <section id="how-it-works">
        <HowItWorksSection />
      </section>
      <AvatarShowcase />
      <CallToActionSection />
    </div>
  );
}
